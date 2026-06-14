import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegosFamiliares } from './juegos-familiares';

describe('JuegosFamiliares', () => {
  let component: JuegosFamiliares;
  let fixture: ComponentFixture<JuegosFamiliares>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JuegosFamiliares],
    }).compileComponents();

    fixture = TestBed.createComponent(JuegosFamiliares);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
