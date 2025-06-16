import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Institucion, InstitucionRpta } from './institucion.model';

@Injectable({ providedIn: 'root' })
export class InstitucionesRepository {
	private apiUrl = `${environment.urlBackend}/api/institucion`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<InstitucionRpta> {
		return this.http.get<InstitucionRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<InstitucionRpta> {
		return this.http.get<InstitucionRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: Institucion): Observable<InstitucionRpta> {
		return this.http.post<InstitucionRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: Institucion): Observable<InstitucionRpta> {
		entidad.ideInstitucion = id;
		return this.http.put<InstitucionRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: Institucion,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<InstitucionRpta> {
		return this.http.delete<InstitucionRpta>(`${this.apiUrl}/${id}`);
	}

}