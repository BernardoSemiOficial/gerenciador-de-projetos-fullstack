import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import { UserService } from '@core/services/user/user.service';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, RouterModule, MenubarModule, AvatarModule],
	templateUrl: './app-header.component.html',
	styleUrl: './app-header.component.scss'
})
export class AppHeaderComponent implements OnInit {
	userService = inject(UserService);
	authService = inject(AuthService);
	user = this.userService.user();
	items: MenuItem[] | undefined;
	labelAvatar = '';
	PrimeIcons = PrimeIcons;

	ngOnInit() {
		this.items = [
			{
				label: 'Home',
				icon: PrimeIcons.HOME,
				routerLink: ['/dashboard']
			},
			{
				label: 'Logout',
				icon: PrimeIcons.SIGN_OUT
			}
		];
		this.formatLabelAvatar();
	}

	logout() {
		this.authService.logoutByUser();
	}

	formatLabelAvatar() {
		this.labelAvatar = this.user?.name?.charAt(0).toUpperCase() ?? '@';
	}
}
