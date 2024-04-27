import { Component, Input, OnInit, input, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { Router } from '@angular/router';
import { Student } from '../../../../general/data.model';
import { StudentService } from '../../../../services/student.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SweetAlert2Module],
  providers: [StudentService],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  onNameChange = output<string>();
  @Input({ required: true }) student!: Student;
  // student = input<Student>();
  studentForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {

    this.studentForm = this.fb.group({
      first_name: [this.student.first_name || ''],
      last_name: [this.student.last_name || ''],
      age: [this.student.age || ''],
      ci: [this.student.ci || '']
    });
  }

  submitForm() {
    const formData: Student = this.studentForm.value;
    if(this.student.id){
      this.studentService.updateUser(this.student.id,formData).subscribe({
        next: (response) => {
          if (response.status == 200) {
            Swal.fire({
              title: 'Respuesta del servidor',
              text: '¡Estudiante actualizado con éxito!',
              icon: 'success'
            }).then((result) => {
              this.change('reload');
            });
          }
          else {
            console.log(response);
            Swal.fire({
              title: 'Respuesta del servidor',
              text: response.message,
              icon: 'error'
            });
          }
        },
        error: (error) => {
          Swal.fire({
            title: 'Error',
            text: error,
            icon: 'error'
          });
        }
      });
    }
  }

  change(action: string) {
    this.onNameChange.emit(action);
  }

}
