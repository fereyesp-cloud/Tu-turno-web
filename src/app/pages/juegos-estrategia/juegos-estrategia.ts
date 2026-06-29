import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SessionService } from '../../services/session';
import { ProductoService, Producto } from '../../services/producto';
/**
 * Componente para el juegos de estrategia
 * listar y agregar al carro los juegos
 */
@Component({
  selector: 'app-juegos-estrategia',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './juegos-estrategia.html',
  styleUrl: './juegos-estrategia.css'
})
export class JuegosEstrategia implements OnInit {
  /** Lista de juegos */
  juegos: Producto[] = [];
  /**mensaje de exito al agregar al carrito */
  mensajeCarrito: string = '';
   /** Lista de beneficios mostrados en la sección de beneficios */
  beneficios = [
    { titulo: 'Juegos populares', descripcion: 'Siempre ofrecemos los juegos más jugados del momento' },
    { titulo: 'Entregas inmediatas', descripcion: 'Trabajamos con red express para los envíos' },
    { titulo: 'Juegos para todos/as', descripcion: 'Tenemos juegos para distintos tipos de personas y gustos' }
  ];

  constructor(public session: SessionService, private productoService: ProductoService) {}

  /**
  * Inicialización del juego estrategia — carga los juegos de estrategia
  */

  ngOnInit() {
    this.juegos = this.productoService.getJuegosEstrategia();
  }

  /**
   * Funciona de agregar productos al carro desde juegos estrategia
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