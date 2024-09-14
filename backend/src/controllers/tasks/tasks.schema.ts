import { TaskPriority, TaskStatus } from "../../enums/status.enum";
import { libraries } from "../../libraries";

const zod = libraries.zod;

export const TasksControllerSchema = {
  getTask: {
    schema: {
      params: zod.object({
        taskPublicId: zod.string(),
      }),
    },
  },
  createTask: {
    schema: {
      params: zod.object({
        projectPublicId: zod.string(),
      }),
      body: zod.object({
        name: zod.string().min(5),
        description: zod.string(),
        delivery_time: zod.number().int().positive(),
        priority: zod.nativeEnum(TaskPriority),
      }),
    },
  },
  updateTask: {
    schema: {
      params: zod.object({
        taskPublicId: zod.string(),
      }),
      body: zod.object({
        name: zod.string().min(5),
        description: zod.string(),
        delivery_time: zod.number().int().positive(),
        priority: zod.nativeEnum(TaskPriority),
        status: zod.nativeEnum(TaskStatus),
      }),
    },
  },
  deleteTask: {
    schema: {
      params: zod.object({
        taskPublicId: zod.string(),
      }),
    },
  },
};

export type TasksControllerSchemaType = {
  getTask: Zod.infer<typeof TasksControllerSchema.getTask.schema.params>;
  createTaskBody: Zod.infer<
    typeof TasksControllerSchema.createTask.schema.body
  >;
  createTaskParams: Zod.infer<
    typeof TasksControllerSchema.createTask.schema.params
  >;
  updateTaskBody: Zod.infer<
    typeof TasksControllerSchema.updateTask.schema.body
  >;
  updateTaskParams: Zod.infer<
    typeof TasksControllerSchema.updateTask.schema.params
  >;
  deleteTaskParams: Zod.infer<
    typeof TasksControllerSchema.deleteTask.schema.params
  >;
};
