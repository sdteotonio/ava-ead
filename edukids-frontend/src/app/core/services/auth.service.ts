import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

    constructor() { }


    setUsuarioLogado<T>(user: T) {
        sessionStorage.setItem('USER', JSON.stringify(user));
    }

    getUsuarioLogado<T>(): T {
        return JSON.parse(sessionStorage.getItem('USER'));
    }

    limparSessao() {
        sessionStorage.removeItem('USER');
    }
}
