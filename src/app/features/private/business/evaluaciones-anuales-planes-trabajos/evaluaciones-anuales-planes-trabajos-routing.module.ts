import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionesAnualesPlanesTrabajosListComponent } from './components/evaluaciones-anuales-planes-trabajos-list/evaluaciones-anuales-planes-trabajos-list.component';

const routes: Routes = [
	{ path: "", component: EvaluacionesAnualesPlanesTrabajosListComponent },
	// { path: "crear", component: EvaluacionesAnualesFormComponent , data: { title: 'CONVENIO - REGISTRAR', flagAction: 1 } },
	// { path: "editar/:id", component: EvaluacionesAnualesFormComponent , data: { title: 'CONVENIO - EDITAR', flagAction: 2 } },
	// { path: "ver/:id", component: EvaluacionesAnualesFormComponent , data: { title: 'CONVENIO - VER', flagAction: 3 } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionesAnualesPlanesTrabajosRoutingModule { }
