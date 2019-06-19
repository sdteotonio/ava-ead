import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConteudoService } from 'src/app/core/services/conteudo.service';
import { DisciplinaEnum } from 'src/app/shared/shared-models/enum/disciplina.enum';
import { environment } from 'src/environments/environment';
import { ConteudoVisualizadoDtomodel } from '../models/conteudo-visualizado-dto.model';

@Injectable()
export class ConteudoVisualizadoService {

  constructor(
    private http: HttpClient
  ) { }

  // tslint:disable-next-line: max-line-length
  getConteudoVisualizadoByAlunoAndTurma(idTurma: number, idAluno: number): Observable<ConteudoVisualizadoDtomodel[]> {
    return this.http.get<ConteudoVisualizadoDtomodel[]>(`${environment.apiUrl}/conteudo-visualizado?idAluno=${idAluno}&idTurma=${idTurma}`);
  }

  addVisu(visu: ConteudoVisualizadoDtomodel) {
    return this.http.post(`${environment.apiUrl}/conteudo-visualizado`, visu);
  }

  remover(visuId: number) {
    return this.http.delete(`${environment.apiUrl}/conteudo-visualizado/${visuId}`);
  }


}
