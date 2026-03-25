export interface NewUser {
  nombre: string;
  nombreUsuario: string;
  email: string;
  password: string;
  roles?: string[]; // Opcional, por si tu backend asigna "ROLE_USER" por defecto
}