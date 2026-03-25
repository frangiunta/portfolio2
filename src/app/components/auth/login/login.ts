import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUser } from 'src/app/interfaces/security/login-user';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';
import { FormsModule } from '@angular/forms'; // Necesario para ngModel

@Component({
  selector: 'app-login',
  standalone: true, // Lo hacemos standalone
  imports: [FormsModule], // Importamos FormsModule aquí mismo
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent implements OnInit {
  // Inyectamos los servicios de forma moderna
  private readonly tokenService = inject(TokenService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Usamos Signals para los estados
  isLogged = signal<boolean>(false);
  isLoginFail = signal<boolean>(false);
  
  // Variables para el formulario (vinculadas con [(ngModel)])
  nombreUsuario = '';
  password = '';
  
  roles: string[] = [];
  errMsj = signal<string>('');

  ngOnInit(): void {
    // Verificamos si ya hay un token al cargar
    if (this.tokenService.getToken()) {
      this.isLogged.set(true);
      this.isLoginFail.set(false);
      this.roles = this.tokenService.getAuthorities();
      // Si ya está logueado, lo mandamos al main directamente
      this.router.navigate(['/main']);
    }
  }

  onLogin(): void {
    // Creamos el objeto directamente (ya no necesitamos 'new' porque es interface)
    const loginUsuario: LoginUser = {
      nombreUsuario: this.nombreUsuario,
      password: this.password
    };

    this.authService.login(loginUsuario).subscribe({
      next: (data) => {
        this.isLogged.set(true);
        this.isLoginFail.set(false);

        // Guardamos los datos en el storage
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        
        this.roles = data.authorities;
        
        // Navegamos al componente principal
        this.router.navigate(['/main']);
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
