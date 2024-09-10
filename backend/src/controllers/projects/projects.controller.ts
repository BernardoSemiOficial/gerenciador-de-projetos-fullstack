import { FastifyReply, FastifyRequest } from "fastify";
import { libraries } from "../../libraries";
import { ProjectsRespository } from "../../repositories/projects/projects.repository";
import { UsersRespository } from "../../repositories/users/users.repository";
import { ProjectsControllerSchemaType } from "./projects.schema";

const day = libraries.day;

export class ProjectsController {
  static async createProject(
    request: FastifyRequest<{
      Body: ProjectsControllerSchemaType["createProjectBody"];
      Params: ProjectsControllerSchemaType["createProjectParams"];
    }>,
    reply: FastifyReply
  ) {
    const { userPublicId } = request.params;
    const { name, description, startsAt, endsAt } = request.body;

    const user = await UsersRespository.findUserByPublicId({
      publicId: userPublicId,
      selectPassword: true,
    });

    if (!user) {
      throw new Error("User not found. Not possible to create a project");
    }

    const project = await ProjectsRespository.createProject({
      name,
      description,
      starts_at: startsAt,
      ends_at: endsAt,
    });

    await UsersRespository.createProjectForUser({
      is_owner: true,
      user_id: user.id,
      project_id: project.id,
    });

    return reply.status(201).send({ project });
  }
}
