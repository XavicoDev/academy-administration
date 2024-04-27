import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ListaComponent } from './lista/lista.component';

const routes: Routes = [
  { path: '',   redirectTo: '/admin/estudiante/lista', pathMatch: 'full' },
  {     
    path: 'lista', component: ListaComponent,
  },
  { 
    path: 'crear', component: NuevoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
