import { Component, Input, OnInit, output } from '@angular/core';
import { Course, Student } from '../../../../general/data.model';
import { DecimalPipe } from '@angular/common';
import { CourseService } from '../../../../services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { StudentService } from '../../../../services/student.service';

@Component({
  selector: 'app-administrar',
  standalone: true,
  imports: [HttpClientModule, DecimalPipe],
  templateUrl: './administrar.component.html',
  styleUrl: './administrar.component.css',
  providers: [CourseService,StudentService]
})
export class AdministrarComponent implements OnInit {
  onNameChange = output<string>();
  @Input({ required: true }) course!: Course;

  enrolledStudents: Student[] = [];

  unenrolledStudents: Student[] = [];

  constructor(
    private courseService: CourseService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.course.id) {
      this.courseService.getStudentsOfCourse(this.course.id).subscribe(data => {
        this.enrolledStudents = data.enrolled_students;
        this.unenrolledStudents = data.unenrolled_students;
      });
    }
  }

  enroll(student: Student) {
    if (this.course.id && student.id) {
      this.studentService.enrollStudentInCourse(this.course.id, student.id).subscribe(data => {
        this.loadData();
      });
    }
  }

  deregister(student: Student) {
    if (this.course.id && student.id) {
      this.studentService.unenrollStudentInCourse(this.course.id, student.id).subscribe(data => {
        this.loadData();
      });
    }

  }

  change(action: string) {
    this.onNameChange.emit(action);
  }

}
