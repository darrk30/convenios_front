import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosItpComponent } from './datos-itp.component';

describe('DatosItpComponent', () => {
  let component: DatosItpComponent;
  let fixture: ComponentFixture<DatosItpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosItpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DatosItpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
