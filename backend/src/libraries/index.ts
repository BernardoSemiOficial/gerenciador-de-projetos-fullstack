import * as b from "bcrypt";
import * as j from "jsonwebtoken";
import * as z from "zod";

import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import LocalizedFormat from "dayjs/plugin/localizedFormat";

dayjs.locale(ptBR);
dayjs.extend(LocalizedFormat);

const jwt = j;
const bcript = b;
const zod = z;

export const libraries = {
  zod: zod,
  bcript: bcript,
  jwt: jwt,
  day: dayjs,
};
