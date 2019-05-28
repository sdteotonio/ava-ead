import { Injectable } from '@angular/core';
import { AlunoModel } from '../models/aluno.model';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class ManterAlunoService {

    private listaAlunos: AlunoModel[] = [];
    constructor() { }

    addAluno(aluno: AlunoModel): Observable<any> {
        this.listaAlunos.push(aluno);
        return of([this.listaAlunos]);
    }

    listarAlunoes(): Observable<AlunoModel[]> {
        return of(this.listaAlunos).pipe(delay(120));
    }
}
