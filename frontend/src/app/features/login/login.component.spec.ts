import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { AuthServiceMock } from 'src/__mocks__/services/auth.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { UserServiceMock } from 'src/__mocks__/services/user.service.mock';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(LoginComponent, {
			set: {
				providers: [
					FormBuilder,
					Router,
					{ provide: AuthService, useClass: AuthServiceMock },
					{ provide: UserService, useClass: UserServiceMock },
					{ provide: ToastAlertService, useClass: ToastAlertServiceMock }
				]
			}
		});

		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
