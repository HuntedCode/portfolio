// Checks on the BUILT site (dist/), run by `npm test` right after `astro build`.
//
// The site is a single static page whose job is to get a recruiter to a resume in seconds, so
// the failures worth catching are the quiet ones: a renamed PDF or screenshot that 404s, a link
// preview that loses its image, and copy that breaks the no-em-dash writing rule.
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

import config from "../astro.config.mjs";

const DIST = new URL("../dist/", import.meta.url);
const INDEX = new URL("index.html", DIST);
// Built from a code point so no editor or tool can turn it into the literal character.
const EM_DASH = String.fromCharCode(0x2014);
/** Characters of context shown either side of an em dash in a failure. */
const EXCERPT_CHARS = 30;

if (!existsSync(INDEX)) {
  throw new Error("dist/index.html is missing: run `npm test`, which builds the site first.");
}
const html = readFileSync(INDEX, "utf8");

/** Every file under dist/, as site paths like "/resume-python.pdf". */
function builtPaths(dir = DIST, prefix = "/") {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? builtPaths(new URL(`${entry.name}/`, dir), `${prefix}${entry.name}/`)
      : [`${prefix}${entry.name}`],
  );
}

/** Root-relative paths an HTML or CSS file points at (href, src, content, url()), decoded. */
function localReferences(text) {
  const refs = [
    ...text.matchAll(/(?:href|src|content)="(\/[^"/][^"]*|\/)"/g),
    ...text.matchAll(/url\(\s*["']?(\/[^"')/][^"')]*)["']?\s*\)/g),
  ].map((match) => decodeURIComponent(match[1].split(/[?#]/)[0]));
  return [...new Set(refs)];
}

/** The page minus scripts and styles: its text AND attributes (alt, title, meta descriptions). */
function copyOf(page) {
  return page
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, " ")
    .replace(/&mdash;|&#8212;|&#x2014;/gi, EM_DASH);
}

function metaContent(page, attr, name) {
  const match = page.match(new RegExp(`<meta[^>]*${attr}="${name}"[^>]*content="([^"]*)"`));
  return match?.[1];
}

test("every local link and asset the page or its CSS points at exists", () => {
  const built = new Set(builtPaths());
  const cssFiles = [...built].filter((path) => path.endsWith(".css"));
  const css = cssFiles.map((path) => readFileSync(new URL(`.${path}`, DIST), "utf8"));
  // Guards against a pattern that silently matches nothing: both kinds of reference exist today.
  assert.ok(localReferences(html).includes("/profile.jpg"), "no references found in the page");
  assert.ok(css.flatMap(localReferences).length > 0, "no url() references found in the CSS");

  const missing = [html, ...css].flatMap(localReferences).filter((path) => path !== "/" && !built.has(path));
  assert.deepEqual([...new Set(missing)], []);
});

test("both resumes are linked", () => {
  // That they exist is the broken-link test's job; this one catches a link that was dropped.
  for (const pdf of ["/resume-fullstack.pdf", "/resume-python.pdf"]) {
    assert.ok(html.includes(`href="${pdf}"`), `${pdf} is not linked`);
  }
});

test("link previews carry an absolute image URL that exists", () => {
  for (const [attr, name] of [["property", "og:image"], ["name", "twitter:image"]]) {
    const url = metaContent(html, attr, name);
    assert.ok(url, `${name} is missing`);
    assert.ok(url.startsWith(`${config.site}/`), `${name} is not absolute on ${config.site}: ${url}`);
    assert.ok(existsSync(new URL(`.${new URL(url).pathname}`, DIST)), `${name} points at a missing file: ${url}`);
  }
});

test("the copy uses no em dashes, in text or attributes", () => {
  const around = new RegExp(`.{0,${EXCERPT_CHARS}}${EM_DASH}.{0,${EXCERPT_CHARS}}`, "g");
  const hits = [...copyOf(html).matchAll(around)].map((m) => m[0].trim());
  assert.deepEqual(hits, []);
});
