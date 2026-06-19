import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RecuperarContrasena } from './recuperar-contrasena';

describe('RecuperarContrasena', () => {
  let component: RecuperarContrasena;
  let fixture: ComponentFixture<RecuperarContrasena>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecuperarContrasena],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarContrasena);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});