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
npm install
npm run dev
```

Then visit `http://localhost:4321/`.

## Build

```
npm run build
```

Output is written to `dist/`.
