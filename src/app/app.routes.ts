import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { JuegosEstrategia } from './pages/juegos-estrategia/juegos-estrategia';
import { JuegosFamiliares } from './pages/juegos-familiares/juegos-familiares';
import { JuegosFiesta } from './pages/juegos-fiesta/juegos-fiesta';
import { JuegosRol } from './pages/juegos-rol/juegos-rol';
import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { RecuperarContrasena } from './pages/recuperar-contrasena/recuperar-contrasena';
import { Carrito } from './pages/carrito/carrito';
import { Perfil } from './pages/perfil/perfil';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'juegos-estrategia', component: JuegosEstrategia },
  { path: 'juegos-familiares', component: JuegosFamiliares },
  { path: 'juegos-fiesta', component: JuegosFiesta },
  { path: 'juegos-rol', component: JuegosRol },
  { path: 'login', component: Login },
  { path: 'registro', component: Registro },
  { path: 'recuperar-contrasena', component: RecuperarContrasena },
  { path: 'carrito', component: Carrito },
  { path: 'perfil', component: Perfil },
  { path: 'admin', component: AdminDashboard },
  { path: '**', redirectTo: '' }
];
