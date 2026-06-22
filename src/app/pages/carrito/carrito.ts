import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf, NgFor, DecimalPipe  } from '@angular/common';
import { SessionService } from '../../services/session';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  imports: [RouterLink, NgIf, NgFor, DecimalPipe],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {

  items: any[] = [];
  total: number = 0;
  mensajeExito: string = '';
  mensajeVacio: string = '';

  constructor(private session: SessionService, private router: Router) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.items = this.session.getCarrito();
    this.total = this.items.reduce((sum, p) => sum + parseInt(p.precio), 0);
  }

  vaciarCarrito() {
    this.session.vaciarCarrito();
    this.items = [];
    this.total = 0;
    this.mensajeExito = '';
  }

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