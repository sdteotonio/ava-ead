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
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalAddAlunoTurmaComponent } from './components/modal-add-aluno-turma/modal-add-aluno-turma.component';
import { ModalAddConteudoComponent } from './components/modal-add-conteudo/modal-add-conteudo.component';
import { ModalDialogComponent } from './components/modal-dialog/modal-dialog.component';
import { ModalForumComponent } from './components/modal-forum/modal-forum.component';
import { ModalSelecionarTurmaComponent } from './components/modal-selecionar-turma/modal-selecionar-turma.component';
import { ModalVideoComponent } from './components/modal-video/modal-video.component';

@NgModule({
  declarations: [
    HeaderComponent,
    CardItensAdminComponent,
    CardFormularioComponent,
    ModalDialogComponent,
    ModalAddAlunoTurmaComponent,
    ModalAddConteudoComponent,
    ModalSelecionarTurmaComponent,
    ModalVideoComponent,
    FooterComponent,
    ModalForumComponent
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
    ModalAddConteudoComponent,
    ModalSelecionarTurmaComponent,
    ModalVideoComponent,
    FooterComponent
  ],
  entryComponents: [ModalDialogComponent,
    ModalAddAlunoTurmaComponent,
    ModalAddConteudoComponent,
    ModalSelecionarTurmaComponent,
    ModalVideoComponent,
    ModalForumComponent
  ],

})
export class SharedComponentsModule { }
