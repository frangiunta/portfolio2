export interface Skills {
  id?: number;          // Opcional para la creación
  nombre: string;
  porcentaje: number;   // Cambiado a number para cálculos y barras de progreso
  skillCode: string;    // Tu identificador interno
}