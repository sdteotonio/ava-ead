import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { AppInterceptor } from './services/app-interceptor';
import { AuthService } from './services/auth.service';
import { FabricaModalService } from './services/fabrica-modal.service';
import { NegocioService } from './services/negocio.service';
import { UsuarioService } from './services/usuario.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AppInterceptor
    }
  ]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        FabricaModalService,
        UsuarioService,
        NegocioService
      ]
    };
  }
}
