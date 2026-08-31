# AGENT.md — Mercado Observatorio · Bremontix

Instructions for AI agents working in this repo. Read before changing anything.

---

## What this is

Single-page app, **vanilla HTML/CSS/JS** — no build step, no framework, no dependencies, no CDN. Everything runs client-side with illustrative data.

| File | Role |
| --- | --- |
| `index.html` | Static shell: sidebar, topbar, empty `#view`, footer. Nav/views are injected by JS. |
| `js/app.js` | Everything else in one IIFE: hash router, view string-builders, bindings, simulated state (localStorage), SQL mock engine. |
| `js/data.js` | `D` (illustrative dataset: mercados, categorias, productos, competidores) + `H` (helpers: fmt, tendencia, media, índices). |
| `css/styles.css` | All styles. Design tokens in `:root`. |
| `img/productos/` | Catálogo final — one PNG per product, cropped from `catalogo.png`; referenced by `D.productos[].img`. |
| `design.md` | **Single source of truth for the UI.** If a class is not there, it does not exist — register new components there before adding CSS. |
| `spec.md` | Conceptual spec (market observations → state/dynamic representations → epistemic artifacts). |

## Architecture

- **Router**: `route()` (js/app.js) parses `location.hash` → calls a view builder → injects into `#view` → `bindView()`. Routes: `#/mercado` (+ `/categoria/:id`, `/producto/:id`), `#/internacional` (sets `scope = "internacional"` and renders the same `vBoard` — no separate view), `#/benchmark`, `#/herramientas` (+ `/coleccion/{consultar|gestionar}`; `#/coleccion/...` is a legacy alias), `#/metodo` (+ `/elemento/:id`), `#/cuenta`, `#/docs`, `#/acerca`.
- **Views are pure string builders** (`vBoard`, `vCategoria`, `vColeccionGestionar`, `vColeccionConsultar`, `vDocs`, `vMetodo`, `vElemento`, …). No DOM writes inside view builders — bindings live in `bindView()` / `bindBoardTable()`.
- **Bindings**: `bindView()` binds per-view controls; `bindBoardTable()` binds the products-table toolbar (filter `#tq` + clear `#tqx`, trend chips, pager) and is re-run after every partial table swap. The delegated `#view` click listener (data-ver / data-del / data-copy / data-sqlidx / data-sqlins / data-docs-jump) is bound **once** (guarded by `viewClickBound`) — extend that delegation, never add per-route document-level listeners.
- **Partial updates**: the products table section is a stable container `#board-table[data-board="board|cat:{id}"]`. The geography toggle (`#geoseg`) is a **data filter**: it swaps `scope` and re-renders KPIs/insight/table with the international dataset — the table structure never changes. Changing the view menu (`data-view`) toggles `is-dense` + calls `updateBoardTable()` — KPIs/chart/insight must NOT re-render for table-only changes. `rangetabs` (time range) stays a full `route()`.
- **Async loading**: data-bearing components (`.stats`, `.figbox`, `.insight`, `.tmodule`) render `.skel` silhouettes first and swap to real content in place (`.is-in` fade) when their particular query resolves; components resolve independently — the page frame never waits for data (see design.md §3 Loading skeleton).
- **State**: persisted params in `localStorage["bremontix.params"]` (validated against whitelists in `loadParams`); colecciones in `localStorage["bremontix.colecciones"]` (upload pipeline: recibido → mapeando → en db → procesado, simulated with timeouts; stale states fast-forward on load). Session vars: `scope`, `focus`, `boardRange`, `boardView`, `tfilter`, `tsort`, `sqlLast`.
- **Plaza subset**: `params.plazas` is an explicit list of market ids (de fábrica = all six; an **empty list means no data** — nacional views render empty states, KPIs read `—`; there is no fallback to all). `activeMercados()` = chosen plazas. **Spatial artifacts recompute over `activeMercados()`** — `rangoP`, `H.mediaMercados(p, ms)` (returns `null` on empty), producto plazas table, heatmap columns, table `.source` footers — while series-level artifacts (precio corriente, volatilidad, tendencia, evolución) stay national. Benchmark always uses all six plazas: call `H.mediaMercados` without `ms` there. With 1..5 plazas charts synthesize per-plaza series deterministically (`plazaSerie`) and render the recomputed aggregate; a single plaza renders no aggregate; 0 plazas short-circuits via `plazaEmpty()` + `EMPTY_MSG`. Per-plaza temporal deltas are synthesized too (`plazaDelta`: `prev = cur − dif`, dif = `H.deltaSem` ± deterministic per-plaza wiggle ≤ 35%) — the heatmap is the consumer: diverging cells `hm__u1..5/hm__b1..5/hm__cf` scaled to max `|Δ|` visible, cell = `prev → cur` + `▲ dif`, no product-level Δ chip in row headers. The `treemap` view (labeled **Movimiento**) shares the same diverging classes — equal-area mosaic ordered by `|Δ sem|` desc with product-level real deltas (plaza-agnostic). The palette lives once as `--tint/--tink` vars per class; heatmap `<td>` uses `background/color`, treemap SVG uses `fill`. The Nacional seg carries `⊂` whenever coverage is not the full set — **including the empty selection** (title «… ninguna seleccionada (sin datos)») — set in `syncViewParams()`. The Cobertura card has a «Todas las plazas» master checkbox (`#p-plazas-all`: checked = all, indeterminate = mixed) bound next to `psave`; `pdefault` restores all six.
- **SQL console**: `sqlRun()` is a keyword-matching mock over the illustrative data. No real DB, no backend. Views hint future endpoints only where already present.
- **Herramientas layout**: params are grouped in two config sections with a pagenav index — **Sitio** (site-wide: *Presentación* card with `p-frame` + `p-conv`, whose options describe the mapping plainly) and **Datos** (per-opening: *Mercado* `p-geo/p-nivel/p-vista/p-ventana`, *Cobertura*, *Benchmark*). Section ids `sec-sitio`/`sec-datos` feed the sticky `pagenavHTML` scrollspy. Control ids are stable across reorganizations — `psave`/`pdefault` read by id.

