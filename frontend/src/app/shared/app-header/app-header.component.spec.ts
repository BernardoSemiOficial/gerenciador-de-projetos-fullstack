import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@core/services/user/user.service';
import { AuthServiceMock } from 'src/__mocks__/services/auth.service.mock';
import { UserServiceMock } from 'src/__mocks__/services/user.service.mock';
import { AppHeaderComponent } from './app-header.component';

describe('AppHeaderComponent', () => {
	let component: AppHeaderComponent;
	let fixture: ComponentFixture<AppHeaderComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(AppHeaderComponent, {
			set: {
				imports: [],
				providers: [
					{ provide: UserService, useClass: UserServiceMock },
					{ provide: AuthService, useClass: AuthServiceMock }
				]
			}
		});

		fixture = TestBed.createComponent(AppHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
