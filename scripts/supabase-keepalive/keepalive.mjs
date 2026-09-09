import { setTimeout } from "node:timers/promises";
import { fileURLToPath } from "node:url";
import pg from "pg";

export async function keepAlive(connectionString, {
  createClient = (config) => new pg.Client(config),
  sleep = setTimeout,
  log = console.log,
} = {}) {
  let url;
  try {
    url = new URL(connectionString);
    if (!["postgres:", "postgresql:"].includes(url.protocol) || !url.hostname || !url.username || !url.password) {
      throw new Error();
    }
  } catch {
    throw new Error("Set SUPABASE_KEEPALIVE_DATABASE_URL to a valid PostgreSQL connection string.");
  }

  // This is a PostgreSQL driver, not Prisma. Always verify the server certificate.
  url.searchParams.delete("pgbouncer");
  url.searchParams.set("sslmode", "verify-full");
  url.searchParams.set("sslrootcert", fileURLToPath(new URL("./supabase-ca.crt", import.meta.url)));

  for (let attempt = 1; attempt <= 3; attempt++) {
    const client = createClient({
      connectionString: url.toString(),
      connectionTimeoutMillis: 15_000,
      query_timeout: 15_000,
      statement_timeout: 10_000,
      application_name: "porto-supabase-keepalive",
    });
    try {
      await client.connect();
      const result = await client.query("SELECT 1 AS keepalive");
      if (result.rows[0]?.keepalive !== 1) throw new Error("Unexpected response");
      log("Supabase database check succeeded.");
      return;
    } catch {
      // Raw database errors can include private connection details.
      log(`Database check attempt ${attempt}/3 failed.`);
    } finally {
      await client.end().catch(() => {});
    }
    if (attempt < 3) await sleep(attempt * 5_000);
  }
  throw new Error("Database check failed after 3 attempts. Check Supabase project status, network access, and the repository secret.");
}
