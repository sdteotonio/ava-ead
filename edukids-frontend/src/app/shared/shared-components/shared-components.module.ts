import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { CardItensAdminComponent } from './components/card-itens-admin/card-itens-admin.component';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [HeaderComponent, CardItensAdminComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    ReactiveFormsModule,
    FormsModule,
    CardItensAdminComponent,
    BsDropdownModule
  ]
})
export class SharedComponentsModule { }
