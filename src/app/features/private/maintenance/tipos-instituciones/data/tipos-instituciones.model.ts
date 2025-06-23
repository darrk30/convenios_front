export interface TipoInstitucion {
    ideTipoInstitucion
}

export interface TipoInstitucionRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : TipoInstitucion[];
    dato : TipoInstitucion;
}