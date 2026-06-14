import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-juegos-fiesta',
  imports: [RouterLink, NgFor, NgIf, Navbar],
  templateUrl: './juegos-fiesta.html',
  styleUrl: './juegos-fiesta.css'
})
export class JuegosFiesta {

  juegos = [
    {
      nombre: 'Si te ríes, tomas',
      categoria: 'Juegos de fiesta',
      descripcion: 'El juego de tomar para las personas que no pueden quedarse serias. ¿Podrás aguantarte la risa cuando alguien del grupo...?',
      precio: '$14.990',
      descuento: '10% con pagos en transferencia',
      imagen: 'img/SiteReisPierdes .webp',
      precioData: '14990',
    },
    {
      nombre: "Curao' Volao' o Weón de Cojones para Adultos",
      categoria: 'Juegos de fiesta',
      descripcion: 'Party game donde en cada turno un jugador actúa como juez y los participantes acusan a otro de encajar con la descripción de la carta. Quien acumule 7 cartas pierde.',
      precio: '$15.990',
      descuento: 'Sin descuento',
      imagen: 'img/curaoVolao .webp',
      precioData: '15990',
    },
    {
      nombre: 'Mójate el potito',
      categoria: 'Juegos de fiesta',
      descripcion: 'Juego de cartas para responder preguntas que harán sudar a más de alguno. Perfecto para fiestas, juntas y carretes.',
      precio: '$12.990',
      descuento: 'Sin descuento',
      imagen: 'img/Mojate .webp',
      precioData: '12990',
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