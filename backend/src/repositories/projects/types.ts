export type ProjectsRespositoryFindProjectByPublicId = {
  publicId: string;
};

export type ProjectsRespositoryCreateProject = {
  name: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
};

export type ProjectsRespositoryUpdateProject = {
  name: string;
  description: string;
  starts_at: Date;
  ends_at: Date;
};
