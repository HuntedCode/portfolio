# Portfolio: Project CLAUDE.md

> See `~/.claude/CLAUDE.md` for global standards. This file covers project-specific decisions only.

## Project Overview

Personal portfolio site for Jeffrey Lowe targeting first-job applications in full-stack / backend / Python web development. The site's job is to convert years of solo work (primarily PlatPursuit, with PlatBot and LongWalk supporting) into recruiter-legible signal in under 60 seconds.

See `HANDOFF.md` for full strategic context, the three case studies, and decisions already made.

## Quality Bar

The portfolio itself becomes a judged project. The bar is "this looks like the work of someone I'd hire." If a recruiter would bounce off it, it hurts more than not having one. Design taste, polish, and copy quality all matter equally.

Reference baseline: PlatPursuit's dashboard sets the level of cohesion and polish expected. The portfolio should feel related but not identical (it's Jeffrey, not PlatPursuit).

## Stack (tentative; confirm in first session)

- **Astro** static site generator with **Tailwind CSS**
- Pure HTML + Tailwind is a fallback if Astro adds friction
- Static deployment to Vercel / Netlify / Cloudflare Pages
- No backend, no CMS, no database

## Scope Discipline

- 1-2 weekend project. Anything beyond that is scope creep.
- Single page, not multi-page.
- Three case studies max: PlatPursuit, PlatBot, LongWalk.
- One signature technical story per case study.

## What NOT to Build

- Blog or CMS
- Multi-page site with separate routes per project
- Any backend service
- "Skills" word cloud or skill bar charts
- Visitor analytics beyond Plausible or a simple counter
- Project filters / category tabs (only 3 projects)
- A separate "resume" page (link to a hosted PDF instead)
- Coming-soon teases for unbuilt projects

## Cross-Project References

- **PlatPursuit:** `~/Desktop/PlatPursuit`
- **PlatBot:** `~/Desktop/PlatBot`
- **LongWalk:** `~/Desktop/LongWalk`
- **PlatPursuit design system (reference, do not copy):** `~/Desktop/PlatPursuit/docs/reference/design-system.md`

## AI Tooling Disclosure

Jeffrey uses AI tools (Claude Code) extensively. He wants to acknowledge this honestly on the site without it becoming a liability. The framing should reposition the question from "did AI write your code?" to "I make the architectural decisions, design the systems, and review everything that ships, and I move faster on implementation as a result." See `HANDOFF.md` for the full framing.

The line to watch: anything on the site must be something Jeffrey can speak to in depth in an interview. No knowledge gaps.

## Development and Deploy

| Command | What it does |
|---------|--------------|
| `npm ci` | Install from the lockfile with your local npm (keep it at `packageManager`'s 11.6.2, Node per `.nvmrc`) |
| `npm run dev` | Dev server on `http://localhost:4321/` |
| `npm test` | `astro build`, then `node --test`: the site checks in `tests/site.test.mjs` and the install-script tests |
| `npm run install:pinned` | `npm ci` with the exact npm in `package.json` `packageManager` (used by CI and Cloudflare) |
| `npm run build:cloudflare` | The Cloudflare Pages build command: pinned install, then build |

**Test harness:** Node's built-in runner, no test dependencies. `tests/site.test.mjs` runs against the built `dist/`, so `npm test` always builds first. CI (`.github/workflows/test.yml`) runs it on every PR and push to main.

**Dependabot** (`.github/dependabot.yml`): security PRs as soon as an advisory is published (on in the repository settings), plus one grouped npm PR and one grouped GitHub Actions PR with every minor and patch update on the 1st of each month. Each major update opens its own PR. A green CI run means the site still builds and passes its checks with the npm Cloudflare installs with; Cloudflare's preview build is the second opinion. A reminder issue for the monthly review opens on the 2nd.

**Cloudflare Pages settings** (dashboard, not the repo): environment variable `SKIP_DEPENDENCY_INSTALL=1`, build command `npm run build:cloudflare`, output directory `dist`. Node comes from `.nvmrc`, pinned to the exact `22.16.0` Cloudflare's build image ships so CI tests on the same Node (a bare `22` gives CI the newest 22.x instead).

### Gotchas and Pitfalls

- **Cloudflare cannot pin npm.** Its build image uses the npm bundled with its Node (10.9.2 on Node 22) and ignores `engines` and `packageManager`. A lockfile written by npm 11 can then fail its `npm ci` ("Missing: @emnapi/... from lock file"). That is why Cloudflare skips its own install and runs `install:pinned`, which installs with `packageManager`'s npm. Bump `packageManager` and your local npm together. If a Dependabot PR fails CI at `install:pinned`, its lockfile was likely written by a different npm: check out the branch, rewrite the lockfile with the pinned npm (`npx -y npm@<packageManager version> install --package-lock-only`) and push it to the PR. Dependabot stops rebasing a PR once someone else pushes to it, and `@dependabot recreate` would throw the fix away, so merge it soon or redo the fix after a recreate.
- **Change the Cloudflare settings only once `main` has `build:cloudflare`.** The settings apply to every branch: before that merge they break the production deploy, and after it they still fail preview builds (and "retry deployment") for any branch or commit older than it, with "Missing script: build:cloudflare". Rebase or merge `main` into such a branch.
- **Contact links live in one place: `src/data/links.ts`** (email, GitHub, both resumes), read by `Hero.astro` and `Contact.astro`. Change them there, not in a component. `tests/site.test.mjs` fails if the two sections stop offering the same links or a resume file is renamed without its link. The case studies keep their own project links.

## Git Commit Scopes

Scopes for this project: `content`, `layout`, `style`, `assets`, `deploy`, `test`, `chore`
