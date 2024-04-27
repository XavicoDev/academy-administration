import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CursoRoutingModule } from './curso-routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    CursoRoutingModule
  ]
})
export class CursoModule { }
