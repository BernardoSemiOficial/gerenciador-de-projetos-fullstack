import { Prisma } from "@prisma/client";
import { FastifyInstance } from "fastify";
import { ZodError } from "zod";
import { ClientError } from "./errors/client-error";

type FastitfyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastitfyErrorHandler = (error, request, reply) => {
  console.error(error.stack);

  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: "Invalid input data",
      error: error.flatten().fieldErrors,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return reply.status(400).send({
      message: "Prisma error",
      error: {
        code: error.code,
        meta: error.meta,
      },
    });
  }

  if (error instanceof ClientError) {
    return reply.status(error.statusCode).send({ message: error.message });
  }

  return reply.status(500).send({ message: "Internal server error" });
};
