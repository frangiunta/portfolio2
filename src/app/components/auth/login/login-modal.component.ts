import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { Login } from '../../../interface/security/login';
import { AuthService } from '../../../services/auth';
import { TokenService } from '../../../services/token';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule
  ],
  template: `
    <div class="login-modal-container">
      <h2 mat-dialog-title>Iniciar Sesión (Prueba)</h2>
      
      <div mat-dialog-content>
        <form #f="ngForm" (ngSubmit)="onLogin()">
          <mat-form-field appearance="outline" class="w-100 mb-3">
            <mat-label>Nombre de Usuario</mat-label>
            <input matInput 
                   placeholder="admin" 
                   name="nombreUsuario" 
                   [(ngModel)]="nombreUsuario" 
                   required>
          </mat-form-field>

          <mat-form-field appearance="outline" class="w-100">
            <mat-label>Contraseña</mat-label>
            <input matInput 
                   type="password"
                   placeholder="admin123" 
                   name="password" 
                   [(ngModel)]="password" 
                   required>
          </mat-form-field>

          @if (errorMessage()) {
            <div class="mt-3">
              <div class="alert alert-danger">
                {{ errorMessage() }}
              </div>
            </div>
          }

          <div class="text-center mt-4">
            <button type="submit" 
                    mat-raised-button 
                    color="primary"
                    [disabled]="!nombreUsuario || !password">
              Ingresar
            </button>
          </div>
        </form>
      </div>

      <div mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">Cancelar</button>
      </div>
    </div>
  `,
  styles: [`
    .login-modal-container { padding: 1rem; min-width: 300px; }
    .w-100 { width: 100%; }
    .mb-3 { margin-bottom: 1rem; }
    .mt-3 { margin-top: 1rem; }
    .mt-4 { margin-top: 1.5rem; }
    .alert {
      padding: 0.75rem;
      border-radius: 0.25rem;
      background-color: #f8d7da;
      color: #721c24;
      border: 1px solid #f5c6cb;
      font-size: 14px;
    }
  `]
})
export class LoginModalComponent implements OnInit {
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private dialogRef = inject(MatDialogRef<LoginModalComponent>);

  // Datos del formulario
  nombreUsuario = '';
  password = '';

  // Estados con Signals
  errorMessage = signal<string>('');
  roles = signal<string[]>([]);

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.roles.set(this.tokenService.getAuthorities());
    }
  }

  onLogin(): void {
    // --- DATOS DE PRUEBA (MOCK) ---
    const MOCK_USER = 'admin';
    const MOCK_PASS = 'admin123';

    const mockResponse = {
      token: 'fake-jwt-token-modal',
      nombreUsuario: 'Admin_Modal',
      authorities: ['ROLE_ADMIN']
    };

    if (this.nombreUsuario === MOCK_USER && this.password === MOCK_PASS) {
      // Guardamos datos
      this.tokenService.setToken(mockResponse.token);
      this.tokenService.setUserName(mockResponse.nombreUsuario);
      this.tokenService.setAuthorities(mockResponse.authorities);
      
      // Cerramos el modal pasando 'true' para indicar éxito
      this.dialogRef.close(true);
      
      // Redirigimos sin recargar la página
      this.router.navigate(['/main']);
    } else {
      this.errorMessage.set('Credenciales incorrectas. Use admin / admin123');
    }

    /* // Cuando conectes el backend, usa esto:
    const loginUsuario: Login = { nombreUsuario: this.nombreUsuario, password: this.password };
    this.authService.login(loginUsuario).subscribe({
      next: (data) => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.dialogRef.close(true);
      },
      error: (err) => this.errorMessage.set(err.error?.message || 'Error de login')
    });
    */
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}