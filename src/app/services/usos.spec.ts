import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Usos } from './usos';

describe('Usos', () => {
  let service: Usos;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Usos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
