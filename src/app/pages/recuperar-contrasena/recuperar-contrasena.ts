import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recuperar-contrasena',
  imports: [RouterLink, NgIf, Navbar, ReactiveFormsModule],
  templateUrl: './recuperar-contrasena.html',
  styleUrl: './recuperar-contrasena.css'
})
export class RecuperarContrasena implements OnInit{

  formularioRecuperar!: FormGroup; 
  mensajeExito: string = '';

    constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.formularioRecuperar = this.fb.group({
      correo:['',[Validators.required, Validators.email]]
    })
  }

  enviarCorreo() {
    if (this.formularioRecuperar.invalid) {
      this.formularioRecuperar.markAllAsTouched();
      return;
    }

    this.mensajeExito = 'Se ha enviado un correo de recuperación.';
  }
}