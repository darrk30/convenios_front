import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionesAnualesRoutingModule } from './evaluaciones-anuales-routing.module';
import { EvaluacionesAnualesListComponent } from './components/evaluaciones-anuales-list/evaluaciones-anuales-list.component';
import { EvaluacionesAnualesFormModalComponent } from './components/evaluaciones-anuales-form-modal/evaluaciones-anuales-form-modal.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EvaluacionesAnualesRoutingModule
  ]
})
export class EvaluacionesAnualesModule { }
