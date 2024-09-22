import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldDropdownComponent } from './app-field-dropdown.component';

describe('AppFieldDropdownComponent', () => {
	let component: AppFieldDropdownComponent;
	let fixture: ComponentFixture<AppFieldDropdownComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppFieldDropdownComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AppFieldDropdownComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
