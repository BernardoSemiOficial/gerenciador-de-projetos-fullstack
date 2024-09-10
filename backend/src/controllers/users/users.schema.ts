import { libraries } from "../../libraries";

const zod = libraries.zod;

export const UsersControllerSchema = {
  getUserByPublicId: {
    schema: {
      params: zod.object({
        publicId: zod.string(),
      }),
    },
  },
  getProjectsForUserParams: {
    schema: {
      params: zod.object({
        publicId: zod.string(),
      }),
    },
  },
};

export type UsersControllerSchemaType = {
  getUserByPublicId: Zod.infer<
    typeof UsersControllerSchema.getUserByPublicId.schema.params
  >;
  getProjectsForUserParams: Zod.infer<
    typeof UsersControllerSchema.getProjectsForUserParams.schema.params
  >;
};
