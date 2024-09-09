import { prisma } from "../../database/prisma.database";
import { TasksRespositoryCreateTask, TasksRespositoryGetTasks } from "./types";

export class TasksRespository {
  static async getTasks({ projectId }: TasksRespositoryGetTasks) {
    return await prisma.task.findMany({
      where: {
        project_id: projectId,
      },
      select: {
        public_id: true,
        name: true,
        description: true,
        delivery_time: true,
        status: true,
        priority: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  static async createTask(data: TasksRespositoryCreateTask) {
    return await prisma.task.create({
      data: {
        name: data.name,
        description: data.description,
        delivery_time: data.delivery_time,
        project_id: data.projectId,
        priority_id: data.priorityId,
        status_id: 1,
      },
      select: {
        public_id: true,
        name: true,
        description: true,
        delivery_time: true,
        status: true,
        priority: true,
        created_at: true,
        updated_at: true,
      },
    });
  }
}
