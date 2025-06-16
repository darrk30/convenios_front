import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoCoordinador, TipoCoordinadorRpta } from './tipo-coordinador.model';

@Injectable({ providedIn: 'root' })
export class TiposCoordinadoresRepository {
	private apiUrl = `${environment.urlBackend}/api/tipo-coordinador`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<TipoCoordinadorRpta> {
		return this.http.get<TipoCoordinadorRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<TipoCoordinadorRpta> {
		return this.http.get<TipoCoordinadorRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: TipoCoordinador): Observable<TipoCoordinadorRpta> {
		return this.http.post<TipoCoordinadorRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: TipoCoordinador): Observable<TipoCoordinadorRpta> {
		entidad.ideTipoCoordinador = id;
		return this.http.put<TipoCoordinadorRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: TipoCoordinador,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<TipoCoordinadorRpta> {
		return this.http.delete<TipoCoordinadorRpta>(`${this.apiUrl}/${id}`);
	}

}