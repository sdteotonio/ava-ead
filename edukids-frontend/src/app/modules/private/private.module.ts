import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PrivateRoutingModule } from './private-routing.module';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    SharedComponentsModule
  ]
})
export class PrivateModule { }
