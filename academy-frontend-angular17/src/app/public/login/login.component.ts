import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  credentials = {
    email: 'admin@example.com',
    password: 'password123'
  };
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  login() {
    this.authService.login(this.credentials).subscribe(
      response => {
        this.authService.saveToken(response.access_token);
        this.router.navigate(['/admin']);
      },
      error => {
        // Maneja el error de autenticación
      }
    );
  }
  registrar() {

  }

}
