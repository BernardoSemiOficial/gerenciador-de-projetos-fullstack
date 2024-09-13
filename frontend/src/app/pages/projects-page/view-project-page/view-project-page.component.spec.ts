import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectPageComponent } from './view-project-page.component';

describe('ViewProjectPageComponent', () => {
  let component: ViewProjectPageComponent;
  let fixture: ComponentFixture<ViewProjectPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewProjectPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
