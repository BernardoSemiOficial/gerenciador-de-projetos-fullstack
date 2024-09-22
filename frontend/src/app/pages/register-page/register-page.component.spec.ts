import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponentMock } from 'src/__mocks__/components/app-register.component.mock';
import { RegisterPageComponent } from './register-page.component';

describe('RegisterPageComponent', () => {
	let component: RegisterPageComponent;
	let fixture: ComponentFixture<RegisterPageComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(RegisterPageComponent, {
			set: {
				imports: [RegisterComponentMock]
			}
		});

		fixture = TestBed.createComponent(RegisterPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
