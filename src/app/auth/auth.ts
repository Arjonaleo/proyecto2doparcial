import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storageKey = 'users';

  // Iniciar sesión verificando en localStorage
  login(email: string, password: string): Observable<boolean> {
    const users: User[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      localStorage.setItem('token', 'fake-jwt-token');
      return of(true);
    }

    return throwError(() => new Error('Credenciales incorrectas'));
  }

  // Registrar usuario nuevo
  register(email: string, password: string): Observable<boolean> {
    let users: User[] = JSON.parse(localStorage.getItem(this.storageKey) || '[]');

    if (users.find(u => u.email === email)) {
      return throwError(() => new Error('El usuario ya existe'));
    }

    users.push({ email, password });
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return of(true);
  }

  // Validar si hay sesión activa
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // Cerrar sesión
  logout(): void {
    localStorage.removeItem('token');
  }
}
