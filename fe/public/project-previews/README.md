# Project screenshots

Captured from the public landing pages on 2026-09-09:

- corps-agent.png: https://corps-agent-site.vercel.app/
- sangu.png: https://sangu-xi.vercel.app/
- fintrack.png: https://fintrack-olive-mu.vercel.app/
- passchick.png: https://passchick.xyz/
- ai-summarizer.png: https://ai-summarizer-gamma-roan.vercel.app/

These assets are served at /project-previews/<filename>. The shared helper in app/lib/project-preview.ts uses them when the project's imageUrl is empty. An image URL configured in admin takes priority. Both Featured Work and Projects use the same helper. No database updates are required.

To replace a default screenshot, replace its file. To set it explicitly through the admin URL field, use https://<portfolio-domain>/project-previews/<filename>; that domain must also be allowed in next.config.ts for Next Image. The automatic local fallback does not require remotePatterns changes.

The IABEE dashboard has no demo URL configured, so no screenshot was captured for it.
