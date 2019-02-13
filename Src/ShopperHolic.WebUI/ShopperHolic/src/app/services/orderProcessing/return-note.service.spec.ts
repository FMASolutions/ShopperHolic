import { TestBed } from '@angular/core/testing';

import { ReturnNoteService } from './return-note.service';

describe('ReturnNoteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReturnNoteService = TestBed.get(ReturnNoteService);
    expect(service).toBeTruthy();
  });
});
