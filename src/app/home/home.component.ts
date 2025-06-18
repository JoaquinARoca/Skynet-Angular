import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  modelos: string[] = [
    'comments',
    'drones',
    'forum',
    'messages',
    'notifications',
    'orders',
    'payments',
    'posts',
    'sessions',
    'users'
  ];

  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigate(['/login']);
  }
}
