import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../../database/prisma";
import { librarys } from "../../librarys";
import { generateHash } from "../../services/bcript";

const zod = librarys.zod;

export class UsersController {
  api: FastifyInstance;

  constructor(api: FastifyInstance) {
    this.api = api;
  }

  async getUsers() {
    this.api
      .withTypeProvider<ZodTypeProvider>()
      .get("/users", async (request, reply) => {
        const users = await prisma.user.findMany();
        return reply.status(201).send({ users });
      });
  }

  async createUser() {
    this.api.withTypeProvider<ZodTypeProvider>().post(
      "/users",
      {
        schema: {
          body: zod.object({
            name: zod.string().min(5),
            email: zod.string().email(),
            password: zod.string(),
          }),
        },
      },
      async (request, reply) => {
        const { name, email, password } = request.body;
        const hashPassword = await generateHash(password);
        const user = await prisma.user.create({
          data: {
            name,
            email,
            password: hashPassword,
          },
          select: {
            public_id: true,
            email: true,
            name: true,
            created_at: true,
            updated_at: true,
          },
        });
        return reply.status(201).send({ user });
      }
    );
  }
}
