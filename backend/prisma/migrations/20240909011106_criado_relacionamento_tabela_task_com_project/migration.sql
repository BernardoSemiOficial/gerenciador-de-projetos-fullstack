/*
  Warnings:

  - Added the required column `project_id` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tasks" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "public_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "delivery_time" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "priority_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    CONSTRAINT "tasks_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "task_statuses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_priority_id_fkey" FOREIGN KEY ("priority_id") REFERENCES "task_priorities" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tasks" ("delivery_time", "description", "id", "name", "priority_id", "public_id", "status_id") SELECT "delivery_time", "description", "id", "name", "priority_id", "public_id", "status_id" FROM "tasks";
DROP TABLE "tasks";
ALTER TABLE "new_tasks" RENAME TO "tasks";
CREATE UNIQUE INDEX "tasks_public_id_key" ON "tasks"("public_id");
CREATE UNIQUE INDEX "tasks_name_key" ON "tasks"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
