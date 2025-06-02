import { Injectable, signal } from '@angular/core';
import { PerfilesRepository } from '../data/perfiles.repository';
import { Perfil, PerfilRpta } from '../data/perfil.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';

@Injectable({ providedIn: 'root' })
export class PerfilesStateService {
    items = signal<Perfil[]>([]);
    selectedItem = signal<Perfil | null>(null);
    // totalItems = signal<number>(1);
    // currentPage = signal<number>(1);
    // pageSize = signal<number>(5);

    constructor(
        private perfilesRepository: PerfilesRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private paginationService: PaginationService
    ) {}

    loadItems(page: number = 1) {
        this.spinner.show();
        this.perfilesRepository.getAll(page, this.paginationService.pageSize()).subscribe({
            next: (data:PerfilRpta) => {
                this.items.set(data.datos);
                this.paginationService.setTotalItems(data.total);
                this.paginationService.setPage(page);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.perfilesRepository.getBydId(id).subscribe({
            next: (data) => {
                this.selectedItem.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: Perfil, onSuccess?: () => void) {
        this.spinner.show();
        this.perfilesRepository.create(item).subscribe({
            next: (data) => {
                this.loadItems();
                this.toastr.success('Perfil registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el perfil');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: Perfil, onSuccess?: () => void) {
        this.spinner.show();
        this.perfilesRepository.update(id, item).subscribe({
            next: () => {
                this.loadItems();
                this.toastr.success('Perfil actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el perfil');
                this.spinner.hide();
            }
        });
    }

    postForm(item: Perfil, onSuccess?: () => void, id?: number){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number) {
        this.spinner.show();
        this.perfilesRepository.delete(id).subscribe({
            next: () => {
                this.loadItems();
                this.toastr.success('Perfil eliminado correctamente');
                this.spinner.hide();
            },
            error: () => {
                this.toastr.error('Error al eliminar el perfil');
                this.spinner.hide();
            }
        });
    }
}