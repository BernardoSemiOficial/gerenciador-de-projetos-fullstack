import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { InviteForUser } from '@core/interfaces/user.interface';
import { ToastAlertService } from '@core/services/toast-alert/toast-alert.service';
import { UserService } from '@core/services/user/user.service';
import { InvitationComponent } from '@features/invitation/invitation.component';

@Component({
  selector: 'app-invitation-page',
  standalone: true,
  imports: [InvitationComponent, RouterLink],
  templateUrl: './invitation-page.component.html',
  styleUrl: './invitation-page.component.scss',
})
export class InvitationPageComponent implements OnInit {
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
        this.inviteDetails = data.invitation;
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
