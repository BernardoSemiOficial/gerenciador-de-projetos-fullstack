import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  inviteId!: string;

  ngOnInit() {
    const inviteId =
      this.activatedRoute.snapshot.queryParamMap.get('invitation');
    console.log(inviteId);

    if (inviteId) this.inviteId = inviteId;
  }
}
