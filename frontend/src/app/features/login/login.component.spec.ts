import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {
	LoginPayload,
	LoginResponse
} from '@core/interfaces/authentication.interface';
import { User } from '@core/interfaces/user.interface';
import { AuthService } from '@core/services/auth/auth.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { of } from 'rxjs';
import { AuthServiceMock } from 'src/__mocks__/services/auth.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { UserServiceMock } from 'src/__mocks__/services/user.service.mock';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
	let component: LoginComponent;
	let fixture: ComponentFixture<LoginComponent>;

	const mockLoginResponse: LoginResponse = {
		accessToken: 'accessToken',
		refreshToken: 'refreshToken',
		user: { id: 'id', name: 'name' } as User
	};

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

	it('should call login method with success', () => {
		component.loginForm.setValue({
			email: 'email@email.com',
			password: 'password'
		});
		fixture.detectChanges();
		console.log('valid', component.loginForm.valid);
		const registerFormValue = component.loginForm.getRawValue();
		const payload: LoginPayload = {
			email: registerFormValue.email!,
			password: registerFormValue.password!
		};

		const spyAuthServiceLogin = spyOn(
			component['authService'],
			'login'
		).and.returnValue(of(mockLoginResponse));
		const spyAuthServiceSetTokens = spyOn(
			component['authService'],
			'setTokens'
		);
		const spyUserServiceSaveUser = spyOn(component['userService'], 'saveUser');
		const spyToastAlertServiceAddSuccessMessage = spyOn(
			component['toastAlertService'],
			'addSuccessMessage'
		);
		const spyRouterNavigate = spyOn(component['router'], 'navigate');

		component.loginUser();
		expect(spyAuthServiceLogin).toHaveBeenCalledWith(payload);
		component['authService'].login(payload).subscribe(() => {
			expect(spyAuthServiceSetTokens).toHaveBeenCalledWith(mockLoginResponse);
			expect(spyUserServiceSaveUser).toHaveBeenCalledWith(
				mockLoginResponse.user
			);
			expect(spyRouterNavigate).toHaveBeenCalledWith(['/dashboard']);
			expect(spyToastAlertServiceAddSuccessMessage).toHaveBeenCalledWith({
				title: 'Success',
				description: 'User logged in'
			});
		});
	});
});
