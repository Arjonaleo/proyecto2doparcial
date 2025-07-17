import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(email: string, password: string): Observable<boolean> {
    if (email === 'test@test.com' && password === '123456') {
      localStorage.setItem('token', 'fake-jwt-token');
      return of(true);
    }
    return throwError(() => new Error('Credenciales incorrectas'));
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.removeItem('token');
  }
}
