import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

interface Usuario {
  email: string;
  password: string;

}

@Component({
  selector: 'app-login-alumno',
  templateUrl: './login-alumno.component.html',
  styleUrls: ['./login-alumno.component.css']
})
export class LoginAlumnoComponent {



  usuarios: Usuario[] = [
    { email: 'Overman', password: 'Morales1509*' },
    { email: 'Jhon', password: '12345' },
    { email: 'pedro', password: '12345' },
    { email: 'yosli', password: '12345' },
    { email: 'jose', password: '12345' },

    { email: 'yesica', password: '12345' },
    { email: 'Miguel', password: '12345' },
    { email: 'ericka', password: '12345' },
    { email: 'procila', password: '12345' },
    { email: 'viviana', password: '12345' },

    { email: 'emilio', password: '12345' },
    { email: 'carina', password: '12345' },
    { email: 'mariana', password: '12345' },
    { email: 'maria', password: '12345' },

    { email: 'laura', password: '12345' },
    { email: 'magali', password: '12345' },
    { email: 'jose', password: '12345' },
    { email: 'luis', password: '12345' },
    { email: 'alejandra', password: '12345' },
    { email: 'yeremi', password: '12345' },
    { email: 'samir', password: '12345' },
    { email: 'lusai', password: '12345' },




  ];

  constructor(private route: Router) { }

  user: string = "";
  pas: string = "";



  alumn() {

    const usuarioValido = this.usuarios.find(usuario => usuario.email === this.user && usuario.password === this.pas);

    if (usuarioValido) {
      this.route.navigate(['/panel-alumno', { nombre: usuarioValido.email }]);

      Swal.fire(
        'Bienvenido alumno',
        `Alumno: ${usuarioValido.email}`,
        'success'
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Usuario o contraseña no son validos '
      });
    }
  }
}
