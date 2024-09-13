import { ProjectForUser, User } from '@core/interfaces/user.interface';

export interface ResponseGetUser {
  user: User;
}

export interface ResponseGetProjectsForUser {
  projects: ProjectForUser[];
}

export interface PayloadCreateProjectForUser {
  name: string;
  description: string;
  starts_at: string;
  ends_at: string;
}

export interface ResponseCreateProjectForUser {
  project: ProjectForUser;
}
