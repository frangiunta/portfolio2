export interface Proyectos {
  id?: number;          // Opcional para nuevos registros
  nombre: string;
  descripcion: string;  // Descripción corta (ej: "Desarrollo Web")
  resumen: string;      // Detalle más largo de las tecnologías
  imglink: string;      // URL de la imagen de portada
  gitlink: string;      // URL del repositorio en GitHub
  proyectoCode: string; // Tu identificador único de backend
}