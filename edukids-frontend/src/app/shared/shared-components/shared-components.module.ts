import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NgxSelectModule } from 'ngx-select-ex';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SharedPipesModule } from '../shared-pipes/shared-pipes.module';
import { CardFormularioComponent } from './components/card-formulario/card-formulario.component';
import { CardItensAdminComponent } from './components/card-itens-admin/card-itens-admin.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalAddAlunoTurmaComponent } from './components/modal-add-aluno-turma/modal-add-aluno-turma.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ModalAddConteudoComponent } from './components/modal-add-conteudo/modal-add-conteudo.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardItensAdminComponent,
    CardFormularioComponent,
    ModalDialogComponent,
    ModalAddAlunoTurmaComponent,
    ModalAddConteudoComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    NgxSelectModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedPipesModule
  ],
  exports: [
    HeaderComponent,
    NgxSelectModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    CardItensAdminComponent,
    BsDropdownModule,
    CardFormularioComponent,
    ModalDialogComponent,
    ModalAddAlunoTurmaComponent,
    ModalAddConteudoComponent
  ],
  entryComponents: [ModalDialogComponent, ModalAddAlunoTurmaComponent, ModalAddConteudoComponent]
})
export class SharedComponentsModule { }
