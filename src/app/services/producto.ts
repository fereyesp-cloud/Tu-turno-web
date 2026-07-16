import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/**
 * Interfaz que define la estructura de un producto
 */
export interface Producto {
  /** ID único del producto */
  id?: number;
  /** Nombre del producto */
  nombre: string;
  /** Categoría del producto */
  categoria: string;
  /** Descripción del producto */
  descripcion?: string;
  /** Precio numérico del producto */
  precio: number;
  /** Precio formateado del producto */
  precioData?: string;
  /** Información de descuento */
  descuento: string;
  /** Ruta de la imagen del producto */
  imagen: string;
  /** Stock disponible */
  stock?: number;
  /** Estado activo/inactivo del producto */
  activo?: boolean;
}

/**
 * Servicio para la gestión de productos de la tienda
 */
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  /** URL base de json-server */
  private url = '/api/productos';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos activos
   * @returns Observable con todos los productos
   */
  getProductos(): Observable<any> {
    return this.http.get<any[]>(this.url).pipe(
      map((productos: any[]) => ({
        categorias: this.agruparPorCategoria(productos.filter(p => p.activo !== false))
      }))
    );
  }

  /**
   * Agrupa los productos por categoría
   * @param productos Lista de productos
   * @returns Array de categorías con sus productos
   */
  private agruparPorCategoria(productos: any[]): any[] {
    const mapa: { [key: string]: any[] } = {};
    productos.forEach(p => {
      if (!mapa[p.categoria]) mapa[p.categoria] = [];
      mapa[p.categoria].push(p);
    });
    return Object.keys(mapa).map(cat => ({ categoria: cat, productos: mapa[cat] }));
  }

  /**
   * Obtiene los juegos de una categoría específica
   * @param categoria Nombre de la categoría
   * @returns Observable con los productos de esa categoría
   */
  getPorCategoria(categoria: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}?categoria=${categoria}&activo=true`);
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