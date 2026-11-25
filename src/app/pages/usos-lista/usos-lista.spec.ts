import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { UsosLista } from './usos-lista';

describe('UsosLista', () => {
  let component: UsosLista;
  let fixture: ComponentFixture<UsosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsosLista],
      // Router y HttpClient de prueba: no hace pedidos reales al backend.
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(UsosLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
