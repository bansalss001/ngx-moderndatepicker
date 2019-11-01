import { TestBed } from '@angular/core/testing';

import { NgxModerndatepickerService } from './ngx-moderndatepicker.service';

describe('NgxModerndatepickerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxModerndatepickerService = TestBed.get(NgxModerndatepickerService);
    expect(service).toBeTruthy();
  });
});
