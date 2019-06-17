import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { NegocioService } from 'src/app/core/services/negocio.service';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { environment } from 'src/environments/environment';
import { ProfessorModel } from '../models/professor.model';
@Injectable()
export class ManterProfessorService {



    constructor(
        private http: HttpClient,
        private usuarioService: UsuarioService,
        private negocioService: NegocioService
    ) { }

    addProfessor(professor: ProfessorModel): Observable<any> {
        return this.negocioService.verificarEmailCadastrado(professor.email).pipe(
            switchMap(() => {
                return this.http.post(`${environment.apiUrl}/usuarios`, professor);
            })
        );
    }

    recuperarProfessor(id: number) {
        return this.usuarioService.recuperarUsuario(id);
    }

    atualizarProfessor(professor: ProfessorModel): Observable<any> {
        return this.http.put(`${environment.apiUrl}/usuarios/${professor.id}`, professor);
    }

    listarProfessores(): Observable<ProfessorModel[]> {
        return this.http.get<ProfessorModel[]>(`${environment.apiUrl}/usuarios?tipo=${TipoUsuarioEnum.PROFESSOR}`);
    }

    removerProfessor(id: number) {
        return this.usuarioService.removerUsuario(id);
    }

}
