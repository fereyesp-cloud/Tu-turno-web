import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-login',
  imports: [RouterLink, NgIf, FormsModule, Navbar],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

    

  username: string = '';
  contrasena: string = '';
  verContrasena: boolean = false;
  errorUsuario: string = '';
  errorContrasena: string = '';
  mensajeError: string = '';

  constructor(private router: Router) {}

  toggleVerContrasena() {
    this.verContrasena = !this.verContrasena;
  }

  ingresar() {
    let valido = true;

    if (!this.username) {
      this.errorUsuario = 'El usuario es obligatorio';
      valido = false;
    } else {
      this.errorUsuario = '';
    }

    if (!this.contrasena) {
      this.errorContrasena = 'La contraseña es obligatoria';
      valido = false;
    } else {
      this.errorContrasena = '';
    }

    if (valido) {
      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const usuarioEncontrado = usuarios.find((u: any) =>
        u.nombreUsuario === this.username && u.contrasena === this.contrasena
      );

      if (usuarioEncontrado) {
        sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarioEncontrado));
        if (usuarioEncontrado.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    }
  }

  
}