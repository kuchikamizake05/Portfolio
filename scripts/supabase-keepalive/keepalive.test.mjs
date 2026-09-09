import assert from "node:assert/strict";
import test from "node:test";
import { keepAlive } from "./keepalive.mjs";

const url = "postgresql://test:private-password@example.com:6543/postgres?pgbouncer=true";

test("rejects missing and invalid configuration before connecting without exposing it", async () => {
  for (const value of [undefined, "bad-private-value", "https://user:password@example.com", "postgresql://example.com/db"]) {
    await assert.rejects(keepAlive(value, {
      createClient: () => assert.fail("must not connect"),
    }), { message: "Set SUPABASE_KEEPALIVE_DATABASE_URL to a valid PostgreSQL connection string." });
  }
});

test("reads the database using verified TLS and releases the connection", async () => {
  let closed = 0;
  await keepAlive(url, {
    createClient: (config) => {
      const parsed = new URL(config.connectionString);
      assert.equal(parsed.searchParams.get("sslmode"), "verify-full");
      assert.ok(parsed.searchParams.get("sslrootcert").endsWith("supabase-ca.crt"));
      assert.equal(parsed.searchParams.has("pgbouncer"), false);
      return {
        connect: async () => {},
        query: async (sql) => {
          assert.equal(sql, "SELECT 1 AS keepalive");
          return { rows: [{ keepalive: 1 }] };
        },
        end: async () => { closed++; },
      };
    },
    log: () => {},
  });
  assert.equal(closed, 1);
});

test("retries a transient failure with a fresh connection", async () => {
  let attempts = 0;
  let closed = 0;
  const delays = [];
  await keepAlive(url, {
    createClient: () => {
      const attempt = ++attempts;
      return {
        connect: async () => { if (attempt === 1) throw new Error("temporary"); },
        query: async () => ({ rows: [{ keepalive: 1 }] }),
        end: async () => { closed++; },
      };
    },
    sleep: async (ms) => { delays.push(ms); },
    log: () => {},
  });
  assert.equal(attempts, 2);
  assert.equal(closed, 2);
  assert.deepEqual(delays, [5000]);
});

test("fails after three attempts and never logs driver secrets", async () => {
  let closed = 0;
  const logs = [];
  await assert.rejects(keepAlive(url, {
    createClient: () => ({
      connect: async () => {},
      query: async () => { throw new Error(`cannot connect: ${url}`); },
      end: async () => { closed++; },
    }),
    sleep: async () => {},
    log: (message) => logs.push(message),
  }), /failed after 3 attempts/);
  assert.equal(closed, 3);
  assert.equal(logs.length, 3);
  assert.equal(logs.join(" ").includes("private-password"), false);
});
