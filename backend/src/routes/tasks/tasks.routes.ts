import { TasksController } from "../../controllers/tasks/tasks.controller";
import { TasksControllerSchema } from "../../controllers/tasks/tasks.schema";
import { AuthorizationMiddleware } from "../../middlewares/authorization.middleware";
import { FastifyZod } from "../../server";

export const initializerTasksController = async (app: FastifyZod) => {
  app.addHook("onRequest", AuthorizationMiddleware.verifyToken);

  app.get(
    "/tasks/:taskPublicId",
    TasksControllerSchema.getTask,
    TasksController.getTask
  );
  app.post(
    "/tasks/:projectPublicId",
    TasksControllerSchema.createTask,
    TasksController.createTask
  );
  app.put(
    "/tasks/:taskPublicId",
    TasksControllerSchema.updateTask,
    TasksController.updateTask
  );
  app.delete(
    "/tasks/:taskPublicId",
    TasksControllerSchema.deleteTask,
    TasksController.deleteTask
  );
};
