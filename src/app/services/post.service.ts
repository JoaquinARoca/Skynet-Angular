import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class PostService {
  private apiUrl = `${enviroment.apiUrl}/posts`;

  constructor(private http: HttpClient) {}

  getAll(filtro: Record<string, string> = {}, page?: number): Observable<Post[]> {
    const params = new HttpParams({ fromObject: { ...filtro, ...(page ? { page } : {}) } });
    return this.http.get<Post[]>(this.apiUrl, {
      headers: AuthService.getHeaders(),
      params
    });
  }

  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  create(data: Partial<Post>): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, data, {
      headers: AuthService.getHeaders()
    });
  }

  update(id: string, data: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}?id=${id}`, data, {
      headers: AuthService.getHeaders()
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  getAtributos(): string[] {
    return [
      '_id', 'author', 'mediaUrl', 'mediaType', 'description', 'location',
      'tags', 'likes', 'comments', 'createdAt', 'updatedAt'
    ];
  }
}
