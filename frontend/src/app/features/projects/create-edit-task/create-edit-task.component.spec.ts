import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskComponent } from './create-edit-task.component';

describe('CreateEditTaskComponent', () => {
  let component: CreateEditTaskComponent;
  let fixture: ComponentFixture<CreateEditTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditTaskComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
