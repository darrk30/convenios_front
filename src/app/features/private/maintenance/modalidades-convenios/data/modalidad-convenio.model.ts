export interface ModalidadConvenio {
    ideModalidadConvenio
}

export interface ModalidadConvenioRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : ModalidadConvenio[];
    dato : ModalidadConvenio;
}