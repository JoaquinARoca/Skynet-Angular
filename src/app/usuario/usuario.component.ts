import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../models/user.model';
import { ColaboradoresComponent } from '../colaboradores/colaboradores.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [CommonModule, ColaboradoresComponent, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'] 
})
export class UsuarioComponent {

  foto: string;
  mostrardata: boolean;
  
  usuario: User = {
    id: 1,
    name: "Toni",
    age: 40,
    email: "toni.oller@gmail.com",
  };
  
  constructor() {
    this.foto = "https://github.com/tonioller.png";
    this.mostrardata = false;
  }

  mostrardatos() {
    // Muestra los datos al hacer click en la imagen
    this.mostrardata = true;
  }

  getName(Name: string) {
    this.usuario.name = Name;
  }

}
