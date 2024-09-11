import { ProjectsController } from "../../controllers/projects/projects.controller";
import { ProjectsControllerSchema } from "../../controllers/projects/projects.schema";
import { FastifyZod } from "../../server";

export const initializerProjectsController = async (app: FastifyZod) => {
  app.post(
    "/projects/:userPublicId",
    ProjectsControllerSchema.createProject,
    ProjectsController.createProject
  );
  app.put(
    "/projects/:projectPublicId",
    ProjectsControllerSchema.updateProject,
    ProjectsController.updateProject
  );
  app.delete(
    "/projects/:projectPublicId",
    ProjectsControllerSchema.deleteProject,
    ProjectsController.deleteProject
  );
};
