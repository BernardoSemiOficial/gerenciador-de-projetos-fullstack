import { env } from "../env";
import { librarys } from "../librarys";

export const generateHash = async (password: string): Promise<string> => {
  const salt = await generateSalt();
  const hash = await librarys.bcript.hash(password, salt);
  return hash;
};

export const compareHash = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  return await librarys.bcript.compare(password, hashPassword);
};

const generateSalt = async (): Promise<string> => {
  return await librarys.bcript.genSalt(env.BCRIPT_SALT_ROUNDS);
};
