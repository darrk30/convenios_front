import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvaluacionesAnualesPlanesTrabajosRoutingModule } from './evaluaciones-anuales-planes-trabajos-routing.module';
import { EvaluacionesAnualesPlanesTrabajosListComponent } from './components/evaluaciones-anuales-planes-trabajos-list/evaluaciones-anuales-planes-trabajos-list.component';
import { EvaluacionesAnualesPlanesTrabajosFormModalComponent } from './components/evaluaciones-anuales-planes-trabajos-form-modal/evaluaciones-anuales-planes-trabajos-form-modal.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EvaluacionesAnualesPlanesTrabajosRoutingModule
  ]
})
export class EvaluacionesAnualesPlanesTrabajosModule { }
