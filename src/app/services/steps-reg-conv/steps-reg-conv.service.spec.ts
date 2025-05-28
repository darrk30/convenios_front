import { TestBed } from '@angular/core/testing';

import { StepsRegConvService } from './steps-reg-conv.service';

describe('StepsRegConvService', () => {
  let service: StepsRegConvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StepsRegConvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
