import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SessionService } from '../../services/session';
import { CrudProductosService } from '../../services/crud-productos';

/**
 * Componente de la vista admin.
 * Gestiona usuarios y productos con operaciones CRUD.
 */
@Component({
  selector: 'app-admin-dashboard',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  @ViewChild('formularioRef') formularioRef!: ElementRef;

  /** Lista de usuarios registrados */
  usuarios: any[] = [];

  /** Lista de productos activos desde json-server */
  productos: any[] = [];

  /** Controla si se muestra el formulario */
  mostrarFormulario: boolean = false;

  /** Producto seleccionado para editar */
  productoEditando: any = null;

  /** Mensaje de confirmación a mostrar */
  mensajeConfirmacion: string = '';

  /** Producto pendiente de eliminar */
  productoPendienteEliminar: any = null;

  /** Controla si se muestra el modal de confirmación */
  mostrarConfirmacion: boolean = false;

  /** Modelo del formulario */
  formulario = {
    nombre: '',
    categoria: '',
    precio: 0,
    descuento: '',
    stock: 0,
    imagen: ''
  };

  /** Lista de categorías disponibles */
  categorias = ['Juegos de Rol', 'Juegos Familiares', 'Juegos de Estrategia', 'Juegos de Fiesta'];

  constructor(
    private session: SessionService,
    private router: Router,
    private crudService: CrudProductosService,
    private cdr: ChangeDetectorRef
  ) {}

  /**
   * Inicializa el dashboard cargando usuarios y productos
   */
  ngOnInit() {
    this.usuarios = this.session.getUsuarios();
    this.cargarProductos();
  }

  /**
   * Carga los productos activos desde json-server
   */
  cargarProductos() {
    this.crudService.getProductos().subscribe({
      next: (data) => {
        this.productos = data.filter((p: any) => p.activo !== false);
        this.cdr.detectChanges();
      }
    });
  }

  /**
   * Abre el formulario para crear un nuevo producto
   */
  nuevoProducto() {
    this.productoEditando = null;
    this.formulario = { nombre: '', categoria: '', precio: 0, descuento: '', stock: 0, imagen: '' };
    this.mostrarFormulario = true;
    setTimeout(() => {
    this.formularioRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.scrollBy(0, -100);
    }, 100);
  }

  /**
   * Abre el formulario para editar un producto existente
   * @param producto Producto a editar
   */
  editarProducto(producto: any) {
    this.productoEditando = producto;
    this.formulario = { ...producto };
    this.mostrarFormulario = true;
    setTimeout(() => {
      this.formularioRef?.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }

  /**
   * Guarda el producto — crea o actualiza según corresponda
   */
  guardarProducto() {
    /**
     * Se valida que se rellen todos los campos
     */
    if (!this.formulario.nombre || !this.formulario.categoria || 
        !this.formulario.descuento || !this.formulario.imagen) {
      alert('Por favor completa todos los campos');
      return;
    }

    /**
     * Se valida que el precio sea mayor a 0
     */
    if (this.formulario.precio <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }
    /**
     * Se valida que el stock no sea negativo
     */
    if (this.formulario.stock < 0) {
      alert('El stock no puede ser negativo');
      return;
    }
    /**
     * Se valida que el precio y el stock sean numero enteros
     */

    if (!Number.isInteger(this.formulario.precio) || !Number.isInteger(this.formulario.stock)) {
      alert('El precio y el stock deben ser números enteros');
      return;
    }

    if (this.productoEditando) {
      this.crudService.actualizarProducto(this.productoEditando.id, { ...this.formulario, activo: true }).subscribe({
        next: () => {
          this.mostrarFormulario = false;
          this.cargarProductos();
        }
      });
    } else {
      this.crudService.crearProducto({ ...this.formulario, activo: true }).subscribe({
        next: () => {
          this.mostrarFormulario = false;
          this.cargarProductos();
        }
      });
    }
  }

  /**
  * Muestra confirmación antes de eliminar
  */
  confirmarEliminar(producto: any) {
    this.productoPendienteEliminar = producto;
    this.mensajeConfirmacion = `¿Estás seguro de eliminar "${producto.nombre}"?`;
    this.mostrarConfirmacion = true;
  }

  /**
  * Ejecuta la eliminación lógica confirmada
  */
  eliminarProducto() {
    if (this.productoPendienteEliminar) {
      this.crudService.eliminarProducto(this.productoPendienteEliminar.id, this.productoPendienteEliminar).subscribe({
        next: () => {
          this.mostrarConfirmacion = false;
          this.productoPendienteEliminar = null;
          this.cargarProductos();
        }
      });
    } 
  }

  /**
  * Cancela la eliminación
  */
  cancelarEliminar() {
    this.mostrarConfirmacion = false;
    this.productoPendienteEliminar = null;
  }

  /**
   * Cancela el formulario de crear/editar
  */
  cancelar() {
    this.mostrarFormulario = false;
    this.productoEditando = null;
  }
  
  /**
   * Cierra la sesión del administrador
   */
  cerrarSesion() {
    this.session.cerrarSesion();
    this.router.navigate(['/']);
  }
}