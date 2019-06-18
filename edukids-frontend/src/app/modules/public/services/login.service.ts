import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';
import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';
import { environment } from 'src/environments/environment';
@Injectable()
export class LoginService {

    constructor(
        private http: HttpClient,
        private authService: AuthService,
        private router: Router
    ) { }

    doLogin(credenciais: { email: string, senha: string }): Observable<UsuarioModel> {
        return this.http.get<UsuarioModel[]>(`${environment.apiUrl}/usuarios`).pipe(
            switchMap(lista => {
                return of(lista.find(user => user.email === credenciais.email && user.senha === credenciais.senha));
            })
        );
    }

    logOut() {
        this.authService.limparSessao();
        this.router.navigate(['/']);
    }
}
