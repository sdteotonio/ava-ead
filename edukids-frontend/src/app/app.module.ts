import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PrivateModule } from './modules/private/private.module';
import { PublicModule } from './modules/public/public.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    PublicModule,
    PrivateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
