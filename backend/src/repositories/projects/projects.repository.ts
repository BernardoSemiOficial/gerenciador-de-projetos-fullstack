import { prisma } from "../../database/prisma.database";
import { ProjectsRespositoryFindProjectByPublicId } from "./types";

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
}
