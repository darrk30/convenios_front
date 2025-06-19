import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoConvenio, TipoConvenioRpta } from './tipo-convenio.model';

@Injectable({ providedIn: 'root' })
export class TiposConveniosRepository {
	private apiUrl = `${environment.urlBackend}/api/tipo-convenio`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<TipoConvenioRpta> {
		return this.http.get<TipoConvenioRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<TipoConvenioRpta> {
		return this.http.get<TipoConvenioRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: TipoConvenio): Observable<TipoConvenioRpta> {
		return this.http.post<TipoConvenioRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: TipoConvenio): Observable<TipoConvenioRpta> {
		entidad.ideTipoConvenio = id;
		return this.http.put<TipoConvenioRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: TipoConvenio,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<TipoConvenioRpta> {
		return this.http.delete<TipoConvenioRpta>(`${this.apiUrl}/${id}`);
	}

}