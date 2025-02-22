import { Injectable, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut, user, User } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private router = inject(Router);

  /** 🔹 Inicia sesión con email y contraseña */
  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  /** 🔹 Cierra sesión y redirige a login */
  logout() {
    return signOut(this.auth).then(() => this.router.navigate(['/login']));
  }

  /** 🔹 Devuelve el usuario autenticado como Observable */
  getUser(): Observable<User | null> {
    return user(this.auth);
  }

  /** 🔹 Devuelve true si el usuario está autenticado */
  isAuthenticated(): Observable<boolean> {
    return this.getUser().pipe(map(user => !!user));
  }
}
