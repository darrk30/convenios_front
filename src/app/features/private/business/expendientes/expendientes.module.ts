import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpendientesRoutingModule } from './expendientes-routing.module';
import { ExpedientesListComponent } from './components/expedientes-list/expedientes-list.component';
import { ExpedientesFormModalComponent } from './components/expedientes-form-modal/expedientes-form-modal.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ExpendientesRoutingModule
  ]
})
export class ExpendientesModule { }
