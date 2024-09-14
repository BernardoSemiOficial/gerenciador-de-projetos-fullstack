import { Project } from '@core/interfaces/project.interface';
import { ProjectForUser } from '@core/interfaces/user.interface';

export interface ResponseGetProject {
  project: Project;
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

export interface PayloadEditProjectForUser {
  name: string;
  description: string;
  starts_at: string;
  ends_at: string;
}

export interface ResponseEditProjectForUser {
  project: ProjectForUser;
}
