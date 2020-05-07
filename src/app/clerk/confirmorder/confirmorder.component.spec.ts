import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmorderComponent } from './confirmorder.component';

describe('ConfirmorderComponent', () => {
  let component: ConfirmorderComponent;
  let fixture: ComponentFixture<ConfirmorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
