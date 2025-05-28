import { Injectable } from '@angular/core';
import { environment } from 'environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) { }

  getConvenios() {
    return this.http.get(`${this.apiUrl}/convenios`);
  }

  putConvenio(id: number, convenio: any) {
    return this.http.put(`${this.apiUrl}/convenios/${id}`, convenio);
  }

  postConvenio(convenio: any) {
    return this.http.post(`${this.apiUrl}/convenios`, convenio);
  }

  deleteConvenio(id: number) {
    return this.http.delete(`${this.apiUrl}/convenios/${id}`);
  }

  getPaises(){
    return this.http.get(`${this.apiUrl}/pais`)
  }

  getModalidadesConv(){
    const headers = new HttpHeaders().set('Intranet_cors', '');
    return this.http.get(`${this.apiUrl}/ModalidadConvenio/combo`)
  }

  getUnidadEjec(){
    return this.http.get(`${this.apiUrl}/Oficina/combo`)
  }

  getPersonalCAS(){
    return this.http.get(`${this.apiUrl}/PersonalCAS`)
  }

  getEstados(){
    return this.http.get(`${this.apiUrl}/EstadoAcuerdo/combo`)
  }
  getInstituciones(){
    return this.http.get(`${this.apiUrl}/Institucion/combo`)
  }
}
