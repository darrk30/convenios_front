import { Injectable } from "@angular/core";
import { EvaluacionesAnualesPlanesTrabajosRepository } from "../data/evaluaciones-anuales-planes-trabajos.repository";
import { saveAs } from "file-saver";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class EvaluacionAnualPlanTrabajoStore {
    constructor(private evaluacionesAnualesPlanesTrabajosRepository: EvaluacionesAnualesPlanesTrabajosRepository) {}

    descargar(uuid: string): Observable<Blob> {
        return this.evaluacionesAnualesPlanesTrabajosRepository.descargar(uuid);
    }
}
