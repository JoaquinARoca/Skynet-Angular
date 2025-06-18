import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../enviroment';
import { ServicioFactory } from '../services/servicio-dinamico';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss']
})
export class PanelComponent implements OnInit {
  modelo: string = '';
  atributos: string[] = [];
  datos: any[] = [];
  page: number = 1;
  filtro: string = '';
  atributoFiltro: string = '';
  instanciaServicio: any;
  totalPages: number = 1;


  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.modelo = params.get('modelo') || '';
      this.instanciaServicio = ServicioFactory[this.modelo]?.(this.http);

      if (!this.instanciaServicio) {
        alert('Modelo no válido.');
        return;
      }

      this.atributos = this.instanciaServicio.getAtributos();
      this.atributoFiltro = this.atributos[0] || '';
      this.cargarDatos();
    });
  }

  cargarDatos(): void {
  const query: Record<string, string> = {
    currency: 'EUR', // ← Ajusta a la moneda por defecto que uses
  };

  if (this.filtro && this.atributoFiltro) {
    query[this.atributoFiltro] = this.filtro;
  }

  this.instanciaServicio.getAll(query, this.page).subscribe((res: any) => {
    const keyWithArray = Object.keys(res).find(
      key => Array.isArray(res[key]) && typeof res[key][0] === 'object'
    );
    this.datos = keyWithArray ? res[keyWithArray] : [];
    this.totalPages = typeof res.pages === 'number' ? res.pages : 1;
  });
}




  editar(id: string): void {
    this.router.navigate([`/form/${this.modelo}/${id}`]);
  }

  borrar(id: string): void {
    if (confirm('¿Estás seguro de borrar este elemento?')) {
      this.instanciaServicio.delete(id).subscribe(() => {
        this.cargarDatos();
      });
    }
  }

  crearNuevo(): void {
    this.router.navigate([`/form/${this.modelo}`]);
  }
}
