import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ForumModel } from 'src/app/shared/shared-models/interface/forum.model';


@Injectable()
export class ForumService {

  listaForum: ForumModel[] = [];

  constructor(
  ) { }

  getForumByTurma(idTurma: number): Observable<ForumModel> {
    this.listaForum = JSON.parse(sessionStorage.getItem('FORUM'));
    if (this.listaForum) {
      return of(
        this.listaForum.find(x => x.turmaId === idTurma)
      ).pipe(delay(500));
    } else {
      return of<ForumModel>(
        {
          turmaId: idTurma,
          mensagens: []
        }
      );
    }
  }

  atualizarForum(forumModel: ForumModel): Observable<ForumModel> {
    this.listaForum = JSON.parse(sessionStorage.getItem('FORUM')) || [];
    const forumExistenteId = this.listaForum.findIndex(x => x.turmaId == forumModel.id);
    if (forumExistenteId >= 0) {
      this.listaForum[forumExistenteId] = forumModel;
    } else {
      this.listaForum.push(forumModel);
    }
    sessionStorage.setItem('FORUM', JSON.stringify(this.listaForum));
    return of(forumModel).pipe(delay(500));
  }

}
