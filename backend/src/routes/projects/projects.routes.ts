import { ProjectsController } from "../../controllers/projects/projects.controller";
import { ProjectsControllerSchema } from "../../controllers/projects/projects.schema";
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware";
import { FastifyZod } from "../../server";

export const initializerProjectsController = async (app: FastifyZod) => {
  app.addHook("onRequest", AuthorizationMiddleware.verifyToken);

  app.get(
    "/projects/:projectPublicId",
    ProjectsControllerSchema.getProject,
    ProjectsController.getProject
  );
  app.get(
    "/projects/:projectPublicId/tasks",
    ProjectsControllerSchema.getTasksByProjectId,
    ProjectsController.getTasksByProjectId
  );
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
