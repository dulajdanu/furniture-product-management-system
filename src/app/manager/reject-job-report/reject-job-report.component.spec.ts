import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectJobReportComponent } from './reject-job-report.component';

describe('RejectJobReportComponent', () => {
  let component: RejectJobReportComponent;
  let fixture: ComponentFixture<RejectJobReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectJobReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectJobReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
