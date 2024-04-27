import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../general/data.model';
import { CourseService } from '../../../../services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  providers: [CourseService]
})

export class ListaComponent implements OnInit {

  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data.data;
    });
  }

  navigateToCreate() {
    const otherRoute = '/admin/curso/crear';
    this.router.navigate([otherRoute]);
  }
}
