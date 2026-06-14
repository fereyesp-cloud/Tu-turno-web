import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosEstrategia } from './juegos-estrategia';

describe('JuegosEstrategia', () => {
  let component: JuegosEstrategia;
  let fixture: ComponentFixture<JuegosEstrategia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosEstrategia],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosEstrategia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
