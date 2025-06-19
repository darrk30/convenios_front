import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TiposConveniosRoutingModule } from './tipos-convenios-routing.module';
import { TiposConveniosListComponent } from './components/tipos-convenios-list/tipos-convenios-list.component';
import { TiposConveniosFormModalComponent } from './components/tipos-convenios-form-modal/tipos-convenios-form-modal.component';


@NgModule({
  declarations: [
    TiposConveniosListComponent,
    TiposConveniosFormModalComponent
  ],
  imports: [
    CommonModule,
    TiposConveniosRoutingModule
  ]
})
export class TiposConveniosModule { }
