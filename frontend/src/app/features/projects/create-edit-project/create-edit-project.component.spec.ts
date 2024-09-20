import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProjectComponent } from './create-edit-project.component';

describe('CreateEditProjectComponent', () => {
  let component: CreateEditProjectComponent;
  let fixture: ComponentFixture<CreateEditProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEditProjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
