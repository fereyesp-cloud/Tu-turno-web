import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { SessionService } from '../../services/session';

/**
 * Componente del navbar compartido.
 * Muestra el menú de navegación y gestiona el estado de sesión del usuario activo.
 */
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgIf],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  /**Listar usuario activo */
  usuarioActivo: any = null;

  constructor(
    public session: SessionService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  /**
  * Inicialización del menu
  */
  ngOnInit() {
    this.session.usuarioActivo$.subscribe(usuario => {
      this.usuarioActivo = usuario;
      this.cdr.detectChanges();
    });
  }

  /**
  * Cierra la sesión del usuario activo y redirige al home
  */

  cerrarSesion() {
    this.session.cerrarSesion();
    this.router.navigate(['/']);
  }
}