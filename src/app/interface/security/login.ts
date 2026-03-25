export interface Login {
  nombreUsuario: string;
  password: string;
  nombre?: string; // Opcional, ya que para el login solo solemos usar las credenciales
}