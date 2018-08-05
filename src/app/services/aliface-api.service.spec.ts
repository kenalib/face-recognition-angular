import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AlifaceApiService } from './aliface-api.service';

describe('AlifaceApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AlifaceApiService],
      imports: [
        HttpClientTestingModule,
      ],
    });
  });

  it('should be created', inject([AlifaceApiService], (service: AlifaceApiService) => {
    expect(service).toBeTruthy();
  }));
});
