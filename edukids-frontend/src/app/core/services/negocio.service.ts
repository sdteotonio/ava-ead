import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioService } from './usuario.service';

@Injectable()
export class NegocioService {

    constructor(
        private usarioService: UsuarioService,
        private toast: ToastrService
    ) { }

    verificarEmailCadastrado(email: string): Observable<boolean> {
        return this.usarioService.listarUsuarios()
            .pipe(
                switchMap(lista => {
                    const cadastrado = lista.some(user => user.email === email);
                    if (cadastrado) {
                        this.toast.error('E-mail já cadastrado.');
                        throw new Error();
                    }
                    return of(cadastrado);
                })
            );
    }
}
