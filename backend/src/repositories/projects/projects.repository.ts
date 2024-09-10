import { prisma } from "../../database/prisma.database";
import {
  ProjectsRespositoryCreateProject,
  ProjectsRespositoryFindProjectByPublicId,
} from "./types";

export class ProjectsRespository {
  static async findProjectByPublicId({
    publicId,
  }: ProjectsRespositoryFindProjectByPublicId) {
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
  }

  static async createProject(data: ProjectsRespositoryCreateProject) {
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
  }
}
