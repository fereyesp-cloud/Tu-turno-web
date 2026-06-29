import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


/**
 * Servicio de gestion de session de usuario.
 * manejo el estado de autenticación, localStorage y sessionStorage
 */
@Injectable({
  providedIn: 'root'
})
export class SessionService {

  /**Subject que emite el usuario activo cuando cambia */
  private usuarioActivoSubject = new BehaviorSubject<any>(this.getUsuarioActivo());
  /**Observable del usuario activo */
  usuarioActivo$ = this.usuarioActivoSubject.asObservable();

  constructor() {
    this.crearAdminSiNoExiste();
  }

  /**
  * Crea el usuario administrador por defecto si no existe en localStorage
  */

  private crearAdminSiNoExiste() {
    const usuarios = this.getUsuarios();
    const adminExiste = usuarios.find((u: any) => u.nombreUsuario === 'admin');
    if (!adminExiste) {
      usuarios.push({
        nombre: 'Administrador',
        nombreUsuario: 'admin',
        correo: 'admin@tuturno.cl',
        contrasena: 'Admin123!',
        fecha: '1990-01-01',
        rol: 'admin'
      });
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }
  /**
   * Obtiene todos los usuarios usuario registrados desde localStorage
   * @returns array de usuarios
   */

  getUsuarios(): any[] {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  /**
   * Obtiene el usuario activo en sessionStorage
   *  @returns Objeto del usuario activo o null si no hay sesión
   */

  getUsuarioActivo(): any {
    return JSON.parse(sessionStorage.getItem('usuarioActivo') || 'null');
  }

  /**
   * Configura los usuarios activo del sessionStorage
   * @param usuario Objeto del usuario que inició sesión
   */

  setUsuarioActivo(usuario: any) {
    sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    this.usuarioActivoSubject.next(usuario);
  }

  /**
   * Cierra la sesión del usuario activo
   * 
   */

  cerrarSesion() {
    sessionStorage.removeItem('usuarioActivo');
    this.usuarioActivoSubject.next(null);
  }
  /**
  * Verifica si hay un usuario con sesión activa
  * @returns true si hay sesión activa, false en caso contrario
  */

  estaLogueado(): boolean {
    return this.usuarioActivoSubject.getValue() !== null;
  }
  /**
   * Valida que el usuario sea de tipo admin
   * @returns retorna si el usuario es admin o no
   */

  esAdmin(): boolean {
    const usuario = this.usuarioActivoSubject.getValue();
    return usuario !== null && usuario.rol === 'admin';
  }

  /**
  * Obtiene los productos del carrito desde localStorage
  * @returns Array de productos en el carrito
  */

  getCarrito(): any[] {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  /**
   * Muestra los productos agregados al carro
   * @param nombre muestra el nombre del producto
   * @param precio muestra el precio del producto
   * @param imagen muestra la imagen del producto
   */
  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    const carrito = this.getCarrito();
    carrito.push({ nombre, precio, imagen });
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  /**
   * Vacia los datos agregados al carro
   */

  vaciarCarrito() {
    localStorage.removeItem('carrito');
  }
}