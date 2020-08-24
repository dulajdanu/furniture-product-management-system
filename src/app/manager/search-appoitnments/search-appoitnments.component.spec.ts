import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAppoitnmentsComponent } from './search-appoitnments.component';

describe('SearchAppoitnmentsComponent', () => {
  let component: SearchAppoitnmentsComponent;
  let fixture: ComponentFixture<SearchAppoitnmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchAppoitnmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchAppoitnmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
