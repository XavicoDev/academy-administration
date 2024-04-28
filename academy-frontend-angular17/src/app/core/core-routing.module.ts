import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EstadisticComponent } from './component/estadistic/estadistic.component';

const routes: Routes = [

  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: EstadisticComponent },
      { path: 'curso', loadChildren: () => import('./module/curso/curso.module').then(m => m.CursoModule) },
      { path: 'estudiante', loadChildren: () => import('./module/estudiante/estudiante.module').then(m => m.EstudianteModule) },
      { path: 'matricula', loadChildren: () => import('./module/matricula/matricula.module').then(m => m.MatriculaModule) },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
