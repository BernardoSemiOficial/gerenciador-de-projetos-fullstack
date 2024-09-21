import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '@core/services/auth/auth.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { AuthServiceMock } from 'src/__mocks__/services/auth.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { UserServiceMock } from 'src/__mocks__/services/user.service.mock';
import { InvitationComponent } from './invitation.component';

describe('InvitationComponent', () => {
  let component: InvitationComponent;
  let fixture: ComponentFixture<InvitationComponent>;

  beforeEach(() => {
    TestBed.overrideComponent(InvitationComponent, {
      set: {
        providers: [
          { provide: AuthService, useClass: AuthServiceMock },
          { provide: UserService, useClass: UserServiceMock },
          { provide: ToastAlertService, useClass: ToastAlertServiceMock },
        ],
      },
    });

    fixture = TestBed.createComponent(InvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
