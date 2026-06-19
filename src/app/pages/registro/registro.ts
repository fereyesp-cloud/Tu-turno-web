import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Navbar } from '../../shared/navbar/navbar';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-registro',
  imports: [NgIf, NgFor, ReactiveFormsModule, Navbar],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})

export class Registro implements OnInit {

  formularioRegistro!: FormGroup;
  verContrasena: boolean = false;
  verConfirmar: boolean = false;
  mensajeExito: string = '';

  regiones = [
    { valor: '1', nombre: 'Región Metropolitana' },
    { valor: '2', nombre: 'Valparaíso' },
    { valor: '3', nombre: 'Biobío' }
  ];

  readonly formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  readonly formatoContrasena = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,18}$/;

  constructor(private fb: FormBuilder, private router: Router, private session: SessionService) {}

  ngOnInit() {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]],
      confirmarContrasena: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: [''],
      detalle: [''],
      ciudad: [''],
      region: ['']
    });
  }

  registro(): void {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      return;
    }

    const { nombre, nombreUsuario, correo, contrasena, confirmarContrasena, fechaNacimiento } = this.formularioRegistro.value;

    if (contrasena !== confirmarContrasena) {
      this.formularioRegistro.get('confirmarContrasena')?.setErrors({ noCoincide: true });
      return; 
    }

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();

    if (edad < 13) {
      this.formularioRegistro.get('fechaNacimiento')?.setErrors({ menorEdad: true });
      return;
    }

    const nuevoUsuario = {
      nombre,
      nombreUsuario,
      correo,
      contrasena,
      fecha: fechaNacimiento,
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

  limpiar() {  
    this.formularioRegistro.reset();
    this.mensajeExito = '';
  }

  toggleVerContrasena() {
    this.verContrasena = !this.verContrasena;
  }

  toggleVerConfirmar() {
    this.verConfirmar = !this.verConfirmar;
  }

}