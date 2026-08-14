# LifePool

**Your life already overlaps with someone else's.**

LifePool is an agent that finds people who are already going the same place, at the same time, so you can share the trip instead of doing it alone. You do not add extra plans. You pool the ones you already had.

[Live demo](https://thisisshaw-04.github.io/lifepool/) · [Repository](https://github.com/thisisshaw-04/lifepool)

## The idea

Most social apps ask you to make a new event. Groceries, commutes, library sessions, gym, and shared rides already happen every day — in parallel, a few minutes apart. That is extra travel, wasted time, and fewer chances to meet people without forcing a hangout.

You tell LifePool what you are **already doing**. Your agent looks for nearby intentions that overlap, scores inconvenience (time, distance, detour), and proposes a pool. Exact location stays private until both sides confirm.

## What you can do

- **Natural-language search** — Type something like `Studying at NLB Saturday`, or tap Search with nothing typed to look for anything nearby.
- **Explore pools** — Commute, grocery, shopping, study, lunch, gym, movies, sightseeing, ride share, roommate.
- **Agent radar** — Nearby people appear on rings while the agent understands your plan, compares overlap, and checks timing.
- **Match and confirm** — Each match gets a score and factors. Pick a person, confirm a time and place, and it lands in Active pools.
- **Ride share** — Need a ride or can drive; from/to; when (leaving now, in 15 min, tonight).
- **Roommate finder** — Search by area, budget, and move-in; message or let the agent reach out.
- **Schedule** — Month calendar of pools, plus a demo calendar connect (Google, Outlook, Apple).
- **Trusted circle** — Invite family or friends; filter matches to circle, strangers, or both.
- **Agent memory and impact** — Learned preferences, plus trips avoided, hours shared, and people met.

## How matching works

This prototype does not call a live LLM. It runs a deterministic agent pipeline you can walk through end to end:

1. **Intent parser** — Pulls activity, Singapore place hints (Tampines, Bugis, NLB…), and time phrases (tonight, after work, leaving now).
2. **Scorer** — Weighted mix of activity similarity, time overlap, distance, preferences, and social openness. Outputs a 0–100 score, a proposed time and place, and detour minutes.
3. **Finder** — Ranks mock people nearby. Open search spreads results across categories so it is not grocery-only.

## What's in this build

An interactive **mobile prototype** in an iPhone-style frame. Users, activities, and calendar events are mocked so the full flow works without a backend. Privacy copy is in the product: location is not shared until both people confirm.

## Tech

- **Next.js 16** (App Router), **React 19**, **TypeScript**
- **Framer Motion** for motion; **Tailwind CSS 4** plus custom mobile UI
- Custom ink icons, category illustrations, and manga-style avatars
- Client React Context for screens, matches, pools, calendar, circle, and impact
- Static export to **GitHub Pages**

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The live site is the same app, built as a static export.

## Demo path (about 30 seconds)

1. Home — type a plan, or tap Search.
2. Watch the radar find people.
3. Pick a match and confirm.
4. Check Active pools and Schedule.
5. Optional: Ride share, Roommate, or Trusted circle.
