import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderCustomDayCellComponentComponent } from './calender-custom-day-cell-component.component';

describe('CalenderCustomDayCellComponentComponent', () => {
  let component: CalenderCustomDayCellComponentComponent;
  let fixture: ComponentFixture<CalenderCustomDayCellComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalenderCustomDayCellComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderCustomDayCellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
