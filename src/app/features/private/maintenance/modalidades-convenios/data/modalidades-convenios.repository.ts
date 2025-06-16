import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ModalidadConvenio, ModalidadConvenioRpta } from './modalidad-convenio.model';

@Injectable({ providedIn: 'root' })
export class ModalidadesConveniosRepository {
	private apiUrl = `${environment.urlBackend}/api/modalidad-convenio`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<ModalidadConvenioRpta> {
		return this.http.get<ModalidadConvenioRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<ModalidadConvenioRpta> {
		return this.http.get<ModalidadConvenioRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: ModalidadConvenio): Observable<ModalidadConvenioRpta> {
		return this.http.post<ModalidadConvenioRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: ModalidadConvenio): Observable<ModalidadConvenioRpta> {
		entidad.ideModalidadConvenio = id;
		return this.http.put<ModalidadConvenioRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: ModalidadConvenio,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<ModalidadConvenioRpta> {
		return this.http.delete<ModalidadConvenioRpta>(`${this.apiUrl}/${id}`);
	}

}