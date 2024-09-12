import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '@core/enums/local-storage.enum';
import {
  LoginPayload,
  LoginResponse,
  RefreshTokenResponse,
  RegisterPayload,
  RegisterResponse,
} from '@core/interfaces/authentication.interface';
import { environment } from '@environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);
  private readonly baseUrl = environment.apiUrl;

  login(user: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.baseUrl + '/auth/login', user);
  }

  logout() {
    localStorage.removeItem(LocalStorage.AccessToken);
    localStorage.removeItem(LocalStorage.RefreshToken);
    this.router.navigate(['/login']);
  }

  register(registerPayload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      this.baseUrl + '/auth/register',
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
