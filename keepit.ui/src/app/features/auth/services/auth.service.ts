import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { LoginRequest, LoginResponse, UserRequest } from '../../../shared/user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private readonly baseUrl = `${environment.apiUrl}/auth`;

  signUp(newUser: UserRequest) {
    return this.http.post(`${this.baseUrl}/signup`, newUser);
  }

  signIn(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.baseUrl}/signin`, credentials);
  }
}
