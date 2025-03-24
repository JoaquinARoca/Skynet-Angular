import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Drone {
  _id?: string;
  id: string;
  name: string;
  model: string;
  price: number;
  description: string;
  images: string[];
  type: 'venta' | 'alquiler';
  condition: 'nuevo' | 'usado';
  location: string;
  contact: string;
  category: string;
  sellerId: string;
  createdAt?: Date;
  ratings?: Array<{ userId: string; rating: number; comment: string }>;
}

@Injectable({
  providedIn: 'root'
})
export class DronesService {
  private apiUrl = 'http://localhost:9000/api/drones';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Drone[]> {
    return this.http.get<Drone[]>(this.apiUrl);
  }

  getOne(id: string): Observable<Drone> {
    return this.http.get<Drone>(`${this.apiUrl}/${id}`);
  }

  create(drone: Drone): Observable<Drone> {
    return this.http.post<Drone>(this.apiUrl, drone);
  }

  update(id: string, drone: Drone): Observable<Drone> {
    return this.http.put<Drone>(`${this.apiUrl}/${id}`, drone);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  addReview(droneId: string, review: { userId: string; rating: number; comment: string }): Observable<Drone> {
    return this.http.post<Drone>(`${this.apiUrl}/${droneId}/review`, review);
  }

  getByCategory(category: string): Observable<Drone[]> {
    return this.http.get<Drone[]>(`${this.apiUrl}/category/${category}`);
  }

  getByPriceRange(min: number, max: number): Observable<Drone[]> {
    return this.http.get<Drone[]>(`${this.apiUrl}/price?min=${min}&max=${max}`);
  }
}
