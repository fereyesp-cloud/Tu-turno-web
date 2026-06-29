import { TestBed } from '@angular/core/testing';
import { SessionService } from './session';

/**
 * Pruebas unitarias para el componente de session.
 * Valida el comportamiento de la session.
 */

describe('SessionService', () => {
  let service: SessionService;

  /**
   * Configuración inicial del módulo de pruebas antes de cada test
   */

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  /**
  * Verifica que el servicio de sesión se instancia correctamente
  */

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  /**
   * verifica que se crea un usuario admin si no existe
   */

  it('debería crear automáticamente un usuario admin si no existe', () => {
    const usuarios = service.getUsuarios();
    const admin = usuarios.find((u: any) => u.nombreUsuario === 'admin');
    expect(admin).toBeTruthy();
    expect(admin.rol).toBe('admin');
  });
});