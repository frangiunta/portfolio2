import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true, // Asegurate de que tenga esto
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Signal para el título, reactivo y eficiente
  protected readonly title = signal('Portfolio - Argentina Programa');
}