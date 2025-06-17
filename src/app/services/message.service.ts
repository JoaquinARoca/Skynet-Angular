// src/app/services/message.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Message } from '../models/message.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class MessageService {
  private apiUrl = `${enviroment.apiUrl}/message`;
  constructor(private http: HttpClient) {}

  getAll(atributo: string, filtro: string, page: number): Observable<Message[]> {
    const query = atributo ? `?${atributo}=${filtro}&page=${page}` : `?page=${page}`;
    return this.http.get<Message[]>(`${this.apiUrl}${query}`,{
          headers: AuthService.getHeaders()
        });
  }

  getById(id: string): Observable<Message> {
    return this.http.get<Message>(`${this.apiUrl}?id=${id}`,{
          headers: AuthService.getHeaders()
        });
  }

  create(data: Partial<Message>): Observable<Message> {
    return this.http.post<Message>(this.apiUrl, data,{
          headers: AuthService.getHeaders()
        });
  }

  update(id: string, data: Partial<Message>): Observable<Message> {
    return this.http.put<Message>(`${this.apiUrl}?id=${id}`, data,{
          headers: AuthService.getHeaders()
        });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`,{
          headers: AuthService.getHeaders()
        });
  }

  getAtributos(): (keyof Message)[] {
    return ['id', 'senderId', 'receiverId','content']; // Sustituye por atributos reales del modelo Message
  }
}