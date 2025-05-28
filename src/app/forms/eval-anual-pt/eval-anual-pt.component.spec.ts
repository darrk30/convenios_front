import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvalAnualPtComponent } from './eval-anual-pt.component';

describe('EvalAnualPtComponent', () => {
  let component: EvalAnualPtComponent;
  let fixture: ComponentFixture<EvalAnualPtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EvalAnualPtComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvalAnualPtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
