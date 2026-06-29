import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Componente para recuperar contrasena
 * listar y agregar al carro los juegos
 */
@Component({
  selector: 'app-recuperar-contrasena',
  imports: [RouterLink, NgIf, ReactiveFormsModule],
  templateUrl: './recuperar-contrasena.html',
  styleUrl: './recuperar-contrasena.css'
})
export class RecuperarContrasena implements OnInit{
  /**Incializacion del formulario */
  formularioRecuperar!: FormGroup; 
  /**Mensaje de exito */
  mensajeExito: string = '';

    constructor(private fb: FormBuilder) {}

  /**
  * Inicialización de la recuperacion contrasena
  */
  ngOnInit(){
    this.formularioRecuperar = this.fb.group({
      correo:['',[Validators.required, Validators.email]]
    })
  }

  /**
   * Funcion para simular el envio de recuperacion de correo
   */

  enviarCorreo() {
    if (this.formularioRecuperar.invalid) {
      this.formularioRecuperar.markAllAsTouched();
      return;
    }

    this.mensajeExito = 'Se ha enviado un correo de recuperación.';
  }
}