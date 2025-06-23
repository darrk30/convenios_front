export interface SectorInstitucion {
    ideSectorInstitucion
}

export interface SectorInstitucionRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : SectorInstitucion[];
    dato : SectorInstitucion;
}