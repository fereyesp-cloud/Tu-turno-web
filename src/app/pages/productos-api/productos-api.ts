import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { ProductosApiService } from '../../services/productos-api';

/**
 * Componente que muestra los productos consumidos desde GitHub Pages
 */
@Component({
  selector: 'app-productos-api',
  imports: [NgFor, NgIf, DecimalPipe],
  templateUrl: './productos-api.html',
  styleUrl: './productos-api.css'
})
export class ProductosApi implements OnInit {

  /** Lista de categorías con sus productos */
  categorias: any[] = [];

  /** Indica si los datos están cargando */
  cargando: boolean = true;

  /** Mensaje de error si falla la carga */
  error: string = '';

  constructor(
    private productosApiService: ProductosApiService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Inicialización del componente — consume el JSON desde GitHub Pages
   */
  ngOnInit() {
    this.productosApiService.getProductos().subscribe({
      next: (data) => {
        this.categorias = data.categorias;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Error al cargar los productos';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}