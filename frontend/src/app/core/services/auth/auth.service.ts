import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@core/enums/local-storage.enum';
import {
  InviteResponse,
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RegisterPayload,
  RegisterResponse,
} from '@core/interfaces/authentication.interface';
import { environment } from '@environment/environment';

import { Observable } from 'rxjs';
import { ToastAlertService } from '../toast-alert/toast-alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private toastAlertService: ToastAlertService = inject(ToastAlertService);
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private readonly baseUrl = environment.apiUrl;

  login(user: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + '/auth/login', user);
  }

  logoutByUser() {
    localStorage.removeItem(LocalStorage.AccessToken);
    localStorage.removeItem(LocalStorage.RefreshToken);
    this.toastAlertService.addSuccessMessage({
      title: 'Success',
      description: 'User logged out',
    });
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem(LocalStorage.AccessToken);
    localStorage.removeItem(LocalStorage.RefreshToken);
    this.alertMessageLogout();
    this.router.navigate(['/login']);
  }

  alertMessageLogout() {
    this.toastAlertService.addWarningMessage({
      title: 'Warning',
      description: 'User logged out',
    });
  }

  register(registerPayload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      this.baseUrl + '/auth/register',
      registerPayload
    );
  }

  invite(
    inviteId: string,
    registerPayload: RegisterPayload
  ): Observable<InviteResponse> {
    return this.http.post<InviteResponse>(
      this.baseUrl + `/auth/invite/${inviteId}`,
      registerPayload
    );
  }

  refreshToken(): Observable<RefreshTokenResponse> {
    const refreshToken =
      localStorage.getItem(LocalStorage.RefreshToken) ?? null;
    return this.http.post<RefreshTokenResponse>(
      this.baseUrl + '/auth/refresh-token',
      {
        refreshToken,
      }
    );
  }

  getAccessToken() {
    return localStorage.getItem(LocalStorage.AccessToken) ?? null;
  }

  setTokens({ accessToken, refreshToken }: LoginResponse) {
    localStorage.setItem(LocalStorage.AccessToken, accessToken);
    localStorage.setItem(LocalStorage.RefreshToken, refreshToken);
  }

  setAccessToken(accessToken: string) {
    localStorage.setItem(LocalStorage.AccessToken, accessToken);
  }
}
