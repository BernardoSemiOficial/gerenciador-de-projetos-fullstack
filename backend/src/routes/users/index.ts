import { FastifyInstance } from "fastify";
import { UsersController } from "../../controller/users";

export const initializerUsersControler = async (app: FastifyInstance) => {
  const usersController = new UsersController(app);
  usersController.getUsers();
  usersController.createUser();
};
