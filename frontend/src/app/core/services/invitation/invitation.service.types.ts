import { InviteForUser } from '@core/interfaces/user.interface';

export interface ResponseGetInvitationForUser {
	invitation: InviteForUser;
}

export type PayloadPostInvitations = {
	email: string;
	projectsId: string[];
}[];

export interface ResponsePostInvitations {
	invitations: {
		id: string;
		email: string;
	}[];
}

export interface ResponseDeleteInvitation {
	invitation: string;
}
