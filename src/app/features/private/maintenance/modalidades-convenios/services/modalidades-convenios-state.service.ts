import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { ModalidadConvenio, ModalidadConvenioRpta } from '../data/modalidad-convenio.model';
import { ModalidadesConveniosRepository } from '../data/modalidades-convenios.repository';


@Injectable({ providedIn: 'root' })
export class ModalidadesConveniosStateService {
    items = signal<ModalidadConvenio[]>([]);
    item = signal<ModalidadConvenio | null>(null);
    // totalItems = signal<number>(1);
    // currentPage = signal<number>(1);
    // pageSize = signal<number>(5);

    constructor(
        private modalidadesConveniosRepository: ModalidadesConveniosRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private paginationService: PaginationService
    ) {}

    loadItems(page: number = 1) {
        this.spinner.show();
        this.modalidadesConveniosRepository.getAll().subscribe({
            next: (data:ModalidadConvenioRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.modalidadesConveniosRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: ModalidadConvenio, onSuccess?: () => void) {
        this.spinner.show();
        this.modalidadesConveniosRepository.create(item).subscribe({
            next: (data) => {
                this.loadItems();
                this.toastr.success('Modalidad Convenio registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el Modalidad Convenio');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: ModalidadConvenio, onSuccess?: () => void) {
        this.spinner.show();
        this.modalidadesConveniosRepository.update(id, item).subscribe({
            next: () => {
                this.loadItems();
                this.toastr.success('Modalidad Convenio actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el Modalidad Convenio');
                this.spinner.hide();
            }
        });
    }

    postForm(item: ModalidadConvenio, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number) {
        this.spinner.show();
        this.modalidadesConveniosRepository.delete(id).subscribe({
            next: () => {
                this.loadItems();
                this.toastr.success('Modalidad Convenio eliminado correctamente');
                this.spinner.hide();
            },
            error: () => {
                this.toastr.error('Error al eliminar el Modalidad Convenio');
                this.spinner.hide();
            }
        });
    }
}