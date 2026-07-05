import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosApi } from './productos-api';

describe('ProductosApi', () => {
  let component: ProductosApi;
  let fixture: ComponentFixture<ProductosApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductosApi],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductosApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
