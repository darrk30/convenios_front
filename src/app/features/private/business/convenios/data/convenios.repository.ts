import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Convenio, ConvenioRpta } from './convenio.model';
import { appendFormData } from 'src/app/core/helpers/clean-form';

@Injectable({ providedIn: 'root' })
export class ConveniosRepository {
	private apiUrl = `${environment.urlBackend}/api/convenio`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<ConvenioRpta> {
		return this.http.get<ConvenioRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<ConvenioRpta> {
		return this.http.get<ConvenioRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: Convenio): Observable<ConvenioRpta> {
		const body = new FormData();
		appendFormData(body, entidad);
		return this.http.post<ConvenioRpta>(`${this.apiUrl}`, body);
	}

	update(id: number, entidad: Convenio): Observable<ConvenioRpta> {
		entidad.ideConvenio = id;
		const body = new FormData();
		appendFormData(body, entidad);
		return this.http.put<ConvenioRpta>(`${this.apiUrl}/${id}`, body);
	}

	postForm(entidad: Convenio,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<ConvenioRpta> {
		return this.http.delete<ConvenioRpta>(`${this.apiUrl}/${id}`);
	}

	descargar(uuid: string): Observable<Blob> {
		return this.http.get(`${this.apiUrl}/descargar/${uuid}`, { responseType: 'blob' });
	}

	convertToURLParams(filterData: any){
		const urlParams = Object.keys(filterData).map((key) => {
				const value = filterData[key];
				if (!Array.isArray(value))	return `${key}=${value}`;
				return value.map((val)=>`${key}=${val}`).join("&");
			}
		).join("&");
		return urlParams;
	}

	descargarExcel(filterData: any): Observable<Blob> {
		const urlParams = this.convertToURLParams(filterData);
		return this.http.get(`${this.apiUrl}/export-to-excel?${urlParams}`, { responseType: 'blob' });
	}

	descargarExcelResumen(filterData: any): Observable<Blob> {
		const urlParams = this.convertToURLParams(filterData);
		return this.http.get(`${this.apiUrl}/export-to-excel-resumen?${urlParams}`, { responseType: 'blob' });
	}

	descargarExcelResumenEnGestion(filterData: any): Observable<Blob> {
		const urlParams = this.convertToURLParams(filterData);
		return this.http.get(`${this.apiUrl}/export-en-gestion-to-excel-resumen?${urlParams}`, { responseType: 'blob' });
	}

	descargarPdfResumen(filterData: any): Observable<Blob> {
		const urlParams = this.convertToURLParams(filterData);
		return this.http.get(`${this.apiUrl}/export-to-pdf-resumen?${urlParams}`, { responseType: 'blob' });
	}

}