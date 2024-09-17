/*
  Warnings:

  - Added the required column `role_id` to the `UsersOnProjects` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UsersOnProjects" (
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "is_owner" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("project_id", "user_id"),
    CONSTRAINT "UsersOnProjects_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnProjects_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UsersOnProjects_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_UsersOnProjects" ("is_owner", "project_id", "user_id") SELECT "is_owner", "project_id", "user_id" FROM "UsersOnProjects";
DROP TABLE "UsersOnProjects";
ALTER TABLE "new_UsersOnProjects" RENAME TO "UsersOnProjects";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
