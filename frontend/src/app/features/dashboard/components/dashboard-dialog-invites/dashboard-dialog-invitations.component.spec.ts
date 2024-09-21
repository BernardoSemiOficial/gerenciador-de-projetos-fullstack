import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { InvitationService } from '@core/services/invitation/invitation.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { InvitationServiceMock } from 'src/__mocks__/services/invitation.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { DashboardDialogInvitationsComponent } from './dashboard-dialog-invitations.component';

describe('DashboardDialogInvitationsComponent', () => {
  let component: DashboardDialogInvitationsComponent;
  let fixture: ComponentFixture<DashboardDialogInvitationsComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(DashboardDialogInvitationsComponent, {
      set: {
        imports: [DashboardDialogInvitationsComponent],
        providers: [
          FormBuilder,
          { provide: InvitationService, useClass: InvitationServiceMock },
          { provide: ToastAlertService, useClass: ToastAlertServiceMock },
        ],
      },
    });

    fixture = TestBed.createComponent(DashboardDialogInvitationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
