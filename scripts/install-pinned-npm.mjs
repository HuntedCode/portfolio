// Install dependencies with the exact npm named in package.json's "packageManager".
//
// Cloudflare Pages builds with the npm bundled with its Node (10.9.2 on Node 22) and cannot pin
// npm separately, while local development uses npm 11. The two disagree about lockfiles: a
// lockfile npm 11 writes can be rejected by npm 10's `npm ci`, which fails the deploy. Running
// this instead of the platform's own install (Cloudflare: SKIP_DEPENDENCY_INSTALL=1) makes every
// install, local, CI and Cloudflare, use one npm. Runs before node_modules exists, so it uses
// nothing outside Node itself.
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";

import { pinnedNpmSpec } from "./pinned-npm.mjs";

/** A healthy install takes under a minute; past this the registry has stalled. */
const INSTALL_TIMEOUT_MS = 10 * 60 * 1000;

const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const spec = pinnedNpmSpec(pkg);
console.log(`Installing dependencies with ${spec} (from package.json "packageManager")`);

// shell on Windows only: npx is npx.cmd there, which spawnSync cannot start directly.
const result = spawnSync("npx", ["--yes", spec, "ci"], {
  stdio: "inherit",
  shell: process.platform === "win32",
  timeout: INSTALL_TIMEOUT_MS,
});

if (result.error) {
  console.error(`Could not run npx ${spec} ci: ${result.error.message}`);
} else if (result.signal) {
  console.error(`npx ${spec} ci was stopped by ${result.signal}`);
}
process.exit(result.status ?? 1);
