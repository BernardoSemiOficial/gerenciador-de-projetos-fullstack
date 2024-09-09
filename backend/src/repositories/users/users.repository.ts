import { prisma } from "../../database/prisma.database";
import {
  UsersRespositoryCreateUser,
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
      },
    });
  }

  static async createUser(data: UsersRespositoryCreateUser) {
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
  }
}
