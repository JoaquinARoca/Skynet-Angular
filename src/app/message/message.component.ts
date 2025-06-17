// src/app/message/message.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';
import { Message } from '../models/message.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  items: Message[] = [];
  atributoSeleccionado: keyof Message | '' = '';
  filtro: string = '';
  paginaActual: number = 1;
  atributos: (keyof Message)[] = [];

  constructor(private MessageService: MessageService, private router: Router) {}

  ngOnInit(): void {
    this.atributos = this.MessageService.getAtributos();
    this.obtenerItems();
  }

  obtenerItems(): void {
    this.MessageService.getAll(this.atributoSeleccionado, this.filtro, this.paginaActual)
      .subscribe(data => this.items = data);
  }

  eliminar(id: string): void {
    this.MessageService.delete(id).subscribe(() => this.obtenerItems());
  }

  crearNuevo(): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'message' } });
  }

  editar(id: string): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'message', id } });
  }
}