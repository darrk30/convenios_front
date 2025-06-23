import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { TipoInstitucion, TipoInstitucionRpta } from '../data/tipos-instituciones.model';
import { TiposInstitucionesRepository } from '../data/tipos-instituciones.repository';


@Injectable({ providedIn: 'root' })
export class TiposInstitucionesStateService {
    items = signal<TipoInstitucion[]>([]);
    item = signal<TipoInstitucion | null>(null);
    // totalItems = signal<number>(1);
    // currentPage = signal<number>(1);
    // pageSize = signal<number>(5);

    constructor(
        private tiposInstitucionesRepository: TiposInstitucionesRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private paginationService: PaginationService
    ) {}

    loadItems(page: number = 1) {
        this.spinner.show();
        this.tiposInstitucionesRepository.getAll().subscribe({
            next: (data:TipoInstitucionRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.tiposInstitucionesRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: TipoInstitucion, onSuccess?: () => void) {
        this.spinner.show();
        this.tiposInstitucionesRepository.create(item).subscribe({
            next: (data) => {
                this.loadItems();
                this.toastr.success('Tipo de Institución registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el Tipo de Institución');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: TipoInstitucion, onSuccess?: () => void) {
        this.spinner.show();
        this.tiposInstitucionesRepository.update(id, item).subscribe({
            next: () => {
                this.loadItems();
                this.toastr.success('Tipo de Institución actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el Tipo de Institución');
                this.spinner.hide();
            }
        });
    }

    postForm(item: TipoInstitucion, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number) {
        this.spinner.show();
        this.tiposInstitucionesRepository.delete(id).subscribe({
            next: () => {
                this.loadItems();
                this.toastr.success('Tipo de Institución eliminado correctamente');
                this.spinner.hide();
            },
            error: () => {
                this.toastr.error('Error al eliminar el Tipo de Institución');
                this.spinner.hide();
            }
        });
    }
}