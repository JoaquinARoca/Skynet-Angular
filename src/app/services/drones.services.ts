import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Drone } from '../models/drone.model';
import { AuthService } from './auth.service';
import { enviroment } from '../enviroment';

@Injectable({ providedIn: 'root' })
export class DroneService {
  private apiUrl = `${enviroment.apiUrl}/drones`;

  constructor(private http: HttpClient) {}

  getAll(filtro: Record<string, string> = {}, page?: number): Observable<Drone[]> {
    const params = new HttpParams({ fromObject: { ...filtro, ...(page ? { page } : {}) } });
    return this.http.get<Drone[]>(this.apiUrl, {
      headers: AuthService.getHeaders(),
      params
    });
  }

  getById(id: string): Observable<Drone> {
    return this.http.get<Drone>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  create(data: Partial<Drone>): Observable<Drone> {
    return this.http.post<Drone>(this.apiUrl, data, {
      headers: AuthService.getHeaders()
    });
  }

  update(id: string, data: Partial<Drone>): Observable<Drone> {
    return this.http.put<Drone>(`${this.apiUrl}?id=${id}`, data, {
      headers: AuthService.getHeaders()
    });
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}?id=${id}`, {
      headers: AuthService.getHeaders()
    });
  }

  getAtributos(): (keyof Drone)[] {
    return [
      'id', 'ownerId', 'model', 'price', 'details', 'category', 'condition',
      'location', 'contact', 'images', 'createdAt', 'status', 'ratings',
      'currency', 'buyerId', 'stock'
    ];
  }
}
