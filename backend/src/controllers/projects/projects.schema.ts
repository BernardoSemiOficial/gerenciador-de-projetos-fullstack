import { libraries } from "../../libraries";

const zod = libraries.zod;

export const ProjectsControllerSchema = {
  getProject: {
    schema: {
      params: zod.object({
        projectPublicId: zod.string(),
      }),
    },
  },
  getTasksByProjectId: {
    schema: {
      params: zod.object({
        projectPublicId: zod.string(),
      }),
    },
  },
  createProject: {
    schema: {
      params: zod.object({
        userPublicId: zod.string(),
      }),
      body: zod.object({
        name: zod.string().min(5),
        description: zod.string().min(5),
        starts_at: zod.coerce.date(),
        ends_at: zod.coerce.date(),
      }),
    },
  },
  updateProject: {
    schema: {
      params: zod.object({
        projectPublicId: zod.string(),
      }),
      body: zod.object({
        name: zod.string().min(5),
        description: zod.string(),
        starts_at: zod.coerce.date(),
        ends_at: zod.coerce.date(),
      }),
    },
  },
  deleteProject: {
    schema: {
      params: zod.object({
        projectPublicId: zod.string(),
      }),
    },
  },
};

export type ProjectsControllerSchemaType = {
  getProjectParams: Zod.infer<
    typeof ProjectsControllerSchema.getProject.schema.params
  >;
  getTasksByProjectIdParams: Zod.infer<
    typeof ProjectsControllerSchema.getTasksByProjectId.schema.params
  >;
  createProjectParams: Zod.infer<
    typeof ProjectsControllerSchema.createProject.schema.params
  >;
  createProjectBody: Zod.infer<
    typeof ProjectsControllerSchema.createProject.schema.body
  >;
  updateProjectParams: Zod.infer<
    typeof ProjectsControllerSchema.updateProject.schema.params
  >;
  updateProjectBody: Zod.infer<
    typeof ProjectsControllerSchema.updateProject.schema.body
  >;
  deleteProjectParams: Zod.infer<
    typeof ProjectsControllerSchema.deleteProject.schema.params
  >;
};
