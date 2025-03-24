import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // Usamos la interfaz "User" en lugar de "IUser"
    this.userService.getAllUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  // Función para navegar a la sección de drones
  goToDrones(): void {
    this.router.navigate(['/drones']);
  }
}
