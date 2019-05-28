import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoUsuarioTradutorPipe } from './pipes/tipo-usuario-tradutor.pipe';

@NgModule({
  declarations: [TipoUsuarioTradutorPipe],
  imports: [
    CommonModule
  ],
  exports: [TipoUsuarioTradutorPipe]
})
export class SharedPipesModule { }
