import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { InvitationComponentMock } from 'src/__mocks__/components/invitations.component.mock';
import { ActivatedRouteMock } from 'src/__mocks__/services/activated-route.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { UserServiceMock } from 'src/__mocks__/services/user.service.mock';
import { InvitationPageComponent } from './invitation-page.component';

describe('InvitationPageComponent', () => {
  let component: InvitationPageComponent;
  let fixture: ComponentFixture<InvitationPageComponent>;
  let userService: UserService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationPageComponent],
      providers: [
        { provide: ActivatedRoute, useClass: ActivatedRouteMock },
        { provide: UserService, useClass: UserServiceMock },
        { provide: ToastAlertService, useClass: ToastAlertServiceMock },
      ],
    })
      .overrideComponent(InvitationPageComponent, {
        set: { imports: [InvitationComponentMock] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(InvitationPageComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
