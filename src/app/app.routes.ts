import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Catalogo } from './pages/catalogo/catalogo';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { RecuperarContrasena } from './pages/recuperar-contrasena/recuperar-contrasena';
import { Carrito } from './pages/carrito/carrito';
import { Perfil } from './pages/perfil/perfil';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { ProductosApi } from './pages/productos-api/productos-api';

/**
 * Definición de rutas de la aplicación Tu Turno Web.
 * Incluye rutas para home, catálogo dinámico por categoría,
 * autenticación, carrito, perfil y panel de administración.
 */

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'juegos/:categoria', component: Catalogo },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-contrasena', component: RecuperarContrasena },
  { path: 'carrito', component: Carrito },
  { path: 'perfil', component: Perfil },
  { path: 'admin', component: AdminDashboard },
  { path: 'productos-api', component: ProductosApi },
  { path: '**', redirectTo: '' }
];