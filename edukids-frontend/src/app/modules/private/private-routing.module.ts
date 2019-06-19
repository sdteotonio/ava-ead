import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaAlunoComponent } from './components/area-aluno/area-aluno.component';
import { AreaCursoComponent } from './components/area-curso/area-curso.component';
import { CadastrarTurmaComponent } from './components/cadastrar-turma/cadastrar-turma.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItensAdminComponent } from './components/itens-admin/itens-admin.component';
import { PrivateGuard } from './guards/private-guard.service';

const routes: Routes = [
  {
    path: 'private',
    component: DashboardComponent,
    children: [
      {
        path: 'dashboard',
        component: ItensAdminComponent
      }
      , {
        path: 'manter-professor',
        component: CadastroProfessorComponent
      }
      , {
        path: 'manter-professor/:id',
        component: CadastroProfessorComponent
      }
      , {
        path: 'manter-aluno',
        component: CadastroAlunoComponent
      }
      , {
        path: 'manter-aluno/:id',
        component: CadastroAlunoComponent
      }
      , {
        path: 'manter-turma',
        component: CadastrarTurmaComponent
      }
    ],
    canActivate: [PrivateGuard]
  },
  {
    path: 'area-aluno',
    component: AreaAlunoComponent,
    canActivate: [PrivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
