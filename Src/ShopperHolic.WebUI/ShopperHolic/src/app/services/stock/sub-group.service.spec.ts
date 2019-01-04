import { TestBed } from '@angular/core/testing';

import { SubGroupService } from './sub-group.service';

describe('SubGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubGroupService = TestBed.get(SubGroupService);
    expect(service).toBeTruthy();
  });
});
