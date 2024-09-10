import { libraries } from "../../libraries";

const zod = libraries.zod;

export const ProjectsControllerSchema = {
  createProject: {
    schema: {
      params: zod.object({
        userPublicId: zod.string(),
      }),
      body: zod.object({
        name: zod.string().min(5),
        description: zod.string(),
        startsAt: zod.coerce.date(),
        endsAt: zod.coerce.date(),
      }),
    },
  },
};

export type ProjectsControllerSchemaType = {
  createProjectParams: Zod.infer<
    typeof ProjectsControllerSchema.createProject.schema.params
  >;
  createProjectBody: Zod.infer<
    typeof ProjectsControllerSchema.createProject.schema.body
  >;
};
