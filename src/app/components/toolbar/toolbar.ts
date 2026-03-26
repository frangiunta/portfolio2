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
    // Simplificamos la asignación del estado inicial
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
    if (!this.nombreUsuario() || !this.password()) {
      this.loginError.set('Por favor ingrese usuario y contraseña');
      return;
    }

    const loginUsuario: Login = {
      nombreUsuario: this.nombreUsuario(),
      password: this.password()
    };

    this.authService.login(loginUsuario).subscribe({
      next: (data: any) => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        
        this.isLogged.set(true);
        this.closeLoginModal();
      },
      error: (err: any) => {
        console.error('Error en login:', err);
        this.loginError.set(err.error?.message || 'Error al iniciar sesión. Verifique sus credenciales.');
      }
    });
  }

  onLogOut(): void {
    this.tokenService.logOut();
    this.isLogged.set(false);
  }
}
