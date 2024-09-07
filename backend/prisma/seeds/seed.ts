import { prisma } from "../../src/database/prisma";
import { populateTableTaskPriority } from "./task-priority";
import { populateTableTaskStatus } from "./task-status";

async function main() {
  await populateTableTaskStatus();
  await populateTableTaskPriority();
  console.log("Tables for status and priority populated!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
