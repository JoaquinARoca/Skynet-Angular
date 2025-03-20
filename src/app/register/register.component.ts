import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../models/user.model';
import { V } from '@angular/cdk/keycodes';



@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: true
})
export class RegisterComponent implements OnInit {

  formularioRegistro: FormGroup;
  authservice = inject(AuthService);
  @Output() registered = new EventEmitter<string>();
  @Output() exportRegistered = new EventEmitter<boolean>();

  constructor(private form: FormBuilder) {
    this.formularioRegistro = this.form.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
    });
   }

  ngOnInit(): void {
    this.formularioRegistro = this.form.group({
      username: ['eve.holt@reqres.in', [Validators.required, Validators.minLength(3)]],
      email: ['eve.holt@reqres.in', [Validators.required, Validators.email]],
      password: ['pistol', [Validators.required, Validators.minLength(3)]]
    });
  }

  hasError(controlName: string, errorType: string) {
    return this.formularioRegistro.get(controlName)?.hasError(errorType) && this.formularioRegistro.get(controlName)?.touched;
  }

  register() {
    if (this.formularioRegistro.invalid) {
      this.formularioRegistro.markAllAsTouched();
      return;
    }

    const registerData = this.formularioRegistro.value;

    this.authservice.register(registerData).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.exportRegistered.emit(true);
      },
      error: (error) => {
        console.error('Error en el registro:', error);
        alert('Error en el registro, verifica tus credenciales');
      }
    });
  }
}
