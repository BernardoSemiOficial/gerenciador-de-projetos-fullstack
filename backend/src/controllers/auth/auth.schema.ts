import { libraries } from "../../libraries";

const zod = libraries.zod;

export const AuthControllerSchema = {
  login: {
    schema: {
      body: zod.object({
        email: zod.string().email(),
        password: zod.string(),
      }),
    },
  },
  register: {
    schema: {
      body: zod.object({
        name: zod.string().min(5),
        email: zod.string().email(),
        password: zod.string(),
      }),
    },
  },
  invite: {
    schema: {
      params: zod.object({
        invitePublicId: zod.string().uuid(),
      }),
      body: zod.object({
        name: zod.string().min(5),
        email: zod.string().email(),
        password: zod.string(),
      }),
    },
  },
  refreshToken: {
    schema: {
      body: zod.object({
        refreshToken: zod.string(),
      }),
    },
  },
};

export type AuthControllerSchemaType = {
  loginBody: Zod.infer<typeof AuthControllerSchema.login.schema.body>;
  refreshTokenBody: Zod.infer<
    typeof AuthControllerSchema.refreshToken.schema.body
  >;
  registerBody: Zod.infer<typeof AuthControllerSchema.register.schema.body>;
  inviteParams: Zod.infer<typeof AuthControllerSchema.invite.schema.params>;
  inviteBody: Zod.infer<typeof AuthControllerSchema.invite.schema.body>;
};
