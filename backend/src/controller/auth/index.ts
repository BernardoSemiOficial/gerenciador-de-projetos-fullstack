import { prisma } from "../../database/prisma";
import { compareHash } from "../../services/bcript";
import { RequestUserLogin } from "./types";

export class AuthController {
  async login({ email, password }: RequestUserLogin) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error("Not authorized");
    }

    const isPasswordEqual = await compareHash(password, user.password);

    if (!isPasswordEqual) {
      throw new Error("Not authorized");
    }

    return user;
  }
}
