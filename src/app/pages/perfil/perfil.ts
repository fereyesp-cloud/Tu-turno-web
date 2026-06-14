import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-perfil',
  imports: [NgIf, FormsModule, Navbar],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {

  errorNombrePerfil: string = '';
  errorNombreUsuarioPerfil: string = '';
  errorCorreoPerfil: string = '';
  errorFechaPerfil: string = '';

  nombre: string = '';
  nombreUsuario: string = '';
  correo: string = '';
  fechaNacimiento: string = '';
  mensajeExito: string = '';

  readonly formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private session: SessionService, private router: Router) {}

  ngOnInit() {
    const usuarioActivo = this.session.getUsuarioActivo();

    // Si no hay sesión redirigir al login
    if (!usuarioActivo) {
      this.router.navigate(['/login']);
      return;
    }

    // Cargar datos del usuario
    this.nombre = usuarioActivo.nombre;
    this.nombreUsuario = usuarioActivo.nombreUsuario;
    this.correo = usuarioActivo.correo;
    this.fechaNacimiento = usuarioActivo.fecha;
  }

 guardarCambios() {
  let valido = true;

  // Validar con las variables del formulario
  if (!this.nombre) {
    this.errorNombrePerfil = 'El nombre no puede estar vacío';
    valido = false;
  } else {
    this.errorNombrePerfil = '';
  }

  if (!this.nombreUsuario) {
    this.errorNombreUsuarioPerfil = 'El nombre de usuario no puede estar vacío';
    valido = false;
  } else {
    this.errorNombreUsuarioPerfil = '';
  }

  if (!this.correo) {
    this.errorCorreoPerfil = 'El correo no puede estar vacío';
    valido = false;
  } else if (!this.formatoCorreo.test(this.correo)) {
    this.errorCorreoPerfil = 'El correo no tiene formato válido';
    valido = false;
  } else {
    this.errorCorreoPerfil = '';
  }

  if (!this.fechaNacimiento) {
    this.errorFechaPerfil = 'La fecha no puede estar vacía';
    valido = false;
  } else {
    const hoy = new Date();
    const nacimiento = new Date(this.fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();
    if (edad < 13) {
      this.errorFechaPerfil = 'Debe tener al menos 13 años';
      valido = false;
    } else {
      this.errorFechaPerfil = '';
    }
  }

  // Solo guardar si todo es válido
  if (valido) {
    const usuarioActivo = this.session.getUsuarioActivo();
    const usuarios = this.session.getUsuarios();
    const index = usuarios.findIndex((u: any) => u.nombreUsuario === usuarioActivo.nombreUsuario);

    if (index !== -1) {
      usuarios[index].nombre = this.nombre;
      usuarios[index].nombreUsuario = this.nombreUsuario;
      usuarios[index].correo = this.correo;
      usuarios[index].fecha = this.fechaNacimiento;

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarios[index]));

      this.mensajeExito = 'El perfil se ha actualizado correctamente.';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }
  }
}
}