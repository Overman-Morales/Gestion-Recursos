// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  // Lista de usuarios con sus credenciales
  users = [
    { email: "admin", password: "12345" },
    { email: "auxiliar", password: "auxiliar" },
    { email: "invitado", password: "12345" },
    { email: "gerente", password: "12345" },
    { email: "emilio", password: "12345" },
    { email: "mariana", password: "12345" },
    { email: "cristina", password: "12345" },

  ];

  constructor(private router: Router) {}

  user: string = "";
  pas: string = "";

  admin() {
    console.log('Usuario:', this.user);
    console.log('Contraseña:', this.pas);

    // Busca el usuario en la lista
    const foundUser = this.users.find(u => u.email === this.user && u.password === this.pas);

    if (foundUser) {
      // Usuario y contraseña correctos, redirige al componente de administrador
      this.router.navigate(['/admin']);
      Swal.fire(
        'Bienvenido administrador',
        `Usuario: ${foundUser.email}`,
        'success'
      );
    } else {
      // Usuario o contraseña incorrectos, muestra un mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña incorrectos'
      });
      // Puedes limpiar el campo de contraseña si deseas
      this.pas = "";
    }
  }
}
