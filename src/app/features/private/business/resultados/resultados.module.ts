import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultadosRoutingModule } from './resultados-routing.module';
import { ResultadosFormModalComponent } from './components/resultados-form-modal/resultados-form-modal.component';
import { ResultadosListComponent } from './components/resultados-list/resultados-list.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ResultadosRoutingModule
  ]
})
export class ResultadosModule { }
