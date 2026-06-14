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
  mensajeError: string = '';
  mensajeExito: string = '';
  errorCorreo: string = '';

  enviarCorreo() {
    if (!this.correo) {
      this.mensajeError = 'Por favor ingresa tu correo';
      this.mensajeExito = '';
      return;
    }
    this.mensajeError = '';
    this.mensajeExito = 'Se ha enviado un correo con las instrucciones para recuperar tu contraseña.';
  }
}