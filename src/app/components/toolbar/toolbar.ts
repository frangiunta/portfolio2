import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../services/token';
import { Router } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './toolbar.html',
  styleUrls: ['./toolbar.css']
})
export class ToolbarComponent implements OnInit {
  // Inyección moderna
  private tokenService = inject(TokenService);
  private router = inject(Router);

  // Estado reactivo con Signals
  public isLogged = signal<boolean>(false);
  public curso = "Argentina Programa - #YoProgramo";

  ngOnInit(): void {
    // Simplificamos la asignación del estado inicial
    this.isLogged.set(!!this.tokenService.getToken());
  }

  onLogOut(): void {
    this.tokenService.logOut();
    // En lugar de recargar toda la página, navegamos al home o login
    // Esto mantiene la experiencia de Single Page Application (SPA)
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); // Solo si el estado global depende de un reload
    });
  }
}
