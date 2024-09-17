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
  getProjectsForUser: {
    schema: {
      params: zod.object({
        publicId: zod.string(),
      }),
    },
  },
  createInvitationForUsers: {
    schema: {
      body: zod.array(
        zod.object({
          email: zod.string().email(),
          projectsId: zod.array(zod.string().uuid()),
        })
      ),
    },
  },
};

export type UsersControllerSchemaType = {
  getUserByPublicId: Zod.infer<
    typeof UsersControllerSchema.getUserByPublicId.schema.params
  >;
  getProjectsForUserParams: Zod.infer<
    typeof UsersControllerSchema.getProjectsForUser.schema.params
  >;
  createInvitationForUsersBody: Zod.infer<
    typeof UsersControllerSchema.createInvitationForUsers.schema.body
  >;
};
