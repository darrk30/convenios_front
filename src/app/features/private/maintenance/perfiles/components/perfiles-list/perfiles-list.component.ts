import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';
import { PerfilesFormModalComponent } from '../perfiles-form-modal/perfiles-form-modal.component';
import { PerfilesStateService } from '../../services/perfiles-state.service';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { Perfil } from '../../data/perfil.model';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-perfiles-list',
	templateUrl: './perfiles-list.component.html',
	styleUrl: './perfiles-list.component.css',
	standalone:true,
	imports:[PagetitleComponent,BsDropdownModule,ModalModule,PerfilesFormModalComponent]
})
export class PerfilesListComponent {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private toastr = inject(ToastrService);
	private paginationService = inject(PaginationService);
	public perfilesStateService = inject(PerfilesStateService);
	
	

	modalRef?: BsModalRef;
	flagAccion:number;
	perfil:Perfil;

	breadCrumbItems: Array<{}>;
	tituloPadre: string;
	titulo: string;
	tituloModal: string;


	constructor(
		
	){
		
	}
	
	get currentPage() {
		return this.paginationService.currentPage();
	}

	get totalItems() {
		return this.paginationService.totalItems();
	}

	get pageSize() {
		return this.paginationService.pageSize();
	}

	get totalPages() {
        return Math.ceil(this.totalItems / this.pageSize); // ✅ Math se usa aquí, no en el HTML
    }

	ngOnInit(): void {
		this.breadCrumbItems = [{ label: 'Lista de perfiles' }, { label: 'perfiles', active: true }];
		
		this.informeListar();
	}

	informeListar(page: number = 1){
		this.paginationService.setPage(page);
		this.perfilesStateService.loadItems(page);
	}

	informeBuscar(){
	
	}

	crear(modal:any){
		this.tituloModal = 'Registrar Perfil';
		this.perfil = null;
		this.flagAccion = 1;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	editar(modal:any,perfil:Perfil){
		this.tituloModal = 'Editar Centro Costo';
		this.perfil = perfil;
		this.flagAccion = 2;
		this.modalRef = this.modalService.show(modal, { class: 'md', backdrop: 'static', keyboard: false });
	}

	eliminar(idePerfil:number){
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
				this.perfilesStateService.deleteItem(idePerfil);
			}
		});
	}

	siguientePagina() {
		if (this.currentPage * this.pageSize < this.totalItems) {
			this.informeListar(this.currentPage + 1);
		}
	}

	paginaAnterior() {
		if (this.currentPage > 1) {
			this.informeListar(this.currentPage - 1);
		}
	}


}
