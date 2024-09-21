import { Injectable } from '@angular/core';

import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceMock {
  logoutByUser() {}
  logout() {}
  alertMessageLogout() {}
  setTokens() {}
  setAccessToken() {}

  login() {
    return of({});
  }

  register() {
    return of({});
  }

  invitation() {
    return of({});
  }

  refreshToken() {
    return of({});
  }

  getAccessToken() {
    return {};
  }
}
