import { MaterialModule } from './material/material.module'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, MaterialModule, FlexLayoutModule] 
})
export class AppComponent {
  title = 'angular-sensor';
  isAuthenticated$: Observable<boolean>;

  constructor(public authService: AuthService) {
    this.isAuthenticated$ = this.authService.isAuthenticated();
  }
}
