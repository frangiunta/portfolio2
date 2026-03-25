export interface JwtDTO {
  token: string;          // El JWT (Json Web Token)
  type: string;           // Generalmente "Bearer"
  nombreUsuario: string;  // El username del administrador
  authorities: string[];  // Array de roles (ej: ["ROLE_ADMIN"])
}