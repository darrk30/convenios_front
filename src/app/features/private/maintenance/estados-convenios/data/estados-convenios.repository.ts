import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoConvenio, EstadoConvenioRpta } from './estado-convenio.model';

@Injectable({ providedIn: 'root' })
export class EstadosConveniosRepository {
	private apiUrl = `${environment.urlBackend}/api/estado-convenio`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<EstadoConvenioRpta> {
		return this.http.get<EstadoConvenioRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<EstadoConvenioRpta> {
		return this.http.get<EstadoConvenioRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: EstadoConvenio): Observable<EstadoConvenioRpta> {
		return this.http.post<EstadoConvenioRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: EstadoConvenio): Observable<EstadoConvenioRpta> {
		entidad.ideEstadoConvenio = id;
		return this.http.put<EstadoConvenioRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: EstadoConvenio,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<EstadoConvenioRpta> {
		return this.http.delete<EstadoConvenioRpta>(`${this.apiUrl}/${id}`);
	}

}