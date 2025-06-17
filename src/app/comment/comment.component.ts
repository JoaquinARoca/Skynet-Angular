// src/app/comment/comment.component.ts
import { Component, OnInit } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  items: Comment[] = [];
  atributoSeleccionado: keyof Comment | '' = '';
  filtro: string = '';
  paginaActual: number = 1;
  atributos: (keyof Comment)[] = [];

  constructor(private CommentService: CommentService, private router: Router) {}

  ngOnInit(): void {
    this.atributos = this.CommentService.getAtributos();
    this.obtenerItems();
  }

  obtenerItems(): void {
    this.CommentService.getAll(this.atributoSeleccionado, this.filtro, this.paginaActual)
      .subscribe(data => this.items = data);
  }

  eliminar(id: string): void {
    this.CommentService.delete(id).subscribe(() => this.obtenerItems());
  }

  crearNuevo(): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'comment' } });
  }

  editar(id: string): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'comment', id } });
  }
}