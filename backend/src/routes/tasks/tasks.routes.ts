import { TasksController } from "../../controllers/tasks/tasks.controller";
import { TasksControllerSchema } from "../../controllers/tasks/tasks.schema";
import { FastifyZod } from "../../server";

export const initializerTasksController = async (app: FastifyZod) => {
  app.get(
    "/tasks/:projectPublicId",
    TasksControllerSchema.getAllTasksByProjectId,
    TasksController.getAllTasksByProjectId
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
