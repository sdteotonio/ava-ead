import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService,
    private loginService: LoginService
  ) { }

  ngOnInit() {
    this.criarFormulario();
    const user = this.authService.getUsuarioLogado<UsuarioModel>();
    if (user != null) {
      if (user.tipo !== TipoUsuarioEnum.ALUNO) {
        this.router.navigate(['private/dashboard']);
      } else {
        this.router.navigate(['area-aluno']);
      }
    }
  }
  criarFormulario() {
    this.formLogin = this.formbuilder.group({
      email: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
  }

  login() {
    if (this.formLogin.valid) {
      this.loginService.doLogin(this.formLogin.getRawValue()).subscribe(usuario => {
        if (usuario) {
          this.authService.setUsuarioLogado(usuario);
          if (usuario.tipo !== TipoUsuarioEnum.ALUNO) {
            this.router.navigate(['private/dashboard']);
          } else {
            this.router.navigate(['area-aluno']);
          }
        } else {
          this.toastr.error('Login inválido');
        }
      });
    } else {
      this.toastr.error(MensagemEnum.LOGIN_INVALIDO);
    }
  }

}
