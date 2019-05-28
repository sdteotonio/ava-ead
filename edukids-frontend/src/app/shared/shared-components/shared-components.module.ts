import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SharedPipesModule } from '../shared-pipes/shared-pipes.module';
import { CardFormularioComponent } from './components/card-formulario/card-formulario.component';
import { CardItensAdminComponent } from './components/card-itens-admin/card-itens-admin.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [HeaderComponent, CardItensAdminComponent, CardFormularioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedPipesModule
  ],
  exports: [
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    CardItensAdminComponent,
    BsDropdownModule,
    CardFormularioComponent
  ]
})
export class SharedComponentsModule { }
