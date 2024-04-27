import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../../../services/course.service';
import { Course } from '../../../../general/data.model';
import Swal from 'sweetalert2';
import { faker } from '@faker-js/faker';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SweetAlert2Module],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css',
  providers:[CourseService]
})
export class NuevoComponent implements OnInit {
  courseForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private courseService: CourseService
  ) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      schedule: ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  submitForm() {
    const formData: Course = this.courseForm.value;
    this.courseService.createCourse(formData).subscribe({
      next: (response) => {
        if (response.status == 201) {
          Swal.fire({
            title: 'Respuesta del servidor',
            text: '¡Curso registrado con éxito!',
            icon: 'success'
          }).then((result) => {
            this.navigateToListCourseRoute();
          });
        } else {
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

  generateRandomValues() {
    this.courseForm.patchValue({
      name: faker.lorem.words(),
      schedule: faker.lorem.words(),
      start_date: faker.date.future().toISOString().split('T')[0],
      end_date: faker.date.future().toISOString().split('T')[0],
      type: faker.datatype.boolean()?'Presencial':'Virtual'
    });
  }

  navigateToListCourseRoute() {
    const otherRoute = '/admin/curso/lista';
    this.router.navigate([otherRoute]);
  }

}
