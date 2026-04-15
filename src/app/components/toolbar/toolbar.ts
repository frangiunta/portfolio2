import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../services/token';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { Login } from '../../interface/security/login';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule, FormsModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class ToolbarComponent implements OnInit {
  // Inyección moderna
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private authService = inject(AuthService);

  // Estado reactivo con Signals
  public isLogged = signal<boolean>(false);
  public curso = "Argentina Programa - #YoProgramo";
  public showLoginForm = signal<boolean>(false);
  public nombreUsuario = signal<string>('');
  public password = signal<string>('');
  public loginError = signal<string>('');

  ngOnInit(): void {
    this.isLogged.set(!!this.tokenService.getToken());
  }

  openLoginModal(): void {
    this.showLoginForm.set(true);
    this.loginError.set('');
  }

  closeLoginModal(): void {
    this.showLoginForm.set(false);
    this.nombreUsuario.set('');
    this.password.set('');
    this.loginError.set('');
  }

  onLogin(): void {
    // 1. Validamos que no estén vacíos
    if (!this.nombreUsuario() || !this.password()) {
      this.loginError.set('Por favor ingrese usuario y contraseña');
      return;
    }

    // --- CONFIGURACIÓN DE PRUEBA (MOCK) ---
    const MOCK_USER = 'admin';
    const MOCK_PASS = 'admin123';

    console.log('Validando credenciales de prueba...');

    // 2. Comprobamos contra nuestros datos hardcodeados
    if (this.nombreUsuario() === MOCK_USER && this.password() === MOCK_PASS) {
      
      // Simulamos la respuesta exitosa del servidor
      const mockData = {
        token: 'fake-jwt-token-12345',
        nombreUsuario: 'admin',
        authorities: ['ROLE_ADMIN']
      };

      // Guardamos en el servicio de tokens
      this.tokenService.setToken(mockData.token);
      this.tokenService.setUserName(mockData.nombreUsuario);
      this.tokenService.setAuthorities(mockData.authorities);
      
      // Actualizamos estado de la UI
      this.isLogged.set(true);
      this.closeLoginModal();
      
      // Redirigimos
      this.router.navigate(['/main']);
      
    } else {
      // 3. Si fallan los datos de prueba
      this.loginError.set('Usuario o contraseña incorrectos (Use admin / admin123)');
    }

    /* // Cuando quieras volver al backend, descomenta esto y borra lo de arriba:
    const loginUsuario: Login = { nombreUsuario: this.nombreUsuario(), password: this.password() };
    this.authService.login(loginUsuario).subscribe({
       next: (data) => { ... },
       error: (err) => { ... }
    });
    */
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.isLogged.set(false);
    this.router.navigate(['/login']); // Opcional: volver al login al salir
  }
}