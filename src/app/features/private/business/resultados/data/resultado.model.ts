export interface Resultado {
    ideResultado?:number;
    ideConvenio?:number;
}

export interface ResultadoRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : Resultado[];
    dato : Resultado;
}