import { Component, OnInit, output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../../../../general/data.model';
import { StudentService } from '../../../../services/student.service';
import { faker } from '@faker-js/faker';
import { SweetAlert2LoaderService, SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevo',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, SweetAlert2Module],
  providers: [StudentService],
  templateUrl: './nuevo.component.html',
  styleUrl: './nuevo.component.css'
})
export class NuevoComponent implements OnInit {
  onNameChange = output<string>();
  studentForm!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.studentForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      age: [''],
      ci: [''],
      email: ['']
    });
  }

  submitForm() {
    const formData: Student = this.studentForm.value;
    console.log(formData);
    this.studentService.createUser(formData).subscribe({
      next: (response) => {
        if (response.status == 201) {
          Swal.fire({
            title: 'Respuesta del servidor',
            text: '¡Estudiante registrado con éxito!',
            icon: 'success'
          }).then((result) => {
            this.change('reload');
          });
        }
        else {
          if (response.status == 400) {
            Swal.fire({
              title: response.data.message,
              text: response.data.errors,
              icon: 'error'
            });
          }
          else {
            Swal.fire({
              title: 'Respuesta del servidor',
              text: response.message,
              icon: 'error'
            });
          }
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
    this.studentForm.patchValue({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 65 }),
      ci: faker.number.int({ min: 1000000000, max: 9999999999 }),
      email: faker.internet.email()
    });
  }

  mostrarMensaje() {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }

  change(action: string) {
    this.onNameChange.emit(action);
  }
}
