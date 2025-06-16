export interface TipoCoordinador {
    ideTipoCoordinador: number;
    txtTipoCoordinador?: string;
    txtCodigoTipoCoordinador?: string;
}

export interface TipoCoordinadorRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : TipoCoordinador[];
    dato : TipoCoordinador;
}