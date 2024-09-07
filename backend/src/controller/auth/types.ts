import { User } from "@prisma/client";

export type RequestUserLogin = Pick<User, "email" | "password">;
