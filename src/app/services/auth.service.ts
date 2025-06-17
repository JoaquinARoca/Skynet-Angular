import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { enviroment } from '../enviroment';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  role: 'Administrador' | 'Usuario' | 'Empresa' | 'Gobierno';
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${enviroment.apiUrl}/auth`;
  constructor(private http: HttpClient) {}

  static getHeaders(): HttpHeaders{
    const token = localStorage.getItem('access_token') || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return headers;
  }
  
  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((res: any) => {
        localStorage.setItem('access_token', res.accesstoken);
        localStorage.setItem('refreshToken', res.refreshToken);
        localStorage.setItem('userId', res.user._id);
      })
    );
  }

  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, payload);
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
