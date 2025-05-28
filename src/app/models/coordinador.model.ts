export interface Coordinador {
  id?: number; // El ID puede ser opcional si se genera en el backend
  institucion?: string; // Campo 'institucion' del formulario
  pais?: string; // Campo 'pais' del formulario
  cargo: string; // Campo 'cargoCoordinador' del formulario y 'Cargo' de la tabla
  telefono: string; // Campo 'telefonoCoordinador' del formulario y 'Teléfono' de la tabla
  correo: string; // Campo 'correoCoordinador' del formulario
  domicilio: string; // Campo 'domicilioCoordinador' del formulario
  tipoCoordinador: string; // Campo 'tipoCoordinador' del formulario y 'Tipo Coordinador' de la tabla
  aporteMonetario: number; // Campo 'aporteMonetarioCoordinador' del formulario y 'Aporte Monetario' de la tabla
  aporteNoMonetario: number; // Campo 'aporteNoMonetarioCoordinador' del formulario y 'Aporte No Monetario' de la tabla
  nombreDeIntegrante?: string; // Este campo aparece en la tabla, pero no directamente en el formulario de Coordinador. Podría ser una combinación de otros campos o venir de otra fuente.
}