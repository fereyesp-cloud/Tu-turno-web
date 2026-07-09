import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session';

/**
 * Guard que protege rutas exclusivas para administradores.
 * Redirige al home si el usuario no es admin.
 */
export const adminGuard: CanActivateFn = (route, state) => {
  const session = inject(SessionService);
  const router = inject(Router);

  if (session.esAdmin()) {
    return true;
  }

  router.navigate(['/']);
  return false;
};