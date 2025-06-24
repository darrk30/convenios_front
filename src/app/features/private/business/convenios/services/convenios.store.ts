import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ConveniosRepository } from "../data/convenios.repository";

@Injectable({ providedIn: 'root' })
export class ConvenioStore {
    constructor(private conveniosRepository: ConveniosRepository) {}

    descargar(uuid: string): Observable<Blob> {
        return this.conveniosRepository.descargar(uuid);
    }

    descargarExcel(filterData: any): Observable<Blob> {
        return this.conveniosRepository.descargarExcel(filterData);
    }

    descargarExcelResumen(filterData: any): Observable<Blob> {
        return this.conveniosRepository.descargarExcelResumen(filterData);
    }

    descargarPdfResumen(filterData: any): Observable<Blob> {
        return this.conveniosRepository.descargarPdfResumen(filterData);
    }
}
