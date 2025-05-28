import { TestBed } from '@angular/core/testing';

import { UnidadEjecutoraService } from './unidad-ejecutora.service';

describe('UnidadEjecutoraService', () => {
  let service: UnidadEjecutoraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnidadEjecutoraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
