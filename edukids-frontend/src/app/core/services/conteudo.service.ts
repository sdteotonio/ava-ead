import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DisciplinaEnum } from 'src/app/shared/shared-models/enum/disciplina.enum';
import { ConteudoModel } from 'src/app/shared/shared-models/interface/conteudo.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class ConteudoService {


  constructor(
    private http: HttpClient
  ) { }

  conteudoByTurmaAndDiscipinas(idTurma: number, idDis: DisciplinaEnum): Observable<ConteudoModel[]> {
    return this.http.get<ConteudoModel[]>(`${environment.apiUrl}/conteudos?turmaId=${idTurma}&disciplinaId=${idDis}`);
  }

  addConteudo(conte: ConteudoModel): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/conteudos`, conte);
  }

  atualizarConteudo(contSelecionado: ConteudoModel) {
    return this.http.put<any>(`${environment.apiUrl}/conteudos/${contSelecionado.id}`, contSelecionado);
  }

  removerConteudo(conteId: number): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}/conteudos/${conteId}`);
  }

}
