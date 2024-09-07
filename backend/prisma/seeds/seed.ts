import { prisma } from "../../src/database/prisma";
import { populateTableTaskPriority } from "./task-priority";
import { populateTableTaskStatus } from "./task-status";

async function main() {
  try {
    await populateTableTaskStatus();
    await populateTableTaskPriority();
    console.log("Tables for status and priority populated!");
  } catch (error) {
    console.error(error);
  }
}

main().finally(async () => {
  await prisma.$disconnect();
});
