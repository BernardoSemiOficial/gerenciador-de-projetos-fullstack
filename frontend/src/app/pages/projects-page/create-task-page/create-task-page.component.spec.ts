import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskComponentMock } from 'src/__mocks__/components/create-edit-task.component.mock';
import { CreateTaskPageComponent } from './create-task-page.component';

describe('CreateTaskPageComponent', () => {
	let component: CreateTaskPageComponent;
	let fixture: ComponentFixture<CreateTaskPageComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(CreateTaskPageComponent, {
			set: {
				imports: [CreateEditTaskComponentMock]
			}
		}).compileComponents();

		fixture = TestBed.createComponent(CreateTaskPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
