import { prisma } from "../../database/prisma.database";
import { ServerError } from "../../errors/server-error";
import {
  UsersRespositoryCreateInvitationForUsers,
  UsersRespositoryCreateProjectForUser,
  UsersRespositoryCreateUser,
  UsersRespositoryFindProjectForUser,
  UsersRespositoryFindUserByEmail,
  UsersRespositoryFindUserByPublicId,
} from "./types";

export class UsersRespository {
  static async getUsers() {
    try {
      return await prisma.user.findMany({
        select: {
          public_id: true,
          email: true,
          name: true,
          created_at: true,
          updated_at: true,
          role: true,
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async findUserByEmail({
    email,
    selectPassword = false,
  }: UsersRespositoryFindUserByEmail) {
    try {
      return await prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          public_id: true,
          email: true,
          name: true,
          created_at: true,
          updated_at: true,
          role: true,
          password: selectPassword,
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async findUserByPublicId({
    publicId,
    selectPassword = false,
    selectId = false,
  }: UsersRespositoryFindUserByPublicId) {
    try {
      return await prisma.user.findUnique({
        where: {
          public_id: publicId,
        },
        select: {
          public_id: true,
          email: true,
          name: true,
          created_at: true,
          updated_at: true,
          role: true,
          password: selectPassword,
          id: selectId,
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async findProjectsByUser({
    publicId,
  }: UsersRespositoryFindProjectForUser) {
    try {
      return await prisma.usersOnProjects.findMany({
        where: {
          user: {
            public_id: publicId,
          },
        },
        select: {
          is_owner: true,
          role: true,
          project: {
            select: {
              _count: {
                select: {
                  users: true,
                },
              },
              public_id: true,
              name: true,
              description: true,
              created_at: true,
              updated_at: true,
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

  static async createUser(data: UsersRespositoryCreateUser) {
    try {
      return await prisma.user.create({
        data,
        select: {
          id: true,
          public_id: true,
          email: true,
          name: true,
          created_at: true,
          updated_at: true,
          role: true,
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async createProjectForUser(
    data: UsersRespositoryCreateProjectForUser
  ) {
    try {
      return await prisma.usersOnProjects.create({
        data,
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }

  static async createInvitationForUsers(
    data: UsersRespositoryCreateInvitationForUsers
  ) {
    try {
      return await prisma.userInvitation.create({
        data: {
          email: data.email,
          projects: {
            connect: data.projects_id,
          },
          user: {
            connect: {
              public_id: data.user_public_id,
            },
          },
        },
      });
    } catch (error) {
      throw new ServerError({ message: (error as Error).message, code: 500 });
    }
  }
}
