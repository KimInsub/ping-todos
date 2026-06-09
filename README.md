# PingHumans — Real Human Verification For Your Coding Agent

### AI builds. Humans verify. You ship.

[![Website](https://img.shields.io/badge/website-pinghumans.com-black)](https://pinghumans.com)
[![npm version](https://img.shields.io/badge/npm-pinghumans-cb3837)](https://www.npmjs.com/package/pinghumans)
[![MIT licensed](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)

Your coding agent ships features in minutes — but every output still lands on *your* desk to check. PingHumans hands that verification off to a network of real humans, right inside your agent's workflow. The agent gets structured feedback in seconds, fixes the issues, and keeps moving — so you stay out of the loop until it actually matters.

```
Build the TopNav and have a human check the spacing before you call it done. use pinghumans
```

```
The onboarding copy is written — get a human to verify the tone reads friendly, not corporate. use pinghumans
```

PingHumans drops real human review directly into your LLM's loop. No babysitting the agent, no rubber-stamped self-grades, no "looks done" that isn't shippable.

---

## ❌ Without PingHumans

Coding agents are fast. They read your layout, write the component, run the build, and report "done" — all before you've finished your coffee. But "done" isn't shippable:

- ❌ You become your agent's QA team — every output lands on *your* desk to check
- ❌ Self-grading agents rubber-stamp their own work
- ❌ Automated checks miss the spacing, the tone, the "this feels off"
- ❌ You context-switch to review the diff. **Every. Single. Time.**

The faster your agent gets, the more it piles on you.

## ✅ With PingHumans

PingHumans puts a network of real humans inside your agent's workflow. When the agent finishes a task, instead of pinging *you*, it pings a **human verifier** — and feeds the result straight back into context:

- ✅ Real humans verify the work inside your agent's loop
- ✅ Structured, actionable feedback in seconds
- ✅ The agent reads it, fixes the issues, and ships — you stay out of the loop

You only step in when something genuinely needs your call. Everything else gets verified and shipped without you.

## See it in action

Ask your agent to do the work, then hand verification to a human in the same flow:

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

PingHumans works in two modes:

- **Skill** — installs a `/ping-humans` slash command that guides your agent to request verification (no MCP required)
- **MCP** — registers a PingHumans MCP server so your agent can call verification tools natively

## Installation

> **API key recommended:** Get a free key at [pinghumans.com/dashboard](https://pinghumans.com/dashboard) for higher rate limits and access to specialized reviewer pools.

Set up PingHumans for your coding agent with a single command. The CLI requires Node.js 18 or newer.

```bash
npx pinghumans setup
```

Authenticates via OAuth, generates an API key, and installs the appropriate skill. You can choose between Skill or MCP mode. Use `--cursor`, `--claude`, or `--opencode` to target a specific agent.

To remove the generated setup later, run `npx pinghumans remove`.

To configure manually, point your MCP client at `https://mcp.pinghumans.com/mcp` and pass your API key via the `PINGHUMANS_API_KEY` header. See [Manual Installation →](https://pinghumans.com/docs/install) for client-specific setup.

## Important Tips

### Be specific about what to verify

The more precise the ask, the sharper the feedback. Tell the verifier exactly what "good" looks like.

```
✅ Verify the nav spacing — links should breathe, CTA aligned right. use pinghumans
❌ Check the nav. use pinghumans
```

### Pick a reviewer pool

Route the request to the right eyes by naming a pool. Designers catch visual issues; copy reviewers catch tone.

```
Get the landing hero reviewed by the design pool. use pool design.
Have the error messages checked by the copy pool. use pool copy.
```

### Add a rule

If you installed via `pinghumans setup`, a skill is configured automatically that triggers verification for review-worthy work. To set one up manually instead, add a rule to your coding agent (Cursor: *Settings > Rules*; Claude Code: `CLAUDE.md`):

```
Always use PingHumans to get a human to verify UI, copy, and design work
before reporting a task as done, without me having to explicitly ask.
```

## Available Tools

### CLI Commands

- `pinghumans ping <what>` — request human verification of the current work and stream back structured feedback.
- `pinghumans status` — check the status of in-flight verification requests.
- `pinghumans pools` — list the reviewer pools available to your account.

### MCP Tools

- **request-verification** — submit work for a human to review.
  - `task` (required): what the agent just did / what to check
  - `pool` (optional): reviewer pool to route to (e.g. `design`, `copy`)
- **get-feedback** — retrieve structured feedback for a verification request.
  - `requestId` (required): the id returned by `request-verification`

## More Documentation

- [CLI Reference](https://pinghumans.com/docs/cli) — full CLI documentation
- [MCP Clients](https://pinghumans.com/docs/mcp) — manual MCP installation for 30+ clients
- [Reviewer Pools](https://pinghumans.com/docs/pools) — route work to the right humans
- [API Reference](https://pinghumans.com/docs/api) — REST API documentation

## Packages

- `pinghumans` — the CLI
- `@pinghumans/mcp` — MCP server
- `@pinghumans/sdk` — TypeScript SDK

---

## About this repo

This repo is an **interactive demo** of the PingHumans flow — a terminal simulator that walks through a coding agent receiving and acting on human feedback in real time.

Run it locally:

```bash
npm install
npm run dev      # open http://localhost:3000
```

Built with [Next.js 16](https://nextjs.org), [React 19](https://react.dev), [Tailwind CSS 4](https://tailwindcss.com), and TypeScript.

## Disclaimer

PingHumans routes work to a community of human verifiers. While we strive for high-quality, actionable feedback, reviews reflect individual judgment and we can't guarantee any specific outcome. Always apply your own discretion before shipping. By using PingHumans, you acknowledge that you do so at your own risk.

## Connect with us

- 📢 Follow us on [X](https://x.com/pinghumans) for the latest updates
- 🌐 Visit our [Website](https://pinghumans.com)
- 💬 Join our [Discord community](https://pinghumans.com/discord)
