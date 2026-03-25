import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../../../services/token';
import { NewUser } from '../../../../interface/security/newuser';
import { AuthService } from '../../../../services/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class RegistroComponent implements OnInit {
  // Inyección funcional
  private readonly tokenService = inject(TokenService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  // Estados con Signals
  isLogged = signal<boolean>(false);
  errMsj = signal<string>('');

  // Propiedades vinculadas al formulario
  nombre = '';
  nombreUsuario = '';
  email = '';
  password = '';

  ngOnInit(): void {
    // Si ya está logueado, redirigimos al inicio
    if (this.tokenService.getToken()) {
      this.isLogged.set(true);
      this.router.navigate(['/main']);
    }
  }

  onRegister(): void {
    // Creamos el objeto basado en la interfaz NuevoUser
    const nuevoUsuario: NewUser = {
      nombre: this.nombre,
      nombreUsuario: this.nombreUsuario,
      email: this.email,
      password: this.password
    };

    this.authService.nuevo(nuevoUsuario).subscribe({
      next: (data) => {
        // Registro exitoso, redirigimos al login
        this.router.navigate(['/login']);
      },
      error: (err) => {
        // Capturamos el mensaje de error del backend
        this.errMsj.set(err.error?.mensaje || 'Error al intentar registrar el usuario');
      }
    });
  }
}
