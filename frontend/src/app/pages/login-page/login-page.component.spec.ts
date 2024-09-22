import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponentMock } from 'src/__mocks__/components/login.component.mock';
import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
	let component: LoginPageComponent;
	let fixture: ComponentFixture<LoginPageComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(LoginPageComponent, {
			set: {
				imports: [LoginComponentMock]
			}
		});

		fixture = TestBed.createComponent(LoginPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
