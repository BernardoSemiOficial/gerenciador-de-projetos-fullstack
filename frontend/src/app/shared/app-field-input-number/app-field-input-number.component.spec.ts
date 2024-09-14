import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldInputNumberComponent } from './app-field-input-number.component';

describe('AppFieldInputNumberComponent', () => {
  let component: AppFieldInputNumberComponent;
  let fixture: ComponentFixture<AppFieldInputNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFieldInputNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFieldInputNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
