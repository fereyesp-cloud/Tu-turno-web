import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { SessionService } from '../../services/session';
import { ProductoService, Producto } from '../../services/producto';

@Component({
  selector: 'app-catalogo',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css'
})
export class Catalogo implements OnInit {

  juegos: Producto[] = [];
  categoria: string = '';
  mensajeCarrito: string = '';

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

  ngOnInit() {
    this.route.params.subscribe(params => {
      const cat = params['categoria'];
      this.categoria = cat;
      this.cargarJuegos(cat);
      this.cdr.detectChanges();
    });
  }

  cargarJuegos(categoria: string) {
    switch (categoria) {
      case 'rol':
        this.juegos = this.productoService.getJuegosRol();
        break;
      case 'familiares':
        this.juegos = this.productoService.getJuegosFamiliares();
        break;
      case 'estrategia':
        this.juegos = this.productoService.getJuegosEstrategia();
        break;
      case 'fiesta':
        this.juegos = this.productoService.getJuegosFiesta();
        break;
      default:
        this.juegos = [];
    }
  }

  getTitulo(): string {
    const titulos: { [key: string]: string } = {
      'rol': 'Juegos de Rol',
      'familiares': 'Juegos Familiares',
      'estrategia': 'Juegos de Estrategia',
      'fiesta': 'Juegos de Fiesta'
    };
    return titulos[this.categoria] || 'Juegos';
  }

  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    this.session.agregarAlCarrito(nombre, precio, imagen);
    this.mensajeCarrito = `"${nombre}" agregado al carrito`;
    setTimeout(() => this.mensajeCarrito = '', 2000);
  }
}