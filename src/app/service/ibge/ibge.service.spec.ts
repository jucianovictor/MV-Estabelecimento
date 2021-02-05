import { TestBed } from '@angular/core/testing';

import { IbgeService } from './ibge.service';

describe('IbgeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IbgeService = TestBed.get(IbgeService);
    expect(service).toBeTruthy();
  });
});
