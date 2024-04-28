import { Component, Input, OnInit, output } from '@angular/core';
import { Course, Student } from '../../../../general/data.model';
import { StudentService } from '../../../../services/student.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-cursos-matriculados',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './cursos-matriculados.component.html',
  styleUrl: './cursos-matriculados.component.css',
  providers: [StudentService],
})
export class CursosMatriculadosComponent implements OnInit {
  onNameChange = output<string>();
  @Input({ required: true }) student!: Student;

  courses: Course[] = [];

  constructor(
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.student.id) {
      this.studentService.getCoursesOfStudent(this.student.id).subscribe(data => {
        this.courses = data.data;
      });
    }
  }

  change(action: string) {
    this.onNameChange.emit(action);
  }

}
