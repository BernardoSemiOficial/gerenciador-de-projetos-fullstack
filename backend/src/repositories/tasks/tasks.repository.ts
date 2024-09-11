import { prisma } from "../../database/prisma.database";
import { ServerError } from "../../errors/server-error";
import {
  TasksRespositoryCreateTask,
  TasksRespositoryGetTasks,
  TasksRespositoryUpdateTask,
} from "./types";

export class TasksRespository {
  static async getTasks({ projectId }: TasksRespositoryGetTasks) {
    try {
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
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async findTaskByPublicId(taskPublicId: string) {
    try {
      return await prisma.task.findUnique({
        where: {
          public_id: taskPublicId,
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
          project: {
            select: {
              starts_at: true,
              ends_at: true,
            },
          },
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async createTask(data: TasksRespositoryCreateTask) {
    try {
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
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async updateTask(
    taskPublicId: string,
    data: TasksRespositoryUpdateTask
  ) {
    try {
      return await prisma.task.update({
        where: {
          public_id: taskPublicId,
        },
        data: {
          name: data.name,
          description: data.description,
          delivery_time: data.delivery_time,
          priority_id: data.priorityId,
          status_id: data.statusId,
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
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async deleteTask(taskPublicId: string) {
    try {
      return await prisma.task.delete({
        where: {
          public_id: taskPublicId,
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }
}
