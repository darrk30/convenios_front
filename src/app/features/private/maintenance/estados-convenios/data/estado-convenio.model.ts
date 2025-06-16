export interface EstadoConvenio {
    ideEstadoConvenio: number;
    txtEstadoConvenio?: string;
    txtCodigoEstadoConvenio?: string;
}

export interface EstadoConvenioRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : EstadoConvenio[];
    dato : EstadoConvenio;
}