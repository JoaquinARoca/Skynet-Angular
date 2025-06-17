// src/app/services/comment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class CommentService {
  private apiUrl = `${enviroment.apiUrl}/comments`;
  constructor(private http: HttpClient) {}

  getAll(atributo: string, filtro: string, page: number): Observable<Comment[]> {
    const query = atributo ? `?${atributo}=${filtro}&page=${page}` : `?page=${page}`;
    return this.http.get<Comment[]>(`${this.apiUrl}${query}`,{headers:AuthService.getHeaders()});
  }

  getById(id: string): Observable<Comment> {
    return this.http.get<Comment>(`${this.apiUrl}?id=${id}`,{headers:AuthService.getHeaders()});
  }

  create(data: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, data,{headers:AuthService.getHeaders()});
  }

  update(id: string, data: Partial<Comment>): Observable<Comment> {
    return this.http.put<Comment>(`${this.apiUrl}?id=${id}`, data,{headers:AuthService.getHeaders()});
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`,{headers:AuthService.getHeaders()});
  }

  getAtributos(): (keyof Comment)[] {
    return ['droneId', 'userId', 'text','rating','parentCommentId','createdAt']; // Reemplaza con los atributos reales del modelo Comment
  }
}