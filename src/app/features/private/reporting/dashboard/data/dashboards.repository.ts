import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardResponse } from './dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardsRepository {
	private apiUrl = `${environment.urlBackend}/api/reporte`;

	constructor(
		private http: HttpClient
	) {}

	getDashboardData(): Observable<DashboardResponse> {
		return this.http.get<DashboardResponse>(`${this.apiUrl}/dashboard`);
	}


}