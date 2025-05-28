import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosConvenioComponent } from './datos-convenio.component';

describe('DatosConvenioComponent', () => {
  let component: DatosConvenioComponent;
  let fixture: ComponentFixture<DatosConvenioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosConvenioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosConvenioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
