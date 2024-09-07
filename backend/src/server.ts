import Fastify from "fastify";
import { env } from "./env";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", function (request, reply) {
  reply.send("Hello, world!");
});

fastify.listen({ port: env.PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
