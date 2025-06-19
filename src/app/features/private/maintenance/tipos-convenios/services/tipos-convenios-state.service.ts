import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';

import { TiposConveniosRepository } from '../data/tipos-convenios.repository';
import { TipoConvenio, TipoConvenioRpta } from '../data/tipo-convenio.model';


@Injectable({ providedIn: 'root' })
export class TiposConveniosStateService {
    items = signal<TipoConvenio[]>([]);
    item = signal<TipoConvenio | null>(null);
    // totalItems = signal<number>(1);
    // currentPage = signal<number>(1);
    // pageSize = signal<number>(5);

    constructor(
        private tiposConveniosRepository: TiposConveniosRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
    ) {}

    loadItems() {
        this.spinner.show();
        this.tiposConveniosRepository.getAll().subscribe({
            next: (data:TipoConvenioRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.tiposConveniosRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: TipoConvenio, onSuccess?: () => void) {
        this.spinner.show();
        this.tiposConveniosRepository.create(item).subscribe({
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

    updateItem(id: number, item: TipoConvenio, onSuccess?: () => void) {
        this.spinner.show();
        this.tiposConveniosRepository.update(id, item).subscribe({
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

    postForm(item: TipoConvenio, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number) {
        this.spinner.show();
        this.tiposConveniosRepository.delete(id).subscribe({
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