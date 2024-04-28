import { Component, Input, OnInit, output } from '@angular/core';
import { Course, Student } from '../../../../general/data.model';
import { DecimalPipe } from '@angular/common';
import { CourseService } from '../../../../services/course.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-administrar',
  standalone: true,
  imports: [HttpClientModule, DecimalPipe],
  templateUrl: './administrar.component.html',
  styleUrl: './administrar.component.css',
  providers: [CourseService]
})
export class AdministrarComponent implements OnInit {
  onNameChange = output<string>();
  @Input({ required: true }) course!: Course;

  enrolledStudents: Student[] = [];

  unenrolledStudents: Student[] = [];

  constructor(
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    if (this.course.id) {
      this.courseService.getStudentsOfCourse(this.course.id).subscribe(data => {
        this.enrolledStudents = data.enrolled_students;
        this.unenrolledStudents = data.unenrolled_students;
      });
    }
  }

  enroll(students: Student){

  }
  
  deregister(students: Student){

  }

  change(action: string) {
    this.onNameChange.emit(action);
  }

}
