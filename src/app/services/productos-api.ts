import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio para consumir productos desde GitHub Pages
 */
@Injectable({
  providedIn: 'root'
})
export class ProductosApiService {

  /** URL del JSON publicado en GitHub Pages */
 private url = 'https://fereyesp-cloud.github.io/api-productos/productos.json';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene los productos desde el JSON publicado en GitHub Pages
   * @returns Observable con los datos del JSON
   */
  getProductos(): Observable<any> {
    return this.http.get<any>(this.url);
  }
}