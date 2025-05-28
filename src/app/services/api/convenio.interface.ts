export interface Convenio {
  nombre: string;
  modalidadConvenioId: number;
  nuevoNombreModalidadConvenio?: string;
  objetivos: string;
  fechaSubscripcion: string;
  fechaInicio: string;
  vigenciaMeses: number;
  estadoAcuerdoId: number;
  requierePlanTrabajo: boolean;
  renovacionAutomatica: boolean;
  fechaInicioRenovacion: string;
  fechaFinRenovacion: string;
  observacion: string;
}