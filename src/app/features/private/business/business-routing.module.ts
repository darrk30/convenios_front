import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: 'convenio', loadChildren: () => import('./convenios/convenios.module').then(m => m.ConveniosModule) },
	{ path: 'evaluacion-anual', loadChildren: () => import('./evaluaciones-anuales/evaluaciones-anuales.module').then(m => m.EvaluacionesAnualesModule) },
	{ path: 'evaluacion-anual-plan-trabajo', loadChildren: () => import('./evaluaciones-anuales-planes-trabajos/evaluaciones-anuales-planes-trabajos.module').then(m => m.EvaluacionesAnualesPlanesTrabajosModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusinessRoutingModule { }
