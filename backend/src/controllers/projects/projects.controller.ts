import { FastifyReply, FastifyRequest } from "fastify";
import { ClientError } from "../../errors/client-error";
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
    const { name, description, starts_at, ends_at } = request.body;

    const user = await UsersRespository.findUserByPublicId({
      publicId: userPublicId,
      selectId: true,
    });

    if (!user) {
      throw new ClientError({
        message: "User not found. Not possible to create a project",
        code: 404,
      });
    }

    if (day(starts_at).isAfter(ends_at)) {
      throw new ClientError({
        message: "The project start date must be before the end date",
        code: 400,
      });
    }

    if (day(starts_at).isBefore(day().subtract(1, "day"))) {
      throw new ClientError({
        message: "The project start date must be after the current date",
        code: 400,
      });
    }

    const project = await ProjectsRespository.createProject({
      name,
      description,
      starts_at,
      ends_at,
    });

    await UsersRespository.createProjectForUser({
      is_owner: true,
      user_id: user.id,
      project_id: project.id,
    });

    return reply.status(201).send({ project });
  }

  static async updateProject(
    request: FastifyRequest<{
      Body: ProjectsControllerSchemaType["updateProjectBody"];
      Params: ProjectsControllerSchemaType["updateProjectParams"];
    }>,
    reply: FastifyReply
  ) {
    const { projectPublicId } = request.params;
    const { name, description, starts_at, ends_at } = request.body;

    const project = await ProjectsRespository.findProjectByPublicId({
      publicId: projectPublicId,
    });

    if (!project) {
      throw new ClientError({
        message: "Project not found. Not possible to update the project",
        code: 404,
      });
    }

    if (day(starts_at).isAfter(ends_at)) {
      throw new ClientError({
        message: "The project start date must be before the end date",
        code: 400,
      });
    }

    if (day(starts_at).isBefore(day())) {
      throw new ClientError({
        message: "The project start date must be after the current date",
        code: 400,
      });
    }

    const projectUpdated = await ProjectsRespository.updateProject(
      projectPublicId,
      {
        name,
        description,
        starts_at,
        ends_at,
      }
    );

    return reply.status(200).send({ project: projectUpdated });
  }

  static async deleteProject(
    request: FastifyRequest<{
      Params: ProjectsControllerSchemaType["deleteProjectParams"];
    }>,
    reply: FastifyReply
  ) {
    const { projectPublicId } = request.params;
    const project = await ProjectsRespository.findProjectByPublicId({
      publicId: projectPublicId,
    });

    if (!project) {
      throw new ClientError({
        message: "Project not found. Not possible to delete the project",
        code: 404,
      });
    }

    await ProjectsRespository.deleteProject(project.id);
    return reply
      .status(200)
      .send({ project: `Project ${projectPublicId} deleted` });
  }
}
