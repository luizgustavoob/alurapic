import { Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private userSubject = new BehaviorSubject<User>(null); // armazena a emissão até que algum consumidor apareça

    constructor(private tokenService: TokenService) {
        this.hasToken() && this.decodeAndNotify();
    }

    hasToken(): boolean {
        return this.tokenService.hasToken();
    }

    setToken(token: string) {
        this.tokenService.setToken(token);
        this.decodeAndNotify();
    }

    getToken(): string {
        return this.tokenService.getToken();
    }

    removeToken() {
        this.tokenService.removeToken();
    }

    getUser() {
        return this.userSubject.asObservable();
    }

    private decodeAndNotify() {
        const token = this.getToken();
        const user = jwt_decode(token) as User;
        this.userSubject.next(user);
    }
}