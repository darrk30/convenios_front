import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StepsRegConvService } from 'app/services/steps-reg-conv/steps-reg-conv.service';
import { InstitucionService } from 'app/services/institucion/institucion.service';

@Component({
  selector: 'app-contrapartes',
  imports: [CommonModule,FormsModule],
  templateUrl: './contrapartes.component.html',
  styleUrl: './contrapartes.component.css'
})
export class ContrapartesComponent {
  constructor(public step: StepsRegConvService,
    public institucion:InstitucionService
  ) { }

  ngOnInit(){
    
  }

  
}
