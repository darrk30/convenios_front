import { Injectable, signal } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { PaginationService } from 'src/app/core/services/pagination.service';
import { SectorInstitucion, SectorInstitucionRpta } from '../data/sectores-instituciones.model';
import { SectoresInstitucionesRepository } from '../data/sectores-instituciones.repository';


@Injectable({ providedIn: 'root' })
export class SectoresInstitucionesStateService {
    items = signal<SectorInstitucion[]>([]);
    item = signal<SectorInstitucion | null>(null);
    // totalItems = signal<number>(1);
    // currentPage = signal<number>(1);
    // pageSize = signal<number>(5);

    constructor(
        private sectoresInstitucionesRepository: SectoresInstitucionesRepository,
        private spinner: NgxSpinnerService,
        private toastr: ToastrService,
        private paginationService: PaginationService
    ) {}

    loadItems(page: number = 1) {
        this.spinner.show();
        this.sectoresInstitucionesRepository.getAll().subscribe({
            next: (data:SectorInstitucionRpta) => {
                this.items.set(data.datos);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    loadItemById(id: number) {
        this.spinner.show();
        this.sectoresInstitucionesRepository.getBydId(id).subscribe({
            next: (data) => {
                this.item.set(data.dato);
                this.spinner.hide();
            },
            error: () => this.spinner.hide(),
        });
    }

    addItem(item: SectorInstitucion, onSuccess?: () => void) {
        this.spinner.show();
        this.sectoresInstitucionesRepository.create(item).subscribe({
            next: (data) => {
                this.loadItems();
                this.toastr.success('Sector de Institución registrado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al registrar el Sector de Institución');
                this.spinner.hide();
            }
        });
    }

    updateItem(id: number, item: SectorInstitucion, onSuccess?: () => void) {
        this.spinner.show();
        this.sectoresInstitucionesRepository.update(id, item).subscribe({
            next: () => {
                this.loadItems();
                this.toastr.success('Sector de Institución actualizado correctamente');
                this.spinner.hide();
                if (onSuccess) onSuccess();
            },
            error: () => {
                this.toastr.error('Error al actualizar el Sector de Institución');
                this.spinner.hide();
            }
        });
    }

    postForm(item: SectorInstitucion, id?: number, onSuccess?: () => void){
        if(id){
            this.updateItem(id, item, onSuccess)
        }else{
            this.addItem(item, onSuccess)
        }
    }

    deleteItem(id: number) {
        this.spinner.show();
        this.sectoresInstitucionesRepository.delete(id).subscribe({
            next: () => {
                this.loadItems();
                this.toastr.success('Sector de Institución eliminado correctamente');
                this.spinner.hide();
            },
            error: () => {
                this.toastr.error('Error al eliminar el Sector de Institución');
                this.spinner.hide();
            }
        });
    }
}