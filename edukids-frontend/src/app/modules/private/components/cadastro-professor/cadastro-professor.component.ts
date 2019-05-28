import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ManterProfessorService } from '../../services/manter-professor.service';
import { ToastrService } from 'ngx-toastr';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';
import { ProfessorModel } from '../../models/professor.model';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {
  formCadastro: FormGroup;
  constructor(
    private formBuidler: FormBuilder,
    private professorService: ManterProfessorService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.criarFormulario();
  }
  criarFormulario() {
    this.formCadastro = this.formBuidler.group({
      email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      instituicao: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      senhaConfirm: [null, [Validators.required]]
    });
  }

  gravar() {
    if (this.formCadastro.valid) {
      const nProfessor: ProfessorModel = this.formCadastro.getRawValue();
      nProfessor.tipo = TipoUsuarioEnum.PROFESSOR;
      this.professorService.addProfessor(nProfessor).subscribe(() => {
        this.toastr.success(MensagemEnum.PROFESSOR_CADASTRADO_COM_SUCESSO);
        this.router.navigate(['/private/dashboard']);
      });
    } else {
      this.toastr.error(MensagemEnum.DADOS_INVALIDOS);
    }
  }

}
