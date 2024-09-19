import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment/environment';
import {
  PayloadPostInvitations,
  ResponseDeleteInvitation,
  ResponseGetInvitationForUser,
  ResponsePostInvitations,
} from './invitation.service.types';

@Injectable({
  providedIn: 'root',
})
export class InvitationService {
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
    return this.http.delete<ResponseDeleteInvitation>(
      this.baseUrl + `/invitations/${inviteId}`
    );
  }
}
