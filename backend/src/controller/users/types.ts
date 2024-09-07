import { User } from "@prisma/client";

export type RequestCreateUser = Pick<User, "name" | "email" | "password">;
