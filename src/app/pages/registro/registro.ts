import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../services/session';


/**
 * Componente de registro de nuevos usuarios.
 * Contiene formulario reactivo con validaciones de campos obligatorios,
 * formato de correo, seguridad de contraseña y edad mínima.
 */
@Component({
  selector: 'app-registro',
  imports: [NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})


export class Registro implements OnInit {
  /** Formulario reactivo de registro */
  formularioRegistro!: FormGroup;
  /** Controla la visibilidad del campo contraseña */
  verContrasena: boolean = false;
  /** Controla la visibilidad del campo confirmar contraseña */
  verConfirmar: boolean = false;
  /** Mensaje de éxito al registrarse correctamente */
  mensajeExito: string = '';

  /**
   * Muestra los valores para la opcion de region
   */
  regiones = [
    { valor: '1', nombre: 'Región Metropolitana' },
    { valor: '2', nombre: 'Valparaíso' },
    { valor: '3', nombre: 'Biobío' }
  ];
  /** Expresión regular para validar formato de correo electrónico */
  readonly formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  constructor(private fb: FormBuilder, private router: Router, private session: SessionService) {}

  /**
   * Inicializa los campos del formulario
   */
  ngOnInit() {
    this.formularioRegistro = this.fb.group({
      nombre: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(18),
        Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{6,18}$/)
      ]],
      confirmarContrasena: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      direccion: [''],
      detalle: [''],
      ciudad: [''],
      region: ['']
    });
  }
 /**
 * Procesa el registro del usuario validando el formulario,
 * contraseñas coincidentes y edad mínima de 13 años
 */

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
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

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
    // Verificar si el correo o nombre de usuario ya existen
    const usuarioExistente = usuarios.find((u: any) => 
      u.nombreUsuario === nombreUsuario || u.correo === correo
    );

    if (usuarioExistente) {
      if (usuarioExistente.nombreUsuario === nombreUsuario) {
          this.formularioRegistro.get('nombreUsuario')?.setErrors({ duplicado: true });
        }
      if (usuarioExistente.correo === correo) {
        this.formularioRegistro.get('correo')?.setErrors({ duplicado: true });
      }
      return;
    }

    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    this.mensajeExito = '¡Registro exitoso! Tu cuenta ha sido creada correctamente.';
    this.limpiar();

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }  

  /**
   * limpia los campos del formulario
   */

  limpiar() {  
    this.formularioRegistro.reset();
    this.mensajeExito = '';
  }
  /**
   * Visualizar el campo de contraseña
   */

  toggleVerContrasena() {
    this.verContrasena = !this.verContrasena;
  }
  /**
  * Alterna la visibilidad del campo confirmar contraseña
  */

  toggleVerConfirmar() {
    this.verConfirmar = !this.verConfirmar;
  }

}