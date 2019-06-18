import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable()
export class PrivateGuard implements CanActivate {
    constructor(
        private auth: AuthService
    ) { }

    canActivate() {
        return this.auth.isLogged();
    }

}
