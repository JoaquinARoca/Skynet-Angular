// src/app/forum/forum.component.ts
import { Component, OnInit } from '@angular/core';
import { ForumService } from '../services/forum.service';
import { Forum } from '../models/forum.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-forum',
  imports: [CommonModule,FormsModule],
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  items: Forum[] = [];
  atributoSeleccionado: keyof Forum | '' = '';
  filtro: string = '';
  paginaActual: number = 1;
  atributos: (keyof Forum)[] = [];

  constructor(private ForumService: ForumService, private router: Router) {}

  ngOnInit(): void {
    this.atributos = this.ForumService.getAtributos();
    this.obtenerItems();
  }

  obtenerItems(): void {
    this.ForumService.getAll(this.atributoSeleccionado, this.filtro, this.paginaActual)
      .subscribe(data => this.items = data);
  }

  eliminar(id: string): void {
    this.ForumService.delete(id).subscribe(() => this.obtenerItems());
  }

  crearNuevo(): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'forum' } });
  }

  editar(id: string): void {
    this.router.navigate(['/form'], { queryParams: { modelo: 'forum', id } });
  }
}