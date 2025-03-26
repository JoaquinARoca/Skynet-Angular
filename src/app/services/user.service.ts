import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  _id?: string;
  userName: string;
  email: string;
  password?: string;
  role: 'Administrador' | 'Usuario' | 'Empresa' | 'Gobierno';
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // La URL base debe coincidir con la de tu backend
  private apiUrl = 'http://localhost:9000/api/users';

  constructor(private http: HttpClient) { }

  // Registro de un nuevo usuario
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, user);
  }

  // Login de usuario
  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Obtener todos los usuarios (solo los que no han sido eliminados)
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Obtener un usuario por ID
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un usuario
  updateUser(id: string, userData: Partial<User>): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }

  // Eliminar un usuario (borrado lógico)
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
