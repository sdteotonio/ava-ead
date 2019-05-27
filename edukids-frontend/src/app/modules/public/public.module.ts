import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { LoginComponent } from './components/login/login.component';
import { PaginaInicialComponent } from './components/pagina-inicial/pagina-inicial.component';
import { PublicRoutingModule } from './public-routing.module';


@NgModule({
  declarations: [LoginComponent, PaginaInicialComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedComponentsModule
  ]
})
export class PublicModule { }
