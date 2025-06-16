import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EvaluacionAnual, EvaluacionAnualRpta } from './evaluacion-anual.model';
import { appendFormData } from 'src/app/core/helpers/clean-form';

@Injectable({ providedIn: 'root' })
export class EvaluacionesAnualesRepository {
	private apiUrl = `${environment.urlBackend}/api/evaluacion-anual`;

	constructor(
		private http: HttpClient
	) {}

	getAllByConvenio(ideConvenio:number): Observable<EvaluacionAnualRpta> {
		return this.http.get<EvaluacionAnualRpta>(`${this.apiUrl}/get-all-by-convenio/${ideConvenio}`);
	}

	getAll(): Observable<EvaluacionAnualRpta> {
		return this.http.get<EvaluacionAnualRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<EvaluacionAnualRpta> {
		return this.http.get<EvaluacionAnualRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: EvaluacionAnual): Observable<EvaluacionAnualRpta> {
		return this.http.post<EvaluacionAnualRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: EvaluacionAnual): Observable<EvaluacionAnualRpta> {
		entidad.ideEvaluacionAnual = id;
		return this.http.put<EvaluacionAnualRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: EvaluacionAnual,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<EvaluacionAnualRpta> {
		return this.http.delete<EvaluacionAnualRpta>(`${this.apiUrl}/${id}`);
	}

}