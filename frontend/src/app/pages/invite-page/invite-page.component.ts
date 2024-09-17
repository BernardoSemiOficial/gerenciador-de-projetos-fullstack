import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InviteForUser } from '@core/interfaces/user.interface';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { InviteComponent } from '@features/invite/invite.component';

@Component({
  selector: 'app-invite-page',
  standalone: true,
  imports: [InviteComponent, RouterLink],
  templateUrl: './invite-page.component.html',
  styleUrl: './invite-page.component.scss',
})
export class InvitePageComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);
  toastAlertService = inject(ToastAlertService);
  inviteId!: string;
  inviteDetails!: InviteForUser;

  ngOnInit() {
    const inviteId =
      this.activatedRoute.snapshot.queryParamMap.get('invitation');
    console.log(inviteId);

    if (inviteId) {
      this.inviteId = inviteId;
      this.getInvite();
    }
  }

  getInvite() {
    this.userService.getInvitationForUser(this.inviteId).subscribe({
      next: (data) => {
        this.inviteDetails = data.invite;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
        this.toastAlertService.addDangerMessage({
          title: 'Error',
          description: 'Failed to get invitation',
        });
      },
    });
  }
}
