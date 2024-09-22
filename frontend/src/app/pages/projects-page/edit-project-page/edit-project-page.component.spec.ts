import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditProjectComponentMock } from 'src/__mocks__/components/create-edit-project.component.mock';
import { EditProjectPageComponent } from './edit-project-page.component';

describe('EditProjectPageComponent', () => {
	let component: EditProjectPageComponent;
	let fixture: ComponentFixture<EditProjectPageComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(EditProjectPageComponent, {
			set: {
				imports: [CreateEditProjectComponentMock]
			}
		});

		fixture = TestBed.createComponent(EditProjectPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
