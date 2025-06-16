import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EvaluacionesAnualesListComponent } from './components/evaluaciones-anuales-list/evaluaciones-anuales-list.component';

const routes: Routes = [
	{ path: "", component: EvaluacionesAnualesListComponent },
	// { path: "crear", component: EvaluacionesAnualesFormComponent , data: { title: 'CONVENIO - REGISTRAR', flagAction: 1 } },
	// { path: "editar/:id", component: EvaluacionesAnualesFormComponent , data: { title: 'CONVENIO - EDITAR', flagAction: 2 } },
	// { path: "ver/:id", component: EvaluacionesAnualesFormComponent , data: { title: 'CONVENIO - VER', flagAction: 3 } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvaluacionesAnualesRoutingModule { }
