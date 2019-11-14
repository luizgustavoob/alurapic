import { Component } from '@angular/core';
import { UserService } from '../user/user.service';
import { Observable } from 'rxjs';
import { User } from '../user/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent { 

    user$: Observable<User>
    user: User;

    constructor(private userService: UserService) {
        this.user$ = this.userService.getUser();
        this.user$.subscribe(user => this.user = user);
    }
}