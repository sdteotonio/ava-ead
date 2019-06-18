import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DisciplinaModel } from 'src/app/shared/shared-models/interface/disciplina.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class DisciplinaService {

    constructor(
        private http: HttpClient
    ) { }

    listarDisciplinas(): Observable<DisciplinaModel[]> {
        return this.http.get<DisciplinaModel[]>(`${environment.apiUrl}/disciplinas`);
    }

}
