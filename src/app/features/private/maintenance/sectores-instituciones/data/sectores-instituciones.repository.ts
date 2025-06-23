import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SectorInstitucion, SectorInstitucionRpta } from './sectores-instituciones.model';

@Injectable({ providedIn: 'root' })
export class SectoresInstitucionesRepository {
	private apiUrl = `${environment.urlBackend}/api/sector-institucion`;

	constructor(
		private http: HttpClient
	) {}

	getAll(): Observable<SectorInstitucionRpta> {
		return this.http.get<SectorInstitucionRpta>(`${this.apiUrl}`);
	}

	getBydId(id: number): Observable<SectorInstitucionRpta> {
		return this.http.get<SectorInstitucionRpta>(`${this.apiUrl}/${id}`);
	}

	create(entidad: SectorInstitucion): Observable<SectorInstitucionRpta> {
		return this.http.post<SectorInstitucionRpta>(`${this.apiUrl}`, entidad);
	}

	update(id: number, entidad: SectorInstitucion): Observable<SectorInstitucionRpta> {
		entidad.ideSectorInstitucion = id;
		return this.http.put<SectorInstitucionRpta>(`${this.apiUrl}/${id}`, entidad);
	}

	postForm(entidad: SectorInstitucion,id?: number){
		if(id){
			return this.update(id,entidad)
		}else{
			return this.create(entidad)
		}
	}

	delete(id: number): Observable<SectorInstitucionRpta> {
		return this.http.delete<SectorInstitucionRpta>(`${this.apiUrl}/${id}`);
	}

}