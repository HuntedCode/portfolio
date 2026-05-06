# Portfolio Site: Handoff Doc

> Authored 2026-05-06 from a context working in `~/Desktop/PlatPursuit`. The next Claude session in this directory should read this in full before starting any work.

## The Goal

Build a personal portfolio site that supports Jeffrey's first-job applications in full-stack / backend / Python web development. He has years of solo work but no industry experience. The portfolio's job is to convert that solo work into recruiter-legible signal in under 60 seconds.

## The Audience

Two recruiter profiles, both served by the same site:

1. **Full-stack / backend web dev recruiters** care about Django, frontend chops, API integrations, system design.
2. **Python dev recruiters** care about ORM mastery, async / background workers, multi-framework experience, data pipelines.

The portfolio doesn't have to pick one. The same case studies serve both with the right framing.

## Strategic Decisions Already Made

| Decision | Rationale |
|---|---|
| **Single page, not multi-page** | Recruiters skim. Make it scannable in one scroll. |
| **Three case studies max** | More dilutes attention. We have three projects worth showing. |
| **Static stack (Astro or HTML+Tailwind)** | Free hosting, fast, no maintenance. Astro for component reuse without React overhead. |
| **Deploy to Vercel / Netlify / Cloudflare Pages** | Static hosting + CDN, free tier covers a portfolio. |
| **No backend, no CMS, no blog** | YAGNI. The portfolio is not the product. |
| **Time box: 1-2 weekends** | If it stretches, scope creep. |

## The Three Case Studies

### 1. PlatPursuit (flagship)

**What it is:** Production Django web app for PlayStation trophy tracking. ~30 models, 49+ documented systems, customizable 41-module dashboard, IGDB integration, payment flows.

**Signature technical story:** The May 2026 production OOM. A 30 KB JSON column on `IGDBMatch.raw_response` was being eagerly joined across cover-art renders. Diagnosed via memory profiling, fixed with targeted `select_related().defer()` patterns. Strong story because it shows production debugging instinct.

**Secondary stories worth surfacing:**
- 6-strategy IGDB matching pipeline with retry-on-401, no-match persistence, platform overlap as a hard requirement
- `Concept.absorb()` data-migration method (15+ related models merged safely during sync reassignments)
- Three-layout mobile-first responsive system (375 / 768 / 1024 px) with documented design system
- Custom TokenKeeper worker chosen over Celery for operational simplicity
- Redis-backed deferred notifications with consolidation
- 49 system docs with mandatory "Gotchas and Pitfalls" sections

**What to show on site:** Dashboard screenshots, design-system doc page, possibly a small architecture diagram of the IGDB pipeline.

### 2. PlatBot (ecosystem / multi-framework Python)

**What it is:** Companion Discord bot for PlatPursuit. Python service using `discord.py` (asyncio) and `FastAPI`, consumes the PlatPursuit API.

**Signature angle:** Multi-framework Python (Django + FastAPI + discord.py), async patterns, API-first contract thinking between two services in a shared product ecosystem.

**What to show on site:** Bot screenshot in Discord, small architecture diagram showing PlatBot ↔ PlatPursuit API.

### 3. LongWalk (cross-platform breadth)

**What it is:** React Native step-counting RPG mobile app. MVP stage.

**Signature angle:** Cross-platform breadth, plus design carryover (gamification systems first explored in PlatPursuit). Shows Jeffrey can ship outside Django.

**Honesty caveat:** MVP stage, not shipped. Frame as "in progress," not "shipped." Don't hide the status; also don't over-rotate the framing toward "this is unfinished."

**What to show on site:** Mobile screenshots, a one-line "design carries from PlatPursuit" caption.

## Technical Stories Pool (interview gold; surface across the page)

These should appear *somewhere* on the site (case studies, an "engineering principles" section, or a "things I've debugged" section):

- **OOM debugging story** (PlatPursuit): strongest single anecdote
- **6-strategy IGDB matching pipeline** with platform overlap as a hard requirement
- **Three-layout mobile-first responsive system** with documented design system
- **`Concept.absorb()` data-migration pattern**
- **Custom TokenKeeper worker over Celery**: small thing, but shows operational judgment
- **`Subquery(OuterRef())` workarounds** for Django ORM `.update()` SET-clause limits
- **Redis-backed deferred notifications with consolidation**
- **49 system docs with mandatory "Gotchas and Pitfalls" sections**: process maturity
- **Three-phase quality workflow** (plan with reuse-check → implement with inline audits → final polish)

