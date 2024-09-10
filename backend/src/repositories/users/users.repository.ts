import { prisma } from "../../database/prisma.database";
import { ClientError } from "../../errors/client-error";
import {
  UsersRespositoryCreateProjectForUser,
  UsersRespositoryCreateUser,
  UsersRespositoryFindProjectForUser,
  UsersRespositoryFindUserByEmail,
  UsersRespositoryFindUserByPublicId,
} from "./types";

export class UsersRespository {
  static async getUsers() {
    return await prisma.user.findMany({
      select: {
        public_id: true,
        email: true,
        name: true,
        created_at: true,
        updated_at: true,
      },
    });
  }

  static async findUserByEmail({
    email,
    selectPassword = false,
  }: UsersRespositoryFindUserByEmail) {
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
        password: selectPassword,
      },
    });
  }

  static async findUserByPublicId({
    publicId,
    selectPassword = false,
    selectId = false,
  }: UsersRespositoryFindUserByPublicId) {
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
        password: selectPassword,
        id: selectId,
      },
    });
  }

  static async findProjectsByUser({
    publicId,
  }: UsersRespositoryFindProjectForUser) {
    return await prisma.usersOnProjects.findMany({
      where: {
        user: {
          public_id: publicId,
        },
      },
      select: {
        is_owner: true,
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
  }

  static async createUser(data: UsersRespositoryCreateUser) {
    try {
      return await prisma.user.create({
        data,
        select: {
          public_id: true,
          email: true,
          name: true,
          created_at: true,
          updated_at: true,
        },
      });
    } catch (error) {
      throw new ClientError({
        message: "Not possible to create a user",
        code: 400,
      });
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
      throw new ClientError({
        message: "Not possible to create a project for this user",
        code: 400,
      });
    }
  }
}
