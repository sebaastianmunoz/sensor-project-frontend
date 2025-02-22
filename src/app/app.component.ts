import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule] // 🔹 Se agregan los módulos necesarios
})
export class AppComponent {
  title = 'angular-sensor';
  isAuthenticated$: Observable<boolean>;

  constructor(public authService: AuthService) { // 🔹 Se cambió a "public"
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }
}
