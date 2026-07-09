import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SessionService } from '../../services/session';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Componente para la pagine perfil
 * listar y agregar al carro los juegos
 */
@Component({
  selector: 'app-perfil',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil implements OnInit {

  /**Incializacion del formulario del perfil */
  formularioPerfil!: FormGroup;
  /**Mensaje de exito al editar el perfil */
  mensajeExito: string = '';

  constructor(private fb: FormBuilder, private session: SessionService, private router: Router) {}

  /**
   * Inicializacion del perfil
   */
  ngOnInit() {
    const usuarioActivo = this.session.getUsuarioActivo();

    this.formularioPerfil = this.fb.group({
      nombre: [usuarioActivo.nombre, Validators.required],
      nombreUsuario: [usuarioActivo.nombreUsuario, Validators.required],
      correo: [usuarioActivo.correo, [Validators.required, Validators.email]],
      fechaNacimiento: [usuarioActivo.fecha, Validators.required]
    });
  }

  /**
   * Funcion para guardar los cambios del formulario del perfil
   */

  guardarCambios() {
    if (this.formularioPerfil.invalid) {
      this.formularioPerfil.markAllAsTouched();
      return;
    }

    const { nombre, nombreUsuario, correo, fechaNacimiento } = this.formularioPerfil.value;

    const hoy = new Date();
    const nacimiento = new Date(fechaNacimiento);
    const edad = hoy.getFullYear() - nacimiento.getFullYear();

    if (edad < 13) {
      this.formularioPerfil.get('fechaNacimiento')?.setErrors({ menorEdad: true });
      return;
    }

    const usuarioActivo = this.session.getUsuarioActivo();
    const usuarios = this.session.getUsuarios();
    const index = usuarios.findIndex((u: any) => u.nombreUsuario === usuarioActivo.nombreUsuario);

    if (index !== -1) {
      usuarios[index].nombre = nombre;
      usuarios[index].nombreUsuario = nombreUsuario;
      usuarios[index].correo = correo;
      usuarios[index].fecha = fechaNacimiento;

      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      sessionStorage.setItem('usuarioActivo', JSON.stringify(usuarios[index]));

      this.mensajeExito = 'El perfil se ha actualizado correctamente.';

      setTimeout(() => {
        this.router.navigate(['/']);
      }, 2000);
    }
  }
}