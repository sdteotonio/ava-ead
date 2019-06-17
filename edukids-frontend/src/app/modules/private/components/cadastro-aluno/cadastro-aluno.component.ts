import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  idAluno: number;
  constructor(
    private formBuidler: FormBuilder,
    private alunoService: ManterAlunoService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.formCadastro = this.formBuidler.group({
      email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
    this.idAluno = this.actRoute.snapshot.params['id'];
    this.verificarId();
  }

  verificarId() {
    if (this.idAluno) {
      this.alunoService.recuperarAluno(this.idAluno).subscribe(aluno => {
        this.formCadastro.patchValue(aluno);
      });
    }
  }


  gravar() {
    if (this.formCadastro.valid) {
      const nAluno: AlunoModel = this.formCadastro.getRawValue();
      nAluno.tipo = TipoUsuarioEnum.ALUNO;
      if (this.idAluno) {
        nAluno.id = this.idAluno;
        this.alunoService.atualizarAluno(nAluno).subscribe(() => {
          this.toastr.success(MensagemEnum.DADOS_ATUALIZADO.replace('VALUE', 'Aluno'));
          this.router.navigate(['/private/dashboard']);
        });
      } else {
        this.alunoService.addAluno(nAluno).subscribe(() => {
          this.toastr.success(MensagemEnum.ALUNO_CADASTRADO_COM_SUCESSO);
          this.router.navigate(['/private/dashboard']);
        });
      }
    } else {
      this.toastr.error(MensagemEnum.DADOS_INVALIDOS);
    }
  }


}
