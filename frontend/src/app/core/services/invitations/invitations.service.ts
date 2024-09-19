import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import {
  PayloadPostInvitations,
  ResponseDeleteInvitations,
  ResponseGetInvitationForUser,
  ResponsePostInvitations,
} from './invitations.service.types';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  private http: HttpClient = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  getInvitationForUser(inviteId: string) {
    return this.http.get<ResponseGetInvitationForUser>(
      this.baseUrl + `/invitations/${inviteId}`
    );
  }

  postInvitations(payload: PayloadPostInvitations) {
    return this.http.post<ResponsePostInvitations>(
      this.baseUrl + `/users/invitation-for-users`,
      payload
    );
  }

  deleteInvitation(inviteId: string) {
    return this.http.delete<ResponseDeleteInvitations>(
      this.baseUrl + `/invitations/${inviteId}`
    );
  }
}
