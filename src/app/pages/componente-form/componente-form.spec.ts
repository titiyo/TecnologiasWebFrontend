import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ComponenteForm } from './componente-form';

describe('ComponenteForm', () => {
  let component: ComponenteForm;
  let fixture: ComponentFixture<ComponenteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteForm],
      // Router y HttpClient de prueba: no hace pedidos reales al backend.
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponenteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
