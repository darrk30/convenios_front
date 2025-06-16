import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EvaluacionAnualPlanTrabajo, EvaluacionAnualPlanTrabajoRpta } from './evaluacion-anual-plan-trabajo.model';
import { appendFormData } from 'src/app/core/helpers/clean-form';

@Injectable({ providedIn: 'root' })
export class EvaluacionesAnualesPlanesTrabajosRepository {
	private apiUrl = `${environment.urlBackend}/api/evaluacion-anual-plan-trabajo`;

	constructor(
		private http: HttpClient
	) {}

	getAllByConvenio(ideConvenio:number): Observable<EvaluacionAnualPlanTrabajoRpta> {
		return this.http.get<EvaluacionAnualPlanTrabajoRpta>(`${this.apiUrl}/get-all-by-convenio/${ideConvenio}`);
	}

	getAll(): Observable<EvaluacionAnualPlanTrabajoRpta> {
		return this.http.get<EvaluacionAnualPlanTrabajoRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<EvaluacionAnualPlanTrabajoRpta> {
		return this.http.get<EvaluacionAnualPlanTrabajoRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: EvaluacionAnualPlanTrabajo): Observable<EvaluacionAnualPlanTrabajoRpta> {
		const body = new FormData();
		appendFormData(body, entidad);
		return this.http.post<EvaluacionAnualPlanTrabajoRpta>(`${this.apiUrl}`, body);
	}

	update(id: number, entidad: EvaluacionAnualPlanTrabajo): Observable<EvaluacionAnualPlanTrabajoRpta> {
		entidad.ideEvaluacionAnualPlanTrabajo = id;
		const body = new FormData();
		appendFormData(body, entidad);
		return this.http.put<EvaluacionAnualPlanTrabajoRpta>(`${this.apiUrl}/${id}`, body);
	}

	postForm(entidad: EvaluacionAnualPlanTrabajo,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<EvaluacionAnualPlanTrabajoRpta> {
		return this.http.delete<EvaluacionAnualPlanTrabajoRpta>(`${this.apiUrl}/${id}`);
	}

	descargar(uuid: string): Observable<Blob> {
		return this.http.get(`${this.apiUrl}/descargar/${uuid}`, { responseType: 'blob' });
	}

}