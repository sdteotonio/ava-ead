import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { AlunoModel } from '../../models/aluno.model';
import { ManterAlunoService } from '../../services/manter-aluno.service';

@Component({
  selector: 'app-cadastro-aluno',
  templateUrl: './cadastro-aluno.component.html',
  styleUrls: ['./cadastro-aluno.component.css']
})
export class CadastroAlunoComponent implements OnInit {
  formCadastro: FormGroup;
  constructor(
    private formBuidler: FormBuilder,
    private alunoService: ManterAlunoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formCadastro = this.formBuidler.group({
      email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      senha: [null, [Validators.required]],
      senhaConfirm: [null, [Validators.required]]
    });
  }


  gravar() {
    if (this.formCadastro.valid) {
      const nAluno: AlunoModel = this.formCadastro.getRawValue();
      nAluno.tipo = TipoUsuarioEnum.ALUNO;
      this.alunoService.addAluno(nAluno).subscribe(() => {
        this.toastr.success(MensagemEnum.ALUNO_CADASTRADO_COM_SUCESSO);
        this.router.navigate(['/private/dashboard']);
      });
    } else {
      this.toastr.error(MensagemEnum.DADOS_INVALIDOS);
    }
  }


}
