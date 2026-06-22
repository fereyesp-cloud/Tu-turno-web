import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-login',
  imports: [NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  formularioLogin!: FormGroup;
  verContrasena: boolean = false;
  mensajeError: string = '';

  constructor(private fb: FormBuilder, private router: Router, private session: SessionService) {}

  ngOnInit() {
    this.formularioLogin = this.fb.group({
      username: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  toggleVerContrasena() {
    this.verContrasena = !this.verContrasena;
  }

  ingresar(): void {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const { username, contrasena } = this.formularioLogin.value;
    const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const usuarioEncontrado = usuarios.find((u: any) =>
      u.nombreUsuario === username && u.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      this.session.setUsuarioActivo(usuarioEncontrado);
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