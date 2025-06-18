import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = `${enviroment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  getAll(filtro: Record<string, string> = {}, page?: number): Observable<Payment[]> {
    const params = new HttpParams({ fromObject: { ...filtro, ...(page ? { page } : {}) } });
    return this.http.get<Payment[]>(this.apiUrl, {
      headers: AuthService.getHeaders(),
      params
    });
  }

  getById(id: string): Observable<Payment> {
    return this.http.get<Payment>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  create(data: Partial<Payment>): Observable<Payment> {
    return this.http.post<Payment>(this.apiUrl, data, {
      headers: AuthService.getHeaders()
    });
  }

  update(id: string, data: Partial<Payment>): Observable<Payment> {
    return this.http.put<Payment>(`${this.apiUrl}?id=${id}`, data, {
      headers: AuthService.getHeaders()
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  getAtributos(): string[] {
    return ['_id', 'orderId', 'userId', 'amount', 'status', 'createdAt'];
  }
}
