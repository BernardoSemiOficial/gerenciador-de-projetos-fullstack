export type UsersRespositoryCreateUser = {
  name: string;
  email: string;
  password: string;
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
};
