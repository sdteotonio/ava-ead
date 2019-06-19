import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    usuarioLogado: any;

    constructor() {
        this.atribuirUsuarioLogado();
    }

    atribuirUsuarioLogado() {
        this.usuarioLogado = JSON.parse(sessionStorage.getItem('USER'));
    }


    setUsuarioLogado<T>(user: T) {
        sessionStorage.setItem('USER', JSON.stringify(user));
        this.usuarioLogado = user;
    }

    getUsuarioLogado<T>(): T {
        return this.usuarioLogado || JSON.parse(sessionStorage.getItem('USER'));
    }

    limparSessao() {
        sessionStorage.removeItem('USER');
        sessionStorage.removeItem('ID_TURMA');
        this.usuarioLogado = null;
    }

    isLogged() {
        return this.usuarioLogado != null;
    }
}
