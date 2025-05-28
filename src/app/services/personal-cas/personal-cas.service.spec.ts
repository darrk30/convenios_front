import { TestBed } from '@angular/core/testing';

import { PersonalCasService } from './personal-cas.service';

describe('PersonalCasService', () => {
  let service: PersonalCasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonalCasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
