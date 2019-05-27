import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';

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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.criarFormulario();
  }
  criarFormulario() {
    this.formLogin = this.formbuilder.group({
      email: [null, [Validators.required, Validators.email]],
      senha: [null, [Validators.required]]
    });
  }

  login() {
    if (this.formLogin.valid) {
      this.router.navigate(['private/dashboard']);
    } else {
      this.toastr.error(MensagemEnum.LOGIN_INVALIDO);
    }
  }

}
