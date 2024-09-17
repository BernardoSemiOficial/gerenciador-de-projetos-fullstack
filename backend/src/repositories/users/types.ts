import { RoleId } from "../../enums/roles.enum";

export type UsersRespositoryCreateUser = {
  name: string;
  email: string;
  password: string;
  role_id: RoleId;
};

export type UsersRespositoryFindUserByEmail = {
  email: string;
  selectPassword: boolean;
};

export type UsersRespositoryFindUserByPublicId = {
  publicId: string;
  selectPassword?: boolean;
  selectId?: boolean;
};

export type UsersRespositoryFindProjectForUser = {
  publicId: string;
};

export type UsersRespositoryCreateProjectForUser = {
  is_owner: boolean;
  user_id: number;
  project_id: number;
  role_id: RoleId;
};

export type UsersRespositoryCreateInvitationForUsers = {
  email: string;
  user_public_id: string;
  projects_id: { public_id: string }[];
};
