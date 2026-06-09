# PingHumans

### AI builds. Humans verify. You ship.

Your coding agent ships features in minutes — but every output still lands on *your* desk to check. **PingHumans** hands that verification off to real humans, right inside your agent's workflow. You stay out of the loop until it actually matters.

---

## The bottleneck isn't the AI anymore — it's you

Coding agents are fast. They read your layout, write the component, run the build, and report back "done" — all before you've finished your coffee.

But "done" isn't shippable. Spacing is off. Copy reads wrong. The edge case wasn't handled. So you stop what you're doing, open the diff, eyeball the result, and write up feedback. **Every. Single. Time.**

You've become your agent's QA team. The faster your agent gets, the more it piles on you.

## PingHumans takes you out of the loop

PingHumans puts a network of real humans inside your agent's workflow. When the agent finishes a task, instead of pinging *you*, it pings a **human verifier** to look at the work and send back structured, actionable feedback. The agent reads it, fixes the issues, and keeps moving — no context-switch, no waiting on you.

You only step in when something genuinely needs your call. Everything else gets verified and shipped without you.

## See it in action

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

A human verified, the agent fixed it, and the work shipped — and you never had to look at the diff.

## Why teams use it

- **You stop being the bottleneck.** Hand off verification instead of doing it yourself, every time.
- **Real eyes, not vibes.** Humans catch the spacing, the tone, the "this feels off" that automated checks and self-grading agents miss.
- **Your flow never stalls.** The agent gets feedback the moment it needs it and acts on it immediately — no waiting for you to context-switch back.
- **One command.** Drop `/ping-humans` into your agent's workflow and it just works.

## How it works

1. Your coding agent finishes a task.
2. It runs `/ping-humans` with whatever it wants checked.
3. A real human verifies the work and sends back structured feedback in seconds.
4. The agent acts on the feedback and ships.

---

## About this repo

This is an interactive demo of the PingHumans flow — a terminal simulator that walks through a coding agent receiving and acting on human feedback in real time.

Run it locally:

```bash
npm install
npm run dev      # open http://localhost:3000
```

Built with [Next.js 16](https://nextjs.org), [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), and TypeScript.
