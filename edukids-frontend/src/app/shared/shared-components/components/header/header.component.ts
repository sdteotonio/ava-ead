import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  exibirMenu = false;
  usuarioLogado: UsuarioModel;

  tipoUsuario = TipoUsuarioEnum;

  @Output()
  alerarTurma$: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.usuarioLogado = this.authService.getUsuarioLogado();
  }

  sair() {
    this.authService.limparSessao();
    this.router.navigate(['/']);
  }

  alterarExibicaoMenu() {
    this.exibirMenu = !this.exibirMenu;
  }

}
