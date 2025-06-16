import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ContraparteCoordinador, ContraparteCoordinadorRpta } from './contraparte-coordinador.model';

@Injectable({ providedIn: 'root' })
export class ContrapartesCoordinadorRepository {
	private apiUrl = `${environment.urlBackend}/api/contraparte-coordinador`;

	constructor(
		private http: HttpClient
	) {}

	getAllByConvenio(ideConvenio:number): Observable<ContraparteCoordinadorRpta> {
		return this.http.get<ContraparteCoordinadorRpta>(`${this.apiUrl}/get-all-contraparte-coordinador-by-convenio/${ideConvenio}`);
	}

	getAll(): Observable<ContraparteCoordinadorRpta> {
		return this.http.get<ContraparteCoordinadorRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<ContraparteCoordinadorRpta> {
		return this.http.get<ContraparteCoordinadorRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: ContraparteCoordinador): Observable<ContraparteCoordinadorRpta> {
		return this.http.post<ContraparteCoordinadorRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: ContraparteCoordinador): Observable<ContraparteCoordinadorRpta> {
		entidad.ideContraparteCoordinador = id;
		return this.http.put<ContraparteCoordinadorRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: ContraparteCoordinador,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<ContraparteCoordinadorRpta> {
		return this.http.delete<ContraparteCoordinadorRpta>(`${this.apiUrl}/${id}`);
	}

}