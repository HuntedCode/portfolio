// The install script's version parsing (scripts/pinned-npm.mjs). The install itself is exercised
// by CI and every Cloudflare build.
import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

import { pinnedNpmSpec } from "../scripts/pinned-npm.mjs";

test("the repo's own package.json pins an exact npm", () => {
  const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
  assert.match(pinnedNpmSpec(pkg), /^npm@\d+\.\d+\.\d+$/);
});

test("an exact npm version is returned as an npx spec", () => {
  assert.equal(pinnedNpmSpec({ packageManager: "npm@11.6.2" }), "npm@11.6.2");
});

for (const packageManager of [undefined, "", "npm@11", "npm@^11.6.2", "pnpm@9.0.0", "npm@11.6.2+sha512.abc"]) {
  test(`a missing or inexact packageManager is refused: ${JSON.stringify(packageManager)}`, () => {
    assert.throws(() => pinnedNpmSpec({ packageManager }), /exact npm version/);
  });
}
