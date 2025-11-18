import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Expediente, ExpedienteRpta } from './expediente.model';

@Injectable({ providedIn: 'root' })
export class ExpedientesRepository {
	private apiUrl = `${environment.urlBackend}/api/expediente`;
	private apiUrlExpediente = `${environment.urlExpediente}/api`;

	constructor(
		private http: HttpClient
	) {}

	getByExpediente(expediente: string): Observable<ExpedienteRpta> {
		return this.http.get<ExpedienteRpta>(`${this.apiUrlExpediente}/documento-remitos/listar-documentos-por-expediente/${expediente}`);
	}

	getDescargarPdf(ideTipoDocumento: string, numeroDocumento: string): Observable<Blob> {
		return this.http.get(`${this.apiUrlExpediente}/documento-remitos/obtener-archivo-doc?ideTipoDoc=${ideTipoDocumento}&nroDoc=${numeroDocumento}`, {
			responseType: 'blob'
		});
	}

	getAllByConvenio(ideConvenio:number): Observable<ExpedienteRpta> {
		return this.http.get<ExpedienteRpta>(`${this.apiUrl}/get-all-expediente-by-convenio/${ideConvenio}`);
	}

	getAll(): Observable<ExpedienteRpta> {
		return this.http.get<ExpedienteRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<ExpedienteRpta> {
		return this.http.get<ExpedienteRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: Expediente): Observable<ExpedienteRpta> {
		return this.http.post<ExpedienteRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: Expediente): Observable<ExpedienteRpta> {
		entidad.ideExpediente = id;
		return this.http.put<ExpedienteRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: Expediente,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<ExpedienteRpta> {
		return this.http.delete<ExpedienteRpta>(`${this.apiUrl}/${id}`);
	}

}