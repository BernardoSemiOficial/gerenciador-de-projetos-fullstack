import * as b from "bcrypt";
import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import * as j from "jsonwebtoken";
import nodemailer from "nodemailer";
import * as z from "zod";

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
  mailer: nodemailer,
};
