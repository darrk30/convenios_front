export interface Convenio {
    ideConvenio?: number;
    ideModalidadConvenio: number;
    txtConvenio: string;
    txtObjetivoConvenio: string;
    fecSuscripcion: Date | null;
    fecInicio: Date | null;
    fecFinalizacion: Date | null;
    bitPlanTrabajo: boolean;
    bitRenovacion: boolean;
    fecInicioRenovacion: Date | null;
    fecFinRenovacion: Date | null;
    txtObservacion: string;
    ideOficinaProponente: number;
    numAporteMonetario: number;
    numAporteNoMonetario: number;
    ideOrganoEjecutor: number;
    ideCoordinadorTitular: number;
    ideCoordinadorAlterno: number;
    txtObjetivoGeneralPlanTrabajo: string;
    fecCulminacionPlanTrabajo: Date | null;
    txtArchivoBaseLegal: string;
    txtArchivoBaseLegalRuta: string;
    ideEstadoTrazabilidad: number;
    ideEstado: number;
    fecCreacion?: Date;
    txtUsuarioCreacion?: string;
    fecActualizacion?: Date;
    txtUsuarioActualizacion?: string;
    estadoConvenio:any;
    modalidadConvenio: any;
    uuid: string;
    contrapartes:any;
    organoEjecutor:any;
    oficinasProponentes:any;
    tipoConvenio:any;
    diasTranscurridos: string;
}

export interface ConvenioRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : Convenio[];
    dato : Convenio;
}