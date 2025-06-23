import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InstitucionesListComponent } from './components/instituciones-list/instituciones-list.component';
import { InstitucionesFormComponent } from './components/instituciones-form/instituciones-form.component';

const routes: Routes = [
    { path: "", component: InstitucionesListComponent },
    { path: "crear", component: InstitucionesFormComponent , data: { title: 'INSTITUCIÓN - REGISTRAR', flagAction: 1 } },
    { path: "editar/:id", component: InstitucionesFormComponent , data: { title: 'INSTITUCIÓN - EDITAR', flagAction: 2 } },
    { path: "ver/:id", component: InstitucionesFormComponent , data: { title: 'INSTITUCIÓN - VER', flagAction: 3 } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InstitucionesRoutingModule { }
