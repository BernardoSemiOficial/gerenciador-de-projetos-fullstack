import { prisma } from "../../../src/database/prisma.database";
import { Role } from "../../../src/enums/roles.enum";

export const populateTableRoles = async () => {
  await prisma.role.createMany({
    data: [
      { name: Role.SUPERADMIN },
      { name: Role.ADMIN },
      { name: Role.CONTRIBUTOR },
    ],
  });
};
