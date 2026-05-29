import { TestBed } from '@angular/core/testing';

import { TvaService } from './tva.service';

describe('TvaService', () => {
  let service: TvaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

   it('tva(200,20)==40', () => {
    expect(service.tva(200,20)).toBe(40);
  });
   it('ttc(200,20)==240', () => {
    expect(service.ttc(200,20)).toBe(240);
  });


});
