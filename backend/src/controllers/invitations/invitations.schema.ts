import { libraries } from "../../libraries";

const zod = libraries.zod;

export const InvitationsControllerSchema = {
  getInvitationForUser: {
    schema: {
      params: zod.object({
        invitePublicId: zod.string(),
      }),
    },
  },
  deleteInvitationForUser: {
    schema: {
      params: zod.object({
        invitePublicId: zod.string(),
      }),
    },
  },
};

export type InvitationsControllerSchemaType = {
  getInvitationForUserParams: Zod.infer<
    typeof InvitationsControllerSchema.getInvitationForUser.schema.params
  >;
  deleteInvitationForUserParams: Zod.infer<
    typeof InvitationsControllerSchema.deleteInvitationForUser.schema.params
  >;
};
