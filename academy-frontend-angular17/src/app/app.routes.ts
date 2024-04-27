import { Routes } from '@angular/router';
import { NotfoundComponent } from './public/notfound/notfound.component';


export const routes: Routes = [
  {path:'',loadChildren: () => import('./public/public.module').then(m => m.PublicModule)},
  {path:'admin',loadChildren: () => import('./core/core.module').then(m => m.CoreModule)},
  {path:'**',component:NotfoundComponent}
];
