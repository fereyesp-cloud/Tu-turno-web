import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

  mensajeCarrito: string = '';

  constructor(public session: SessionService) {}

  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    this.session.agregarAlCarrito(nombre, precio, imagen);
    this.mensajeCarrito = `"${nombre}" agregado al carrito`;
    setTimeout(() => this.mensajeCarrito = '', 2000);
  }

  juegosDestacados = [
    {
      nombre: 'Caos en Neverwinter',
      categoria: 'Juego de Rol',
      descripcion: 'En Caos en Neverwinter, vivirás una épica aventura cooperativa en el universo de Dungeons & Dragons.',
      precio: '$59.990',
      precioData: '59990',
      imagen: 'img/caosNeverwinter .webp',
      link: '/juegos-rol'
    },
    {
      nombre: 'Basta',
      categoria: 'Juegos familiares',
      descripcion: 'Eleve su Noche de Juego con este completo juego de palabras de mesa, proporcionando horas de diversión interactiva para 2-8 jugadores.',
      precio: '$9.990',
      precioData: '9990',
      imagen: 'img/juegoBasta .webp',
      link: '/juegos-familiares'
    },
    {
      nombre: 'EXIT: El laberinto maldito',
      categoria: 'Juegos de estrategia',
      descripcion: 'Exit: El laberinto maldito es un juego de escape cooperativo para 1-4 personas.',
      precio: '$39.990',
      precioData: '39990',
      imagen: 'img/ExitLaberintoMaldito .webp',
      link: '/juegos-estrategia'
    },
    {
      nombre: 'Si te ríes, tomas',
      categoria: 'Juegos de fiesta',
      descripcion: 'El juego de tomar para las personas que no pueden quedarse serias.',
      precio: '$14.990',
      precioData: '14990',
      imagen: 'img/SiteReisPierdes .webp',
      link: '/juegos-fiesta'
    }
  ];

  beneficios = [
    { titulo: 'Juegos populares', descripcion: 'Siempre ofrecemos los juegos más jugados del momento' },
    { titulo: 'Entregas inmediatas', descripcion: 'Trabajamos con red express para los envíos' },
    { titulo: 'Juegos para todos/as', descripcion: 'Tenemos juegos para distintos tipos de personas y gustos' }
  ];
}