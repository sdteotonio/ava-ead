import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable()
export class UsuarioService {

  constructor(
    private http: HttpClient
  ) { }

  removerUsuario(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/usuarios/${id}`);
  }

  recuperarUsuario(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/usuarios/${id}`);
  }

  listarUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${environment.apiUrl}/usuarios`);
  }
}
