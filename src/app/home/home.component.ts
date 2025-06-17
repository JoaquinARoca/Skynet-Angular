import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para *ngFor
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe({
      next: (users: User[]) => {
        this.users = users;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  goToDrones(): void {
    this.router.navigate(['/drones']);
  }

  goToForum(): void { 
    this.router.navigate(['/forum'])
  }
  goToComments(): void { 
    this.router.navigate(['/comments'])
  }
  goToMessages(): void { 
    this.router.navigate(['/messages'])
  }
  goToNotifications(): void { 
    this.router.navigate(['/notifications'])
  }
}
