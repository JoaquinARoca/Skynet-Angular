import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = `${enviroment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  getAll(
    filtro: Record<string, string> = {},
    page: number = 1,
    limit: number = 10
  ): Observable<{ users: User[], pages: number }> {
    const params = new HttpParams({
      fromObject: {
        ...filtro,
        page: page.toString(),
        limit: limit.toString()
      }
    });

    return this.http.get<{ users: User[], pages: number }>(this.apiUrl, {
      headers: AuthService.getHeaders(),
      params
    });
  }


  create(data: Partial<User>): Observable<User> {
    return this.http.post<User>(this.apiUrl, data, {
      headers: AuthService.getHeaders()
    });
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  update(id: string, data: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, data, {
      headers: AuthService.getHeaders()
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: AuthService.getHeaders()
    });
  }


  getAtributos():string[] {
    return [
      '_id', 'userName', 'email', 'password', 'isDeleted', 'role',
      'favorites', 'following', 'balance', 'purchases', 'sales'
    ];
  }
}
