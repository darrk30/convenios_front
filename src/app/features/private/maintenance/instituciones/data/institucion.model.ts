export interface Institucion {
    ideInstitucion
}

export interface InstitucionRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : Institucion[];
    dato : Institucion;
}