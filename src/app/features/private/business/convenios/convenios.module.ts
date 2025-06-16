import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConveniosRoutingModule } from './convenios-routing.module';
import { ConveniosFormComponent } from './components/convenios-form/convenios-form.component';
import { ConveniosFormModalComponent } from './components/convenios-form-modal/convenios-form-modal.component';
import { ConveniosListComponent } from './components/convenios-list/convenios-list.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ConveniosRoutingModule
  ]
})
export class ConveniosModule { }
