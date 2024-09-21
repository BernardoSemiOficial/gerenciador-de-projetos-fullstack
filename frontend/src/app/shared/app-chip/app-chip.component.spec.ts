import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipModule } from 'primeng/chip';
import { AppChipComponent } from './app-chip.component';

describe('AppChipComponent', () => {
  let component: AppChipComponent;
  let fixture: ComponentFixture<AppChipComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(AppChipComponent, {
      set: {
        imports: [ChipModule],
      },
    });

    fixture = TestBed.createComponent(AppChipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
