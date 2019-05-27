import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';

const routes: Routes = [
  {
    path: 'edukids',
    component: PaginaInicialComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
