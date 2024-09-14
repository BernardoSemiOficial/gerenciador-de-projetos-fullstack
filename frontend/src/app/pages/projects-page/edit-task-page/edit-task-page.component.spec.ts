import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskPageComponent } from './edit-task-page.component';

describe('EditTaskPageComponent', () => {
  let component: EditTaskPageComponent;
  let fixture: ComponentFixture<EditTaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
