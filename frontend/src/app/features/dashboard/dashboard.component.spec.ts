import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InvitationService } from '@core/services/invitation/invitation.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { AppButtonComponent } from '@shared/app-button/app-button.component';
import { AppCardComponent } from '@shared/app-card/app-card.component';
import { AppFooterComponentMock } from 'src/__mocks__/components/app-footer.component.mock';
import { AppHeaderComponentMock } from 'src/__mocks__/components/app-header.component.mock';
import { ActivatedRouteMock } from 'src/__mocks__/services/activated-route.service.mock';
import { InvitationServiceMock } from 'src/__mocks__/services/invitation.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { UserServiceMock } from 'src/__mocks__/services/user.service.mock';
import { DashboardDialogInvitationsComponent } from './components/dashboard-dialog-invites/dashboard-dialog-invitations.component';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
	let component: DashboardComponent;
	let fixture: ComponentFixture<DashboardComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(DashboardComponent, {
			set: {
				imports: [
					CommonModule,
					RouterLink,
					ReactiveFormsModule,
					AppCardComponent,
					AppButtonComponent,
					DashboardDialogInvitationsComponent,
					AppHeaderComponentMock,
					AppFooterComponentMock
				],
				providers: [
					{ provide: UserService, useClass: UserServiceMock },
					{ provide: ActivatedRoute, useClass: ActivatedRouteMock },
					{ provide: ToastAlertService, useClass: ToastAlertServiceMock },
					{ provide: InvitationService, useClass: InvitationServiceMock }
				]
			}
		});

		fixture = TestBed.createComponent(DashboardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
