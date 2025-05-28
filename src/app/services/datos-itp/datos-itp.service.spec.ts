import { TestBed } from '@angular/core/testing';

import { DatosItpService } from './datos-itp.service';

describe('DatosItpService', () => {
  let service: DatosItpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosItpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
