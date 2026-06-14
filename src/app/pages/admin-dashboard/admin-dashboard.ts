import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NgFor],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  usuarios: any[] = [];

  productos = [
    { nombre: 'Caos en Neverwinter', precio: '$59.990', categoria: 'Juegos de Rol', imagen: 'img/caosNeverwinter .webp' },
    { nombre: 'El Señor De Los Anillos', precio: '$59.990', categoria: 'Juegos de Rol', imagen: 'img/señorDeAnillos .webp' },
    { nombre: 'Dungeons And Dragons', precio: '$69.990', categoria: 'Juegos de Rol', imagen: 'img/dungeons .webp' },
    { nombre: 'Basta', precio: '$9.990', categoria: 'Juegos Familiares', imagen: 'img/juegoBasta .webp' },
    { nombre: 'EXIT: El laberinto maldito', precio: '$39.990', categoria: 'Juegos de estrategia', imagen: 'img/ExitLaberintoMaldito .webp' },
    { nombre: 'CATAN', precio: '$29.990', categoria: 'Juegos de estrategia', imagen: 'img/catan .webp' },
    { nombre: 'La Tripulación: Misión Mar Profundo', precio: '$17.990', categoria: 'Juegos de estrategia', imagen: 'img/tripulacion .webp' },
    { nombre: 'Improvisado', precio: '$17.990', categoria: 'Juegos familiares', imagen: 'img/improvisado .webp' },
    { nombre: 'Party & Co Family', precio: '$17.990', categoria: 'Juegos familiares', imagen: 'img/partyFamily .webp' },
    { nombre: 'Si te ríes, tomas', precio: '$14.990', categoria: 'Juegos de fiesta', imagen: 'img/SiteReisPierdes .webp' },
    { nombre: 'Curao Volao o Weón de Cojones para Adultos', precio: '$15.990', categoria: 'Juegos de fiesta', imagen: 'img/curaoVolao .webp' },
    { nombre: 'Mójate el potito', precio: '$12.990', categoria: 'Juegos de fiesta', imagen: 'img/Mojate .webp' }
  ];

  constructor(private session: SessionService, private router: Router) {}

  ngOnInit() {
    const usuarioActivo = this.session.getUsuarioActivo();

    // Si no hay sesión redirigir al login
    if (!usuarioActivo) {
      this.router.navigate(['/login']);
      return;
    }

    // Si no es admin redirigir al home
    if (usuarioActivo.rol !== 'admin') {
      this.router.navigate(['/']);
      return;
    }

    this.usuarios = this.session.getUsuarios();
  }

  cerrarSesion() {
    this.session.cerrarSesion();
    this.router.navigate(['/']);
  }
}