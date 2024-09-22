import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppInputMaskComponent } from './app-input-mask.component';

describe('AppInputMaskComponent', () => {
	let component: AppInputMaskComponent;
	let fixture: ComponentFixture<AppInputMaskComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppInputMaskComponent]
		}).compileComponents();

		fixture = TestBed.createComponent(AppInputMaskComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
