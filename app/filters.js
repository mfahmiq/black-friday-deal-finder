// filters.js — one job: turn the URL hash + the filter controls into the
// list of deals the page shows. No DOM building here; render.js owns that.
// A second pass over this file (27 Nov): discount is always recomputed
// from sale/usual, never stored, so a price typo cannot silently pass.
import { DEALS, discountPct, dealScore } from "./deals.js";

export const SORTS = {
  score: { label: "Best deal first", fn: (a, b) => dealScore(b) - dealScore(a) },
  discount: { label: "Biggest % off", fn: (a, b) => discountPct(b) - discountPct(a) },
  priceAsc: { label: "Price: low to high", fn: (a, b) => a.sale - b.sale },
  priceDesc: { label: "Price: high to low", fn: (a, b) => b.sale - a.sale },
  savings: { label: "Biggest $ saving", fn: (a, b) => (b.usual - b.sale) - (a.usual - a.sale) },
};

export function defaultState() {
  return { q: "", cat: "All", store: "All", minPct: 0, sort: "score", newLowOnly: false };
}

// Read the hash the way the screenshots use it, e.g.
//   #cat=TVs&store=Best+Buy&min=40&q=airpods&sort=discount
// and a detail view: #deal=airpods-pro-3
export function stateFromHash() {
  const state = defaultState();
  const raw = location.hash.replace(/^#\/?/, "");
  if (!raw) return { state, dealId: null };
  const params = new URLSearchParams(raw);
  if (params.get("deal")) return { state, dealId: params.get("deal") };
  if (params.get("q")) state.q = params.get("q");
  if (params.get("cat")) state.cat = params.get("cat");
  if (params.get("store")) state.store = params.get("store");
  const min = Number.parseInt(params.get("min") || "0", 10);
  if (Number.isFinite(min)) state.minPct = min;
  if (SORTS[params.get("sort")]) state.sort = params.get("sort");
  if (params.get("newlow") === "1") state.newLowOnly = true;
  return { state, dealId: null };
}

export function stateToHash(state) {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.cat !== "All") params.set("cat", state.cat);
  if (state.store !== "All") params.set("store", state.store);
  if (state.minPct > 0) params.set("min", String(state.minPct));
  if (state.sort !== "score") params.set("sort", state.sort);
  if (state.newLowOnly) params.set("newlow", "1");
  const s = params.toString();
  return s ? "#" + s : "#";
}

export function applyFilters(state) {
  const q = state.q.trim().toLowerCase();
  const list = DEALS.filter((d) => {
    if (state.cat !== "All" && d.category !== state.cat) return false;
    if (state.store !== "All" && d.store !== state.store) return false;
    if (discountPct(d) < state.minPct) return false;
    if (state.newLowOnly && d.verdict !== "new-low") return false;
    if (q) {
      const hay = (d.product + " " + d.store + " " + d.category).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  return [...list].sort(SORTS[state.sort].fn);
}

export function totalSavings(list) {
  return list.reduce((sum, d) => sum + (d.usual - d.sale), 0);
}

export function findDeal(id) {
  return DEALS.find((d) => d.id === id) || null;
}
