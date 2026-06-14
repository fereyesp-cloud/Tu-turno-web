import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-registro',
  imports: [RouterLink, NgIf, NgFor, FormsModule, Navbar],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  nombre: string = '';
  nombreUsuario: string = '';
  correo: string = '';
  contrasena: string = '';
  confirmarContrasena: string = '';
  fechaNacimiento: string = '';
  direccion: string = '';
  detalle: string = '';
  ciudad: string = '';
  region: string = '';
  verContrasena: boolean = false;
  verConfirmar: boolean = false;

  errorNombre: string = '';
  errorNombreUsuario: string = '';
  errorCorreo: string = '';
  errorContrasena: string = '';
  errorConfirmarContrasena: string = '';
  errorFecha: string = '';
  mensajeExito: string = '';

  regiones = [
    { valor: '1', nombre: 'Región Metropolitana' },
    { valor: '2', nombre: 'Valparaíso' },
    { valor: '3', nombre: 'Biobío' }
  ];

  readonly formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  readonly formatoContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,18}$/;

  constructor(private router: Router) {}

  toggleVerContrasena() {
    this.verContrasena = !this.verContrasena;
  }

  toggleVerConfirmar() {
    this.verConfirmar = !this.verConfirmar;
  }

  registrarse() {
    let valido = true;

    // Validar nombre
    if (!this.nombre) {
      this.errorNombre = 'El nombre es obligatorio';
      valido = false;
    } else {
      this.errorNombre = '';
    }

    // Validar nombre de usuario
    if (!this.nombreUsuario) {
      this.errorNombreUsuario = 'El nombre de usuario es obligatorio';
      valido = false;
    } else {
      this.errorNombreUsuario = '';
    }

    // Validar correo
    if (!this.correo) {
      this.errorCorreo = 'El correo es obligatorio';
      valido = false;
    } else if (!this.formatoCorreo.test(this.correo)) {
      this.errorCorreo = 'El correo no tiene un formato válido';
      valido = false;
    } else {
      this.errorCorreo = '';
    }

    // Validar contraseña
    if (!this.contrasena) {
      this.errorContrasena = 'La contraseña es obligatoria';
      valido = false;
    } else if (!this.formatoContrasena.test(this.contrasena)) {
      this.errorContrasena = 'La contraseña debe tener entre 6 y 18 caracteres, una mayúscula, un número y un carácter especial (!@#$%^&*)';
      valido = false;
    } else if (this.contrasena !== this.confirmarContrasena) {
      this.errorConfirmarContrasena = 'Las contraseñas no coinciden';
      valido = false;
    } else {
      this.errorContrasena = '';
      this.errorConfirmarContrasena = '';
    }

    // Validar fecha
    if (!this.fechaNacimiento) {
      this.errorFecha = 'La fecha es obligatoria';
      valido = false;
    } else {
      const hoy = new Date();
      const nacimiento = new Date(this.fechaNacimiento);
      const edad = hoy.getFullYear() - nacimiento.getFullYear();
      if (edad < 13) {
        this.errorFecha = 'Debes tener al menos 13 años';
        valido = false;
      } else {
        this.errorFecha = '';
      }
    }

    if (valido) {
      const nuevoUsuario = {
        nombre: this.nombre,
        nombreUsuario: this.nombreUsuario,
        correo: this.correo,
        contrasena: this.contrasena,
        fecha: this.fechaNacimiento,
        rol: 'cliente'
      };

      const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
      usuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(usuarios));

      this.mensajeExito = '¡Registro exitoso! Tu cuenta ha sido creada correctamente.';
      this.limpiar();

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }
  }

  limpiar() {
    this.nombre = '';
    this.nombreUsuario = '';
    this.correo = '';
    this.contrasena = '';
    this.confirmarContrasena = '';
    this.fechaNacimiento = '';
    this.direccion = '';
    this.detalle = '';
    this.ciudad = '';
    this.region = '';
  }
}