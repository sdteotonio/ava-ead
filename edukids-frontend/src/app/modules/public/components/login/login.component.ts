import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';
import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  usuarios: UsuarioModel[] = [
    {
      email: 'admin@email.com',
      senha: '123',
      nome: 'Sérgio Davi',
      tipo: TipoUsuarioEnum.ADMIN
    }
    , {
      email: 'professor@email.com',
      senha: '123',
      nome: 'Professor Teste',
      tipo: TipoUsuarioEnum.PROFESSOR
    }
    , {
      email: 'aluno@email.com',
      senha: '123',
      nome: 'Aluno Teste',
      tipo: TipoUsuarioEnum.ALUNO
    }
  ];

  constructor(
    private formbuilder: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
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
      const user = this.usuarios.find(x => x.email === this.formLogin.get('email').value && x.senha === this.formLogin.get('senha').value);
      if (user) {
        this.authService.setUsuarioLogado(user);
        if (user.tipo !== TipoUsuarioEnum.ALUNO) {
          this.router.navigate(['private/dashboard']);
        } else {
          this.router.navigate(['area-aluno']);
        }
      }
    } else {
      this.toastr.error(MensagemEnum.LOGIN_INVALIDO);
    }
  }

}
