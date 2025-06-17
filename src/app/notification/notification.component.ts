// src/app/notification/notification.component.ts
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { Notification } from '../models/notification.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  items: Notification[] = [];
  atributoSeleccionado: keyof Notification | '' = '';
  filtro: string = '';
  paginaActual: number = 1;
  atributos: (keyof Notification)[] = [];

  constructor(private NotificationService: NotificationService, private router: Router) {}

  ngOnInit(): void {
    this.atributos = this.NotificationService.getAtributos();
    this.obtenerItems();
  }

  obtenerItems(): void {
    this.NotificationService.getAll(this.atributoSeleccionado, this.filtro, this.paginaActual)
      .subscribe(data => this.items = data);
  }

  eliminar(id: string): void {
    this.NotificationService.delete(id).subscribe(() => this.obtenerItems());
  }

  crearNuevo(): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'notification' } });
  }

  editar(id: string): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'notification', id } });
  }
}