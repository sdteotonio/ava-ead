import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ProfessorModel } from '../models/professor.model';
@Injectable()
export class ManterProfessorService {

    private listaProffessor: ProfessorModel[] = [];
    constructor() { }

    addProfessor(professor: ProfessorModel): Observable<any> {
        this.listaProffessor.push(professor);
        return of([this.listaProffessor]);
    }

    listarProfessores(): Observable<ProfessorModel[]> {
        return of(this.listaProffessor).pipe(delay(120));
    }
}
