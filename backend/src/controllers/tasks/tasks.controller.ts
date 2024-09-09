import { FastifyReply, FastifyRequest } from "fastify";
import { TaskPriorityId, TaskStatusId } from "../../enums/status.enum";
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
    return reply.status(201).send({ tasks });
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
      throw new Error("Project not found");
    }

    const projectDays = day(project.starts_at).diff(project.ends_at, "days");
    console.log({ projectDays, deliveryTime });

    if (deliveryTime > projectDays) {
      throw new Error("Delivery time is greater than the project duration");
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
}
