import { Injectable } from '@angular/core';
import { TurmaModel } from '../models/turma.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class ManterTurmaService {
    private turmas: TurmaModel[];
    constructor() { }

    addTurma(turma: TurmaModel): Observable<TurmaModel[]> {
        this.turmas.push(turma);
        return of(this.turmas);
    }

    listarTurmasByProfessor(idProfessor: number): Observable<TurmaModel[]> {
        console.log('Id Professor: ', idProfessor);
        return of(this.turmas);
    }

}
