import { env } from "../env";
import { ServerError } from "../errors/server-error";
import { libraries } from "../libraries";

export class BcriptService {
  private static readonly BCRIPT_SALT_ROUNDS = env.BCRIPT_SALT_ROUNDS;

  static async generateHashPassword(password: string): Promise<string> {
    const salt = await this.generateSalt();
    const hash = await this.generateHash(password, salt);
    return hash;
  }

  static async compareHash(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    try {
      return await libraries.bcript.compare(password, hashPassword);
    } catch (error) {
      throw new ServerError({ message: (error as Error).message });
    }
  }

  private static async generateSalt(): Promise<string> {
    try {
      return await libraries.bcript.genSalt(this.BCRIPT_SALT_ROUNDS);
    } catch (error) {
      throw new ServerError({ message: (error as Error).message });
    }
  }

  private static async generateHash(
    password: string,
    salt: string
  ): Promise<string> {
    try {
      const hash = await libraries.bcript.hash(password, salt);
      return hash;
    } catch (error) {
      throw new ServerError({ message: (error as Error).message });
    }
  }
}
