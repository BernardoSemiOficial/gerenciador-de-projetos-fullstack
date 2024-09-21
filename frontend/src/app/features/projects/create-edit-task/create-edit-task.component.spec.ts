import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmationService } from '@core/services/dialog-confirmation/dialog-confirmation.service';
import { TaskService } from '@core/services/task/task.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { ActivatedRouteMock } from 'src/__mocks__/services/activated-route.service.mock';
import { DialogConfirmationServiceMock } from 'src/__mocks__/services/dialog-confirmation.service.mock';
import { TaskServiceMock } from 'src/__mocks__/services/task.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { CreateEditTaskComponent } from './create-edit-task.component';

describe('CreateEditTaskComponent', () => {
  let component: CreateEditTaskComponent;
  let fixture: ComponentFixture<CreateEditTaskComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(CreateEditTaskComponent, {
      set: {
        imports: [CreateEditTaskComponent],
        providers: [
          FormBuilder,
          Router,
          { provide: TaskService, useClass: TaskServiceMock },
          { provide: ActivatedRoute, useClass: ActivatedRouteMock },
          { provide: ToastAlertService, useClass: ToastAlertServiceMock },
          {
            provide: DialogConfirmationService,
            useClass: DialogConfirmationServiceMock,
          },
        ],
      },
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
