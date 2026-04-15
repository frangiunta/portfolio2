import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Login } from '../../../interface/security/login';
import { AuthService } from '../../../services/auth';
import { TokenService } from '../../../services/token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  // Inyecciones de dependencias modernas
  private readonly tokenService = inject(TokenService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Estados de la vista con Signals
  isLogged = signal<boolean>(false);
  isLoginFail = signal<boolean>(false);
  errMsj = signal<string>('');

  // Modelos para el formulario (vía ngModel)
  nombreUsuario = '';
  password = '';
  
  roles: string[] = [];

  ngOnInit(): void {
    // Si ya existe un token, redirigimos directamente
    if (this.tokenService.getToken()) {
      this.isLogged.set(true);
      this.router.navigate(['/main']);
    }
  }

  onLogin(): void {
    // --- CONFIGURACIÓN DE PRUEBA (MOCK) ---
    const MOCK_USER = 'admin';
    const MOCK_PASS = 'admin123';

    // Simulamos el objeto que devolvería el backend
    const mockResponse = {
      token: 'fake-jwt-token-for-testing',
      nombreUsuario: 'Admin_Test',
      authorities: ['ROLE_ADMIN', 'ROLE_USER']
    };

    // Validamos localmente para saltear el backend
    if (this.nombreUsuario === MOCK_USER && this.password === MOCK_PASS) {
      console.log('Login de prueba exitoso');
      
      // 1. Guardamos los datos en el TokenService (Storage)
      this.tokenService.setToken(mockResponse.token);
      this.tokenService.setUserName(mockResponse.nombreUsuario);
      this.tokenService.setAuthorities(mockResponse.authorities);
      
      // 2. Actualizamos estados locales
      this.roles = mockResponse.authorities;
      this.isLogged.set(true);
      this.isLoginFail.set(false);

      // 3. Navegamos al componente principal
      this.router.navigate(['/main']);
      
    } else {
      // Si las credenciales de prueba fallan
      this.isLogged.set(false);
      this.isLoginFail.set(true);
      this.errMsj.set('Credenciales de prueba incorrectas (Use admin/admin123)');
    }

    /* // NOTA: Cuando quieras volver al backend, descomenta este bloque y borra lo de arriba:
    
    const loginUsuario: Login = { nombreUsuario: this.nombreUsuario, password: this.password };
    this.authService.login(loginUsuario).subscribe({
      next: (data) => {
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.router.navigate(['/main']);
      },
      error: (err) => {
        this.isLoginFail.set(true);
        this.errMsj.set(err.error?.mensaje || 'Error de conexión');
      }
    }); 
    */
  }
}