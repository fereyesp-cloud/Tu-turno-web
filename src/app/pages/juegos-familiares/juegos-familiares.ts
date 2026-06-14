import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-juegos-familiares',
  imports: [RouterLink, NgFor, NgIf, Navbar],
  templateUrl: './juegos-familiares.html',
  styleUrl: './juegos-familiares.css'
})
export class JuegosFamiliares {

  juegos = [
    {
      nombre: 'Basta',
      categoria: 'Juegos familiares',
      descripcion: 'Eleve su Noche de Juego con este completo juego de palabras de mesa, con una rueda con temporizador, 36 tarjetas en 144 categorías, para 2-8 jugadores.',
      precio: '$9.990',
      descuento: '10% con pagos en transferencia',
      imagen: 'img/juegoBasta .webp',
      precioData: '9990',
    },
    {
      nombre: 'Improvisado',
      categoria: 'Juegos familiares',
      descripcion: 'Improvisado es un alocado juego en el cual dos participantes se enfrentan en un duelo de actuación e improvisación frente a sus amigos.',
      precio: '$17.990',
      descuento: 'Sin descuento',
      imagen: 'img/improvisado .webp',
      precioData: '17990',
    },
    {
      nombre: 'Party & Co Family',
      categoria: 'Juegos familiares',
      descripcion: 'El verdadero juego de desafíos para toda la FAMILIA! Con dos niveles de dificultad: pruebas para niños y para adultos, con mímica, dibujo y preguntas.',
      precio: '$17.990',
      descuento: 'Sin descuento',
      imagen: 'img/partyFamily .webp',
      precioData: '17990',
    }
  ];

  beneficios = [
    { titulo: 'Juegos populares', descripcion: 'Siempre ofrecemos los juegos más jugados del momento' },
    { titulo: 'Entregas inmediatas', descripcion: 'Trabajamos con red express para los envíos' },
    { titulo: 'Juegos para todos/as', descripcion: 'Tenemos juegos para distintos tipos de personas y gustos' }
  ];

  constructor(public session: SessionService) {}

  mensajeCarrito: string = '';

  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    this.session.agregarAlCarrito(nombre, precio, imagen);
    this.mensajeCarrito = `"${nombre}" agregado al carrito`;
  setTimeout(() => this.mensajeCarrito = '', 2000);
  }
}