import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroment';
import { AuthService } from '../services/auth.service';
import { ServicioFactory } from '../services/servicio-dinamico';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  modelo: string = '';
  id: string | null = null;
  form!: FormGroup;
  atributos: string[] = [];
  instanciaServicio: any;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private fb: FormBuilder,
    private http: HttpClient,
    private authService: AuthService // ⬅️ nuevo
  ) { }
  private camposRequeridos: Record<string, string[]> = {
    users: ['userName', 'email', 'password', 'role'],
    drones: ['model', 'price', 'location'],
    post: ['mediaUrl', 'mediaType'],
    forum: ['name', 'comment'],
    comment: ['droneId', 'userId', 'text', 'rating'],
    order: ['droneId', 'buyerId', 'sellerId'],
    payment: ['orderId', 'userId', 'amount'],
    notification: ['to', 'from', 'type'],
    session: ['scenario', 'mode', 'host'],
  };


  async ngOnInit(): Promise<void> {
    this.modelo = this.route.snapshot.paramMap.get('modelo')!;
    this.id = this.route.snapshot.paramMap.get('id');
    this.instanciaServicio = ServicioFactory[this.modelo]?.(this.http);

    if (!this.instanciaServicio) {
      alert('Modelo no válido.');
      return;
    }

    this.atributos = this.instanciaServicio.getAtributos();

    const group: any = {};
    const obligatorios = this.camposRequeridos[this.modelo] || [];

    this.atributos.forEach(attr => {
      group[attr] = [
        '',
        obligatorios.includes(attr) ? Validators.required : []
      ];
    });

    this.form = this.fb.group(group);

    if (this.id) {
      const response = await this.instanciaServicio.getById(this.id).toPromise();
      this.form.patchValue(response);
    }
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      alert('Por favor, completa los campos obligatorios.');
      return;
    }

    const { _id, ...data } = this.form.value; // 🔧 Quitar _id si está vacío

    let peticion: Observable<any>;

    // Si es modelo "users" y NO hay ID → usamos el AuthService para registrar
    if (this.modelo === 'users' && !this.id) {
      peticion = this.authService.register(data);

      // Si hay ID → estamos editando
    } else if (this.id) {
      peticion = this.instanciaServicio.update(this.id, data);

      // Si no hay ID → creando cualquier otro modelo
    } else {
      peticion = this.instanciaServicio.create(data);
    }

    peticion.subscribe({
      next: () => {
        alert('Guardado correctamente');
        this.router.navigate([`/panel/${this.modelo}`]);
      },
      error: (err) => {
        alert(`Error al guardar: ${err?.error?.message || 'Error desconocido.'}`);
      }
    });
  }


}
