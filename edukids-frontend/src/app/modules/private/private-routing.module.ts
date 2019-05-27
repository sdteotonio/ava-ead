import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
