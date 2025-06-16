import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Resultado, ResultadoRpta } from './resultado.model';

@Injectable({ providedIn: 'root' })
export class ResultadosRepository {
	private apiUrl = `${environment.urlBackend}/api/resultado`;

	constructor(
		private http: HttpClient
	) {}

	getAllByConvenio(ideConvenio:number): Observable<ResultadoRpta> {
		return this.http.get<ResultadoRpta>(`${this.apiUrl}/get-all-resultado-by-convenio/${ideConvenio}`);
	}

	getAll(): Observable<ResultadoRpta> {
		return this.http.get<ResultadoRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<ResultadoRpta> {
		return this.http.get<ResultadoRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: Resultado): Observable<ResultadoRpta> {
		return this.http.post<ResultadoRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: Resultado): Observable<ResultadoRpta> {
		entidad.ideResultado = id;
		return this.http.put<ResultadoRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: Resultado,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<ResultadoRpta> {
		return this.http.delete<ResultadoRpta>(`${this.apiUrl}/${id}`);
	}

}