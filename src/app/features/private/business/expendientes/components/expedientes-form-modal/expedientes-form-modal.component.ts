import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { ExpedientesStateService } from '../../services/expedientes-state.service';
import { Expediente } from '../../data/expediente.model';
import { transformFormData } from '@/app/core/helpers/clean-form';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-expedientes-form-modal',
	templateUrl: './expedientes-form-modal.component.html',
	styleUrl: './expedientes-form-modal.component.css',
	standalone:true,
	imports:[ModalModule,FormsModule,ReactiveFormsModule,CommonModule,NgSelectModule]
})
export class ExpedientesFormModalComponent {
	private modalService = inject(BsModalService);
	private formBuilder = inject(FormBuilder);
	public expedientesStateService = inject(ExpedientesStateService);

	@Input() expediente:Expediente;
	@Input() flagAccion: number;

	@Output() onSave = new EventEmitter<void>();

	expedientes: Expediente[] = [];

	formData: FormGroup = this.formBuilder.group({
		ideExpediente: [],
		ideConvenio: [,[Validators.required]],
		txtExpediente: [,[Validators.required]],
		txtTipoDocumento: [{value:null,disabled:true},[Validators.required]],
		txtNumeroDocumento: [{value:null,disabled:true},[Validators.required]],
		fecEmision: [{value:null,disabled:true},[Validators.required]],
		txtAsunto: [{value:null,disabled:true},[Validators.required]],
	});

	// formData: FormGroup = this.formBuilder.group({
    //     ideExpediente: [],
    //     ideConvenio: [,[Validators.required]],
    //     txtExpediente: [,[Validators.required]],
    //     // 2. Se eliminan los campos individuales de documentos
    //     // txtTipoDocumento: [{value:null,disabled:true},[Validators.required]],
    //     // txtNumeroDocumento: [{value:null,disabled:true},[Validators.required]],
    //     // fecEmision: [{value:null,disabled:true},[Validators.required]],
    //     // txtAsunto: [{value:null,disabled:true},[Validators.required]],
    // });

	submitted = false;

	constructor(){

	}

	ngOnInit(): void {
		//this.formData.patchValue(this.perfil);
		this.formData.patchValue(this.expediente);
		if(this.flagAccion == 3) { 
			this.formData.disable();
		}
	}

	buscarExpediente(){
		this.expedientes = [];

		if (this.formData.get('txtExpediente').invalid) return;


		this.expedientesStateService.loadItemByExpediente(this.formData.get('txtExpediente').value).subscribe((data: any) => {
			console.log(data)
			if(data.exitoso == true){
				this.expedientes = data.datos;

				// this.formData.patchValue({
				// 	txtTipoDocumento: data.datos[0].tipoDocumento,
				// 	txtNumeroDocumento: data.datos[0].numeroDocumento,
				// 	fecEmision: data.datos[0].fechaEmision,
				// 	txtAsunto: data.datos[0].asunto,
				// })
			} else {
                 // Opcional: mostrar un mensaje de que no se encontraron documentos
                 this.expedientes = [];
            }
		});
	}

	grabar(){
		if (this.formData.valid && this.expedientes.length > 0) {

			// 1. Obtener los valores base del formulario (ej. ideConvenio, txtExpediente)
            const baseData = this.formData.getRawValue();

			// 2. Crear un arreglo de Observables para cada solicitud POST
            const postRequests = this.expedientes.map((doc: any) => {
				// Construir el objeto de datos para cada documento
                // Se combina la data base del formulario (expediente, convenio) con la data del documento

				let formattedDate: string | null = null;
            
				if (doc.fechaEmision) {
					const parts = doc.fechaEmision.substring(0, 10).split('-'); // parts = ["04", "02", "2025"]
					[parts[0], parts[2]] = [parts[2], parts[0]];

					// Asegurar que haya 3 partes y que todas sean números válidos
					if (parts.length === 3 && !isNaN(parseInt(parts[0])) && !isNaN(parseInt(parts[1])) && !isNaN(parseInt(parts[2]))) {
						
						const day = parseInt(parts[0], 10);
						const month = parseInt(parts[1], 10); // Meses en JS son 0-11
						const year = parseInt(parts[2], 10);

						// Creamos el objeto Date de forma segura: new Date(year, monthIndex, day)
						const dateObject = new Date(year, month - 1, day);

						// Verificamos si la fecha es válida antes de llamar a toISOString()
						if (!isNaN(dateObject.getTime())) {
							formattedDate = dateObject.toISOString().substring(0, 10); // Genera "YYYY-MM-DD"
						} else {
							console.error('Fecha inválida después del parseo:', doc.fechaEmision);
							// Opcional: manejar el error aquí (ej. saltar el documento)
						}
					} else {
						console.error('Formato de fecha incorrecto o partes no numéricas:', doc.fechaEmision);
					}
				}
					
                const documentPayload = {
                    ...baseData,
                    txtTipoDocumento: doc.tipoDocumento,
                    txtNumeroDocumento: doc.numeroDocumento,
                    fecEmision: doc.fechaEmision,
                    txtAsunto: doc.asuntoDocumento,
                    txtdependencia: doc.dependencia
                    // Si el documento tiene su propio ID para actualización, inclúyelo:
                    // ideDocumento: doc.ideDocumento 
                };
                
                // Aquí usamos 'transformFormData' si es necesaria una transformación final
                const formDataTransformed = transformFormData(documentPayload);

				return this.expedientesStateService.postForm(formDataTransformed,this.formData.get('ideExpediente').value?this.formData.get('ideExpediente').value:null);

			});

			// 4. Usar forkJoin para ejecutar todas las solicitudes en paralelo
			forkJoin(postRequests).subscribe({
				next: (results) => {
					console.log('Resultados de todas las grabaciones:', results);
					// 5. Finalización después de que todos los POST se hayan completado (o fallado individualmente)
					this.modalService?.hide();
					this.onSave.emit(); 
				},
				error: (err) => {
					// Esto solo se ejecutará si forkJoin no pudo iniciar las peticiones (raro)
					console.error('Error general al ejecutar forkJoin:', err);
				}
			});

		}
		this.submitted = true
	}

	get form() {
		return this.formData.controls;
	}
}
