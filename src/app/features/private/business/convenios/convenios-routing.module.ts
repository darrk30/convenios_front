import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConveniosListComponent } from './components/convenios-list/convenios-list.component';
import { ConveniosFormComponent } from './components/convenios-form/convenios-form.component';

const routes: Routes = [
    { path: "", component: ConveniosListComponent },
    { path: "crear", component: ConveniosFormComponent , data: { title: 'CONVENIO - REGISTRAR', flagAction: 1 } },
    { path: "editar/:id", component: ConveniosFormComponent , data: { title: 'CONVENIO - EDITAR', flagAction: 2 } },
    { path: "ver/:id", component: ConveniosFormComponent , data: { title: 'CONVENIO - VER', flagAction: 3 } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConveniosRoutingModule { }
