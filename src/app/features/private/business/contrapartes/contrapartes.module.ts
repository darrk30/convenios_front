import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContrapartesRoutingModule } from './contrapartes-routing.module';
import { ContrapartesListComponent } from './components/contrapartes-list/contrapartes-list.component';
import { ContrapartesFormModalComponent } from './components/contrapartes-form-modal/contrapartes-form-modal.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ContrapartesRoutingModule
  ]
})
export class ContrapartesModule { }
