import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsosLista } from './usos-lista';

describe('UsosLista', () => {
  let component: UsosLista;
  let fixture: ComponentFixture<UsosLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsosLista],
    }).compileComponents();

    fixture = TestBed.createComponent(UsosLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
