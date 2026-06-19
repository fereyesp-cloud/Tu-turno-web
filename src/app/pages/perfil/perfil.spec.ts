import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Perfil } from './perfil';

describe('Perfil', () => {
  let component: Perfil;
  let fixture: ComponentFixture<Perfil>;

  beforeEach(async () => {
    sessionStorage.setItem('usuarioActivo', JSON.stringify({
      nombre: 'Test',
      nombreUsuario: 'testuser',
      correo: 'test@test.cl',
      fecha: '1990-01-01',
      rol: 'cliente'
    }));

    await TestBed.configureTestingModule({
      imports: [Perfil],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(Perfil);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});