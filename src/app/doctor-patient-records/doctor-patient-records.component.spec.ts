import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPatientRecordsComponent } from './doctor-patient-records.component';

describe('DoctorPatientRecordsComponent', () => {
  let component: DoctorPatientRecordsComponent;
  let fixture: ComponentFixture<DoctorPatientRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DoctorPatientRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPatientRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
