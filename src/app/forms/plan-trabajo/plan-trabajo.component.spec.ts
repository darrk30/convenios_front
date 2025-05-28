import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanTrabajoComponent } from './plan-trabajo.component';

describe('PlanTrabajoComponent', () => {
  let component: PlanTrabajoComponent;
  let fixture: ComponentFixture<PlanTrabajoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanTrabajoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanTrabajoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
