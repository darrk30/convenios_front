export interface EvaluacionAnual {
    ideEvaluacionAnual?:number;
    ideConvenio?:number;
    ideTipoDocumento?:number;
    txtEvaluacionAnual?:string;
    txtEvaluacionAnualRuta?:string;
    fecEvaluacion: Date | null;
    convenio: any;
}

export interface EvaluacionAnualRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : EvaluacionAnual[];
    dato : EvaluacionAnual;
}