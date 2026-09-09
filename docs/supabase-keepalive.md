# Supabase keepalive

The GitHub Actions workflow `.github/workflows/supabase-keepalive.yml` runs a read-only `SELECT 1` against Supabase every six hours. It does not depend on Vercel, the portfolio API, or a running laptop. It neither writes portfolio data nor changes the visual UI.

## Activation

1. Add the repository Actions secret `SUPABASE_KEEPALIVE_DATABASE_URL` in `kuchikamizake05/porto`. Use the Supabase PostgreSQL pooler connection string (IPv4-compatible) for this portfolio's existing database. Never commit or paste its value into a workflow or log. A login with only connection permission suffices for this query.
2. Commit the workflow and `scripts/supabase-keepalive/` files, including the lockfile, to the repository's default branch. Publishing a branch alone does not enable the schedule.
3. Open Actions → Supabase keepalive → Run workflow, and confirm the Query Supabase step reports success. Local tests do not prove GitHub-hosted runners can reach the database.
4. Ensure failed Actions run notifications are enabled in your GitHub notification preferences. No separate message-sending integration is included.

The expected times are 01:17, 07:17, 13:17, and 19:17 WIB. GitHub may delay scheduled runs. Each check has connection and query timeouts and retries up to three times; persistent failure makes the workflow fail rather than report success. TLS certificate verification is enabled. Connection URLs and raw database errors are not printed.

The bundled `supabase-ca.crt` is the public Supabase Root 2021 CA from `https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt`, valid through 26 April 2031. Its SHA-256 fingerprint is `80:70:25:AD:50:D4:ED:21:9D:2C:9C:7D:29:9C:00:4F:82:4E:B0:0C:F7:F6:5A:FE:F6:07:D0:7B:72:E6:CA:FA`. It is public certificate material, not a private key. If Supabase rotates the CA or it expires, update it from the project dashboard's Database Settings; do not disable certificate verification.

## Limits

This generates database activity to reduce inactivity pausing; it is not an uptime guarantee. Supabase says a few database requests per day are typically enough, but its free-plan pausing policy remains authoritative. If the project is already paused, resume it from the Supabase dashboard first. Pinging cannot restore a paused project.

GitHub can disable schedules in public repositories after 60 days without repository activity. Check Actions and re-enable the workflow if this happens. This implementation does not create artificial commits to bypass that behavior. A paid Supabase plan is the option that excludes inactivity pausing.

## Local checks

Run `npm ci --ignore-scripts --prefix scripts/supabase-keepalive`, then `npm test --prefix scripts/supabase-keepalive`. For a real check, provide `SUPABASE_KEEPALIVE_DATABASE_URL` securely in the environment and run `npm start --prefix scripts/supabase-keepalive`.

To disable, disable the workflow in GitHub Actions or remove its schedule. Remove the repository secret if no longer needed.

Sources:
- https://supabase.com/docs/guides/platform/free-project-pausing
- https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows

Local preparation does not activate the remote schedule. Verify a successful manual GitHub Actions run after publishing and configuring the secret.

## Verification on 9 September 2026

- Clean dependency installation succeeded; dependency audit reported zero vulnerabilities.
- Four automated tests passed: invalid configuration, verified TLS/read-only query, transient retry/cleanup, and persistent failure without exposing connection details.
- A real local check using the existing portfolio database connection succeeded with TLS certificate verification enabled.
- The GitHub repository is public, its default branch is `main`, and the keepalive secret was not present when inspected. No secret was uploaded and no workflow was published during local preparation.
