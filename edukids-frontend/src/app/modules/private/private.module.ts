import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { PrivateRoutingModule } from './private-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CadastroProfessorComponent } from './components/cadastro-professor/cadastro-professor.component';
import { ItensAdminComponent } from './components/itens-admin/itens-admin.component';


@NgModule({
  declarations: [DashboardComponent,
    CadastroProfessorComponent,
    ItensAdminComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedComponentsModule
  ]
})
export class PrivateModule { }
