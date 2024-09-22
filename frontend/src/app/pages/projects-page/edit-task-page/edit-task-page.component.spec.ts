import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditTaskComponentMock } from 'src/__mocks__/components/create-edit-task.component.mock';
import { EditTaskPageComponent } from './edit-task-page.component';

describe('EditTaskPageComponent', () => {
	let component: EditTaskPageComponent;
	let fixture: ComponentFixture<EditTaskPageComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(EditTaskPageComponent, {
			set: {
				imports: [CreateEditTaskComponentMock]
			}
		});

		fixture = TestBed.createComponent(EditTaskPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
