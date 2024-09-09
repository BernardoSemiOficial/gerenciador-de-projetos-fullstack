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
};
