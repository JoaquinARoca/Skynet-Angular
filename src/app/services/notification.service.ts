import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private apiUrl = `${enviroment.apiUrl}/notifications`;

  constructor(private http: HttpClient) {}

  getAll(filtro: Record<string, string> = {}, page?: number): Observable<Notification[]> {
    const params = new HttpParams({ fromObject: { ...filtro, ...(page ? { page } : {}) } });
    return this.http.get<Notification[]>(this.apiUrl, {
      headers: AuthService.getHeaders(),
      params
    });
  }

  getById(id: string): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  create(data: Partial<Notification>): Observable<Notification> {
    return this.http.post<Notification>(this.apiUrl, data, {
      headers: AuthService.getHeaders()
    });
  }

  update(id: string, data: Partial<Notification>): Observable<Notification> {
    return this.http.put<Notification>(`${this.apiUrl}?id=${id}`, data, {
      headers: AuthService.getHeaders()
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  getAtributos(): string[] {
    return ['_id', 'to', 'from', 'type', 'post', 'read', 'createdAt'];
  }
}
