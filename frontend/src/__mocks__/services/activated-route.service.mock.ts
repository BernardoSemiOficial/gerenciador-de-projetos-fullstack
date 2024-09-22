import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class ActivatedRouteMock {
	snapshot = {
		queryParamMap: {
			get: () => '1'
		}
	};
}
