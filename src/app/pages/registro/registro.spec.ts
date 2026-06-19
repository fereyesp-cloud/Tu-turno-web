import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Registro } from './registro';

describe('Registro', () => {
  let component: Registro;
  let fixture: ComponentFixture<Registro>;

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

  it('debería marcar el formulario como inválido si los campos obligatorios están vacíos', () => {
    expect(component.formularioRegistro.valid).toBe(false);
  });

  it('debería marcar el campo correo como inválido si el formato no es válido', () => {
    component.formularioRegistro.get('correo')?.setValue('correo-invalido');
    expect(component.formularioRegistro.get('correo')?.valid).toBe(false);
  });
});