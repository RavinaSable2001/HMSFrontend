import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorMedicineComponent } from './doctor-medicine.component';

describe('DoctorMedicineComponent', () => {
  let component: DoctorMedicineComponent;
  let fixture: ComponentFixture<DoctorMedicineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorMedicineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorMedicineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
