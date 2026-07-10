import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { ProductoService } from '../../services/producto';

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
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Inicialización del componente — consume el JSON desde GitHub Pages
   */
  ngOnInit() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.categorias = data.categorias;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Error al cargar los productos';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }
}