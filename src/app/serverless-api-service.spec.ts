import { TestBed } from '@angular/core/testing';

import { ServerlessApiServiceService } from './serverless-api-service';

describe('ServerlessApiServiceService', () => {
  let service: ServerlessApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServerlessApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
