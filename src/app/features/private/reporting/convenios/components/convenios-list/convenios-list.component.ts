import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadosConveniosStateService } from 'src/app/features/private/maintenance/estados-convenios/services/estados-convenios-state.service';
import { ModalidadesConveniosStateService } from 'src/app/features/private/maintenance/modalidades-convenios/services/modalidades-convenios-state.service';
import { PaisesStateService } from 'src/app/features/private/maintenance/paises/services/paises-state.service';
import { OficinasStateService } from 'src/app/features/private/maintenance/oficinas/services/oficinas-state.service';
import { InstitucionesStateService } from 'src/app/features/private/maintenance/instituciones/services/instituciones-state.service';
import { ArchivoStore } from 'src/app/features/private/business/archivos/services/archivo.store';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Convenio } from 'src/app/features/private/business/convenios/data/convenio.model';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import { ConveniosStateService } from 'src/app/features/private/business/convenios/services/convenios-state.service';
import { ConvenioStore } from 'src/app/features/private/business/convenios/services/convenios.store';
import Swal from 'sweetalert2';
import { saveAs } from "file-saver";
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';
import { TiposConveniosStateService } from 'src/app/features/private/maintenance/tipos-convenios/services/tipos-convenios-state.service';

@Component({
	selector: 'app-convenios-list',
	templateUrl: './convenios-list.component.html',
	styleUrl: './convenios-list.component.css',
	standalone: true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,PagetitleComponent],
})
export class ConveniosListComponent {
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);
	public conveniosStateService = inject(ConveniosStateService);
	public estadosConveniosStateService = inject(EstadosConveniosStateService);
	public tiposConveniosStateService = inject(TiposConveniosStateService);
	public modalidadesConveniosStateService = inject(ModalidadesConveniosStateService);
	public paisesStateService = inject(PaisesStateService);
	public oficinasStateService = inject(OficinasStateService);
	public institucionesStateService = inject(InstitucionesStateService);
	public convenioStore = inject(ConvenioStore);
	public archivoStore = inject(ArchivoStore);

	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();

	dtOptions: DataTables.Settings = {};

	originalConvenios: Convenio[] = [];
	conveniosFiltrados: Convenio[] = [];
	breadCrumbItems: Array<{}>;
	aniosSuscripcion:any;
	formData: FormGroup = this.formBuilder.group({
		ideEstadoConvenio:[""],
		ideModalidadConvenio:[""],
		ideTipoConvenio:[""],
		ideAnio:[""],
		idePais:[""],
		ideContraparte:[],
		ideOrganoEjecutor:[],
	});

	ngOnInit(): void {
		this.breadCrumbItems = [{ label: 'Lista de convenios' }, { label: 'convenios', active: true }];
		this.dtOptions = dtOptionsData;
		this.conveniosStateService.clearState();
		this.listar();
		this.listarEstadosConvenios();
		this.listarTiposConvenios();
		this.listarModalidadesConvenios();
		this.listarPaises();
		this.listarOficinas();
		this.listarInstituciones();
	}

	listarEstadosConvenios(){
		this.estadosConveniosStateService.loadItems();
	}

	listarTiposConvenios(){
		this.tiposConveniosStateService.loadItems();
	}

	listarModalidadesConvenios(){
		this.modalidadesConveniosStateService.loadItems();
	}

	listarPaises(){
		this.paisesStateService.loadItems();
	}

	listarOficinas(){
		this.oficinasStateService.loadItems();
	}

	listarInstituciones(){
		this.institucionesStateService.loadItems();
	}

	listar(){
		this.conveniosStateService.loadItems().subscribe(() => {
			this.originalConvenios = this.conveniosStateService.items();
			this.conveniosFiltrados = [...this.originalConvenios];
			this.aniosSuscripcion = Array.from(
				new Set(
					this.originalConvenios
						.filter(c => c.fecSuscripcion) // evita nulos
						.map(c => new Date(c.fecSuscripcion!).getFullYear())
				)
			).sort((a, b) => b - a);
			this.rerender();
		});
	}

	ngAfterViewInit(): void {
		this.dtTrigger.next();
	}

	ngOnDestroy(): void {
		// Do not forget to unsubscribe the event
		this.dtTrigger.unsubscribe();
	}

	rerender(): void {
		if(this.dtElement==undefined) return;
		this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
			// Destroy the table first
			dtInstance.destroy();
			// Call the dtTrigger to rerender again
			this.dtTrigger.next();
		});
	}


	ver(convenio:Convenio){
		this.router.navigate([`negocio/convenio/ver/${convenio.ideConvenio}`]);
	}

	buscar(){
		this.conveniosFiltrados = this.originalConvenios.filter(c => {
			const estadoSeleccionado = +this.formData.get('ideEstadoConvenio').value;

			const aniosSeleccionados: number[] = this.formData.get('ideAnio')?.value || [];
			//const anioSeleccionado = +this.formData.get('ideAnio').value;
			
			const tiposConveniosSeleccionadas: number[] = this.formData.get('ideTipoConvenio')?.value || [];

			const modalidadesSeleccionadas: number[] = this.formData.get('ideModalidadConvenio')?.value || [];
			//const modalidadSeleccionada = +this.formData.get('ideModalidadConvenio').value;

			const paisesSeleccionados: number[] = this.formData.get('idePais')?.value || [];
			//const paisSeleccionado = +this.formData.get('idePais').value;
			
			const contrapartesSeleccionadas: number[] = this.formData.get('ideContraparte')?.value || [];

			//const contraparteSeleccionado = +this.formData.get('ideContraparte').value;

			const organosEjecutoresSeleccionados: number[] = this.formData.get('ideOrganoEjecutor')?.value || [];
			//const organoEjecutorSeleccionado = +this.formData.get('ideOrganoEjecutor').value;

			const coincideEstadoConvenio = !estadoSeleccionado || c.estadoConvenio?.ideEstadoConvenio === estadoSeleccionado;
			
			

			const coincideModalidadConvenio = modalidadesSeleccionadas.length === 0 ||
				c.modalidadConvenio && modalidadesSeleccionadas.includes(c.modalidadConvenio.ideModalidadConvenio);

			const coincideTipoConvenio = tiposConveniosSeleccionadas.length === 0 ||
				c.tipoConvenio && tiposConveniosSeleccionadas.includes(c.tipoConvenio.ideTipoConvenio);

			//const coincideModalidadConvenio = !modalidadSeleccionada || c.modalidadConvenio?.ideModalidadConvenio === modalidadSeleccionada;

			const coincideOrganoEjecutorConvenio = organosEjecutoresSeleccionados.length === 0 || 
				c.oficinasProponentes?.some(cp => organosEjecutoresSeleccionados.includes(cp.ideOficina));

			// const coincideOrganoEjecutorConvenio = !organoEjecutorSeleccionado || 
			// (
			// 	c.oficinasProponentes?.some(cp => cp.ideOficina === organoEjecutorSeleccionado)
			// );


			const coincidePais = paisesSeleccionados.length === 0 ||
				c.contrapartes?.some(cp => paisesSeleccionados.includes(cp.institucion?.pais?.idePais));

			// const coincidePais = !paisSeleccionado || (
			// 	c.contrapartes?.some(cp => cp.institucion?.pais?.idePais === paisSeleccionado)
			// );

			const coincideContraparte = contrapartesSeleccionadas.length === 0 || 
					c.contrapartes?.some(cp => contrapartesSeleccionadas.includes(cp.institucion?.ideInstitucion));

			// const coincideContraparte = !contraparteSeleccionado || (
			// 	c.contrapartes?.some(cp => cp.institucion.ideInstitucion === contraparteSeleccionado)
			// );

			


			const coincideAnio = aniosSeleccionados.length === 0 || 
    			(c.fecSuscripcion && aniosSeleccionados.includes(new Date(c.fecSuscripcion).getFullYear()));

			// const coincideAnio = !anioSeleccionado || 
			// 	(c.fecSuscripcion && new Date(c.fecSuscripcion).getFullYear() === anioSeleccionado);

			return coincideEstadoConvenio && coincideTipoConvenio && coincidePais && coincideContraparte && coincideOrganoEjecutorConvenio && coincideAnio;
		});

		this.rerender();
	}

	descargarExcel(){
		this.convenioStore.descargarExcel().subscribe({
			next: (response: Blob) => {
				const contentType = response.type;

				// Determinar la extensión del archivo basada en el tipo MIME
				let extension = '';
				switch (contentType) {
					case 'application/pdf':
					extension = '.pdf';
					break;
					case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
					extension = '.xlsx';
					break;
					case 'application/vnd.ms-excel':
					extension = '.xls';
					break;
					case 'text/plain':
					extension = '.txt';
					break;
					case 'application/zip':
					extension = '.zip';
					break;
					default:
					extension = ''; // Extensión por defecto si no se reconoce el tipo MIME
				}

				// Crear un archivo Blob a partir de la respuesta
				const blob = new Blob([response], { type: contentType });

				// Generar un nombre de archivo dinámico
				const fileName = `CONVENIOS.${extension}`;

				// Usar file-saver para descargar el archivo
				saveAs(blob, fileName);
			},
			error: (error) => {
				console.error('Error al descargar el PDF', error);
			}
		});
	}
	
	descargarExcelResumen(){
		this.convenioStore.descargarExcelResumen().subscribe({
			next: (response: Blob) => {
				const contentType = response.type;

				// Determinar la extensión del archivo basada en el tipo MIME
				let extension = '';
				switch (contentType) {
					case 'application/pdf':
					extension = '.pdf';
					break;
					case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
					extension = '.xlsx';
					break;
					case 'application/vnd.ms-excel':
					extension = '.xls';
					break;
					case 'text/plain':
					extension = '.txt';
					break;
					case 'application/zip':
					extension = '.zip';
					break;
					default:
					extension = ''; // Extensión por defecto si no se reconoce el tipo MIME
				}

				// Crear un archivo Blob a partir de la respuesta
				const blob = new Blob([response], { type: contentType });

				// Generar un nombre de archivo dinámico
				const fileName = `CONVENIOS_RESUMEN.${extension}`;

				// Usar file-saver para descargar el archivo
				saveAs(blob, fileName);
			},
			error: (error) => {
				console.error('Error al descargar el PDF', error);
			}
		});
	}

	descargarConvenio(uuid:string) {
		this.convenioStore.descargar(uuid).subscribe({
			next: (blob) => {
				saveAs(blob, `${uuid}.pdf`);
			},
			error: (error) => {
				console.error('Error al descargar el PDF', error);
			}
		});
	}

	descargarAdenda(uuid:string) {
		this.archivoStore.descargar(uuid).subscribe({
			next: (blob) => {
				saveAs(blob, `${uuid}.pdf`);
			},
			error: (error) => {
				console.error('Error al descargar el PDF', error);
			}
		});
	}

	getColorPorFecha(fecFinalizacion: string | Date): string {
		const hoy = new Date();
		const fechaFinal = new Date(fecFinalizacion);

		// Diferencia en meses (aproximado)
		const mesesRestantes =
			(fechaFinal.getFullYear() - hoy.getFullYear()) * 12 +
			(fechaFinal.getMonth() - hoy.getMonth());

		if (mesesRestantes < 3) {
			return 'text-danger'; // Menos de 3 meses → rojo
		} else if (mesesRestantes < 6) {
			return 'text-warning'; // Entre 3 y 6 meses → amarillo
		} else {
			return 'text-success'; // Más de 6 meses → verde
		}
	}
}
