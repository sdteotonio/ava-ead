import { ModuleWithProviders } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';

@NgModule()
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: []
    };
  }
}
