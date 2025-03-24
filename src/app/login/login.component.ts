// src/app/login/login.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginPayload } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  authService = inject(AuthService);
  router = inject(Router);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginPayload = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (res) => {
        // Tu backend solo devuelve { message: 'Sesión iniciada con éxito' } si todo va bien
        alert(res.message || 'Login exitoso');
        // Redirige a home o
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Error al iniciar sesión');
      }
    });
  }
}
