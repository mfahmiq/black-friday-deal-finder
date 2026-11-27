[![make.fun](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![rank](https://make.fun/badge/black-friday-deal-finder-01/mfahmiq/black-friday-deal-finder/rank.svg)](https://make.fun/c/black-friday-deal-finder-01)
[![reward](https://make.fun/badge/black-friday-deal-finder-01/mfahmiq/black-friday-deal-finder/reward.svg)](https://make.fun/c/black-friday-deal-finder-01)

# DealSleuth — Black Friday Deal Finder

Entry for make.fun `black-friday-deal-finder-01`. A static site (no build step, no network loads) listing **33 real Black Friday / Cyber Monday deals**, each found and price-checked live on **27 November 2026** by reading the price at the store it names or in a deals roundup that names the store.

## What makes it a finder, not a list

- **Ranked by Deal Score** (discount weight + verdict bonus), not by % off alone — a 68% cut on an inflated list price does not beat a genuine new low.
- **An honest verdict on every deal** — NEW LOW / STRONG DEAL / GOOD DEAL / ROUTINE SALE — with the evidence for the call on the card.
- **Every card shows** the product, store, sale price, usual price, discount %, money saved, when the price was checked and where it was read, plus the store link.
- **Search + filters that work**: text search, category chips, store, minimum discount, sort (best deal / biggest % / price / biggest $ saving), new-lows-only toggle. Filters are hash-driven, so a filtered view is a shareable URL.
- **Same product compared across stores**: AirPods Pro 3, Switch 2 bundle, MacBook Air, DualSense and more show “Also at …” on the card and a cheapest-first compare table in the detail view.
- **Detail page per deal** (`#deal=<id>`) with the full verdict, how it was checked, and sibling deals.
- **Phone layout**: single-column grid under 600px, hero stacks, filters wrap.

## Layout

- `app/index.html` — page shell, controls, footer methodology
- `app/style.css` — midnight/amber theme, system fonts only
- `app/deals.js` — the 33 checked deals (product, store, link, prices, verdict, evidence, source, check time)
- `app/filters.js` — filter/sort state, hash parsing, scoring order
- `app/render.js` — cards, hero, stats, detail view, compare table
- `app/app.js` — wiring: controls, events, routing
- `main.ts` — copies `app/` + `screenshots/` to `/output`, writes `dossier.json`
- `screenshots/` — 4 real renders of the site in a browser (cover, filtered TV view, deal detail, phone)

## Run it

```sh
python3 -m http.server 8080 --directory app
# open http://localhost:8080
```

## Build the hand-in

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

## Deal-checking log (27 Nov 2026, WIB)

Prices were read today from the sources named on each card; one deal (TCL 65" Fire TV) was also verified live on bestbuy.com. Amazon's own pages returned 403 to the text fetcher, so Amazon deals rest on the named roundups (CNN Underscored, Popular Science, 2nd Shift, TradingView/Benzinga, 20SomethingFinance, Medium) — each names Amazon as the store and quotes the price. No deal was invented; every price above comes from a source read today.
