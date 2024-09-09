import { AuthController } from "../../controllers/auth/auth.controller";
import { FastifyZod } from "../../server";

import { AuthControllerSchema } from "../../controllers/auth/auth.schema";

export const initializerAuthController = async (app: FastifyZod) => {
  app.post("/auth/login", AuthControllerSchema.login, AuthController.login);
  app.post(
    "/auth/register",
    AuthControllerSchema.register,
    AuthController.register
  );
  app.post(
    "/auth/refresh-token",
    AuthControllerSchema.refreshToken,
    AuthController.refreshToken
  );
};
