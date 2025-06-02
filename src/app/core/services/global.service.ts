import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GlobalService {
	
	ideUsuario: number;
	nombresApellidos: string;
	numeroDocumento: string;
	nombreLargoSistema: string;
	nombreCortoSistema: string;

	constructor(){
		const storedUser = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('currentUser') ?? 'null'): null;

		this.setNombresApellidos(storedUser?.nombresApellidos);
		this.setNumeroDocumento(storedUser?.numeroDocumento);
		this.setIdeUsuario(storedUser?.ideUsuario);
		this.setNombreLargoSistema(environment.longNameSystem);
		this.setNombreCortoSistema(environment.shortNameSystem);
	}


	setIdeUsuario(ideUsuario:number){
		this.ideUsuario = ideUsuario;
	}

	getIdeUsuario(){
		return this.ideUsuario;
	}

	setNombresApellidos(nombresApellidos:string){
		this.nombresApellidos = nombresApellidos;
	}

	getNombresApellidos(){
		return this.nombresApellidos;
	}

	setNumeroDocumento(numeroDocumento:string){
		this.numeroDocumento = numeroDocumento;
	}

	getNumeroDocumento(){
		return this.numeroDocumento;
	}

	setNombreLargoSistema(nombreLargoSistema:string){
		this.nombreLargoSistema = nombreLargoSistema;
	}

	getNombreLargoSistema(){
		return this.nombreLargoSistema;
	}

	setNombreCortoSistema(nombreCortoSistema:string){
		this.nombreCortoSistema = nombreCortoSistema;
	}

	getNombreCortoSistema(){
		return this.nombreCortoSistema;
	}
}
