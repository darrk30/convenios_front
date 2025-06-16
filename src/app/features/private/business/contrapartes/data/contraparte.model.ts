export interface Contraparte {
    ideContraparte?: number;
    ideConvenio?: number;
}

export interface ContraparteRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : Contraparte[];
    dato : Contraparte;
}