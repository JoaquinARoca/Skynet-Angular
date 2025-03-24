import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmDialogComponent } from '../confirmDialog/confirm-dialog.component';
import { NombrePipe } from '../pipes/nombre.pipe';
import { UserService, User } from '../services/user.service';  // Se importa "User" en lugar de "IUser"

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NombrePipe
  ],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent {

  // Lista local de usuarios usando la interfaz "User"
  users: User[] = [];

  // Para filtrar usuarios con el pipe 'nombre'
  query = 'b';

  // Recibir un usuario desde el componente padre (UsuarioComponent)
  // Se define un objeto por defecto acorde a la interfaz "User"
  @Input() usuario: User = {
    userName: 'Usuario por defecto',
    email: 'default@example.com',
    password: '',
    role: 'Usuario'
  };

  // Para emitir un evento al padre cuando cambiemos el nombre
  @Output() changeNameEvent = new EventEmitter<string>();

  // Inyectamos el servicio de usuarios
  userService = inject(UserService);

  // Inyectamos MatDialog para mostrar diálogos de confirmación
  dialog: MatDialog = inject(MatDialog);

  constructor() {}

  async obtenerUsuarios(): Promise<void> {
    this.userService.getAllUsers().subscribe(
      (users: User[]) => {
        // Guardamos la lista de usuarios recibida
        this.users = users;
        console.log('Usuarios obtenidos:', this.users);

        this.users.push(this.usuario);
        console.log('Usuarios + usuario local:', this.users);
      },
      (error: any) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }

  trackByUserId(index: number, user: User): string | number {
    // Se utiliza el _id si existe, o en su defecto el userName
    return user._id || user.userName;
  }

  changeName(Name: string): void {
    this.changeNameEvent.emit(Name);
  }

  deleteUser(i: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log('delete User index:', i);
        this.users.splice(i, 1);
      }
    });
  }
}
