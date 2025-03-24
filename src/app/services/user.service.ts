import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id?: string;
  userName: string;
  email: string;
  password: string;
  role: 'Administrador' | 'Usuario' | 'Empresa' | 'Gobierno';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // Asegúrate de que la URL concuerda con la de tu backend (puedes extraerla a un environment)
  private apiUrl = 'http://localhost:9000/api';

  constructor(private http: HttpClient) {}

  // Registro de un nuevo usuario
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/signup`, user);
  }

  // Login de usuario
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/login`, { email, password });
  }

  // Obtener todos los usuarios
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  // Obtener un usuario por ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }

  // Actualizar un usuario
  updateUser(id: string, userData: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, userData);
  }

  // Eliminar (borrado lógico) un usuario
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
}
