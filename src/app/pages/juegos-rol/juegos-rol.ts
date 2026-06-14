import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { Navbar } from '../../shared/navbar/navbar';
import { SessionService } from '../../services/session';

@Component({
  selector: 'app-juegos-rol',
  imports: [RouterLink, NgFor, NgIf, Navbar],
  templateUrl: './juegos-rol.html',
  styleUrl: './juegos-rol.css'
})
export class JuegosRol {

  juegos = [
    {
      nombre: 'Caos en Neverwinter',
      categoria: 'Juego de Rol',
      descripcion: 'En Caos en Neverwinter, vivirás una épica aventura cooperativa en el universo de Dungeons & Dragons.',
      precio: '$59.990',
      descuento: '10% con pagos en transferencia',
      imagen: 'img/caosNeverwinter .webp',
      precioData: '59990',
    },
    {
      nombre: 'El Señor De Los Anillos Lcg Caja Básica',
      categoria: 'Juego de Rol',
      descripcion: 'En El Señor de los Anillos: el Juego de Cartas, los jugadores reúnen un grupo de aventureros que intentan completar misiones en la Tierra Media.',
      precio: '$59.990',
      descuento: 'Sin descuento',
      imagen: 'img/señorDeAnillos .webp',
      precioData: '59990',
    },
    {
      nombre: 'Dungeons And Dragons Inicio - Héroes De Tierras Fronterizas',
      categoria: 'Juego de Rol',
      descripcion: 'Este juego de mesa cooperativo traslada la experiencia de D&D a un formato dinámico. Apto para diversos niveles de experiencia.',
      precio: '$69.990',
      descuento: 'Sin descuento',
      imagen: 'img/dungeons .webp',
      precioData: '69990',
    }
  ];

  beneficios = [
    { titulo: 'Juegos populares', descripcion: 'Siempre ofrecemos los juegos más jugados del momento' },
    { titulo: 'Entregas inmediatas', descripcion: 'Trabajamos con red express para los envíos' },
    { titulo: 'Juegos para todos/as', descripcion: 'Tenemos juegos para distintos tipos de personas y gustos' }
  ];

  mensajeCarrito: string = '';

  constructor(public session: SessionService) {}

  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    this.session.agregarAlCarrito(nombre, precio, imagen);
    this.mensajeCarrito = `"${nombre}" agregado al carrito`;
    setTimeout(() => this.mensajeCarrito = '', 2000);
  }
}