import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Login } from '../../../interface/security/login';
import { AuthService } from '../../../services/auth';
import { TokenService } from '../../../services/token';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel

@Component({
  selector: 'app-login',
  standalone: true, // Lo hacemos standalone
  imports: [FormsModule, RouterModule], // Importamos FormsModule aquí mismo
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  private readonly tokenService = inject(TokenService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Usamos Signals para los estados
  isLogged = signal<boolean>(false);
  isLoginFail = signal<boolean>(false);
  
  nombreUsuario = '';
  password = '';
  
  roles: string[] = [];
  errMsj = signal<string>('');

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged.set(true);
      this.isLoginFail.set(false);
      this.roles = this.tokenService.getAuthorities();

      this.router.navigate(['/main']);
    }
  }

  onLogin(): void {
    const loginUsuario: Login = {
      nombreUsuario: this.nombreUsuario,
      password: this.password
    };

    this.authService.login(loginUsuario).subscribe({
      next: (data) => {
        this.isLogged.set(true);
        this.isLoginFail.set(false);


        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        
        this.roles = data.authorities;
      
        this.router.navigate(['/main']).then(() => {
          window.location.reload();
        });
      },
      error: (err) => {
        this.isLogged.set(false);
        this.isLoginFail.set(true);
        // Manejo de error con mensaje amigable
        this.errMsj.set(err.error?.message || 'Error en las credenciales');
        console.error(err);
      }
    });
  }
}
