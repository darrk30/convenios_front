import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef, ModalDirective, ModalModule } from 'ngx-bootstrap/modal';

import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';
import { LoaderComponent } from 'src/app/shared/components/loader/loader.component';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
  standalone:true,
  imports:[PagetitleComponent,LoaderComponent,CommonModule,NgApexchartsModule,BsDropdownModule,ModalModule]
})
export class DefaultComponent implements OnInit {
	
	constructor(
		private modalService: BsModalService, 
	) {
	}

	ngOnInit() {

	}

	
	
}
