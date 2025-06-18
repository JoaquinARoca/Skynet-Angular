import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = `${enviroment.apiUrl}/messages`;

  constructor(private http: HttpClient) {}

  getAll(filtro: Record<string, string> = {}, page?: number): Observable<Message[]> {
    const params = new HttpParams({ fromObject: { ...filtro, ...(page ? { page } : {}) } });
    return this.http.get<Message[]>(this.apiUrl, {
      headers: AuthService.getHeaders(),
      params
    });
  }

  getById(id: string): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  create(data: Partial<Message>): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, data, {
      headers: AuthService.getHeaders()
    });
  }

  update(id: string, data: Partial<Message>): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}?id=${id}`, data, {
      headers: AuthService.getHeaders()
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  getAtributos(): string[] {
    return ['_id', 'senderId', 'receiverId', 'content', 'createdAt', 'updatedAt'];
  }
}