## Non-negotiable rules

1. **No dependencies.** No npm, no CDN libs, no frameworks. Vanilla only.
2. **User-perspective copy, in Spanish.** Visible strings never mention internals: no "prototipo", no "localStorage", no endpoints/API paths. Technical contracts live only in code comments-free code and this file.
3. **Design system discipline** (see design.md): reuse tokens/components; one section-header pattern (`.figcap`); one `.lead` per page; mono + tabular numerals; color only for movement or role (ink structural, steel analytical, lime brand — no gold); **movement colors follow the configurable convention** `params.conv` (`mercado` default: red up / green down, buyer-facing; `bolsa`: green up): CSS swaps semantic tokens via `.app[data-conv]` (set in `applyConv` from `applyLayout`), JS resolves chart colors via `SUBE`/`BAJA` — never hardcode directional greens/reds; status/danger accents pin `--g5`/`--r5`. Content column caps at `--frame` (default 1600, selectable 1440/1600/1760 in Herramientas) centered right of the sidebar; **the shell is flush with the viewport — the sidebar anchors to the left edge (`top: 0`, full height) and never floats or gains shell margins**; the only sanctioned centered column is `.metodo`, sized to the Mercado grid's inner width.
4. **No comments in code** — match the existing terse style.
5. Escape user-visible dynamic strings with `escHTML()`.
6. Prefer partial re-renders (`updateBoardTable()`-style stable containers) over full `route()` when a change affects one section.
7. **Specs stay in sync.** Any change to the software that is not yet reflected in the specs — behavior, components, tokens, routes, copy contracts — must be written into the corresponding spec (`design.md`, `spec.md`, this file) as part of that change, not later. A change shipped without its spec update is an incomplete change.

## Verification workflow (always)

```bash
node --check js/app.js && node --check js/data.js   # syntax gate
```

- Hash navigation is fully client-side — `file://` works for screenshots; no server needed:

```bash
google-chrome --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1600,1000 --virtual-time-budget=6000 \
  --screenshot=/tmp/opencode/shot.png \
  "file:///…/index.html#/mercado"
```

- `--virtual-time-budget` is required or screenshots catch mid-flight skeletons/animations.
- For interactions (clicks, typing, focus), drive CDP over `--remote-debugging-pipe`: `Target.setAutoAttach { flatten: true }` + filter `targetInfo.type === "page"`, then `Runtime.evaluate` / `Input.insertText` / `Page.captureScreenshot` (see `/tmp/opencode/cdp-shot.js` pattern). No `ws` dependency needed.
- Screenshots go to `/tmp/opencode/` — never into the project dir.
- `--dump-dom` + `grep` to assert rendered markup (e.g. wrappers, headers, list items).
- Copy regression sweep: `grep -rn "rototipo\|localStorage:\|POST /api\|GET /api" index.html js/app.js` must stay clean.
- **Cleanup**: `pkill -f 'google-[c]hrome'` — never `pkill -f chrome` (it matches its own command line and kills itself).

## Known traps

- Backticks inside `sed` trigger command substitution — use the Edit tool, not sed, for template-literal lines.
- Template interpolations calling helpers with array literals (`${tabla([...])}`) must close **both** brackets: `])}` — a missing `]` surfaces as a confusing "Unexpected token" far from the cause.
- `bindView()` runs on every `route()` — anything bound there must target elements that were just re-rendered; anything global goes in the once-bound `#view` delegation or init. `bindBoardTable()` re-runs after every `updateBoardTable()` — filter/clear-button state must be computed in the builder markup (`has-val`, `hidden`), not mutated across renders.
- `position: sticky` inside the sidebar content breaks if an ancestor gains `overflow: hidden`; the sidebar itself is `sticky` at viewport top.
