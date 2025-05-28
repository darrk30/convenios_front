import { TestBed } from '@angular/core/testing';

import { DatosConvenioService } from './datos-convenio.service';

describe('DatosConvenioService', () => {
  let service: DatosConvenioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosConvenioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
