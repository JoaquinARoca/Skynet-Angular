import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface RegisterPayload {
  userName: string;
  email: string;
  password: string;
  role: 'Administrador' | 'Usuario' | 'Empresa' | 'Gobierno';
}

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseUrl  = "http://localhost:9000/api/users";

  constructor(private http: HttpClient) { }
  
  login(payload: LoginPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, payload);
  }
  
  register(payload: RegisterPayload): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, payload);
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }
}
