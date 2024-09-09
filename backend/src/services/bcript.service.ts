import { env } from "../env";
import { libraries } from "../libraries";

export class BcriptService {
  private static readonly BCRIPT_SALT_ROUNDS = env.BCRIPT_SALT_ROUNDS;

  static async generateHash(password: string): Promise<string> {
    const salt = await this.generateSalt();
    const hash = await libraries.bcript.hash(password, salt);
    return hash;
  }

  static async compareHash(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return await libraries.bcript.compare(password, hashPassword);
  }

  private static async generateSalt(): Promise<string> {
    return await libraries.bcript.genSalt(this.BCRIPT_SALT_ROUNDS);
  }
}
