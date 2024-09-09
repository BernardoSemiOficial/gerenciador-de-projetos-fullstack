import cors from "@fastify/cors";
import fastify, {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { initializerAuthController } from "./routes/auth/auth.routes";
import { initializerUsersController } from "./routes/users/users.routes";

export type FastifyZod = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();
app.register(cors, { origin: "*" });

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(initializerAuthController);
app.register(initializerUsersController);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server listening at http://localhost:${env.PORT}`);
});
