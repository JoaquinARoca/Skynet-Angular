import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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
  status?: 'disponible' | 'vendido';
}

@Injectable({
  providedIn: 'root'
})
export class DronesService {
  private apiUrl = 'http://localhost:9000/api/drones';

  constructor(private http: HttpClient, private authService: AuthService) { }

  // Crear un nuevo dron
  create(drone: Drone): Observable<Drone> {
    const headers = this.getAuthHeaders();
    return this.http.post<Drone>(this.apiUrl, drone, { headers });
  }

  // Listar todos los drones disponibles
  getAll(): Observable<Drone[]> {
    return this.http.get<Drone[]>(this.apiUrl);
  }

  // Obtener un dron por ID
  getOne(id: string): Observable<Drone> {
    return this.http.get<Drone>(`${this.apiUrl}/${id}`);
  }

  // Actualizar un dron
  update(id: string, drone: Partial<Drone>): Observable<Drone> {
    const headers = this.getAuthHeaders();
    return this.http.put<Drone>(`${this.apiUrl}/${id}`, drone, { headers });
  }

  // Eliminar un dron
  delete(id: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  // Filtrar drones por categoría
  getByCategory(category: string): Observable<Drone[]> {
    return this.http.get<Drone[]>(`${this.apiUrl}/category/${category}`);
  }

  // Obtener drones dentro de un rango de precios
  getByPriceRange(min: number, max: number): Observable<Drone[]> {
    return this.http.get<Drone[]>(`${this.apiUrl}/price?min=${min}&max=${max}`);
  }

  // Agregar una reseña a un dron
  addReview(droneId: string, rating: number, comment: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${droneId}/review`, { rating, comment }, { headers });
  }

  // Comprar un dron
  purchase(droneId: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${droneId}/purchase`, {}, { headers });
  }

  // Método privado para obtener las cabeceras con token
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }
}
