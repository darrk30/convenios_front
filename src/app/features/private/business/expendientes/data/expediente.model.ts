export interface Expediente {
    ideExpediente?: number;
    ideConvenio?: number;
}

export interface ExpedienteRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : Expediente[];
    dato : Expediente;
}

export interface DatosGeneralesExpediente {
    nroExpedienteInicial: string;
    tipoDocumentoInicial: string;
    nroDocumentoInicial: string;
    areaInicial: string;
    fechaEmisionInicial: string;
    tiempoTranscurridoInicial: number;
    nroExpedienteActual: string;
    tipoDocumentoActual: string;
    nroDocumentoActual: string;
    areaActual: string;
    fechaEmisionActual: string;
    tiempoTranscurridoActual: number;
}

export interface DatosGeneralesExpedienteRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    dato : DatosGeneralesExpediente;    
}
