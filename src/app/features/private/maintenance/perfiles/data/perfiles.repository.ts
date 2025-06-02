import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Perfil, PerfilRpta } from './perfil.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PerfilesRepository {
	private apiUrl = `${environment.urlBackend}/api/perfil`;

	constructor(
		private http: HttpClient
	) {}

	getAll(page: number, size: number): Observable<PerfilRpta> {
		return this.http.get<PerfilRpta>(`${this.apiUrl}?page=${page}&size=${size}`);
	}

	getBydId(id: number): Observable<PerfilRpta> {
		return this.http.get<PerfilRpta>(`${this.apiUrl}/${id}`);
	}

	create(perfil: Perfil): Observable<PerfilRpta> {
		return this.http.post<PerfilRpta>(`${this.apiUrl}`, perfil);
	}

	update(id: number, perfil: Perfil): Observable<PerfilRpta> {
		perfil.idePerfil = id;
		return this.http.put<PerfilRpta>(`${this.apiUrl}/${id}`, perfil);
	}

	postForm(perfil: Perfil,id?: number){
		if(id){
			return this.update(id,perfil)
		}else{
			return this.create(perfil)
		}
	}

	delete(id: number): Observable<PerfilRpta> {
		return this.http.delete<PerfilRpta>(`${this.apiUrl}/${id}`);
	}

}