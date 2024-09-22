import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppMultiSelectComponent } from './app-multi-select.component';

describe('AppMultiSelectComponent', () => {
	let component: AppMultiSelectComponent;
	let fixture: ComponentFixture<AppMultiSelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppMultiSelectComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AppMultiSelectComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
