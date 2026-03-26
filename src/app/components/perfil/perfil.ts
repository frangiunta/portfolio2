import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { Perfil } from '../../interface/perfil';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class PerfilComponent implements OnInit {
  // Datos estáticos del perfil
  public perfil = signal<Perfil>({
    nombre: 'Francisco Giunta',
    titulo: 'Desarrollador Full Stack',
    resumen: 'Apasionado por la tecnología y el desarrollo de aplicaciones web modernas. Especializado en Angular y Node.js.',
    imgLink: 'https://i.ibb.co/0sZz8ZP/fotoperfil.jpg',
    bannerlink: 'https://i.ibb.co/jZThYyn/APLogo-20-20.png',

    PerfilCode: 'PERFIL_001'
  });

  ngOnInit(): void {
    // No hay necesidad de cargar datos del backend
  }
}