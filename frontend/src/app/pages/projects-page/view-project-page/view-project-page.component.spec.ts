import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProjectComponentMock } from 'src/__mocks__/components/view-project.component.mock';
import { ViewProjectPageComponent } from './view-project-page.component';

describe('ViewProjectPageComponent', () => {
	let component: ViewProjectPageComponent;
	let fixture: ComponentFixture<ViewProjectPageComponent>;

	beforeEach(() => {
		TestBed.overrideComponent(ViewProjectPageComponent, {
			set: {
				imports: [ViewProjectComponentMock]
			}
		});

		fixture = TestBed.createComponent(ViewProjectPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
