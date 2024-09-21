import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvitationServiceMock {
  getInvitationForUser() {
    return of({});
  }
  postInvitations() {
    return of({});
  }
  deleteInvitation() {
    return of({});
  }
}
