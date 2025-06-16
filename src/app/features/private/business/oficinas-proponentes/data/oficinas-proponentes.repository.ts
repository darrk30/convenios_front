import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OficinaProponente, OficinaProponenteRpta } from './oficina-proponente.model';
import { appendFormData } from 'src/app/core/helpers/clean-form';

@Injectable({ providedIn: 'root' })
export class OficinasProponentesRepository {
	private apiUrl = `${environment.urlBackend}/api/oficina-proponente`;

	constructor(
		private http: HttpClient
	) {}

	getAllByConvenio(ideConvenio:number): Observable<OficinaProponenteRpta> {
		return this.http.get<OficinaProponenteRpta>(`${this.apiUrl}/get-all-by-convenio/${ideConvenio}`);
	}

	getAll(): Observable<OficinaProponenteRpta> {
		return this.http.get<OficinaProponenteRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<OficinaProponenteRpta> {
		return this.http.get<OficinaProponenteRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: OficinaProponente): Observable<OficinaProponenteRpta> {
		return this.http.post<OficinaProponenteRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: OficinaProponente): Observable<OficinaProponenteRpta> {
		entidad.ideOficinaProponente = id;
		return this.http.put<OficinaProponenteRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: OficinaProponente,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<OficinaProponenteRpta> {
		return this.http.delete<OficinaProponenteRpta>(`${this.apiUrl}/${id}`);
	}

}