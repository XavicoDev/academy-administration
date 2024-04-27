import { Component, Input, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CourseService } from '../../../../services/course.service';
import { Course } from '../../../../general/data.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css'
})
export class EditarComponent implements OnInit {
  onNameChange = output<string>();
  @Input({ required: true }) course!: Course;
  courseForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: [this.course.name || '', Validators.required],
      schedule: [this.course.schedule || '', Validators.required],
      start_date: [this.course.start_date || '', Validators.required],
      end_date: [this.course.end_date || '', Validators.required],
      type: [this.course.type || '', Validators.required]
    });
  }

  change(action: string) {
    this.onNameChange.emit(action);
  }

  submitForm() {
    const formData: Course = this.courseForm.value;
    if(this.course.id){
      this.courseService.updateCourse(this.course.id,formData).subscribe({
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

}
