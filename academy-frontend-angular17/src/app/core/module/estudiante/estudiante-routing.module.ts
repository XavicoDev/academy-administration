import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NuevoComponent } from './nuevo/nuevo.component';

const routes: Routes = [
  { path: '', component: NuevoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstudianteRoutingModule { }
