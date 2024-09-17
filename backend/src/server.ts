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
import { errorHandler } from "./error-handler";
import { initializerAuthController } from "./routes/auth/auth.routes";
import { initializerInvitationsController } from "./routes/invitations/invitations.routes";
import { initializerProjectsController } from "./routes/projects/projects.routes";
import { initializerTasksController } from "./routes/tasks/tasks.routes";
import { initializerUsersController } from "./routes/users/users.routes";

export type FastifyZod = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  ZodTypeProvider
>;

const app = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);

app.register(cors, { origin: "*" });
app.register(initializerAuthController);
app.register(initializerUsersController);
app.register(initializerTasksController);
app.register(initializerProjectsController);
app.register(initializerInvitationsController);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server listening at http://localhost:${env.PORT}`);
});
