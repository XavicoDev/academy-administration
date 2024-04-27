import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { StudentService } from '../../../../services/student.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Student } from '../../../../general/data.model';
import { Router } from '@angular/router';
import { NuevoComponent } from '../nuevo/nuevo.component';
import { EditarComponent } from '../editar/editar.component';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-lista',
	standalone: true,
	imports: [HttpClientModule, DecimalPipe, NuevoComponent, EditarComponent],
	providers: [StudentService],
	templateUrl: './lista.component.html',
	styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

	students: Student[] = [];
	studentSelect!: Student;
	view: string = '';

	constructor(
		private studentService: StudentService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.loadData();
	}

	loadData() {
		this.studentService.getUsers().subscribe(data => {
			this.students = data.data;
		});
	}

	navigateToEdit(student: Student) {
		this.studentSelect = student;
		this.view = 'edit';
	}

	deleteStudent(student: Student) {
		if (student.id) {
			Swal.fire({
				title: '¿Estás seguro?',
				text: '¿Quieres eliminar al estudiante ' + student.first_name + ' ' + student.last_name + '?',
				icon: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Sí, ¡hazlo!',
				cancelButtonText: 'Cancelar'
			}).then((result) => {
				if (result.isConfirmed) {
					this.actionDelete(student.id)
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
		this.studentService.deleteUser(id).subscribe({
			next: (response) => {
				if (response.status == 200) {
					Swal.fire({
						title: 'Respuesta del servidor',
						text: '¡Estudiante eliminado con éxito!',
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


	navigateTo(url: string) {
		const otherRoute = '/admin/estudiante/' + url;
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

}
