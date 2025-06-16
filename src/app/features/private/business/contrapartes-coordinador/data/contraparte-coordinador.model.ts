export interface ContraparteCoordinador {
    ideContraparteCoordinador?: number;
    ideConvenio?: number;
}

export interface ContraparteCoordinadorRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : ContraparteCoordinador[];
    dato : ContraparteCoordinador;
}