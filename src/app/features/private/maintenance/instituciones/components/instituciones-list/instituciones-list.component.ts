import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, inject, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Subject } from 'rxjs';
import { dtOptionsData } from 'src/app/core/helpers/dtoptions.data';
import { InstitucionesStateService } from '../../services/instituciones-state.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { Institucion } from '../../data/institucion.model';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { NgxSpinnerService } from 'ngx-spinner';


import { PaisesStateService } from 'src/app/features/private/maintenance/paises/services/paises-state.service';
import { TiposInstitucionesStateService } from 'src/app/features/private/maintenance/tipos-instituciones/services/tipos-instituciones-state.service';

import { SectoresInstitucionesStateService } from 'src/app/features/private/maintenance/sectores-instituciones/services/sectores-instituciones-state.service';

import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';



@Component({
  selector: 'app-instituciones-list',
  standalone: true,
  imports:[DataTablesModule,BsDropdownModule,CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,PagetitleComponent],
  templateUrl: './instituciones-list.component.html',
  styleUrl: './instituciones-list.component.css'
})
export class InstitucionesListComponent implements OnInit, OnDestroy, AfterViewInit{
  private spinner = inject(NgxSpinnerService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);
  public institucionesStateService = inject(InstitucionesStateService);
  public paisesStateService = inject(PaisesStateService);
  public tiposInstitucionesStateService = inject(TiposInstitucionesStateService);
  public sectoresInstitucionesStateService = inject(SectoresInstitucionesStateService);

  @ViewChild(DataTableDirective, {static: false}) dtElement: DataTableDirective;
  dtTrigger: Subject<void> = new Subject<any>();

  dtOptions: DataTables.Settings = {};

  originalInstituciones: Institucion[] = [];
  institucionesFiltrados: Institucion[] = [];
  breadCrumbItems: Array<{}>;

  formData: FormGroup = this.formBuilder.group({
    idePais:[""],
    ideTipoInstitucion: [""],
    ideSectorInstitucion: [""]
  });

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Lista de Instituciones' }, { label: 'instituciones', active: true }];
    this.dtOptions = dtOptionsData;
    this.listar();
    this.listarPaises();
    this.listarTiposInstituciones();
    this.listarSectoresInstituciones();
  }

  listarPaises(){
    this.paisesStateService.loadItems();
  }

  listarTiposInstituciones(){
    this.tiposInstitucionesStateService.loadItems();
  }
    
  listarSectoresInstituciones(){
    this.sectoresInstitucionesStateService.loadItems();
  }

  listar(){
    this.spinner.show();
    this.institucionesStateService.loadItems().subscribe(() => {
      this.originalInstituciones = this.institucionesStateService.items();

      this.institucionesFiltrados = [...this.originalInstituciones];
      
      this.rerender();
      this.spinner.hide();
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
    this.router.navigate([`mantenimiento/institucion/crear`]);
  }

  editar(institucion: Institucion){
    this.router.navigate([`mantenimiento/institucion/editar/${institucion.ideInstitucion}`]);
  }

  eliminar(ideInstitucion: number){
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
        this.institucionesStateService.deleteItem(ideInstitucion).subscribe(() => {
          this.listar();
        });
      }
    });
  }
  
  buscar(){
    this.institucionesFiltrados = this.originalInstituciones.filter(i => {
      const paisesSeleccionados: number[] = this.formData.get('idePais')?.value || [];
      const tiposInstitucionesSeleccionados: number[] = this.formData.get('ideTipoInstitucion')?.value || [];
      const sectoresInstitucionesSeleccionados: number[] = this.formData.get('ideSectorInstitucion')?.value || [];

      const coincidePais = paisesSeleccionados.length === 0 ||
        i.pais && paisesSeleccionados.includes(i.pais.idePais);
      const coincideTipoInstitucion = tiposInstitucionesSeleccionados.length === 0 ||
        i.tipoInstitucion && tiposInstitucionesSeleccionados.includes(i.tipoInstitucion.ideTipoInstitucion);
      const coincideSectorInstitucion = sectoresInstitucionesSeleccionados.length === 0 ||
        i.sectorInstitucion && sectoresInstitucionesSeleccionados.includes(i.sectorInstitucion.ideSectorInstitucion);
        
      return  coincidePais && coincideTipoInstitucion && coincideSectorInstitucion;
    });

    this.rerender();
  }

}
