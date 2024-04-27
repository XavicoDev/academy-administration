import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstudianteRoutingModule } from './estudiante-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    EstudianteRoutingModule
  ]
})
export class EstudianteModule { }
