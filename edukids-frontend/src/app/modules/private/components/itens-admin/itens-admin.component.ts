import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { FabricaModalService } from 'src/app/core/services/fabrica-modal.service';
import { MensagemEnum } from 'src/app/shared/shared-models/enum/mensagem.enum';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';
import { AlunoModel } from '../../models/aluno.model';
import { ProfessorModel } from '../../models/professor.model';
import { TurmaModel } from '../../models/turma.model';
import { ManterAlunoService } from '../../services/manter-aluno.service';
import { ManterProfessorService } from '../../services/manter-professor.service';
import { ManterTurmaService } from '../../services/manter-turma.service';

@Component({
  selector: 'app-itens-admin',
  templateUrl: './itens-admin.component.html',
  styleUrls: ['./itens-admin.component.css']
})
export class ItensAdminComponent implements OnInit {
  listaProfessor: Observable<ProfessorModel[]>;
  listaAlunos: Observable<AlunoModel[]>;
  listaTurmas: Observable<TurmaModel[]>;
  usuarioLogado: UsuarioModel;
  tipoUsuarioEnum = TipoUsuarioEnum;

  constructor(
    private router: Router,
    private authService: AuthService,
    private manterProfessorService: ManterProfessorService,
    private manterAluno: ManterAlunoService,
    private manterTurma: ManterTurmaService,
    private fabricaModalService: FabricaModalService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.recuperarUsuario();
    this.definirCarregamento();
  }

  recuperarUsuario() {
    this.usuarioLogado = this.authService.getUsuarioLogado<UsuarioModel>();
  }

  definirCarregamento() {
    switch (this.usuarioLogado.tipo) {
      case TipoUsuarioEnum.ADMIN:
        this.carregarProfessores();
        this.carregarAlunos();
        this.carregarTurmas();
        break;
      case TipoUsuarioEnum.PROFESSOR:
        this.carregarAlunos();
        this.carregarTurmas();
        break;
    }
  }

  carregarTurmas() {
    this.listaTurmas = this.usuarioLogado.tipo === TipoUsuarioEnum.ADMIN ? this.manterTurma.listarTurmas() :
      this.manterTurma.listarTurmasByProfessor(this.usuarioLogado.id);
  }

  carregarAlunos() {
    this.listaAlunos = this.manterAluno.listarAlunoes();
  }

  carregarProfessores() {
    this.listaProfessor = this.manterProfessorService.listarProfessores();
  }


  cadastrarProfessor(id?: number) {
    id ? this.router.navigate(['private/manter-professor/' + id]) : this.router.navigate(['private/manter-professor']);
  }
  cadastrarAluno(id?: number) {
    id ? this.router.navigate(['private/manter-aluno/' + id]) : this.router.navigate(['private/manter-aluno']);
  }

  cadastrarTurma() {
    this.router.navigate(['private/manter-turma']);
  }


  removerProfessor(id: number) {
    this.fabricaModalService.modalConfirm(MensagemEnum.CONFIRMAR_EXLCUIR.replace('VALUE', 'professor')).subscribe(
      () => {
        this.manterProfessorService.removerProfessor(id).subscribe(() => {
          this.toastr.success(MensagemEnum.DADOS_REMOVIDOS);
          this.carregarProfessores();
        });
      }
    );
  }

  removerAluno(id: number) {
    this.fabricaModalService.modalConfirm(MensagemEnum.CONFIRMAR_EXLCUIR.replace('VALUE', 'aluno')).subscribe(
      () => {
        this.manterAluno.removerAluno(id).subscribe(() => {
          this.toastr.success(MensagemEnum.DADOS_REMOVIDOS);
          this.carregarAlunos();
        });
      }
    );
  }

  addAlunoturma(turma: TurmaModel) {
    this.fabricaModalService.modalAddAlunoTurma(turma).subscribe(() => {
      this.carregarTurmas();
    });
  }

}
