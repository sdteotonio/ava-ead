import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItensAdminComponent } from './components/itens-admin/itens-admin.component';
import { PrivateRoutingModule } from './private-routing.module';
import { ManterAlunoService } from './services/manter-aluno.service';
import { ManterProfessorService } from './services/manter-professor.service';
import { AreaAlunoComponent } from './components/area-aluno/area-aluno.component';
import { CadastrarTurmaComponent } from './components/cadastrar-turma/cadastrar-turma.component';


@NgModule({
  declarations: [DashboardComponent,
    CadastroProfessorComponent,
    ItensAdminComponent,
    CadastroAlunoComponent,
    AreaAlunoComponent,
    CadastrarTurmaComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedComponentsModule
  ],
  providers: [
    ManterProfessorService,
    ManterAlunoService
  ]
})
export class PrivateModule { }
