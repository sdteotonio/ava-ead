import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { TipoUsuarioEnum } from 'src/app/shared/shared-models/enum/tipo-usuario.enum';
import { UsuarioModel } from 'src/app/shared/shared-models/interface/usuario.model';
import { AlunoModel } from '../../models/aluno.model';
import { ProfessorModel } from '../../models/professor.model';
import { ManterProfessorService } from '../../services/manter-professor.service';
import { ManterAlunoService } from '../../services/manter-aluno.service';
import { TurmaModel } from '../../models/turma.model';
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
        break;
      case TipoUsuarioEnum.PROFESSOR:
        this.carregarAlunos();
        this.carregarTurmas();
        break;
    }
  }

  carregarTurmas() {
    this.listaTurmas = this.manterTurma.listarTurmasByProfessor(0);
  }

  carregarAlunos() {
    this.listaAlunos = this.manterAluno.listarAlunoes();
  }

  carregarProfessores() {
    this.listaProfessor = this.manterProfessorService.listarProfessores();
  }


  cadastrarProfessor() {
    this.router.navigate(['private/manter-professor']);
  }
  cadastrarAluno() {
    this.router.navigate(['private/manter-aluno']);
  }

}
