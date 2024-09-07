import { ZodTypeProvider } from "fastify-type-provider-zod";
import { AuthController } from "../../controller/auth";
import { librarys } from "../../librarys";
import { api } from "../../server";

const zod = librarys.zod;
const authController = new AuthController();

api.withTypeProvider<ZodTypeProvider>().post(
  "/login",
  {
    schema: {
      body: zod.object({
        email: zod.string().email(),
        password: zod.string(),
      }),
    },
  },
  async (request, reply) => {
    const { email, password } = request.body;
    const user = await authController.login({ email, password });
    return reply.status(200).send({ user });
  }
);
