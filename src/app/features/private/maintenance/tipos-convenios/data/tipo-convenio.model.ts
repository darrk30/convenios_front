export interface TipoConvenio {
    ideTipoConvenio: number;
    txtTipoConvenio?: string;
    txtCodigoTipoConvenio?: string;
}

export interface TipoConvenioRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : TipoConvenio[];
    dato : TipoConvenio;
}