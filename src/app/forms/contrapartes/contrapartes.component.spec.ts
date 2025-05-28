import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContrapartesComponent } from './contrapartes.component';

describe('ContrapartesComponent', () => {
  let component: ContrapartesComponent;
  let fixture: ComponentFixture<ContrapartesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContrapartesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContrapartesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
