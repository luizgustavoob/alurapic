import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser } from './new-user';
import { environment } from 'src/environments/environment';

const API_URL = environment.api_url;

@Injectable()
export class SignUpService {

    constructor(private httpClient: HttpClient) { }

    checkUserNameTaken(userName: string) {
        return this.httpClient.get(API_URL + '/user/exists/' + userName);
    }

    signup(newUser: NewUser) {
        return this.httpClient.post(API_URL + '/user/signup', newUser);
    }
}