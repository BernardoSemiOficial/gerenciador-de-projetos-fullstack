import { prisma } from "../../../src/database/prisma";
import { TaskStatus } from "../../../src/enums/status";

export const populateTableTaskStatus = async () => {
  await prisma.taskStatus.createMany({
    data: [
      { name: TaskStatus.PENDING },
      { name: TaskStatus.IN_PROGRESS },
      { name: TaskStatus.COMPLETED },
      { name: TaskStatus.CANCELLED },
    ],
  });
};
