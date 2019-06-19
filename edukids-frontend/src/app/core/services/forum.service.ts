import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumModel } from 'src/app/shared/shared-models/interface/forum.model';
import { environment } from 'src/environments/environment';


@Injectable()
export class ForumService {

  constructor(
    private http: HttpClient
  ) { }

  getForumByTurma(idTurma: number): Observable<ForumModel> {
    return this.http.get<ForumModel>(`${environment.apiUrl}/forum?idTurma=${idTurma}`);
  }

  atualizarForum(forumModel: ForumModel): Observable<ForumModel> {
    if (forumModel.id) {
      return this.http.put<ForumModel>(`${environment.apiUrl}/forum/${forumModel.id}`, forumModel);
    } else {
      return this.http.post<ForumModel>(`${environment.apiUrl}/forum`, forumModel);
    }
  }

}
