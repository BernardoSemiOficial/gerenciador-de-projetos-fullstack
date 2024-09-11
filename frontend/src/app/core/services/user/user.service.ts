import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http: HttpClient = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/';

  getUsers() {
    return this.http.get(this.baseUrl + 'api/users');
  }
}
