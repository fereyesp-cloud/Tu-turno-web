import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SessionService } from '../../services/session';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  mensajeCarrito: string = '';
  juegosDestacados: (Producto & { link: string })[] = [];

  beneficios = [
    { titulo: 'Juegos populares', descripcion: 'Siempre ofrecemos los juegos más jugados del momento' },
    { titulo: 'Entregas inmediatas', descripcion: 'Trabajamos con red express para los envíos' },
    { titulo: 'Juegos para todos/as', descripcion: 'Tenemos juegos para distintos tipos de personas y gustos' }
  ];

  constructor(public session: SessionService, private productoService: ProductoService) {}

  ngOnInit() {
    const destacados = this.productoService.getDestacados();
    const links = ['/juegos/rol', '/juegos/familiares', '/juegos/estrategia', '/juegos/fiesta'];
    this.juegosDestacados = destacados.map((juego, i) => ({ ...juego, link: links[i] }));
  }

  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    this.session.agregarAlCarrito(nombre, precio, imagen);
    this.mensajeCarrito = `"${nombre}" agregado al carrito`;
    setTimeout(() => this.mensajeCarrito = '', 2000);
  }
}