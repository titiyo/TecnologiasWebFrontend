import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { UsoForm } from './uso-form';

describe('UsoForm', () => {
  let component: UsoForm;
  let fixture: ComponentFixture<UsoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsoForm],
      // Router y HttpClient de prueba: no hace pedidos reales al backend.
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(UsoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
