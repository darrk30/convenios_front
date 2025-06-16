import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';

import { EstadosConveniosRepository } from '../data/estados-convenios.repository';
import { EstadoConvenio, EstadoConvenioRpta } from '../data/estado-convenio.model';


@Injectable({ providedIn: 'root' })
export class EstadosConveniosStateService {
    items = signal<EstadoConvenio[]>([]);
    item = signal<EstadoConvenio | null>(null);
    // totalItems = signal<number>(1);
    // currentPage = signal<number>(1);
    // pageSize = signal<number>(5);

    constructor(
        private estadosConveniosRepository: EstadosConveniosRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
    ) {}

    loadItems() {
        this.spinner.show();
        this.estadosConveniosRepository.getAll().subscribe({
            next: (data:EstadoConvenioRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.estadosConveniosRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: EstadoConvenio, onSuccess?: () => void) {
        this.spinner.show();
        this.estadosConveniosRepository.create(item).subscribe({
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

    updateItem(id: number, item: EstadoConvenio, onSuccess?: () => void) {
        this.spinner.show();
        this.estadosConveniosRepository.update(id, item).subscribe({
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

    postForm(item: EstadoConvenio, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number) {
        this.spinner.show();
        this.estadosConveniosRepository.delete(id).subscribe({
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