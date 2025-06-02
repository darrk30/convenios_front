import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilesFormComponent } from './components/perfiles-form/perfiles-form.component';
import { PerfilesListComponent } from './components/perfiles-list/perfiles-list.component';

const routes: Routes = [
	{ path: "", component: PerfilesListComponent },
	{ path: "crear", component: PerfilesFormComponent , data: { title: 'PERFIL - REGISTRAR', flagAction: 1 } },
	{ path: "editar/:id", component: PerfilesFormComponent , data: { title: 'PERFIL - EDITAR', flagAction: 2 } },
	{ path: "ver/:id", component: PerfilesFormComponent , data: { title: 'PERFIL - VER', flagAction: 3 } },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PerfilesRoutingModule { }
