# Portfolio

My personal portfolio site, built for first-job applications in full-stack and Python developer roles.

**Live:** [jeffreylowe.dev](https://jeffreylowe.dev)

## What's inside

A single-page portfolio with:

- **Hero** with role, status, and direct CTAs (resumes, email, GitHub)
- **Case studies**:
  - **PlatPursuit**: production Django web app for PlayStation trophy tracking. Signature story: designing **TokenKeeper**, a custom worker pool for Sony's PSN API.
  - **PlatBot**: multi-framework Python Discord bot (discord.py + FastAPI in one asyncio event loop). Signature story: embedding FastAPI inside discord.py's event loop.
- **Engineering Principles**: my three-phase quality workflow, documentation discipline, AI tooling philosophy, and scope discipline.
- **Contact** with resume PDFs and direct email.

## Stack

Astro 5, Tailwind CSS v4, Geist and Geist Mono fonts. Static deploy to Cloudflare Pages.

## Local development

```
npm ci
npm run dev
```

Then visit `http://localhost:4321/`. Use the Node in `.nvmrc` and the npm in `package.json`'s `packageManager` (`npm run install:pinned` installs with exactly that npm).

## Build

```
npm run build
```

Output is written to `dist/`.

## Test

```
npm test
```

Builds the site, then checks the output: every local link and asset resolves, both resumes are linked, the link-preview image exists, and the copy has no em dashes. The same check runs on every pull request.
