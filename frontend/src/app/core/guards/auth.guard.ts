import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateChildFn,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

export const canActivateAuth: CanActivateFn = (
  _: ActivatedRouteSnapshot,
  __: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const hasAccessToken = authService.getAccessToken();
  if (!hasAccessToken) {
    authService.alertMessageLogout();
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const canActivateChildAuth: CanActivateChildFn = (
  _: ActivatedRouteSnapshot,
  __: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const hasAccessToken = authService.getAccessToken();
  if (!hasAccessToken) {
    authService.alertMessageLogout();
    router.navigate(['/login']);
    return false;
  }
  return true;
};
