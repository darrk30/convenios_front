export interface Pais {
    idePais
}

export interface PaisRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : Pais[];
    dato : Pais;
}