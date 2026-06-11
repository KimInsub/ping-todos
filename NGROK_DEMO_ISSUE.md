# Landing-page demo "doesn't work over ngrok" — root cause & fix

## TL;DR
The terminal demo (and every other interactive element) does nothing when the
site is opened through the **ngrok-free URL**, but works fine on
`localhost:3000`. The cause is **tunneling a Next.js _dev_ server over ngrok**,
not anything in our code. React never hydrates on the ngrok origin, so no click
or keypress handler is ever attached. Fix: tunnel a **production build**
(`next build && next start`) instead of the dev server.

## Symptom
- Open the ngrok URL → page renders (hero, install command, terminal box all
  visible).
- Click the terminal box or press Enter → nothing happens. The
  "Click or press Enter" hint never disappears; the typing animation never
  starts.
- Same build on `http://localhost:3000` → clicking/Enter starts the animation
  normally.

## How we isolated it
Loaded both URLs in a headless browser and checked whether React had hydrated by
looking for a React fiber on the terminal DOM node
(`__reactFiber$…` / `__reactProps$…` key):

| Environment        | React fiber on DOM node | Click starts animation |
|--------------------|-------------------------|------------------------|
| `localhost:3000`   | present (`__reactFiber$…`) | yes — hint disappears, demo runs |
| ngrok-free URL     | **NONE**                | no — page is inert |

`fiberKey: NONE` means React did **not** hydrate the server-rendered HTML on the
ngrok origin. Hydration is what attaches event handlers, so with no fiber the
`onClick={advance}` and the document `keydown` listener in
`components/terminal/Terminal.tsx` never run. This is page-wide, not
demo-specific — the "Copy" button on the install command is dead too.

## Why hydration fails over the tunnel (two compounding problems)

1. **Dev server + cross-origin tunnel.**
   We were running `next dev` and pointing ngrok at it. The browser's origin is
   the `*.ngrok-free.app` host, which is different from the dev server's own
   origin. Next.js 16 dev mode treats that as a cross-origin requester for its
   internal `/_next/*` and React Server Component (RSC) payloads. The client
   bundle / RSC handshake that drives hydration doesn't complete, so the page
   stays as static SSR HTML.
   - Related console noise confirming dev-mode-over-tunnel trouble: the HMR
     websocket repeatedly fails with
     `WebSocket connection to 'wss://…ngrok-free.app/_next/webpack-hmr…' failed:
     … Unexpected response code: 503`.
   - Next.js has a config for exactly this — `allowedDevOrigins` in
     `next.config` — but it only patches dev mode; it does not make a dev build
     the right thing to expose to a tester.

2. **ngrok-free interstitial page.**
   ngrok's free tier serves a warning page ("You are about to visit… **Visit
   Site**") *before* the app on first visit. So the very first click lands on
   ngrok's page, not ours. A tester has to click "Visit Site" once to even reach
   the app. (Removed only by a paid ngrok plan, a non-default User-Agent, or the
   `ngrok-skip-browser-warning` request header — none of which a normal human
   browser sends.)

Net tester experience: warning page → click through → a page where clicking the
demo does nothing → reports "the animation is broken."

## The fix
Tunnel a **production build**, not `next dev`:

```bash
next build
next start -p 3001          # production server hydrates cleanly:
                            # no HMR websocket, no dev cross-origin check
# then point ngrok at 3001
ngrok http 3001
```

Production hydration does not depend on the HMR websocket or the dev-origin
check, so the demo works through the tunnel. It's also the correct thing to put
in front of a tester (no dev overlay / dev-only behavior).

Notes:
- The ngrok-free interstitial still appears once per visitor even with a prod
  build. It's a single "Visit Site" click. To remove it entirely, use a paid
  ngrok plan or a tunnel that has no interstitial (e.g. Cloudflare Tunnel).
- If for some reason we must demo the **dev** server over a tunnel, add the
  tunnel host to `allowedDevOrigins` in `next.config.*` and restart `next dev`.
  Prefer the prod-build path above for QA.

## What is NOT the problem
- Our application code. The demo logic in
  `components/terminal/useTerminalSimulation.ts` and `Terminal.tsx` is fine; it
  runs correctly on localhost.
- The recent change that removed the top-right debug "Step:" badge from
  `app/page.tsx`. Unrelated to hydration.
