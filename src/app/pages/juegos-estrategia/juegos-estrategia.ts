import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf  } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { SessionService } from '../../services/session';


@Component({
  selector: 'app-juegos-estrategia',
  imports: [RouterLink, NgFor, NgIf, Navbar],
  templateUrl: './juegos-estrategia.html',
  styleUrl: './juegos-estrategia.css'
})
export class JuegosEstrategia {

  juegos = [
    {
      nombre: 'EXIT: El laberinto maldito',
      categoria: 'Juegos de estrategia',
      descripcion: 'Juego de escape cooperativo para 1-4 personas, a partir de 10 años, con partidas de 60 a 90 minutos. Los jugadores exploran e interactúan con el entorno hasta hallar la salida.',
      precio: '$39.990',
      descuento: '10% con pagos en transferencia',
      imagen: 'img/ExitLaberintoMaldito .webp',
      precioData: '39990',
    },
    {
      nombre: 'CATAN',
      categoria: 'Juegos de estrategia',
      descripcion: 'Juego de estrategia clásico para 3-4 jugadores donde construyes y desarrollas tu propia civilización en una isla llena de recursos.',
      precio: '$29.990',
      descuento: 'Sin descuento',
      imagen: 'img/catan .webp',
      precioData: '29990',
    },
    {
      nombre: 'La Tripulación: Misión Mar Profundo',
      categoria: 'Juegos de estrategia',
      descripcion: 'Juego cooperativo de bazas para 2-5 jugadores, a partir de 10 años. Reúne tu equipo y lánzate a descubrir el legendario continente perdido de Mu.',
      precio: '$17.990',
      descuento: 'Sin descuento',
      imagen: 'img/tripulacion .webp',
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