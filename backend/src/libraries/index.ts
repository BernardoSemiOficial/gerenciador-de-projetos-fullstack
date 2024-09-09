import * as b from "bcrypt";
import * as j from "jsonwebtoken";
import * as z from "zod";

const jwt = j;
const bcript = b;
const zod = z;

export const libraries = {
  zod: zod,
  bcript: bcript,
  jwt: jwt,
};
