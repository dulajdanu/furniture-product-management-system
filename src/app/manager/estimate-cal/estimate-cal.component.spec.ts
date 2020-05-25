import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimateCalComponent } from './estimate-cal.component';

describe('EstimateCalComponent', () => {
  let component: EstimateCalComponent;
  let fixture: ComponentFixture<EstimateCalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstimateCalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstimateCalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
