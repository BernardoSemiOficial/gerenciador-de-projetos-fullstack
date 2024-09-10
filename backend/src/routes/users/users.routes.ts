import { UsersController } from "../../controllers/users/users.controller";
import { UsersControllerSchema } from "../../controllers/users/users.schema";
import { FastifyZod } from "../../server";

export const initializerUsersController = async (app: FastifyZod) => {
  app.get("/users", UsersController.getUsers);
  app.get(
    "/users/:publicId",
    UsersControllerSchema.getUserByPublicId,
    UsersController.getUser
  );
  app.get(
    "/users/:publicId/projects",
    UsersControllerSchema.getProjectsForUserParams,
    UsersController.getProjectsByUser
  );
};
