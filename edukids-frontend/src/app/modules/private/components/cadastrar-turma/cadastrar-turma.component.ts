import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSelectOption } from 'ngx-select-ex';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { AlunoModel } from '../../models/aluno.model';
import { ProfessorModel } from '../../models/professor.model';
import { TurmaModel } from '../../models/turma.model';
import { ManterAlunoService } from '../../services/manter-aluno.service';
import { ManterProfessorService } from '../../services/manter-professor.service';
import { ManterTurmaService } from '../../services/manter-turma.service';

@Component({
  selector: 'app-cadastrar-turma',
  templateUrl: './cadastrar-turma.component.html',
  styleUrls: ['./cadastrar-turma.component.css']
})
export class CadastrarTurmaComponent implements OnInit {

  formCadastro: FormGroup;
  listaProfessores: Partial<ProfessorModel[]>;
  listaAlunos: AlunoModel[];

  constructor(
    private formBuidler: FormBuilder,
    private turmaService: ManterTurmaService,
    private professorService: ManterProfessorService,
    private alunoService: ManterAlunoService,
    private auth: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit() {

    const userLogado = this.auth.getUsuarioLogado<ProfessorModel>();
    this.formCadastro = this.formBuidler.group({
      nome: [null, [Validators.required]],
      professorId: [
        {
          value: userLogado.tipo === TipoUsuarioEnum.PROFESSOR ? userLogado.id : null,
          disabled: userLogado.tipo === TipoUsuarioEnum.PROFESSOR
        }, [Validators.required]],
      alunos: [[]],
      dataInicio: [null, [Validators.required]],
      dataFim: [null, [Validators.required]]
    });
    if (userLogado.tipo === TipoUsuarioEnum.ADMIN) {
      this.carregarProfessores();
    } else {
      this.listaProfessores = [
        userLogado
      ];
    }

    this.carregarAlunos();
  }
  carregarAlunos() {
    this.alunoService.listarAlunoes().subscribe(alunos => this.listaAlunos = alunos);
  }

  carregarProfessores() {
    this.professorService.listarProfessores().subscribe(lista => this.listaProfessores = lista);
  }


  gravar() {
    if (this.formCadastro.valid) {
      const nAluno: TurmaModel = this.formCadastro.getRawValue();
      this.turmaService.addTurma(nAluno).subscribe(() => {
        this.toastr.success(MensagemEnum.ALUNO_CADASTRADO_COM_SUCESSO);
        this.router.navigate(['/private/dashboard']);
      });
    } else {
      this.toastr.error(MensagemEnum.DADOS_INVALIDOS);
    }
  }

  addAluno(selecionados: NgxSelectOption[]) {
    this.formCadastro.get('alunos').setValue(
      selecionados.map(item => item.data.id)
    );
  }

  selecionarPeriodo(evt: Date[]) {
    this.formCadastro.get('dataInicio').setValue(evt[0].getTime());
    this.formCadastro.get('dataFim').setValue(evt[1].getTime());
  }

}
