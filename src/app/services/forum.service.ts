// src/app/services/forum.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum } from '../models/forum.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class ForumService {
  private apiUrl = `${enviroment.apiUrl}/forum`;

  constructor(private http: HttpClient) {}

  getAll(atributo: string, filtro: string, page: number): Observable<Forum[]> {
    const query = atributo ? `?${atributo}=${filtro}&page=${page}` : `?page=${page}`;
    return this.http.get<Forum[]>(`${this.apiUrl}${query}`,{
          headers: AuthService.getHeaders()
        });
  }

  getById(id: string): Observable<Forum> {
    return this.http.get<Forum>(`${this.apiUrl}?id=${id}`);
  }

  create(data: Partial<Forum>): Observable<Forum> {
    return this.http.post<Forum>(this.apiUrl, data);
  }

  update(id: string, data: Partial<Forum>): Observable<Forum> {
    return this.http.put<Forum>(`${this.apiUrl}?id=${id}`, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`);
  }

  getAtributos(): (keyof Forum)[] {
    return ['id', 'name', 'comment']; // Reemplaza con los atributos reales del modelo Forum
  }
}