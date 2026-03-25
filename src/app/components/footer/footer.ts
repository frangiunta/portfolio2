import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class FooterComponent {
  // En Angular moderno, si ngOnInit está vacío, 
  // es mejor eliminarlo junto con la interfaz OnInit.
  
  anioActual: number = new Date().getFullYear();
}
