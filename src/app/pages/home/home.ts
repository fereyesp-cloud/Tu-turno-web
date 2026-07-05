import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf, DecimalPipe  } from '@angular/common';
import { SessionService } from '../../services/session';
import { ProductoService } from '../../services/producto';

/**
 * Componente para el home de Tu Turno Web
 * Muestra los juegos destacados y agrega productos al carrito
 */
@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf, DecimalPipe ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit {

  /** Mensaje al agregar un producto al carrito */
  mensajeCarrito: string = '';

  /** Lista de juegos destacados con su link de categoría */
  juegosDestacados: any[] = [];

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
   * Inicialización del home — carga los juegos destacados desde la API
   */
  ngOnInit() {
    const links = ['/juegos/rol', '/juegos/familiares', '/juegos/estrategia', '/juegos/fiesta'];
    this.productoService.getDestacados().subscribe({
      next: (data) => {
        this.juegosDestacados = data.map((juego: any, i: number) => ({ ...juego, link: links[i] }));
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
   * Agrega un producto al carrito desde el home
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