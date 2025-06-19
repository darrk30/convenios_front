import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { DashboardsStateService } from '../../services/dashboards-state.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { PagetitleComponent } from 'src/app/shared/components/pagetitle/pagetitle.component';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
	selector: 'app-principal',
	templateUrl: './principal.component.html',
	styleUrl: './principal.component.css',
	standalone: true,
	imports:[BsDropdownModule,CommonModule,NgSelectModule,FormsModule,ReactiveFormsModule,PagetitleComponent,NgApexchartsModule],
})
export class PrincipalComponent {
	private modalService = inject(BsModalService);
	private spinner = inject(NgxSpinnerService);
	private formBuilder = inject(FormBuilder);
	public dashboardsStateService = inject(DashboardsStateService);
	

	breadCrumbItems: Array<{}>;
	
	formData: FormGroup = this.formBuilder.group({
		ideConvenio:[],
		fecEvaluacion:[],
	});

	conveniosBarChart:any;

	ngOnInit(): void {
		this.breadCrumbItems = [{ label: 'Dashboard' }, { label: '', active: true }];
		this.conveniosBarChart = this.dashboardsStateService.conveniosBarChart;
		this.dashboardsStateService.loadDashboard();
	}

}
