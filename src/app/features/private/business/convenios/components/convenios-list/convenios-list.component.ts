import { Contraparte } from './../../../contrapartes/data/contraparte.model';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import { ConveniosStateService } from '../../services/convenios-state.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Convenio } from '../../data/convenio.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';
import { EstadosConveniosStateService } from 'src/app/features/private/maintenance/estados-convenios/services/estados-convenios-state.service';
import { ModalidadesConveniosStateService } from 'src/app/features/private/maintenance/modalidades-convenios/services/modalidades-convenios-state.service';
import { PaisesStateService } from 'src/app/features/private/maintenance/paises/services/paises-state.service';
import { OficinasStateService } from 'src/app/features/private/maintenance/oficinas/services/oficinas-state.service';
import { InstitucionesStateService } from 'src/app/features/private/maintenance/instituciones/services/instituciones-state.service';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConvenioStore } from '../../services/convenios.store';
import { saveAs } from "file-saver";
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';
import { ArchivoStore } from '../../../archivos/services/archivo.store';


@Component({
	selector: 'app-convenios-list',
	standalone: true,
	imports:[DataTablesModule,BsDropdownModule,CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,PagetitleComponent],
	templateUrl: './convenios-list.component.html',
	styleUrl: './convenios-list.component.css'
})
export class ConveniosListComponent {
	private spinner = inject(NgxSpinnerService);
	private router = inject(Router);
	private formBuilder = inject(FormBuilder);
	public conveniosStateService = inject(ConveniosStateService);
	public estadosConveniosStateService = inject(EstadosConveniosStateService);
	public modalidadesConveniosStateService = inject(ModalidadesConveniosStateService);
	public paisesStateService = inject(PaisesStateService);
	public oficinasStateService = inject(OficinasStateService);
	public institucionesStateService = inject(InstitucionesStateService);
	public convenioStore = inject(ConvenioStore);
	public archivoStore = inject(ArchivoStore);

	@ViewChild('ideEstadoConvenio') ideEstadoConvenio: ElementRef;
	@ViewChild('ideModalidadConvenio') ideModalidadConvenio: ElementRef;
	@ViewChild('idePais') idePais: ElementRef;
	@ViewChild('ideContraparte') ideContraparte: NgSelectComponent;
	@ViewChild('ideOrganoEjecutor') ideOrganoEjecutor: ElementRef;


	@ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
	dtTrigger: Subject<void> = new Subject<any>();

	dtOptions: DataTables.Settings = {};

	originalConvenios: Convenio[] = [];
	conveniosFiltrados: Convenio[] = [];
	breadCrumbItems: Array<{}>;

	formData: FormGroup = this.formBuilder.group({
		ideEstadoConvenio:[""],
		ideModalidadConvenio:[""],
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
		this.listarModalidadesConvenios();
		this.listarPaises();
		this.listarOficinas();
		this.listarInstituciones();
	}

	listarEstadosConvenios(){
		this.estadosConveniosStateService.loadItems();
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

	agregar(){
		this.router.navigate([`negocio/convenio/crear`]);
	}

	editar(convenio:Convenio){
		this.router.navigate([`negocio/convenio/editar/${convenio.ideConvenio}`]);
	}

	eliminar(ideConvenio:number){
		Swal.fire({
			title: '¿Estás seguro de eliminar el registro?',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#34c38f',
			cancelButtonColor: '#f46a6a',
			confirmButtonText: 'Si, Eliminar',
			cancelButtonText: 'Cancelar'
		}).then(result => {
			if (result.value) {
				this.spinner.show();
				this.conveniosStateService.deleteItem(ideConvenio).subscribe(() => {
					this.listar();
				});
			}
		});
	}
	
	buscar(){
		this.conveniosFiltrados = this.originalConvenios.filter(c => {
			const estadoSeleccionado = +this.formData.get('ideEstadoConvenio').value;
			const modalidadSeleccionada = +this.formData.get('ideModalidadConvenio').value;
			const paisSeleccionado = +this.formData.get('idePais').value;
			const contraparteSeleccionado = +this.formData.get('ideContraparte').value;
			const organoEjecutorSeleccionado = +this.formData.get('ideOrganoEjecutor').value;

			const coincideEstadoConvenio = !estadoSeleccionado || c.estadoConvenio?.ideEstadoConvenio === estadoSeleccionado;
			const coincideModalidadConvenio = !modalidadSeleccionada || c.modalidadConvenio?.ideModalidadConvenio === modalidadSeleccionada;

			const coincideOrganoEjecutorConvenio = !organoEjecutorSeleccionado || 
			(
				c.oficinasProponentes?.some(cp => cp.ideOficina === organoEjecutorSeleccionado)
			);


			const coincidePais = !paisSeleccionado || (
				c.contrapartes?.some(cp => cp.institucion?.pais?.idePais === paisSeleccionado)
			);

			const coincideContraparte = !contraparteSeleccionado || (
				c.contrapartes?.some(cp => cp.institucion.ideInstitucion === contraparteSeleccionado)
			);

			return coincideEstadoConvenio && coincideModalidadConvenio && coincidePais && coincideContraparte && coincideOrganoEjecutorConvenio;
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
