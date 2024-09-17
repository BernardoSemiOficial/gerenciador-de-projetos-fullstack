import { InvitationsController } from "../../controllers/invitations/invitations.controller";
import { InvitationsControllerSchema } from "../../controllers/invitations/invitations.schema";
import { FastifyZod } from "../../server";

export const initializerInvitationsController = async (app: FastifyZod) => {
  app.get(
    "/invitations/:invitePublicId",
    InvitationsControllerSchema.getInvitationForUser,
    InvitationsController.getInvitationForUser
  );
  app.delete(
    "/invitations/:invitePublicId",
    InvitationsControllerSchema.deleteInvitationForUser,
    InvitationsController.deleteInvitationForUser
  );
};
