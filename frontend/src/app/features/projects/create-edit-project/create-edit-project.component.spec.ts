import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService } from '@core/services/project/project.service';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { ProjectServiceMock } from 'src/__mocks__/services/project.service.mock';
import { ToastAlertServiceMock } from 'src/__mocks__/services/toast-alert.service.mock';
import { UserServiceMock } from 'src/__mocks__/services/user.service.mock';
import { CreateEditProjectComponent } from './create-edit-project.component';

describe('CreateEditProjectComponent', () => {
	let component: CreateEditProjectComponent;
	let fixture: ComponentFixture<CreateEditProjectComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(CreateEditProjectComponent, {
			set: {
				imports: [CreateEditProjectComponent],
				providers: [
					Router,
					FormBuilder,
					{ provide: UserService, useClass: UserServiceMock },
					{ provide: ProjectService, useClass: ProjectServiceMock },
					{ provide: ToastAlertService, useClass: ToastAlertServiceMock }
				]
			}
		});

		fixture = TestBed.createComponent(CreateEditProjectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
