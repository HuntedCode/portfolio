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

## Git Commit Scopes

Scopes for this project: `content`, `layout`, `style`, `assets`, `deploy`, `chore`
