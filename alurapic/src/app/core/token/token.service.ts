import { Injectable } from '@angular/core';

const KEY = 'authToken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    hasToken(): boolean {
        return !!this.getToken();
    }

    setToken(token: string) {
        localStorage.setItem(KEY, token);
    }

    getToken(): string {
        return localStorage.getItem(KEY);
    }

    removeToken() {
        localStorage.removeItem(KEY);
    }
}