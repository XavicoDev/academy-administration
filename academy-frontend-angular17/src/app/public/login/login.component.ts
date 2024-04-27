import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = true;
  login = {
    email: '',
    contrasena: ''
  };
  constructor(private router: Router){}
  Logear() {
    this.router.navigate(['/admin']);
  }
  registrar() {

  }

}
