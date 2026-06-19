import { TestBed } from '@angular/core/testing';
import { SessionService } from './session';

describe('SessionService', () => {
  let service: SessionService;

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionService);
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('debería crear automáticamente un usuario admin si no existe', () => {
    const usuarios = service.getUsuarios();
    const admin = usuarios.find((u: any) => u.nombreUsuario === 'admin');
    expect(admin).toBeTruthy();
    expect(admin.rol).toBe('admin');
  });
});