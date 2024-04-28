import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { SharedModule } from '../shared/shared.module';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CursoModule } from './module/curso/curso.module';
import { EstudianteModule } from './module/estudiante/estudiante.module';
import { EstadisticComponent } from './component/estadistic/estadistic.component';
import { StatisticsService } from '../services/statistics.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';



@NgModule({
  declarations: [DashboardComponent,
    EstadisticComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedModule,
    RouterOutlet,
    HttpClientModule,
    CursoModule,
    EstudianteModule,
  ],
  providers:[StatisticsService, AuthService]
})
export class CoreModule { }
