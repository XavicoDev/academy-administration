import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../../services/course.service';
import { Course } from '../../../../general/data.model';
import { AdministrarComponent } from '../administrar/administrar.component';

@Component({
  selector: 'app-lista-cursos',
  standalone: true,
  imports: [HttpClientModule, AdministrarComponent],
  templateUrl: './lista-cursos.component.html',
  styleUrl: './lista-cursos.component.css',
  providers: [CourseService]
})
export class ListaCursosComponent implements OnInit {

  courses: Course[] = [];
  courseSelect!: Course;
  view: string = '';

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data.data;
    });
  }

  administratorEnrollment(course: Course){
    this.courseSelect = course;
    this.view = 'administrator';
  }

  handleNameChange(action: string) {
    this.view = action;
  }

}
