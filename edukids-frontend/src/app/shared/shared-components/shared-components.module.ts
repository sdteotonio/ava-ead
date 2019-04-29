import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class SharedComponentsModule { }
