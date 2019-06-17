import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { environment } from 'src/environments/environment';
import { AlunoModel } from '../models/aluno.model';

@Injectable()
export class ManterAlunoService {

    constructor(
        private http: HttpClient,
        private usuarioService: UsuarioService
    ) { }

    recuperarAluno(id: number): Observable<AlunoModel> {
        return this.usuarioService.recuperarUsuario(id);
    }

    removerAluno(id: number): Observable<any> {
        return this.usuarioService.removerUsuario(id);
    }

    addAluno(aluno: AlunoModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/usuarios`, aluno);
    }

    atualizarAluno(aluno: AlunoModel): Observable<any> {
        return this.http.put(`${environment.apiUrl}/usuarios/${aluno.id}`, aluno);
    }

    listarAlunoes(): Observable<AlunoModel[]> {
        return this.http.get<AlunoModel[]>(`${environment.apiUrl}/usuarios?tipo=${TipoUsuarioEnum.ALUNO}`);
    }

}
