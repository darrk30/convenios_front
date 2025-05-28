import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConvenioService } from '../../../services/convenios/convenio.service';
import { ApiService } from 'app/services/api/api.service';
import { ModalidadConvService } from 'app/services/modalidad-conv/modalidad-conv.service';
import { PaisService } from 'app/services/pais/pais.service';
import { EstadosConvService } from 'app/services/estados_conv/estados-conv.service';


@Component({
  selector: 'app-tabla-convenios',
  imports: [CommonModule, FormsModule],
  templateUrl: './tabla-convenios.component.html',
  styleUrl: './tabla-convenios.component.css'
})

export class TablaConveniosComponent {
  convenios: any[] = [];
  pageSize = 10;
  currentPage = 1;
  busqueda: string = '';
  anioSelect: number = 0;
  estado: string = '0';
  selectedConvId: number = 0;
  anioMax = new Date().getFullYear();
  estado_text: string = '';
  anios: number[] = [];
  modalidadSelect: string = '0';
  contraparteSelect: string = '0';
  private lastSortedColumn: string = '';
  private isAscending: boolean = true;
  paisSelect: string = '0';
  conveniosFiltrados: any[] = [];

  constructor(
    private conveniosService: ConvenioService,
    private router:Router,
    private api:ApiService,
    public modalidad:ModalidadConvService,
    public pais: PaisService,
    public estados: EstadosConvService,
  ) {
    // this.convenios = this.conveniosService['convenio']();
  }
  ngOnInit(){
    const anioActual = new Date().getFullYear();
    for (let i=2020; i <= anioActual; i++) {
      this.anios.push(i);
    }
    this.anios.reverse();
    this.anioSelect = anioActual;
    // this.api.getConvenios().subscribe({
    //   next: (data:any) => {
    //     this.conveniosService.setConvenios(data[0]);
    //     this.convenios = this.conveniosService.getConvenios();
    //   },
    //   error: (error) => {
    //     console.error('Error al obtener los convenios:', error);
    //   }
    // })
    this.convenios = this.conveniosService.getConvenios();
    this.conveniosFiltrados = this.convenios;
    this.api.getModalidadesConv().subscribe({
      next: (data:any) => {
        console.log(data)
        this.modalidad.setModalidadConv(data);

      },
      error: (error) => {
        console.log(error)
      }
    })
    this.api.getEstados().subscribe({
      next: (data:any) => {
        this.estados.setEstados(data);
      },
      error: (error) => {
        console.log(error)
      }
    })
    // this.api.getPaises().subscribe({
    //   next: (data:any) => {
    //     this.pais.setPaises(data[0]);
    //   },
    //   error: (error) => {
    //     console.log(error)
    //   }
    // })
    this.estados.setEstados([
      {
        "id": 'Activo',
        "nombre": 'Activo'
      },
      {
        "id": 'Vencido',
        "nombre": 'Vencido'
      },
      {
        "id": 3,
        "nombre": 'Por vencer'
      }
    ])
    this.pais.setPaises([
      {
        "pais_id": 1,
        "nombre": 'Perú'
      },
      {
        "pais_id": 2,
        "nombre": 'Chile'
      },
      {
        "pais_id": 3,
        "nombre": 'Rusia'
      },
      {
        "pais_id": 4,
        "nombre": 'EEUU'
      }
    ])
  }

  buscarConvenios(){
    this.conveniosFiltrados = this.convenios;
    if (this.estado && this.estado !== '0') {
      this.conveniosFiltrados = this.conveniosFiltrados.filter(c => {
        let estadoTexto = '';
        if (c.estado_acuerdo_id == 'Activo') {
          if (this.porVencer(c)) {
            estadoTexto = 'Por vencer';
          } else {
            estadoTexto = 'Activo';
          }
        } else if (c.estado_acuerdo_id == 'Vencido') {
          estadoTexto = 'Vencido';
        }
        return estadoTexto === this.estado;
      });
    }
    if (this.anioSelect && this.anioSelect !== 0) {
      this.conveniosFiltrados = this.conveniosFiltrados.filter(c => {
        const partes = c.fecha_fin.split('/');
        const anioFechaFin = partes[2]; // Asumiendo que el año está en la tercera posición
        return anioFechaFin === this.anioSelect.toString();
      });
    }
    if(this.modalidadSelect && this.modalidadSelect !== '0') {
      this.conveniosFiltrados = this.conveniosFiltrados.filter(c => {
        return c.mod_conv === this.modalidadSelect;
      });
    }
    if(this.contraparteSelect && this.contraparteSelect!== '0') {
      this.conveniosFiltrados = this.conveniosFiltrados.filter(c => {
        return c.contraparte === this.contraparteSelect;
      });
    }
    if(this.paisSelect && this.paisSelect!== '0') {
      console.log(this.paisSelect)
      this.conveniosFiltrados = this.conveniosFiltrados.filter(c => {
        return c.pais === this.paisSelect;
      })
    }
    return this.conveniosFiltrados;
  }

