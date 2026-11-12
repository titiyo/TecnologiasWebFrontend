import { TestBed } from '@angular/core/testing';
import { Componentes } from './componentes';

describe('Componentes', () => {
  let service: Componentes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Componentes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
