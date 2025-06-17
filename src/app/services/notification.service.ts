// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = 'http://localhost/api/notification';

  constructor(private http: HttpClient) {}

  getAll(atributo: string, filtro: string, page: number): Observable<Notification[]> {
    const query = atributo ? `?${atributo}=${filtro}&page=${page}` : `?page=${page}`;
    return this.http.get<Notification[]>(`${this.apiUrl}${query}`,{
          headers: AuthService.getHeaders()
        });
  }

  getById(id: string): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrl}?id=${id}`,{
          headers: AuthService.getHeaders()
        });
  }

  create(data: Partial<Notification>): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, data,{
          headers: AuthService.getHeaders()
        });
  }

  update(id: string, data: Partial<Notification>): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}?id=${id}`, data,{
          headers: AuthService.getHeaders()
        });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`,{
          headers: AuthService.getHeaders()
        });
  }

  getAtributos(): (keyof Notification)[] {
    return ['id', 'to', 'from','createAt','read','type','post']; // Se mantienen igual como en la plantilla original
  }
}