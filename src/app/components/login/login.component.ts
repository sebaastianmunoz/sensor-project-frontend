import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [CommonModule, MaterialModule, FormsModule],
})
export class LoginComponent {
  email: string = '';  // Usando ngModel para enlazar el valor
  password: string = '';  // Usando ngModel para enlazar el valor
  isSubmitting: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  // Método para enviar el formulario
  onSubmit() {
    if (!this.email || !this.password) {
      return;
    }

    this.isSubmitting = true;
    this.authService.login(this.email, this.password)
      .then(() => {
        this.isSubmitting = false;
        this.router.navigate(['/dashboard']);  // Redirigir después de login exitoso
      })
      .catch(error => {
        this.isSubmitting = false;
        console.error('Error de login:', error);
      });
  }
}
