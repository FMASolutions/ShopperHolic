import { TestBed } from '@angular/core/testing';

import { CityAreaService } from './city-area.service';

describe('CityAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CityAreaService = TestBed.get(CityAreaService);
    expect(service).toBeTruthy();
  });
});
