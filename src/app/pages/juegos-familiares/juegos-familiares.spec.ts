import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { JuegosFamiliares } from './juegos-familiares';

describe('JuegosFamiliares', () => {
  let component: JuegosFamiliares;
  let fixture: ComponentFixture<JuegosFamiliares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosFamiliares],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosFamiliares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});