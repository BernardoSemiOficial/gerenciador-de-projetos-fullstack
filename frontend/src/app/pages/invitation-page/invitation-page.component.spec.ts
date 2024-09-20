import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { InvitationComponent } from '@features/invitation/invitation.component';
import { InvitationPageComponent } from './invitation-page.component';

describe('InvitationPageComponent', () => {
  let component: InvitationPageComponent;
  let fixture: ComponentFixture<InvitationPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvitationPageComponent],
      providers: [ActivatedRoute, UserService, ToastAlertService],
    })
      .overrideComponent(InvitationPageComponent, {
        remove: { imports: [InvitationComponent] },
        add: { imports: [InvitationStubComponent] },
      })
      .compileComponents();

    fixture = TestBed.createComponent(InvitationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({ standalone: true, selector: 'app-invitation', template: '' })
class InvitationStubComponent {}
