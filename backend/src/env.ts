import "dotenv/config";
import { libraries } from "./libraries";

const zod = libraries.zod;

const envSchema = zod.object({
  NODE_ENV: zod.enum(["development", "production"]).default("development"),
  API_BASE_URL: zod.string().url(),
  FRONTEND_URL: zod.string().url(),
  PORT: zod.coerce.number(),
  BCRIPT_SALT_ROUNDS: zod.coerce.number(),
  SECRET_KEY_TOKEN: zod.string(),
  ACCESS_TOKEN_DURATION: zod.string(),
  REFRESH_TOKEN_DURATION: zod.string(),
});

export const env = envSchema.parse(process.env);
