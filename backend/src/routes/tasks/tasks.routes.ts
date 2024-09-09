import { TasksController } from "../../controllers/tasks/tasks.controller";
import { TasksControllerSchema } from "../../controllers/tasks/tasks.schema";
import { FastifyZod } from "../../server";

export const initializerTasksController = async (app: FastifyZod) => {
  app.get(
    "/tasks/:projectId",
    TasksControllerSchema.getAllTasksByProjectId,
    TasksController.getAllTasksByProjectId
  );
  app.post(
    "/tasks/:projectId",
    TasksControllerSchema.createTask,
    TasksController.createTask
  );
};
