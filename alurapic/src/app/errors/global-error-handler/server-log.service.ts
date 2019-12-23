import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServerLog } from './server-log';
import { environment } from 'src/environments/environment';

const API_URL = environment.api_server_log;

@Injectable({
  providedIn: 'root'
})
export class ServerLogService {
  
  constructor(private http: HttpClient) { }

  log(log: ServerLog) {
    return this.http.post(API_URL + '/infra/log', log);
  }
}