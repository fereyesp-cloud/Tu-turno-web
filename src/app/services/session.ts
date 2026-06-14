import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

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

  cerrarSesion() {
    sessionStorage.removeItem('usuarioActivo');
  }

  estaLogueado(): boolean {
    return this.getUsuarioActivo() !== null;
  }

  esAdmin(): boolean {
    const usuario = this.getUsuarioActivo();
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