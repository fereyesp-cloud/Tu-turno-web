import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SessionService } from '../../services/session';
import { ProductoService, Producto } from '../../services/producto';


/**
 * Componente del catalogo
 * continen las descripcion del los productos del catalogo
 */
@Component({
  selector: 'app-catalogo',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  /** Lista de juegos cargados según la categoría activa */
  juegos: any[] = [];
  /** Categoría activa obtenida desde los parámetros de la ruta */
  categoria: string = '';
 /** Mensaje temporal que confirma que un producto fue agregado al carrito */
  mensajeCarrito: string = '';
  /** Indica si los datos están cargando */
  cargando: boolean = false;

  /**
   * Muestra la seccion de beneficios en las paginas
   */
  beneficios = [
    { titulo: 'Juegos populares', descripcion: 'Siempre ofrecemos los juegos más jugados del momento' },
    { titulo: 'Entregas inmediatas', descripcion: 'Trabajamos con red express para los envíos' },
    { titulo: 'Juegos para todos/as', descripcion: 'Tenemos juegos para distintos tipos de personas y gustos' }
  ];

  constructor(
    private route: ActivatedRoute,
    public session: SessionService,
    private productoService: ProductoService,
    private cdr: ChangeDetectorRef
  ) {}


  /**
   * inicializacion de los parametros para la categoria
   */
  ngOnInit() {
    this.route.params.subscribe(params => {
      const cat = params['categoria'];
      this.categoria = cat;
      this.cargarJuegos(cat);
      this.cdr.detectChanges();
    });
  }

  /**
  * Carga los juegos correspondientes a la categoría recibida por parámetro de ruta
  * @param categoria Nombre de la categoría a mostrar
  */

  cargarJuegos(categoria: string) {
    const categoriasMap: { [key: string]: string } = {
      'rol': 'Juegos de Rol',
      'familiares': 'Juegos Familiares',
      'estrategia': 'Juegos de Estrategia',
      'fiesta': 'Juegos de Fiesta'
    };

    const categoriaAPI = categoriasMap[categoria];

    this.productoService.getPorCategoria(categoriaAPI).subscribe({
      next: (data) => {
        console.log('datos recibidos:', data);  // ← aquí
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
  * Retorna el título legible según la categoría activa
  * @returns Título de la categoría
  */

  getTitulo(): string {
    const titulos: { [key: string]: string } = {
      'rol': 'Juegos de Rol',
      'familiares': 'Juegos Familiares',
      'estrategia': 'Juegos de Estrategia',
      'fiesta': 'Juegos de Fiesta'
    };
    return titulos[this.categoria] || 'Juegos';
  }

  /**
  * Agrega un producto al carrito de compras
  * @param nombre Nombre del producto
  * @param precio Precio del producto
  * @param imagen Ruta de la imagen del producto
  */

  agregarAlCarrito(nombre: string, precio: any, imagen: string) {
    this.session.agregarAlCarrito(nombre, precio.toString(), imagen);
    this.mensajeCarrito = `"${nombre}" agregado al carrito`;
    setTimeout(() => this.mensajeCarrito = '', 2000);
  }
}