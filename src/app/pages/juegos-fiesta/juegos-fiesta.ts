import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, DecimalPipe  } from '@angular/common';
import { SessionService } from '../../services/session';
import { ProductoService } from '../../services/producto';

/**
 * Componente para los juegos de fiesta
 * Lista y agrega al carrito los juegos
 */
@Component({
  selector: 'app-juegos-fiesta',
  imports: [RouterLink, NgFor, NgIf, DecimalPipe ],
  templateUrl: './juegos-fiesta.html',
  styleUrl: './juegos-fiesta.css'
})
export class JuegosFiesta implements OnInit {

  /** Lista de juegos de fiesta cargados desde la API */
  juegos: any[] = [];

  /** Mensaje de éxito al agregar al carrito */
  mensajeCarrito: string = '';

  /** Indica si los datos están cargando */
  cargando: boolean = true;

  /** Lista de beneficios mostrados en la sección de beneficios */
  beneficios = [
    { titulo: 'Juegos populares', descripcion: 'Siempre ofrecemos los juegos más jugados del momento' },
    { titulo: 'Entregas inmediatas', descripcion: 'Trabajamos con red express para los envíos' },
    { titulo: 'Juegos para todos/as', descripcion: 'Tenemos juegos para distintos tipos de personas y gustos' }
  ];

  constructor(
    public session: SessionService,
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Inicialización — carga los juegos de fiesta desde la API
   */
  ngOnInit() {
    this.productoService.getPorCategoria('Juegos de Fiesta').subscribe({
      next: (data) => {
        this.juegos = data;
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Agrega un producto al carrito desde la página de juegos de fiesta
   * @param nombre Nombre del producto
   * @param precio Precio del producto
   * @param imagen Ruta de la imagen del producto
   */
  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    this.session.agregarAlCarrito(nombre, precio, imagen);
    this.mensajeCarrito = `"${nombre}" agregado al carrito`;
    setTimeout(() => this.mensajeCarrito = '', 2000);
  }
}