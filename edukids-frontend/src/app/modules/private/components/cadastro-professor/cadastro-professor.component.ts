import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { ProfessorModel } from '../../models/professor.model';
import { ManterProfessorService } from '../../services/manter-professor.service';

@Component({
  selector: 'app-cadastro-professor',
  templateUrl: './cadastro-professor.component.html',
  styleUrls: ['./cadastro-professor.component.css']
})
export class CadastroProfessorComponent implements OnInit {
  formCadastro: FormGroup;
  idProfessor: any;
  constructor(
    private formBuidler: FormBuilder,
    private professorService: ManterProfessorService,
    private toastr: ToastrService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.criarFormulario();
    this.idProfessor = this.actRoute.snapshot.params['id'];
    this.verificarId();
  }
  verificarId() {
    if (this.idProfessor) {
      this.professorService.recuperarProfessor(this.idProfessor).subscribe((professor) => {
        this.formCadastro.patchValue(professor);
      });
    }
  }
  criarFormulario() {
    this.formCadastro = this.formBuidler.group({
      email: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      instituicao: [null, [Validators.required]],
      senha: [null, [Validators.required]]
    });
  }

  gravar() {
    if (this.formCadastro.valid) {
      const nProfessor: ProfessorModel = this.formCadastro.getRawValue();
      nProfessor.tipo = TipoUsuarioEnum.PROFESSOR;
      if (this.idProfessor) {
        nProfessor.id = this.idProfessor;
        this.professorService.atualizarProfessor(nProfessor).subscribe(() => {
          this.toastr.success(MensagemEnum.DADOS_ATUALIZADO.replace('VALUE', 'Professor'));
          this.router.navigate(['/private/dashboard']);
        });
      } else {
        this.professorService.addProfessor(nProfessor).subscribe(() => {
          this.toastr.success(MensagemEnum.PROFESSOR_CADASTRADO_COM_SUCESSO);
          this.router.navigate(['/private/dashboard']);
        });
      }
    } else {
      this.toastr.error(MensagemEnum.DADOS_INVALIDOS);
    }
  }

}
