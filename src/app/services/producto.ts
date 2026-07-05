import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/**
 * Interfaz que define la estructura de un producto
 */
export interface Producto {
  /**Nombre del producto */
  nombre: string;
  /**Categoria del producto */
  categoria: string;
  /**Descripcion del producto */
  descripcion?: string;
  /**Precio del producto */
  precio: string;
  precioData: string;
  /**Descuento del producto */
  descuento: string;
  /**Imagen del producto */
  imagen: string;
  /**ID del producto */
  id?: number;
  /**Stock del producto */
  stock?: number;
}

/**
 * Servicio para la gestión de productos de la tienda
 */
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  /** URL del JSON publicado en GitHub Pages */
  private url = 'https://fereyesp-cloud.github.io/api-productos/productos.json';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos desde GitHub Pages
   * @returns Observable con el JSON completo
   */
  getProductos(): Observable<any> {
    return this.http.get<any>(this.url);
  }

  /**
   * Obtiene los juegos de una categoría específica
   * @param categoria Nombre de la categoría a filtrar
   * @returns Observable con los productos de esa categoría
   */
  getPorCategoria(categoria: string): Observable<any[]> {
    return this.getProductos().pipe(
      map((data: any) => {
        const cat = data.categorias.find((c: any) => c.categoria === categoria);
        return cat ? cat.productos : [];
      })
    );
  }

  /**
   * Obtiene los juegos destacados (primero de cada categoría)
   * @returns Observable con un juego destacado de cada categoría
   */
  getDestacados(): Observable<any[]> {
    return this.getProductos().pipe(
      map((data: any) => data.categorias.map((c: any) => c.productos[0]))
    );
  }
}