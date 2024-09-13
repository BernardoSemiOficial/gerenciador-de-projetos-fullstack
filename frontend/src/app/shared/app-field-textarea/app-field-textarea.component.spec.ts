import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldTextareaComponent } from './app-field-textarea.component';

describe('AppFieldTextareaComponent', () => {
  let component: AppFieldTextareaComponent;
  let fixture: ComponentFixture<AppFieldTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFieldTextareaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppFieldTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
