import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { AdminDashboard } from './admin-dashboard';

describe('AdminDashboard', () => {
  let component: AdminDashboard;
  let fixture: ComponentFixture<AdminDashboard>;

  beforeEach(async () => {
    sessionStorage.setItem('usuarioActivo', JSON.stringify({
      nombre: 'Administrador',
      nombreUsuario: 'admin',
      correo: 'admin@tuturno.cl',
      fecha: '1990-01-01',
      rol: 'admin'
    }));

    await TestBed.configureTestingModule({
      imports: [AdminDashboard],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar el formulario al llamar nuevoProducto()', () => {
    component.nuevoProducto();
    expect(component.mostrarFormulario).toBe(true);
    expect(component.productoEditando).toBeNull();
  });

  it('debería ocultar el formulario al llamar cancelar()', () => {
    component.mostrarFormulario = true;
    component.cancelar();
    expect(component.mostrarFormulario).toBe(false);
  });

  it('debería cargar los datos del producto al llamar editarProducto()', () => {
    const producto = {
      id: 1,
      nombre: 'Caos en Neverwinter',
      categoria: 'Juegos de Rol',
      precio: 59990,
      descuento: '10% con pagos en transferencia',
      stock: 30,
      imagen: 'img/caosNeverwinter .webp'
    };
    component.editarProducto(producto);
    expect(component.mostrarFormulario).toBe(true);
    expect(component.productoEditando).toEqual(producto);
    expect(component.formulario.nombre).toBe('Caos en Neverwinter');
    expect(component.formulario.precio).toBe(59990);
  });

  it('debería mostrar confirmación al llamar confirmarEliminar()', () => {
    const producto = { id: 1, nombre: 'Caos en Neverwinter' };
    component.confirmarEliminar(producto);
    expect(component.mostrarConfirmacion).toBe(true);
    expect(component.productoPendienteEliminar).toEqual(producto);
  });

  it('debería ocultar confirmación al llamar cancelarEliminar()', () => {
    component.mostrarConfirmacion = true;
    component.cancelarEliminar();
    expect(component.mostrarConfirmacion).toBe(false);
    expect(component.productoPendienteEliminar).toBeNull();
  });
});