import { ProjectForUser, User } from '@core/interfaces/user.interface';

export interface ResponseGetUser {
  user: User;
}

export interface ResponseGetProjectsForUser {
  projects: ProjectForUser[];
}
