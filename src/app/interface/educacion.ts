export interface Educacion {
  id?: number;            // Opcional para la creación de nuevos registros
  titulo: string;         // Ej: "Ingeniería en Sistemas" o "Curso Angular"
  institucion: string;    // Nombre de la universidad o academia
  imgUrl: string;         // URL del logo de la institución
  fecha: string;          // Ej: "2020 - 2024" o "En curso"
  EducacionCode: string;  // Identificador único para el backend
}