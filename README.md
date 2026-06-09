# PingHumans

### AI builds. Humans verify. You ship.

Your coding agent ships features in minutes — but every output still lands on your desk to check. **PingHumans** hands that verification off to real humans, right inside your agent's workflow. You stay out of the loop until it actually matters.

---

## The problem

Coding agents are fast. They read your layout, write the component, run the build, and report back "done" — all before you've finished your coffee.

But "done" isn't shippable. Spacing is off. Copy reads wrong. The edge case wasn't handled. So you stop what you're doing, open the diff, eyeball the result, and write up feedback. Every. Single. Time.

You've become your agent's QA team. The bottleneck isn't the AI anymore — it's you.

## How it works

PingHumans adds a `/ping-humans` command to your agent's workflow. When the agent finishes a task, instead of waiting on you, it pings a real human to verify the work and send back structured feedback. The agent acts on it and keeps moving.

A typical loop:

```
> Create a TopNav for our website

  ⏺ Read    app/layout.tsx
  ⏺ Edit    components/TopNav.tsx
  ⏺ Bash    npm run build  →  ✓ Compiled successfully

  The TopNav is live — logo, links, and CTA wired up.

> /ping-humans take a look at the nav spacing

  ⏳ Receiving feedback from a human…

  1. The spacing between links is too cramped
  2. Logo needs more breathing room from the edges
  3. CTA button feels too close to the last link
  4. Overall nav height could use more vertical padding

  You're right — gaps are too tight. Fixing spacing.

  ⏺ Edit    components/TopNav.tsx

  Fixed — proper spacing with gap-8 and px-4 padding.

  ✓ Logo visible with proper spacing from edges
  ✓ Nav links evenly spaced
  ✓ CTA button aligned right with correct padding
  ✓ Nav fixed to top and doesn't overlap content
```

The human verifies, the agent fixes, and the work ships — without you sitting in the middle of every iteration.

## Why it matters

- **You stop being the bottleneck.** Hand off verification instead of doing it yourself.
- **Real eyes, not vibes.** Humans catch the spacing, the tone, the "this feels off" that automated checks miss.
- **Your workflow keeps moving.** The agent gets feedback and acts on it without waiting for you to context-switch.

## This repo

This is an interactive demo of the PingHumans flow — a terminal simulator built with Next.js that walks through a coding agent receiving and acting on human feedback in real time.

**Tech stack**

- [Next.js 16](https://nextjs.org) (App Router)
- [React 19](https://react.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript

**Project layout**

```
app/                       Next.js app router (layout, page, styles)
components/
  TopNav.tsx               The nav built in the demo
  CursorSwarm.tsx          Background cursor animation
  terminal/                Terminal simulator
    script.ts              The scripted demo flow
    useTerminalSimulation.ts
    Terminal*.tsx          Header, body, prompt, status bar
    *Line.tsx              Message / feedback line renderers
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to watch the demo.

**Other commands**

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # run eslint
```
