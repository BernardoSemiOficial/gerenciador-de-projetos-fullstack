import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldCalendarComponent } from './app-field-calendar.component';

describe('AppFieldCalendarComponent', () => {
  let component: AppFieldCalendarComponent;
  let fixture: ComponentFixture<AppFieldCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFieldCalendarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFieldCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
