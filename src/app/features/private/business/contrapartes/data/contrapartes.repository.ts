import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Contraparte, ContraparteRpta } from './contraparte.model';

@Injectable({ providedIn: 'root' })
export class ContrapartesRepository {
	private apiUrl = `${environment.urlBackend}/api/contraparte`;

	constructor(
		private http: HttpClient
	) {}

	getAllByConvenio(ideConvenio:number): Observable<ContraparteRpta> {
		return this.http.get<ContraparteRpta>(`${this.apiUrl}/get-all-contraparte-by-convenio/${ideConvenio}`);
	}

	getAll(): Observable<ContraparteRpta> {
		return this.http.get<ContraparteRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<ContraparteRpta> {
		return this.http.get<ContraparteRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: Contraparte): Observable<ContraparteRpta> {
		return this.http.post<ContraparteRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: Contraparte): Observable<ContraparteRpta> {
		entidad.ideContraparte = id;
		return this.http.put<ContraparteRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: Contraparte,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<ContraparteRpta> {
		return this.http.delete<ContraparteRpta>(`${this.apiUrl}/${id}`);
	}

}