import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = 'http://localhost:3000';

@Injectable({
    providedIn: 'root'
})
export class SignUpService {

    constructor(private httpClient: HttpClient) { }

    checkUserNameTaken(userName: string) {
        return this.httpClient.get(API_URL + '/user/exists/' + userName);
    }
}