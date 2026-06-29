import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Registro } from './registro';

/**
 * Pruebas unitarias para el componente de registro.
 * Valida el comportamiento del formulario reactivo.
 */

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

  /**
   * Configuración inicial del módulo de pruebas antes de cada test
   */

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registro],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Registro);
    component = fixture.componentInstance;
    component.ngOnInit();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el formulario sea inválido cuando los campos obligatorios están vacíos
   */

  it('debería marcar el formulario como inválido si los campos obligatorios están vacíos', () => {
    expect(component.formularioRegistro.valid).toBe(false);
  });

  /**
   * Verifica que el campo correo sea inválido si no cumple el formato de email
   */

  it('debería marcar el campo correo como inválido si el formato no es válido', () => {
    component.formularioRegistro.get('correo')?.setValue('correo-invalido');
    expect(component.formularioRegistro.get('correo')?.valid).toBe(false);
  });

   /**
   * Verifica que la contraseña sea inválida si supera los 18 caracteres permitidos
   */
  it('debería marcar la contraseña como inválida si supera el largo máximo', () => {
    component.formularioRegistro.get('contrasena')?.setValue('constrasenainvalido');
    expect(component.formularioRegistro.get('contrasena')?.valid).toBe(false);
  })

  /**
 * Verifica que la contraseña sea inválida si no cumple el patrón de seguridad
 */
it('debería marcar la contraseña como inválida si no tiene mayúscula ni número', () => {
  component.formularioRegistro.get('contrasena')?.setValue('sinmayuscula');
  expect(component.formularioRegistro.get('contrasena')?.valid).toBe(false);
});

/**
 * Verifica que confirmarContrasena sea inválida si las contraseñas no coinciden
 */
it('debería marcar confirmarContrasena con error si las contraseñas no coinciden', () => {
  component.formularioRegistro.patchValue({
    nombre: 'Test',
    nombreUsuario: 'testuser',
    correo: 'test@test.cl',
    contrasena: 'Admin123!',
    confirmarContrasena: 'OtraPass123!',
    fechaNacimiento: '2000-01-01'
  });
  component.registro();
  expect(component.formularioRegistro.get('confirmarContrasena')?.errors?.['noCoincide']).toBeTruthy();
});

/**
 * Verifica que la fecha sea inválida si el usuario es menor de 13 años
 */
it('debería marcar fechaNacimiento con error si el usuario tiene menos de 13 años', () => {
  const hoy = new Date();
  const fechaJoven = new Date(hoy.getFullYear() - 10, hoy.getMonth(), hoy.getDate());
  const fechaStr = fechaJoven.toISOString().split('T')[0];
  component.formularioRegistro.patchValue({
    nombre: 'Test',
    nombreUsuario: 'test',
    correo: 'test@test.cl',
    contrasena: 'Admin123!',
    confirmarContrasena: 'Admin123!',
    fechaNacimiento: fechaStr
  });
  component.registro();
  expect(component.formularioRegistro.get('fechaNacimiento')?.errors?.['menorEdad']).toBeTruthy();
  });
});