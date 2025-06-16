export interface OficinaProponente {
    ideOficinaProponente?:number;
    ideConvenio?:number;
    txtOficinaProponente?:string;
    convenio?: any;
}

export interface OficinaProponenteRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : OficinaProponente[];
    dato : OficinaProponente;
}