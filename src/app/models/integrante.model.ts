export interface Integrante {
  id?: number; // El ID puede ser opcional si se genera en el backend
  nombreIntegrante: string; // Campo 'nombreIntegrante' del formulario
  nombreCompletoIntegrante: string; // Campo 'nombreCompletoIntegrante' del formulario
  cargo: string; // Campo 'cargoIntegrante' del formulario y 'Cargo' de la tabla
  tipo: string; // Campo 'tipoIntegrante' del formulario y 'Tipo' de la tabla
  correo: string; // Campo 'correoIntegrante' del formulario
  // La tabla de Integrantes solo muestra ID, Nombre de Integrante, Cargo, Tipo y Acciones.
  // Los campos de aporte monetario/no monetario y teléfono son específicos de la tabla de Coordinador.
}