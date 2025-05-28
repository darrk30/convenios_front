import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionAnualComponent } from './evaluacion-anual.component';

describe('EvaluacionAnualComponent', () => {
  let component: EvaluacionAnualComponent;
  let fixture: ComponentFixture<EvaluacionAnualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvaluacionAnualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaluacionAnualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
