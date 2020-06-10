import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypePredictionComponent } from './order-type-prediction.component';

describe('OrderTypePredictionComponent', () => {
  let component: OrderTypePredictionComponent;
  let fixture: ComponentFixture<OrderTypePredictionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderTypePredictionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderTypePredictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
