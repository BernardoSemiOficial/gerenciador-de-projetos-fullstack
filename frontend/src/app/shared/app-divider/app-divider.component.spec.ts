import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDividerComponent } from './app-divider.component';

describe('AppDividerComponent', () => {
  let component: AppDividerComponent;
  let fixture: ComponentFixture<AppDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDividerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
