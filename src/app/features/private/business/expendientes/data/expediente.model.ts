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