import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsoForm } from './uso-form';

describe('UsoForm', () => {
  let component: UsoForm;
  let fixture: ComponentFixture<UsoForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsoForm],
    }).compileComponents();

    fixture = TestBed.createComponent(UsoForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
