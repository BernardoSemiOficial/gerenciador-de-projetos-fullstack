import { prisma } from "../../database/prisma.database";
import { ServerError } from "../../errors/server-error";
import {
  ProjectsRespositoryCreateProject,
  ProjectsRespositoryFindProjectByPublicId,
  ProjectsRespositoryUpdateProject,
} from "./types";

export class ProjectsRespository {
  static async findProjectByPublicId({
    publicId,
  }: ProjectsRespositoryFindProjectByPublicId) {
    try {
      return await prisma.project.findUnique({
        where: {
          public_id: publicId,
        },
        select: {
          id: true,
          public_id: true,
          starts_at: true,
          ends_at: true,
        },
      });
    } catch (error) {
      throw new ServerError({
        message: (error as Error).message,
        code: 500,
      });
    }
  }

  static async createProject(data: ProjectsRespositoryCreateProject) {
    try {
      return await prisma.project.create({
        data,
        select: {
          id: true,
          public_id: true,
          name: true,
          description: true,
          created_at: true,
          updated_at: true,
          starts_at: true,
          ends_at: true,
        },
      });
    } catch (error) {
      throw new ServerError({
        message: (error as Error).message,
        code: 500,
      });
    }
  }

  static async updateProject(
    publicId: string,
    data: ProjectsRespositoryUpdateProject
  ) {
    try {
      return await prisma.project.update({
        where: {
          public_id: publicId,
        },
        data,
        select: {
          public_id: true,
          name: true,
          description: true,
          created_at: true,
          updated_at: true,
          starts_at: true,
          ends_at: true,
        },
      });
    } catch (error) {
      throw new ServerError({
        message: (error as Error).message,
        code: 500,
      });
    }
  }

  static async deleteProject(projectId: number) {
    try {
      const deleteUsersProjects = prisma.usersOnProjects.deleteMany({
        where: {
          project_id: projectId,
        },
      });
      const deleteTasksProjects = prisma.task.deleteMany({
        where: {
          project_id: projectId,
        },
      });
      const deleteProject = prisma.project.delete({
        where: {
          id: projectId,
        },
      });
      await prisma.$transaction([
        deleteUsersProjects,
        deleteTasksProjects,
        deleteProject,
      ]);
    } catch (error) {
      console.log(error);
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }
}