  sortTable(column: string) {
    if (this.lastSortedColumn === column) {
      this.isAscending = !this.isAscending;
    } else {
      this.isAscending = true;
    }
    this.lastSortedColumn = column;

    this.convenios = [...this.convenios].sort((a, b) => {
      if (a[column] < b[column]) {
        return this.isAscending ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return this.isAscending ? 1 : -1;
      }
      return 0;
    });
  }

  porVencer(c:any){
    const hoy = new Date();
    const partes = c.fecha_fin.split('/');
    const fechaLimite = new Date(+partes[2], +partes[1] - 1, +partes[0]);
    // const diff = (hoy.getTime()-fechaLimite.getTime()) / (1000 * 60 * 60 * 24);
    const diff = (fechaLimite.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7 && diff >= 0;
  }
  buscarConveniosFiltrados() {
    this.conveniosFiltrados = this.convenios;
    if (this.busqueda) {
      const texto = this.busqueda.toLowerCase();
      this.conveniosFiltrados = this.conveniosFiltrados.filter(c =>
        c.nombre.toLowerCase().includes(texto) ||
        c.unidad_eject.toLowerCase().includes(texto) ||
        c.mod_conv.toLowerCase().includes(texto) ||
        c.contraparte.toLowerCase().includes(texto) ||
        c.pais.toLowerCase().includes(texto) ||
        // c.tipo_conv.toLowerCase().includes(texto) ||
        (c.fecha_subscripcion && c.fecha_subscripcion.toLowerCase().includes(texto)) ||
        (c.fecha_inicio && c.fecha_inicio.toLowerCase().includes(texto)) ||
        (c.fecha_fin && c.fecha_fin.toLowerCase().includes(texto))
      );
    }

    // if (this.estado) {
    //   conveniosFiltrados = conveniosFiltrados.filter(c => {
    //     let estadoTexto = '';
    //     if (c.estado_acuerdo_id == 'Activo') {
    //       if (this.porVencer(c)) {
    //         estadoTexto = 'Por vencer';
    //       } else {
    //         estadoTexto = 'Activo';
    //       }
    //     } else if (c.estado_acuerdo_id == 'Vencido') {
    //       estadoTexto = 'Vencido';
    //     }
    //     return estadoTexto === this.estado;
    //   });
    // }

    // if (this.anio) {
    //   conveniosFiltrados = conveniosFiltrados.filter(c => {
    //     const partes = c.fecha_fin.split('/');
    //     const anioFechaFin = partes[2]; // Asumiendo que el año está en la tercera posición
    //     return anioFechaFin === this.anio.toString();
    //   });
    // }

     return this.conveniosFiltrados;
  }

  // get aniosFiltrados() {
  //   if (!this.anioSelect) return this.convenios;
  //   return this.convenios.filter(c =>{
  //     const partes = c.fecha_fin.split('/');
  //       const anioFechaFin = partes[2]; // Asumiendo que el año está en la tercera posición
  //       return anioFechaFin === this.anioSelect;
  //   }
  //   );
  // }

  get paginatedConvenios() {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.conveniosFiltrados.slice(start, start + this.pageSize);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  setPageSize(event: Event) {
    const size = (event.target as HTMLSelectElement).value;
    this.pageSize = Number(size);
    this.currentPage = 1;
  }

  getLastPage(): number {
    return Math.ceil(this.conveniosFiltrados.length / this.pageSize);
  }

  getEstadoClass(convenio:any){
    if(convenio.estado_acuerdo_id == 'Activo'){
      if (this.porVencer(convenio)) {
        this.estado_text = 'Por Vencer'
        return 'estado-amarillo';
      }
      this.estado_text = 'Activo'
      return 'estado-verde';
    }
    if (convenio.estado_acuerdo_id == 'Vencido') {
      this.estado_text = 'Vencido'
      return 'estado-rojo';
    }
    return 'estado-griss';
  }

  selectConvenio(id: number) {
      this.selectedConvId = id;
  }

  clearSelection() {
      this.selectedConvId = 0;
  }

  editarConvenio(id: number){
    console.log(id);
  }

  eliminarConvenio(id: number){
    console.log(id);
  }
  nuevoConverio(){
    this.router.navigateByUrl('/registro-convenio');
  }

}
