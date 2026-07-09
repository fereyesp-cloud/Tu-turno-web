import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

/**
 * Componente del carro de tu turno web.
 * Contiene el contenido del carro, agregar productos, vaciar y finalizar compra.
 */
@Component({
  selector: 'app-carrito',
  imports: [RouterLink, NgIf, NgFor, DecimalPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {

  /** Lista de productos en el carrito con cantidad */
  items: any[] = [];

  /** Total calculado de los productos en el carrito */
  total: number = 0;

  /** Mensaje de confirmación de compra exitosa */
  mensajeExito: string = '';

  /** Mensaje de advertencia cuando el carrito está vacío */
  mensajeVacio: string = '';

  constructor(private session: SessionService, private router: Router) {}

  /**
   * Inicialización del carrito
   */
  ngOnInit() {
    this.cargarCarrito();
  }

  /**
   * Carga los productos del carrito desde localStorage,
   * agrupa por nombre y calcula el total
   */
  cargarCarrito() {
    const raw = this.session.getCarrito();
    const agrupado: any = {};

    raw.forEach((p: any) => {
      const precioNumero = typeof p.precio === 'string' 
        ? parseInt(p.precio.replace(/\D/g, '')) 
        : parseInt(p.precio);
      
      if (agrupado[p.nombre]) {
        agrupado[p.nombre].cantidad++;
      } else {
        agrupado[p.nombre] = { ...p, cantidad: 1, precioNumero };
      }
    });

    this.items = Object.values(agrupado);
    this.calcularTotal();
  }

  /**
   * Calcula el total del carrito
   */
  calcularTotal() {
    this.total = this.items.reduce((sum, p) => sum + p.precioNumero * p.cantidad, 0);
  }

  /**
   * Elimina un producto individual del carrito
   * @param nombre Nombre del producto a eliminar
   */
  eliminarProducto(nombre: string) {
    const raw = this.session.getCarrito();
    const index = raw.findIndex((p: any) => p.nombre === nombre);
    if (index !== -1) {
      raw.splice(index, 1);
      localStorage.setItem('carrito', JSON.stringify(raw));
      this.cargarCarrito();
    }
  }

  /**
   * Elimina todos los productos del carrito
   */
  vaciarCarrito() {
    this.session.vaciarCarrito();
    this.items = [];
    this.total = 0;
    this.mensajeExito = '';
  }

  /**
   * Finaliza la compra y vacía el carrito
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