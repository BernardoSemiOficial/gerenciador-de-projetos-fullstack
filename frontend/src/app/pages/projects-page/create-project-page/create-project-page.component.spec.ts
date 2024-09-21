import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProjectComponentMock } from 'src/__mocks__/components/create-edit-project.component.mock';
import { CreateProjectPageComponent } from './create-project-page.component';

describe('CreateProjectPageComponent', () => {
  let component: CreateProjectPageComponent;
  let fixture: ComponentFixture<CreateProjectPageComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(CreateProjectPageComponent, {
      set: {
        imports: [CreateEditProjectComponentMock],
      },
    });

    fixture = TestBed.createComponent(CreateProjectPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
