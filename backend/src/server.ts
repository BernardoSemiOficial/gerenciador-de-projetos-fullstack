import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { env } from "./env";
import { initializerUsersControler } from "./routes/users";

export const api = fastify({ logger: true });
api.register(cors, { origin: "*" });

api.setValidatorCompiler(validatorCompiler);
api.setSerializerCompiler(serializerCompiler);
api.register(initializerUsersControler);

api.listen({ port: env.PORT }).then(() => {
  console.log(`Server listening at http://localhost:${env.PORT}`);
});
