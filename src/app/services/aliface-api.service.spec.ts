import { TestBed, inject } from '@angular/core/testing';

import { AlifaceApiService } from './aliface-api.service';

describe('AlifaceApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlifaceApiService]
    });
  });

  it('should be created', inject([AlifaceApiService], (service: AlifaceApiService) => {
    expect(service).toBeTruthy();
  }));
});
