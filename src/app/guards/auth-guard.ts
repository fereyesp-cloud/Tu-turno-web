import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session';

/**
 * Guard que protege rutas que requieren sesión activa.
 * Redirige al login si no hay usuario logueado.
 */
export const authGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (session.estaLogueado()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};