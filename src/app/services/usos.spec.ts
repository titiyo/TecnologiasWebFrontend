import { TestBed } from '@angular/core/testing';
import { Usos } from './usos';

describe('Usos', () => {
  let service: Usos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Usos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
