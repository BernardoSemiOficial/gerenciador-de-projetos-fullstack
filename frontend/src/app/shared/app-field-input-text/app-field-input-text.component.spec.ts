import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldInputTextComponent } from './app-field-input-text.component';

describe('AppFieldInputTextComponent', () => {
  let component: AppFieldInputTextComponent;
  let fixture: ComponentFixture<AppFieldInputTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFieldInputTextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppFieldInputTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