## Resume Alignment

The portfolio backs up two parallel resume framings (resumes are being drafted by an external helper from these areas):

**Resume 1: Full-Stack / Backend:**
1. Full-stack web application development
2. Database design & query optimization
3. Responsive frontend engineering
4. Third-party API integration
5. System architecture & background processing
6. Technical documentation & engineering process

**Resume 2: Python Dev:**
1. Python web development (Django)
2. Data modeling & ORM mastery
3. Background processing & async patterns
4. Third-party API integration & data pipelines
5. Multi-framework Python experience
6. Engineering process & documentation

The portfolio should make the top 3-4 of each list visibly evident through case study copy. Reasoning: a recruiter clicking through from either resume version should see immediate corroborating evidence.

## Honesty / Anti-Overclaiming

- All work is solo, not team-led. Use "built / designed / shipped." Avoid "led a team / mentored."
- PlatPursuit is in active use but is a personal product, not enterprise scale. Don't imply enterprise traffic numbers.
- LongWalk is MVP only. Frame as breadth, not depth.
- The OOM story is real and from Jeffrey's own monitoring. Don't imply "I've handled X production incidents in a team setting."
- AI assistance should be acknowledged honestly somewhere on the site (see below).

## AI Tooling Disclosure

Jeffrey uses AI tools (Claude Code) extensively in his workflow. He wants to be transparent about this without it becoming a liability. Recommended framing for any "about my workflow" copy on the site:

> "I use AI tools as part of my development workflow. I make the architectural decisions, design the systems, and review everything that ships. AI helps me move faster on implementation, which means I can deliver more value in less time."

Reframes the conversation from "did AI write your code?" to "I ship faster than competitors who don't use modern tools."

The line to watch: don't let AI assistance create knowledge gaps. Anything on the site should be something Jeffrey can speak to in depth in an interview.

## What NOT to Build

- Blog or CMS
- Multi-page site with separate routes per project
- Any backend service
- "Skills" word cloud / skill bar charts (cliché, signals junior)
- Visitor analytics beyond Plausible or a simple counter
- Project filters / category tabs (only 3 projects)
- Separate "resume" page (link to a hosted PDF instead)
- Coming-soon teases for unbuilt projects

## Open Questions for the First Working Session

1. **Domain name?** Does Jeffrey have one (e.g. jeffreylowe.dev)? Affects header / branding.
2. **Personal photo / avatar?** Or icon-only?
3. **Color palette?** PlatPursuit's purple/gold? Or something different to feel "this is Jeffrey, not PlatPursuit"?
4. **Resume PDF?** Link to a hosted PDF, or just an email contact?
5. **Astro or pure HTML + Tailwind?** Lean Astro for component reuse, but Jeffrey may want it dead simple.
6. **GitHub link?** Public profile URL? Are PlatPursuit / PlatBot repos public, private, or selectively public?
7. **Contact mechanism?** Email, LinkedIn, Calendly?

## Suggested First Session Plan

1. Answer the open questions above.
2. Pick the stack (Astro vs. static HTML).
3. Sketch the page structure (sections, copy headers, image slots).
4. Decide on the color palette / typography baseline.
5. Set up the project (init, install deps, configure Tailwind).
6. Build the hero section as a styled vertical slice (de-risks the visual direction before investing in case studies).
7. Then build out case studies one at a time.

## Cross-References

- **Source projects:** `~/Desktop/PlatPursuit`, `~/Desktop/PlatBot`, `~/Desktop/LongWalk`
- **PlatPursuit design system (reference, do not copy):** `~/Desktop/PlatPursuit/docs/reference/design-system.md`
- **Global CLAUDE.md:** `~/.claude/CLAUDE.md` (ecosystem table, collaboration philosophy, quality workflow)
- **Project CLAUDE.md:** `./CLAUDE.md`

## Resume Bullets

Resume bullets for both framings (Full-Stack/Backend and Python Dev) were drafted in the originating PlatPursuit conversation on 2026-05-06. They're not duplicated here to avoid drift. If the resume helper revises them, those revisions are the source of truth, and the portfolio copy should align with them.
