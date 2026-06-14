import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [RouterLink, NgIf, FormsModule, Navbar],
  templateUrl: './recuperar-contrasena.html',
  styleUrl: './recuperar-contrasena.css'
})
export class RecuperarContrasena {

  correo: string = '';
  errorCorreo: string = '';
  mensajeExito: string = '';

  readonly formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  enviarCorreo() {
    if (!this.correo) {
      this.errorCorreo = 'El correo es obligatorio';
      this.mensajeExito = '';
      return;
    }
    if (!this.formatoCorreo.test(this.correo)) {
      this.errorCorreo = 'El correo no tiene un formato válido';
      this.mensajeExito = '';
      return;
    }
    this.errorCorreo = '';
    this.mensajeExito = 'Se ha enviado un correo de recuperación.';
  }
}