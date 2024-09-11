import { FastifyReply, FastifyRequest } from "fastify";
import { TaskPriorityId, TaskStatusId } from "../../enums/status.enum";
import { ClientError } from "../../errors/client-error";
import { libraries } from "../../libraries";
import { ProjectsRespository } from "../../repositories/projects/projects.repository";
import { TasksRespository } from "../../repositories/tasks/tasks.repository";
import { TasksControllerSchemaType } from "./tasks.schema";

const day = libraries.day;

export class TasksController {
  static async getAllTasksByProjectId(
    request: FastifyRequest<{
      Params: TasksControllerSchemaType["getAllTasksByProjectIdParams"];
    }>,
    reply: FastifyReply
  ) {
    const { projectPublicId } = request.params;
    const project = await ProjectsRespository.findProjectByPublicId({
      publicId: projectPublicId,
    });

    if (!project) {
      throw new Error("Project not found");
    }

    const tasks = await TasksRespository.getTasks({ projectId: project.id });
    return reply.status(200).send({ tasks });
  }

  static async createTask(
    request: FastifyRequest<{
      Body: TasksControllerSchemaType["createTaskBody"];
      Params: TasksControllerSchemaType["createTaskParams"];
    }>,
    reply: FastifyReply
  ) {
    const { projectPublicId } = request.params;
    const { name, description, deliveryTime, priority } = request.body;
    const project = await ProjectsRespository.findProjectByPublicId({
      publicId: projectPublicId,
    });

    if (!project) {
      throw new ClientError({ message: "Project not found", code: 404 });
    }

    // ** duration project = [3 day] - [1 day] = [1, 2, 3] 3 days completed
    const projectDays = day(project.ends_at)
      .add(1, "days")
      .diff(project.starts_at, "days");

    if (deliveryTime > projectDays) {
      throw new ClientError({
        message: "Delivery time is greater than the project duration",
        code: 400,
      });
    }

    const task = await TasksRespository.createTask({
      projectId: project.id,
      name,
      description,
      delivery_time: deliveryTime,
      priorityId: TaskPriorityId[priority],
      statusId: TaskStatusId.PENDING,
    });

    return reply.status(201).send({ task });
  }

  static async updateTask(
    request: FastifyRequest<{
      Body: TasksControllerSchemaType["updateTaskBody"];
      Params: TasksControllerSchemaType["updateTaskParams"];
    }>,
    reply: FastifyReply
  ) {
    const { taskPublicId } = request.params;
    const { name, description, deliveryTime, priority, status } = request.body;

    const task = await TasksRespository.findTaskByPublicId(taskPublicId);

    if (!task) {
      throw new ClientError({ message: "Task not found", code: 404 });
    }

    // ** duration project = [3 day] - [1 day] = [1, 2, 3] 3 days completed
    const projectDays = day(task.project.ends_at)
      .add(1, "days")
      .diff(task.project.starts_at, "days");

    if (deliveryTime > projectDays) {
      throw new ClientError({
        message: "Delivery time is greater than the project duration",
        code: 400,
      });
    }

    const taskUpdated = await TasksRespository.updateTask(taskPublicId, {
      name,
      description,
      delivery_time: deliveryTime,
      priorityId: TaskPriorityId[priority],
      statusId: TaskStatusId[status],
    });

    return reply.status(200).send({ task: taskUpdated });
  }

  static async deleteTask(
    request: FastifyRequest<{
      Params: TasksControllerSchemaType["deleteTaskParams"];
    }>,
    reply: FastifyReply
  ) {
    const { taskPublicId } = request.params;

    const task = await TasksRespository.findTaskByPublicId(taskPublicId);

    if (!task) {
      throw new ClientError({ message: "Task not found", code: 404 });
    }

    await TasksRespository.deleteTask(taskPublicId);

    return reply.status(200).send({ task: `Task ${taskPublicId} deleted` });
  }
}
