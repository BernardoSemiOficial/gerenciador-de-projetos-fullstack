import { prisma } from "../../database/prisma.database";
import { ServerError } from "../../errors/server-error";
import {
  InvitationsRespositoryDeleteInviteByPublicId,
  InvitationsRespositoryFindInviteByPublicId,
} from "./types";

export class InvitationsRespository {
  static async findInviteByPublicId({
    invitePublicId,
  }: InvitationsRespositoryFindInviteByPublicId) {
    try {
      return await prisma.userInvitation.findUnique({
        where: {
          public_id: invitePublicId,
        },
        select: {
          email: true,
          public_id: true,
          created_at: true,
          updated_at: true,
          user: {
            select: {
              email: true,
              name: true,
            },
          },
          projects: {
            select: {
              name: true,
              id: true,
              public_id: true,
            },
          },
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async deleteInviteByPublicId({
    invitePublicId,
  }: InvitationsRespositoryDeleteInviteByPublicId) {
    try {
      return await prisma.userInvitation.delete({
        where: {
          public_id: invitePublicId,
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }
}
