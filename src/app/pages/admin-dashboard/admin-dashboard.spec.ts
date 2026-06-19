import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
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
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});