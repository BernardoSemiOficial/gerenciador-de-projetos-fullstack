import { FastifyReply, FastifyRequest } from "fastify";
import { ClientError } from "../../errors/client-error";
import { InviteForUserClient } from "../../models/user.model";
import { InvitationsRespository } from "../../repositories/invitations/invitations.repository";
import { InvitationsControllerSchemaType } from "./invitations.schema";

export class InvitationsController {
  static async getInvitationForUser(
    request: FastifyRequest<{
      Params: InvitationsControllerSchemaType["getInvitationForUserParams"];
    }>,
    reply: FastifyReply
  ) {
    const { invitePublicId } = request.params;
    const inviteUser = await InvitationsRespository.findInviteByPublicId({
      invitePublicId,
    });

    if (!inviteUser) {
      throw new ClientError({ message: "Invite not found", code: 404 });
    }

    const inviteUserClient = new InviteForUserClient(inviteUser);

    return reply.status(200).send({ invitation: inviteUserClient });
  }

  static async deleteInvitationForUser(
    request: FastifyRequest<{
      Params: InvitationsControllerSchemaType["deleteInvitationForUserParams"];
    }>,
    reply: FastifyReply
  ) {
    const { invitePublicId } = request.params;
    await InvitationsRespository.deleteInviteByPublicId({
      invitePublicId,
    });
    return reply
      .status(200)
      .send({ invitation: `Invitation ${invitePublicId} deleted` });
  }
}
