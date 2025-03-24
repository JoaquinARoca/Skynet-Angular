import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRegister = "http://localhost:9000/api/users/signup";
  private apiLogin    = "http://localhost:9000/api/users/login";

  constructor(private http: HttpClient) { }
  
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiLogin, credentials);
  }
  
  register(credentials: { userName: string; email: string; password: string; role: string }): Observable<any> {
    return this.http.post(this.apiRegister, credentials);
  }
}
