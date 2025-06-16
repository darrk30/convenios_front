import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Pais, PaisRpta } from './pais.model';

@Injectable({ providedIn: 'root' })
export class PaisesRepository {
	private apiUrl = `${environment.urlBackend}/api/pais`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<PaisRpta> {
		return this.http.get<PaisRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<PaisRpta> {
		return this.http.get<PaisRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: Pais): Observable<PaisRpta> {
		return this.http.post<PaisRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: Pais): Observable<PaisRpta> {
		entidad.idePais = id;
		return this.http.put<PaisRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: Pais,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<PaisRpta> {
		return this.http.delete<PaisRpta>(`${this.apiUrl}/${id}`);
	}

}