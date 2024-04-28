import { Component, OnInit } from '@angular/core';
import { Course } from '../../../../general/data.model';
import { CourseService } from '../../../../services/course.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { NuevoComponent } from '../nuevo/nuevo.component';
import { EditarComponent } from '../editar/editar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [HttpClientModule, DecimalPipe, NuevoComponent, EditarComponent],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  providers: [CourseService]
})

export class ListaComponent implements OnInit {

  courses: Course[] = [];
  courseSelect!: Course;
  view: string = '';

  constructor(
    private courseService: CourseService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.courseService.getCourses().subscribe(data => {
      this.courses = data.data;
    });
  }

  navigateToCreate() {
    const otherRoute = '/admin/curso/crear';
    this.router.navigate([otherRoute]);
  }

  handleNameChange(action: string) {
    switch (action) {
      case 'list':
        this.view = '';
        break;
      case 'reload':
        this.loadData();
        this.view = '';
        break;
      case 'edit':
        this.view = action;
        break;
      default:
        break;
    }
  }

  navigateToEdit(course: Course) {
    this.courseSelect = course;
    this.view = 'edit';
  }

  deleteCourse(course: Course) {
    if (course.id) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres eliminar el curso ' + course.name + '?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, ¡hazlo!',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.actionDelete(course.id)
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'La acción ha sido cancelada.',
            'error'
          );
        }
      });
    }
    else {
      Swal.fire({
        title: 'Problema',
        text: 'No es posible identificar al estudiantes',
        icon: 'error'
      });
    }
  }

  actionDelete(id: any) {
		this.courseService.deleteCourse(id).subscribe({
			next: (response) => {
				if (response.status == 200) {
					Swal.fire({
						title: 'Respuesta del servidor',
						text: 'Curso eliminado con éxito!',
						icon: 'success'
					}).then((result) => {
						this.handleNameChange('reload');
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
