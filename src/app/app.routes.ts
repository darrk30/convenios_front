import { Routes } from '@angular/router';
import { TablaConveniosComponent } from './components/tabla/tabla-convenios/tabla-convenios.component';
import { RegistroConvenioComponent } from './components/registro-convenio/registro-convenio.component';

export const routes: Routes = [
  {
    path: '',
    component: TablaConveniosComponent,
    title: 'Convenios'
  },
  {
    path: 'registro-convenio',
    component: RegistroConvenioComponent,
    title: 'Registro de Convenios'
  }
];
