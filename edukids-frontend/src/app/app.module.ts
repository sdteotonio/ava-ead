import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { PrivateModule } from './modules/private/private.module';
import { PublicModule } from './modules/public/public.module';
import { SharedComponentsModule } from './shared/shared-components/shared-components.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ModalModule.forRoot(),
    HttpClientModule,
    CoreModule.forRoot(),
    SharedComponentsModule,
    AppRoutingModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      timeOut: 5000,
      positionClass: 'toast-top-right'
    }),
    PublicModule,
    PrivateModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
