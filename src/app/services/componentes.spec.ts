import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Componentes } from './componentes';

describe('Componentes', () => {
  let service: Componentes;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(Componentes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
