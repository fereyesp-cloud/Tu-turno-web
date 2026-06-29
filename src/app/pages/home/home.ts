import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SessionService } from '../../services/session';
import { ProductoService, Producto } from '../../services/producto';

/**
 * Componente para el home de tu turno web
 * contiene el home
 * agregar productos al carro
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {
  /**Mensaje al agregar un producto al carro */
  mensajeCarrito: string = '';
  /** Lista de juegos destacados mostrados en el home con su link de categoría */
  juegosDestacados: (Producto & { link: string })[] = [];

 /** Lista de beneficios mostrados en la sección de beneficios */
  beneficios = [
    { titulo: 'Juegos populares', descripcion: 'Siempre ofrecemos los juegos más jugados del momento' },
    { titulo: 'Entregas inmediatas', descripcion: 'Trabajamos con red express para los envíos' },
    { titulo: 'Juegos para todos/as', descripcion: 'Tenemos juegos para distintos tipos de personas y gustos' }
  ];

  constructor(public session: SessionService, private productoService: ProductoService) {}

  /**
  * Inicialización del home — carga los juegos destacados con sus links de categoría
  */
  ngOnInit() {
    const destacados = this.productoService.getDestacados();
    const links = ['/juegos/rol', '/juegos/familiares', '/juegos/estrategia', '/juegos/fiesta'];
    this.juegosDestacados = destacados.map((juego, i) => ({ ...juego, link: links[i] }));
  }

  /**
   * Funciona de agregar productos al carro desde el home
   * @param nombre Nombre del producto
   * @param precio precio del producto
   * @param imagen imegen del producto
   */

  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    this.session.agregarAlCarrito(nombre, precio, imagen);
    this.mensajeCarrito = `"${nombre}" agregado al carrito`;
    setTimeout(() => this.mensajeCarrito = '', 2000);
  }
}