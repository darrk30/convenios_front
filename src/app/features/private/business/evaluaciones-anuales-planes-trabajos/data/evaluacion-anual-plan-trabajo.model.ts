export interface EvaluacionAnualPlanTrabajo {
    ideEvaluacionAnualPlanTrabajo?:number;
    ideConvenio?:number;
    ideTipoDocumento?:number;
    txtEvaluacionAnualPlanTrabajo?:string;
    txtEvaluacionAnualPlanTrabajoRuta?:string;
    fecEvaluacion: Date | null;
    archivo?: File;
    uuid?: string;
    convenio:any;
}

export interface EvaluacionAnualPlanTrabajoRpta {
    respuesta: number;
    mensaje: string;
    exitoso:boolean;
    total: number;
    datos : EvaluacionAnualPlanTrabajo[];
    dato : EvaluacionAnualPlanTrabajo;
}