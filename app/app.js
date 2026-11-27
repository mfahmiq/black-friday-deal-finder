// app.js — one job: wire the page together. State lives in filters.js,
// HTML in render.js, data in deals.js. Runs with no network requests.
import { DEALS, CATEGORIES, STORES } from "./deals.js";
import {
  SORTS,
  defaultState,
  stateFromHash,
  stateToHash,
  applyFilters,
  findDeal,
} from "./filters.js";
import { heroDeal, statsBar, dealGrid, dealDetail } from "./render.js";

const gridEl = document.getElementById("deals");
const heroEl = document.getElementById("hero");
const statsEl = document.getElementById("stats");
const countEl = document.getElementById("count");
const searchEl = document.getElementById("search");
const catEl = document.getElementById("cats");
const storeEl = document.getElementById("store");
const minEl = document.getElementById("minpct");
const sortEl = document.getElementById("sort");
const newLowEl = document.getElementById("newlow");

let state = defaultState();

function buildControls() {
  catEl.innerHTML = CATEGORIES.map(
    (c) => `<button type="button" data-cat="${c}" aria-pressed="${c === state.cat}">${c}</button>`
  ).join("");
  storeEl.innerHTML = `<option value="All">All stores</option>` +
    STORES.map((s) => `<option value="${s}">${s}</option>`).join("");
  sortEl.innerHTML = Object.entries(SORTS)
    .map(([k, v]) => `<option value="${k}">${v.label}</option>`)
    .join("");
  minEl.innerHTML = [0, 20, 30, 40, 50, 60]
    .map((p) => `<option value="${p}">${p === 0 ? "Any discount" : p + "% off or more"}</option>`)
    .join("");
}

function syncControls() {
  searchEl.value = state.q;
  storeEl.value = state.store;
  minEl.value = String(state.minPct);
  sortEl.value = state.sort;
  newLowEl.checked = state.newLowOnly;
  catEl.querySelectorAll("button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.cat === state.cat));
  });
}

function render() {
  const { dealId } = stateFromHash();
  if (dealId) {
    const d = findDeal(dealId);
    heroEl.innerHTML = "";
    statsEl.innerHTML = "";
    countEl.textContent = "";
    gridEl.innerHTML = d
      ? dealDetail(d, DEALS)
      : `<p class="empty">That deal is not on our list. <a href="#">Back to all deals</a></p>`;
    document.title = d ? `${d.product} — DealSleuth` : "DealSleuth — Black Friday Deal Finder";
    window.scrollTo(0, 0);
    return;
  }
  document.title = "DealSleuth — Black Friday Deal Finder";
  const list = applyFilters(state);
  const top = applyFilters({ ...defaultState(), sort: "score" })[0];
  heroEl.innerHTML = state.q === "" && state.cat === "All" && state.store === "All" &&
    state.minPct === 0 && !state.newLowOnly ? heroDeal(top) : "";
  statsEl.innerHTML = statsBar(list);
  countEl.textContent = list.length === DEALS.length
    ? `Showing all ${list.length} deals`
    : `Showing ${list.length} of ${DEALS.length} deals`;
  gridEl.innerHTML = dealGrid(list);
}

function pushHash() {
  const h = stateToHash(state);
  if (location.hash !== h) history.replaceState(null, "", h);
}

function onFilterChange() {
  state.q = searchEl.value;
  state.store = storeEl.value;
  state.minPct = Number.parseInt(minEl.value, 10) || 0;
  state.sort = sortEl.value;
  state.newLowOnly = newLowEl.checked;
  pushHash();
  render();
}

buildControls();
searchEl.addEventListener("input", onFilterChange);
storeEl.addEventListener("change", onFilterChange);
minEl.addEventListener("change", onFilterChange);
sortEl.addEventListener("change", onFilterChange);
newLowEl.addEventListener("change", onFilterChange);
catEl.addEventListener("click", (ev) => {
  const btn = ev.target.closest("button[data-cat]");
  if (!btn) return;
  state.cat = btn.dataset.cat;
  pushHash();
  syncControls();
  render();
});
document.getElementById("clear").addEventListener("click", () => {
  state = defaultState();
  history.replaceState(null, "", "#");
  syncControls();
  render();
});
window.addEventListener("hashchange", () => {
  const parsed = stateFromHash();
  state = parsed.state;
  syncControls();
  render();
});

// Start from the hash so screenshot URLs like #cat=TVs&min=40 just work.
state = stateFromHash().state;
syncControls();
render();

// Note: hashchange also fires when a card's "Why it's a real deal" link is
// clicked, which is how the detail view opens without a page reload.
