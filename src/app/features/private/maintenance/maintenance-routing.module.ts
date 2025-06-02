import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { LayoutComponent } from 'src/app/layouts/layout.component';

const routes: Routes = [
	{ path: 'perfil', loadChildren: () => import('./perfiles/perfiles.module').then(m => m.PerfilesModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
