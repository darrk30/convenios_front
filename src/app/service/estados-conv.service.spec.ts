import { TestBed } from '@angular/core/testing';

import { EstadosConvService } from './estados-conv.service';

describe('EstadosConvService', () => {
  let service: EstadosConvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadosConvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
