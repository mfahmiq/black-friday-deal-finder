# Candidate tournament — black-friday-deal-finder-01

Judge brief criteria, in weight order:
1. Working deal finder shown in screenshots (many deals, product/store/sale/usual/discount/link/check-time, search + category/store/discount filters that visibly work, nothing empty/broken/placeholder).
2. Real, checked deals (named product + store, prices add up, check time + source each, honest is-it-really-a-deal signal).
3. Usefulness (best deals first via sorting/score/verdict, same product compared across stores, link/code/condition to act).
4. Ease of use + look (clear nav, phone layout, readable type/contrast, original design).
5. Speed + structure (small first load, no heavy framework, source split into one-job files with clear names).

## 14 candidate concepts

1. **Verdict-first ranked grid** — deals ranked by a Deal Score, big verdict badges (NEW LOW / STRONG / GOOD / ROUTINE), hero spotlight of #1 deal, evidence line per deal, cross-store compare.
2. **Price-history detective** — every deal with a mini price-history chart and "cheaper before?" callout.
3. **Store-by-store tabs** — one tab per store, deals inside each store's page.
4. **Budget picker** — slider "I have $X" filters deals under budget.
5. **Comparison table** — spreadsheet-style table, same product across stores in columns.
6. **Minimal plain list** — starter-like simple list, search box only.
7. **Deal-of-the-hour hero + grid** — rotating hero deal, grid below.
8. **Savings calculator** — cart that totals your savings as you tick deals.
9. **Gift finder** — browse by recipient (for mum, for gamers, for the kitchen).
10. **Dark neon cyber style** — same grid as #1 but neon cyberpunk visuals.
11. **Warm newspaper style** — same grid as #1 but paper/serif editorial visuals.
12. **Dense data table** — one row per deal, all numbers visible at once.
13. **Big-% card grid** — classic card grid, giant discount % as the visual hook.
14. **Sale-window timeline** — deals grouped by when each sale ends.

## Pairwise tournament (criteria in weight order; first differing criterion decides)

- R1: #1 vs #6 — #1 wins: criterion 1 (filters/sort visible, many deals) and 3 (ranking, compare) both favour #1; #6 is the starter's shape.
- R1: #2 vs #12 — #2 wins on criterion 2 (history evidence is the strongest "is it real" signal) but loses on criterion 1 screenshots (charts eat space, fewer deals visible). #12 wins: more deals per screenshot. #12 advances.
- R1: #3 vs #5 — #5 wins on criterion 3 (cross-store compare is explicitly a criterion-3 item); #3 hides deals behind tabs, hurting criterion 1.
- R1: #4 vs #8 — #8 wins on criterion 3 (actionable total); #4 is a filter, not a finder.
- R1: #7 vs #13 — #13 wins on criterion 1 (grid shows more deals at once; hero eats the cover screenshot).
- R1: #9 vs #14 — #9 wins on criterion 4 (clearer navigation for shoppers); #14 is metadata, not shopping.
- R1: #10 vs #11 — visual style only; both lose to #1's structure. #10 advances on readability-at-small-size (neon on dark stays legible when shrunk; serif paper greys out).
- R2: #1 vs #12 — #1 wins: criterion 1 (cards show store link + check time + verdict per deal; a table row hides them) and criterion 4 (cards read on a phone; dense tables do not).
- R2: #5 vs #8 — #5 wins on criterion 3 (compare is named in the brief; a savings cart is a nice extra, not a brief item).
- R2: #13 vs #9 — #13 wins on criterion 1 (more deals visible per screenshot than gift categories).
- R2: #10 vs #1 — #1 wins: #10 IS #1's structure with a different skin; the skin is decided separately below.
- R3: #1 vs #5 — #1 wins: criterion 1 (a compare table alone shows few products; #1's grid shows many deals AND embeds compare lines + a compare view for multi-store products).
- R3: #13 vs #1 — #1 wins on criterion 3 (ranking by score + verdict beats % alone; a 68% off an inflated list price is not the best deal) and criterion 2 (evidence line per deal).
- Final: #1 vs #9 — #1 wins on criterion 1 (a finder first; gift browsing is a filter, folded in as category chips).

## Champion

**#1 Verdict-first ranked grid**, with the best parts of the losers folded in:
- From #13: giant discount % on every card (readable when the screenshot shrinks).
- From #5: cross-store compare for products sold at 2+ stores (AirPods Pro 3, Switch 2 bundle, MacBook Air) — "Also at" line on the card + full compare table in the detail view.
- From #2: an evidence line under every verdict ("lowest price ever — CNN tracked it below $169 only once") instead of a chart.
- From #7: a hero spotlight of the #1 scored deal at the top of the cover screenshot.
- From #8: a savings ticker in the header (total you'd save buying the top 10).
- From #9: category chips double as gift browsing (Audio, TVs, Gaming, Home & Kitchen, Wearables, Laptops, Toys & Gifts).
- Visual skin: midnight dark theme with amber/gold accents (from #10's readability win, but warmer and original — not neon cyberpunk, not a copy of any store's look). Name: **DealSleuth**.
