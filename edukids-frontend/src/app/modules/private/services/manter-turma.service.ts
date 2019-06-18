import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TurmaModel } from '../models/turma.model';

@Injectable()
export class ManterTurmaService {

    constructor(
        private http: HttpClient
    ) { }

    addTurma(turma: TurmaModel): Observable<any> {
        return this.http.post(`${environment.apiUrl}/turmas`, turma);
    }

    atualizarTurma(turma: TurmaModel): Observable<any> {
        return this.http.put(`${environment.apiUrl}/turmas/${turma.id}`, turma);
    }

    listarTurmasByProfessor(idProfessor: number): Observable<TurmaModel[]> {
        return this.http.get<TurmaModel[]>(`${environment.apiUrl}/turmas?professorId=${idProfessor}`);
    }

    listarTurmasByAluno(idAluno: number): Observable<TurmaModel[]> {
        return this.http.get<TurmaModel[]>(`${environment.apiUrl}/turmas`)
            .pipe(
                switchMap(turmas => {
                    return of(turmas.filter(turma => {
                        return turma.alunos.some(a => a === idAluno);
                    }));
                })
            );
    }

    recuperarTurma(id: number): Observable<TurmaModel> {
        return this.http.get<TurmaModel>(`${environment.apiUrl}/turmas/${id}`);
    }

    listarTurmas(): Observable<TurmaModel[]> {
        return this.http.get<TurmaModel[]>(`${environment.apiUrl}/turmas`);
    }



}
