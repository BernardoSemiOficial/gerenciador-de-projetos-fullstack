import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';

export const canActivateAuth: CanActivateFn = () => {
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

export const canActivateChildAuth: CanActivateChildFn = () => {
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
