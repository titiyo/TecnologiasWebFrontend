import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponentesLista } from './componentes-lista';

describe('ComponentesLista', () => {
  let component: ComponentesLista;
  let fixture: ComponentFixture<ComponentesLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentesLista],
      // Router y HttpClient de prueba: no hace pedidos reales al backend.
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentesLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
