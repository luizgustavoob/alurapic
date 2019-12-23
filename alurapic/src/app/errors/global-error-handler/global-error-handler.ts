import { ErrorHandler, Injector, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import * as StackTrace from 'stacktrace-js';
import { UserService } from 'src/app/core/user/user.service';
import { ServerLogService } from './server-log.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
    
  constructor(private injector: Injector) { }

  handleError(error: any): void {
    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);

    const message = error.message ? error.message : '';
    const url = location instanceof PathLocationStrategy ? location.path() : '';
    const userName = userService.getUserName();

    router.navigate(['/error']);
    
    StackTrace
      .fromError(error)
      .then(stackFrames => {
        const stackAsString = 
          stackFrames.map(sf => sf.toString())
          .join('\n');
        
        console.log(message);
        console.log(stackAsString);

        serverLogService.log({message, url, userName, stack: stackAsString}).subscribe(
          () => console.log('erro enviado ao server'),
          (err) => {
            console.log(err);
            console.log('erro ao enviar log para o servidor');
          }
        );
      });
  }
}