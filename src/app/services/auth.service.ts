import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, getAuth, signInWithCustomToken } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: Auth
  ) {}

  async login(email: string, password: string): Promise<void> {
    try {
      const response: any = await lastValueFrom(
        this.http.post(`${this.apiUrl}/login`, { email, password })
      );

      if (response && response.customToken) {
        const auth = getAuth();
        const userCredential = await signInWithCustomToken(
          auth,
          response.customToken
        );
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('idToken', idToken);
        console.log('Login entro');
        alert('Has iniciado sesión correctamente');
        this.router.navigate(['/home']); // Redirige a /home
      } else {
        alert('No se recibió el token personalizado');
      }
    } catch (error: any) {
      console.error('Error durante el login:', error);
      alert(error.error?.error || 'Error durante el login');
    }
  }

  async register(email: string, password: string): Promise<void> {
    try {
      const response: any = await lastValueFrom(
        this.http.post(`${this.apiUrl}/registro`, { email, password })
      );

      if (response && response.uid) {
        alert('Usuario registrado correctamente');
        // Aquí puedes redirigir al usuario o realizar otras acciones post-registro
      } else {
        alert('No se pudo completar el registro');
      }
    } catch (error: any) {
      console.error('Error durante el registro:', error);
      alert('Error durante el registro');
    }
  }
  isAuthenticated(): boolean {
    const token = localStorage.getItem('idToken');
    return !!token;
  }
  logout() {
    localStorage.removeItem('idToken');
  }
}
