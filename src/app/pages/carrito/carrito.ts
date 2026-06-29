import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, DecimalPipe  } from '@angular/common';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';


/**
 * Componente  del carro de tu turno web
 * contine el contenido del carro
 * agregar productos, vaciar producto y finalizar compra
 */
@Component({
  selector: 'app-carrito',
  imports: [RouterLink, NgIf, NgFor, DecimalPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {
  /** Lista de productos en el carrito */
  items: any[] = [];
  /** Total calculado de los productos en el carrito */
  total: number = 0;
  /** Mensaje de confirmación de compra exitosa */
  mensajeExito: string = '';
  /** Mensaje de advertencia cuando el carrito está vacío */
  mensajeVacio: string = '';

  constructor(private session: SessionService, private router: Router) {}

  /**
   * inicializacion del carro
   */
  ngOnInit() {
    this.cargarCarrito();
  }
  /**
  * Funcion de carga los productos del carrito desde localStorage y calcula el total
  */

  cargarCarrito() {
    this.items = this.session.getCarrito();
    this.total = this.items.reduce((sum, p) => sum + parseInt(p.precio), 0);
  }

  /**
   * funcion para vaciar productos del carro
   */

  vaciarCarrito() {
    this.session.vaciarCarrito();
    this.items = [];
    this.total = 0;
    this.mensajeExito = '';
  }

  /**
  *Funcion de elimina todos los productos del carrito
  */

  finalizarCompra() {
    if (this.items.length === 0) {
      this.mensajeVacio = 'No tienes productos en el carrito.';
      return;
    }
    this.session.vaciarCarrito();
    this.mensajeExito = '¡Compra exitosa! Tu compra ha sido procesada correctamente.';
    this.items = [];
    this.total = 0;
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 2000);
  }
}