import { ProjectsController } from "../../controllers/projects/projects.controller";
import { ProjectsControllerSchema } from "../../controllers/projects/projects.schema";
import { FastifyZod } from "../../server";

export const initializerProjectsController = async (app: FastifyZod) => {
  app.post(
    "/projects/:userPublicId",
    ProjectsControllerSchema.createProject,
    ProjectsController.createProject
  );
};
