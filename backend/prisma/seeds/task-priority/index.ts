import { prisma } from "../../../src/database/prisma";
import { TaskPriority } from "../../../src/enums/status";

export const populateTableTaskPriority = async () => {
  await prisma.taskPriority.createMany({
    data: [
      { name: TaskPriority.LOW },
      { name: TaskPriority.MEDIUM },
      { name: TaskPriority.HIGH },
      { name: TaskPriority.CRITICAL },
    ],
  });
};
