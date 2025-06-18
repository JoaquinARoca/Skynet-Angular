// src/app/post/post.component.ts
import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  items: Post[] = [];
  atributoSeleccionado: keyof Post | '' = '';
  filtro: string = '';
  paginaActual: number = 1;
  atributos: (keyof Post)[] = [];

  constructor(private PostService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.atributos = this.PostService.getAtributos();
    this.obtenerItems();
  }

  obtenerItems(): void {
    this.PostService.getAll(this.atributoSeleccionado, this.filtro, this.paginaActual)
      .subscribe(data => this.items = data);
  }

  eliminar(id: string): void {
    this.PostService.delete(id).subscribe(() => this.obtenerItems());
  }

  crearNuevo(): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'post' } });
  }

  editar(id: string): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'post', id } });
  }
}