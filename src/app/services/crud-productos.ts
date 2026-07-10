import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Servicio CRUD para gestión de productos via json-server
 */
@Injectable({
  providedIn: 'root'
})
export class CrudProductosService {

  /** URL base de la API json-server */
  private url = '/api/productos';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene todos los productos
   * @returns Observable con lista de productos
   */
  getProductos(): Observable<any[]> {
    return this.http.get<any[]>(this.url);
  }

  /**
   * Obtiene un producto por id
   * @param id ID del producto
   * @returns Observable con el producto
   */
  getProductoPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  /**
   * Crea un nuevo producto
   * @param producto Objeto del producto a crear
   * @returns Observable con el producto creado
   */
  crearProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.url, producto);
  }

  /**
   * Actualiza un producto existente
   * @param id ID del producto a actualizar
   * @param producto Objeto con los datos actualizados
   * @returns Observable con el producto actualizado
   */
  actualizarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, producto);
  }

 /**
 * Eliminación lógica — marca el producto como inactivo
 * @param id ID del producto a desactivar
 * @param producto Objeto completo del producto
 * @returns Observable con el producto actualizado
 */
  eliminarProducto(id: number, producto: any): Observable<any> {
    return this.http.put<any>(`${this.url}/${id}`, { ...producto, activo: false });
  }
}