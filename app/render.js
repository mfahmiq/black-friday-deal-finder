// render.js — one job: turn deals into HTML. Filters and state live in
// filters.js; data lives in deals.js. Nothing here fetches anything.
import { DEALS, CHECKED_DAY, discountPct, dealScore, money } from "./deals.js";
import { totalSavings } from "./filters.js";

export const VERDICTS = {
  "new-low": { label: "NEW LOW", cls: "v-newlow", title: "Lowest price ever tracked" },
  strong: { label: "STRONG DEAL", cls: "v-strong", title: "Deep cut, near its best price" },
  good: { label: "GOOD DEAL", cls: "v-good", title: "A real saving" },
  routine: { label: "ROUTINE SALE", cls: "v-routine", title: "Small cut — only if you need it now" },
};

export function esc(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function verdictBadge(d) {
  const v = VERDICTS[d.verdict];
  return `<span class="verdict ${v.cls}" title="${esc(v.title)}">${v.label}</span>`;
}

export function compareLine(d) {
  if (!d.alsoAt.length) return "";
  const best = [...d.alsoAt, { store: d.store, price: d.sale }]
    .sort((a, b) => a.price - b.price)[0];
  const others = d.alsoAt
    .map((a) => `${esc(a.store)} ${money(a.price)}`)
    .join(" · ");
  const cheapest = best.store === d.store ? " — cheapest here" : "";
  return `<p class="also">Also at ${others}${cheapest}</p>`;
}

export function dealCard(d, rank) {
  const pct = discountPct(d);
  const save = d.usual - d.sale;
  return `<article class="card" data-id="${esc(d.id)}">
    <div class="card-top">
      <span class="rank">#${rank}</span>
      <span class="cat">${esc(d.category)}</span>
      <span class="pct">−${pct}%</span>
    </div>
    <h3 class="pname"><a href="#deal=${esc(d.id)}">${esc(d.product)}</a></h3>
    <p class="store">${esc(d.store)}</p>
    <p class="prices"><span class="sale">${money(d.sale)}</span>
      <span class="usual">${money(d.usual)}</span>
      <span class="save">save ${money(save)}</span></p>
    <p class="score">Deal score <b>${dealScore(d)}/100</b> ${verdictBadge(d)}</p>
    <p class="evidence">${esc(d.evidence)}</p>
    ${compareLine(d)}
    <p class="checked">Checked ${esc(d.checked)} · read at
      <a href="${esc(d.sourceUrl)}" target="_blank" rel="noopener">${esc(d.source)}</a></p>
    <p class="note">${esc(d.note)}</p>
    <a class="cta" href="${esc(d.url)}" target="_blank" rel="noopener">View deal at ${esc(d.store)} →</a>
  </article>`;
}

export function heroDeal(d) {
  const pct = discountPct(d);
  return `<section class="hero">
    <div class="hero-copy">
      <p class="hero-kicker">★ TOP DEAL OF BLACK FRIDAY 2026</p>
      <h2>${esc(d.product)}</h2>
      <p class="hero-prices"><span class="sale">${money(d.sale)}</span>
        <span class="usual">${money(d.usual)}</span>
        <span class="pct big">−${pct}%</span></p>
      <p class="hero-evidence">${esc(d.evidence)}</p>
      <p class="checked">Checked ${esc(d.checked)} · read at
        <a href="${esc(d.sourceUrl)}" target="_blank" rel="noopener">${esc(d.source)}</a></p>
      <p class="hero-actions">
        <a class="cta big" href="${esc(d.url)}" target="_blank" rel="noopener">View deal at ${esc(d.store)} →</a>
        <a class="ghost" href="#deal=${esc(d.id)}">Why it's a real deal</a>
      </p>
    </div>
    <div class="hero-score">
      <p class="score-num">${dealScore(d)}</p>
      <p class="score-label">Deal score / 100</p>
      ${verdictBadge(d)}
      <p class="score-note">Ranked #1 of ${DEALS.length} checked deals</p>
    </div>
  </section>`;
}

export function statsBar(list) {
  const newLows = list.filter((d) => d.verdict === "new-low").length;
  return `<p class="stats"><b>${list.length}</b> deals checked · <b>${newLows}</b> at new lows ·
    <b>${money(totalSavings(list))}</b> total savings if you bought them all ·
    prices checked ${esc(CHECKED_DAY)}</p>`;
}

// Detail view + grid rendering (second half of render.js).

export function dealDetail(d, all) {
  const pct = discountPct(d);
  const save = d.usual - d.sale;
  const v = VERDICTS[d.verdict];
  const rows = [{ store: d.store, price: d.sale, url: d.url, here: true }]
    .concat(d.alsoAt.map((a) => ({ ...a, here: false })))
    .sort((a, b) => a.price - b.price);
  const compare = rows.length > 1
    ? `<h3>Same product, compared across stores</h3>
       <table class="compare"><thead><tr><th>Store</th><th>Price</th><th></th></tr></thead><tbody>
       ${rows.map((r) => `<tr${r.here ? ' class="best"' : ""}><td>${esc(r.store)}${r.here ? " ★" : ""}</td>
         <td>${money(r.price)}</td>
         <td><a href="${esc(r.url)}" target="_blank" rel="noopener">Go to ${esc(r.store)} →</a></td></tr>`).join("")}
       </tbody></table>
       <p class="compare-note">Cheapest first. Prices were each read at the store named, on ${esc(d.checked)}.</p>`
    : `<p class="compare-note">We found this product on sale at one store this Black Friday. If another store cuts it, we will add it here.</p>`;
  const siblings = all
    .filter((x) => x.category === d.category && x.id !== d.id)
    .slice(0, 3);
  return `<article class="detail">
    <p class="back"><a href="#">← Back to all deals</a></p>
    <p class="crumbs">${esc(d.category)} · ${esc(d.store)}</p>
    <h2>${esc(d.product)}</h2>
    <p class="detail-prices"><span class="sale big">${money(d.sale)}</span>
      <span class="usual">${money(d.usual)}</span>
      <span class="pct big">−${pct}%</span>
      <span class="save">you save ${money(save)}</span></p>
    <p class="score">Deal score <b>${dealScore(d)}/100</b> ${verdictBadge(d)}</p>
    <h3>Is it really a deal?</h3>
    <p class="verdict-text"><b>${v.label}.</b> ${esc(d.evidence)}</p>
    <h3>How we checked it</h3>
    <p class="checked">Price read on <b>${esc(d.checked)}</b> at
      <a href="${esc(d.sourceUrl)}" target="_blank" rel="noopener">${esc(d.source)}</a>.
      The store link below goes to the product at ${esc(d.store)}.
      ${esc(d.note)}</p>
    <p><a class="cta big" href="${esc(d.url)}" target="_blank" rel="noopener">View deal at ${esc(d.store)} →</a></p>
    ${compare}
    ${siblings.length ? `<h3>More ${esc(d.category)} deals</h3>
      <ul class="siblings">${siblings.map((s) => `<li><a href="#deal=${esc(s.id)}">${esc(s.product)}</a> — ${esc(s.store)} ${money(s.sale)} (−${discountPct(s)}%)</li>`).join("")}</ul>` : ""}
  </article>`;
}

export function dealGrid(list) {
  if (!list.length) {
    return `<p class="empty">No deals match those filters. Loosen the discount or clear the search — every deal we checked is still listed under “All”.</p>`;
  }
  return `<div class="grid">${list.map((d, i) => dealCard(d, i + 1)).join("")}</div>`;
}
