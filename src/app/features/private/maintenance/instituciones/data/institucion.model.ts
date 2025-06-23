export interface Institucion {
    ideInstitucion?: number;
    txtInstitucion: string;
    idePais: number;
    pais: any;
    ideTipoInstitucion: number;
    tipoInstitucion: any;
    ideSectorInstitucion: number;
    sectorInstitucion: any;
}

export interface InstitucionRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : Institucion[];
    dato : Institucion;
}