import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsyncPipe, DatePipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { DialogConfirmationService } from '@core/services/dialog-confirmation/dialog-confirmation.service';
import { ProjectService } from '@core/services/project/project.service';
import { TaskService } from '@core/services/task/task.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppCardComponent } from '@shared/app-card/app-card.component';
import { AppChipComponent } from '@shared/app-chip/app-chip.component';
import { AppDividerComponent } from '@shared/app-divider/app-divider.component';
import { AppFooterComponentMock } from 'src/__mocks__/components/app-footer.component.mock';
import { AppHeaderComponentMock } from 'src/__mocks__/components/app-header.component.mock';
import { DialogConfirmationServiceMock } from 'src/__mocks__/services/dialog-confirmation.service.mock';
import { ProjectServiceMock } from 'src/__mocks__/services/project.service.mock';
import { TaskServiceMock } from 'src/__mocks__/services/task.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { ViewProjectComponent } from './view-project.component';

describe('ViewProjectComponent', () => {
  let component: ViewProjectComponent;
  let fixture: ComponentFixture<ViewProjectComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(ViewProjectComponent, {
      set: {
        imports: [
          AppHeaderComponentMock,
          AppFooterComponentMock,
          AppCardComponent,
          AppChipComponent,
          AppDividerComponent,
          AppButtonComponent,
          RouterLink,
          AsyncPipe,
          DatePipe,
        ],
        providers: [
          Router,
          { provide: ProjectService, useClass: ProjectServiceMock },
          { provide: ToastAlertService, useClass: ToastAlertServiceMock },
          {
            provide: DialogConfirmationService,
            useClass: DialogConfirmationServiceMock,
          },
          { provide: TaskService, useClass: TaskServiceMock },
        ],
      },
    });

    fixture = TestBed.createComponent(ViewProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
