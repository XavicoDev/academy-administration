import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { StudentService } from '../../../../services/student.service';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { Student } from '../../../../general/data.model';
import { Router } from '@angular/router';

@Component({
	selector: 'app-lista',
	standalone: true,
	imports: [HttpClientModule, DecimalPipe],
	providers: [StudentService],
	templateUrl: './lista.component.html',
	styleUrl: './lista.component.css'
})
export class ListaComponent implements OnInit {

	students: Student[] = [];

	constructor(
		private studentService: StudentService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.studentService.getUsers().subscribe(data => {
			this.students=data.data;
		});
	}

	navigateToCreateStudentRoute() {
		const otherRoute = '/admin/estudiante/crear';
		this.router.navigate([otherRoute]);
	}

}
