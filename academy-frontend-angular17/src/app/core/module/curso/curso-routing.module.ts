import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NuevoComponent } from './nuevo/nuevo.component';
import { ListaComponent } from './lista/lista.component';


const routes: Routes = [
  { path: '',   redirectTo: '/admin/curso/lista', pathMatch: 'full' },
  {     
    path: 'lista', component: ListaComponent,
  },
  { 
    path: 'crear', component: NuevoComponent,
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursoRoutingModule { }
