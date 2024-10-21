import { TestBed } from '@angular/core/testing';

import { UpdateUserService } from './update-user.service';

describe('RegisterUserService', () => {
  let service: UpdateUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
