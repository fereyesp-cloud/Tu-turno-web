import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { JuegosFiesta } from './juegos-fiesta';

describe('JuegosFiesta', () => {
  let component: JuegosFiesta;
  let fixture: ComponentFixture<JuegosFiesta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosFiesta],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosFiesta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});