import { keepAlive } from "./keepalive.mjs";

try {
  await keepAlive(process.env.SUPABASE_KEEPALIVE_DATABASE_URL);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
