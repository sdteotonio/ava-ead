import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AreaAlunoComponent } from './components/area-aluno/area-aluno.component';
import { CadastrarTurmaComponent } from './components/cadastrar-turma/cadastrar-turma.component';
import { CadastroAlunoComponent } from './components/cadastro-aluno/cadastro-aluno.component';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ItensAdminComponent } from './components/itens-admin/itens-admin.component';

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
    ]
  },
  {
    path: 'area-aluno',
    component: AreaAlunoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
