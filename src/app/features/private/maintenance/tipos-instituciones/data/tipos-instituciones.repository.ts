import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoInstitucion, TipoInstitucionRpta } from './tipos-instituciones.model';

@Injectable({ providedIn: 'root' })
export class TiposInstitucionesRepository {
	private apiUrl = `${environment.urlBackend}/api/tipo-institucion`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<TipoInstitucionRpta> {
		return this.http.get<TipoInstitucionRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<TipoInstitucionRpta> {
		return this.http.get<TipoInstitucionRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: TipoInstitucion): Observable<TipoInstitucionRpta> {
		return this.http.post<TipoInstitucionRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: TipoInstitucion): Observable<TipoInstitucionRpta> {
		entidad.ideTipoInstitucion = id;
		return this.http.put<TipoInstitucionRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: TipoInstitucion,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<TipoInstitucionRpta> {
		return this.http.delete<TipoInstitucionRpta>(`${this.apiUrl}/${id}`);
	}

}