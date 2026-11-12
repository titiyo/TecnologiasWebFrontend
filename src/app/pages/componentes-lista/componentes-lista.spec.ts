import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentesLista } from './componentes-lista';

describe('ComponentesLista', () => {
  let component: ComponentesLista;
  let fixture: ComponentFixture<ComponentesLista>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentesLista],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentesLista);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
