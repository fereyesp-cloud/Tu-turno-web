import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private usuarioActivoSubject = new BehaviorSubject<any>(this.getUsuarioActivo());
  usuarioActivo$ = this.usuarioActivoSubject.asObservable();

  constructor() {
    this.crearAdminSiNoExiste();
  }

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

  getUsuarios(): any[] {
    return JSON.parse(localStorage.getItem('usuarios') || '[]');
  }

  getUsuarioActivo(): any {
    return JSON.parse(sessionStorage.getItem('usuarioActivo') || 'null');
  }

  setUsuarioActivo(usuario: any) {
    sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    this.usuarioActivoSubject.next(usuario);
  }

  cerrarSesion() {
    sessionStorage.removeItem('usuarioActivo');
    this.usuarioActivoSubject.next(null);
  }

  estaLogueado(): boolean {
    return this.usuarioActivoSubject.getValue() !== null;
  }

  esAdmin(): boolean {
    const usuario = this.usuarioActivoSubject.getValue();
    return usuario !== null && usuario.rol === 'admin';
  }

  getCarrito(): any[] {
    return JSON.parse(localStorage.getItem('carrito') || '[]');
  }

  agregarAlCarrito(nombre: string, precio: string, imagen: string) {
    const carrito = this.getCarrito();
    carrito.push({ nombre, precio, imagen });
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  vaciarCarrito() {
    localStorage.removeItem('carrito');
  }
}