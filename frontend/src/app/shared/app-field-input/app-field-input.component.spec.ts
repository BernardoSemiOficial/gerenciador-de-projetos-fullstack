import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldInputComponent } from './app-field-input.component';

describe('AppFieldInputComponent', () => {
  let component: AppFieldInputComponent;
  let fixture: ComponentFixture<AppFieldInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFieldInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFieldInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
