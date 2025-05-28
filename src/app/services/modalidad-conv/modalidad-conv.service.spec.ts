import { TestBed } from '@angular/core/testing';

import { ModalidadConvService } from './modalidad-conv.service';

describe('ModalidadConvService', () => {
  let service: ModalidadConvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalidadConvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
