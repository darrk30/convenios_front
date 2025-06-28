import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConveniosListComponent } from './components/convenios-list/convenios-list.component';
import { ConveniosFormComponent } from './components/convenios-form/convenios-form.component';
import { AdminGuard } from '@/app/core/guards/admin-guard';

const routes: Routes = [
    { 
      path: "", 
      component: ConveniosListComponent,
      canActivate: [AdminGuard] 
    },
    { 
      path: "crear", 
      component: ConveniosFormComponent , 
      data: { title: 'CONVENIO - REGISTRAR', flagAction: 1 },
      canActivate: [AdminGuard] 
    },
    { 
      path: "editar/:id", 
      component: ConveniosFormComponent , 
      data: { title: 'CONVENIO - EDITAR', flagAction: 2 },
      canActivate: [AdminGuard]  
    },
    { 
      path: "ver/:id", 
      component: ConveniosFormComponent , 
      data: { title: 'CONVENIO - VER', flagAction: 3 },
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConveniosRoutingModule { }
