import { TestBed } from '@angular/core/testing';

import { OficinaUoService } from './oficina-uo.service';

describe('OficinaUoService', () => {
  let service: OficinaUoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OficinaUoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
