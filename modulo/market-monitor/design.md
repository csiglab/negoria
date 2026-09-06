# Design Spec — Mercado Observatorio · Bremontix

Single source of truth for the interface. If a class is not listed here, it does not exist. New UI must reuse these tokens and components — no one-off styles.

---

## 1. Tokens (`css/styles.css` `:root`)

### Color

| Token | Value | Role |
| --- | --- | --- |
| `--paper` | `#ffffff` | cards, surfaces, popovers |
| `--paper-2` | `#f4f5f8` | surface 2 — inset controls, tracks, tmodule heads |
| `--paper-3` | `#edeef3` | surface 3 — passive chips, kbd chip |
| `--ink` | `#17181c` | primary text, near-black structural color (sidebar, charts) |
| `--ink-2` | `#45484f` | secondary text |
| `--ink-3` | `#63666f` | metadata, labels, glyphs — WCAG AA on `--paper` |
| `--ink-muted` | `#9d9fa9` | micro-metadata, muted series — never body text |
| `--oxford` / `--oxford-2` | `#17181c` / `#2b2d34` | legacy aliases of the ink pair (headings, links) |
| `--steel` | `#3a5fb5` | blue 600 — analytical accent, section tags, focus rings |
| `--gray-ref` | `#a3a6b1` | reference series, neutral chart segments |
| `--lime` | `#c9e96e` | brand accent — nav active on dark, `BREMONTIX` sub, selection, toast border, `--up` on dark |
| `--lime-deep` | `#4d7c0f` | lime pressed — alias of `--up` |
| `--lime-soft` | `#def2a2` | hero KPI tint 2 (Volatilidad) |
| `--peri-soft` | `#ccd8f6` | hero KPI tint 1 (Índice) |
| `--peri-tint` | `#f2f5fd` | periwinkle wash — search chip, soft blue fills |
| `--up` / `--up-bg` | `#4d7c0f` / `#f4fae8` | upward movement only (AA on paper) |
| `--down` / `--down-bg` | `#b42318` / `#fdedeb` | downward movement only (AA on paper) |
| `--up-navy` / `--down-navy` | `#c9e96e` / `#f2a9a4` | movement values on the near-black sidebar (`.snav__item .val`) |
| `--iris` | `#7b6cd9` | secondary analytical accent — volatility series only |
| `--skel` | `#edeef3` | loading silhouettes only |
| `--line` / `--line-2` | `#e7e8ee` / `#f0f1f5` | borders / hairlines |
| `--line-strong` | `#d9dbe3` | strong borders, active-pill rings |
| `--border-ctl` | `#8f93a0` | control borders — inputs, selects, fields (≥3:1) |
| `--border-hover` | `#9ea2ad` | hover borders, crosshair |
| `--navy` / `--navy-2` | `#17181c` / `#17181c` | sidebar ground + tooltip/toast ground (flat — no gradient) |
| `--canvas` | `#e6e7ee` | lavender page canvas under the content column |
| `--shadow-card` | `0 1px 2px rgba(23,24,28,.03), 0 10px 26px -22px rgba(23,24,28,.16)` | card elevation — borders lead, shadows whisper |
| `--shadow-hover` | `0 2px 4px rgba(23,24,28,.05), 0 14px 30px -20px rgba(23,24,28,.2)` | hover elevation (`.stat:hover` lifts 1px) |
| `--shadow-pop` | `0 8px 24px rgba(23,24,28,.16)` | level-2 popovers, tooltips, toasts |
| `--mod-gap` | `1.5rem` | vertical rhythm between page modules |
| `--radius` | `16px` | card radius (`.stat`, `.figbox`, `.tmodule`, `.tablewrap`, …) |
| `--frame` | `1600px` | content column cap (`.topbar__in`, `.page`, `.appfoot__in`); user-selectable `1440 / 1600 / 1760` (Herramientas) |

Semantic rule: **color communicates movement** or **role** (ink structural, steel analytical, lime brand). Never decoration. No gold — the palette is ink / white / lavender / steel, with lime as the single brand accent and green + red reserved for market movement. **The movement convention is configurable** (`params.conv`, Herramientas · «Color de movimiento»): `mercado` (default, buyer-facing) = **red for upward, green for downward** — prices rising hurt buyers; `bolsa` = green up / red down. Implementation: raw scales `--g1..5`/`--r1..5` in `:root` (mercado mapping is the base) + `.app[data-conv="bolsa"]` swaps the semantic tokens (`--up/--down/--up-bg/--down-bg`, `--up-deep/--down-deep`, navy sidebar pair, `--up-line/--down-line`, divergent `--u1..5/--b1..5`); JS resolves chart colors via `applyConv()` (`SUBE`/`BAJA`). Status/danger accents (close buttons, errors, vol pills, «Guardado») are convention-independent — they pin `--r5`/`--g5` directly. Text/background pairings were audited to WCAG AA (≥4.5:1 text, ≥3:1 UI/graphic).

### Type

| Token | Value |
| --- | --- |
| `--sans` | Inter (body, everything) |
| `--mono` | IBM Plex Mono (numbers, tags, labels) |

No serif — the brand wordmark is Inter 700 white; there is no third family.

### Layout

The app is **flush with the viewport**: `.app` is a `200px | 1fr` grid (`62px` collapsed), `min-height: 100vh`, no margin/radius/shadow on the shell. Sidebar `#17181c`, sticky `top: 0`, full viewport height, internal scroll; Sistema section pinned to the bottom (`.snav__sec--foot` = `margin-top: auto`). Topbar sticky `top: 0`. Collapse is driven only by the topbar `.menubtn` (`.app.is-collapsed`) — there is no `.collapser`, no `.sidebar__foot`.

---

## 1b. Vertical alignment (critical)

**Every full-width row uses the same container recipe:**

```css
max-width: var(--frame);
margin: 0 auto;
padding: 0 1.6rem;   /* 0.9rem below 960px */
```

Applied to `.topbar__in`, `.page`, `.appfoot__in`. Consequences:

* `.view` (the scroll container) has **no side padding** — the gutter belongs to `.page`. Padding an ancestor shifts the shared edges and breaks alignment.
* Crumb (topbar), page title (`pagehead h1`), first paragraph (`.lead`), section headers (`.figcap`) and footer text share the **exact same left and right edges** at every viewport width.

**The one sanctioned centered column:** `#/metodo` wraps its content in `.metodo { max-width: calc(var(--frame) - 3.2rem) }` — exactly the `.page` inner width minus gutters — so its title, pipeline, branch cards and references land on the same edges as the Mercado grid. `.metodo .lead` widens to `1185px`; `.metodo .refs` sets `columns: 2`.

**Left-axis rules:**

1. Content aligns to the content column's left edge (inside `--frame`) — the page title is the axis; nothing indents past it without a structural reason (card padding).
2. **No ad-hoc centered columns** (exception: `.metodo` above). Reading measures (`.lead`, `.insight__body`) are left-aligned widths inside the fluid column.
3. **Diagram/table components fill the column horizontally**: `.mfbranches`, `.mpipe`, `.mbench`, `.figbox`, `.tablewrap` use `width: 100%` — never content-shrink. Equal-height cells via `align-items: stretch`.
4. Component stacks that read as one system (`mpipe` above `mfbranches`) must share the same width and gutter so their edges line up vertically.

---

## 2. Typography scale

| Role | Class | Spec |
| --- | --- | --- |
| Page title | `.pagehead h1` | sans 1.8rem / 700 / `-0.02em` / `--ink` |
| Intro lead (≤1 per page) | `.lead` | sans 1rem / 1.7 / `--ink-2`, 680px max (1185px inside `.metodo`) |
| Section tag | `.figcap__tag` | mono 0.62rem / ls .18em / upper / 600 / `--steel` |
| Section caption | `.figcap__caption` | sans 0.8rem / `--ink-2` (600 / `--ink` in-card) |
| KPI value | `.stat__value` | mono 1.72rem / 600 / tabular / `-0.015em` / `--ink` |
| KPI/param label | `.stat__label` | mono 0.62rem / ls .14em / upper / `--ink-3` |
| Body | base | sans 0.875rem / 1.5 |
| Table | `.table` | 0.83rem (`.is-dense` 0.78rem) |
| Table header | `.table th` | mono 9px / ls .08em / upper |
| Metadata / notes | `.note`, `.source` | 0.72rem / `--ink-3` |
| Badge / pill | `.pill`, `.mover` | mono 0.6rem |

All numerals: `font-variant-numeric: tabular-nums` (`.mono`, `.table td.num`, `.stat__value`). **Type floor: no text below 9px** — uppercase tracked labels included. Numbers carry one decimal convention per column (prices 2dp; vol/rango/media-adjacent 1dp via `H.fmtN`).

**There is exactly one section-header pattern: `.figcap` (+ `.figcap--section` spacing); on the board view it renders as the in-card band `.figbox__head` / `.tmodule__head`. Never invent new label styles.**

---

## 3. Components

| Component | Classes | Notes |
| --- | --- | --- |
| Sidebar | `.brand__*`, `.snav__*` | near-black `#17181c` full-height rail. Brand: `.brand__name` = **Mercado Observatorio** (Inter 700, white) over `.brand__sub` = **BREMONTIX** (mono 0.56rem, `--lime`, ls .26em); collapsed state shows `.brand__glyph` (white Inter 700 "B"). Nav sections: **Mercado** (Mercado · Catálogo + 5 categorías with `.val` = YTD %, movement-tinted `--up-navy`/`--down-navy`) · **Comparación** (Benchmark) · **Herramientas** (Parámetros; **Colección** group — parent toggles open/closed, never navigates; sub: Consultar/Gestionar, auto-opens on coleccion routes) · **Documento** (Método) · **Sistema** pinned bottom (Cuenta · Documentación · Acerca de). Active = `--lime` text on `rgba(201,233,110,.09)` — no accent line. Collapse via topbar `.menubtn` only |
| Topbar | `.topbar__left`, `.menubtn`, `.topbar__in`, `.crumb` | flush `top: 0`, frame-aligned; `.menubtn` = ghost hamburger toggling the sidebar; **winchip + geo toggle render only on `#/mercado*` and `#/catalogo`** (hidden elsewhere via `route()`); Benchmark crumb is root-level |
| Menú chip | `.winchip` | session ventana pill — sans, sentence case («Último mes»), non-interactive |
| Geography toggle | `.seg`, `.seg__btn`, `.seg__sub` | Nacional \| Internacional — **a data filter, not a route**: switching re-renders KPIs/insight/table in place with the international dataset (same table structure); comparisons live only in Benchmark. When coverage is not the full set (`params.plazas` shorter than the six markets — **including the empty selection**) the Nacional button renders **`Nacional ⊂`** (`.seg__sub`, steel) with a `title` naming the plazas — or «Subconjunto de plazas — ninguna seleccionada (sin datos)» when empty. Internacional is never subset: it is already an aggregation |
| Search | `.search`, `.search__glyph`, `.search__kbd`, `.search__chip`, `.search__x`, `.searchdd`, `.dd-*` | glyph 12px @ `left: .65rem`; input radius 9, focus ring steel + expands `210→245px`; `⌘K` kbd chip; chip mode carries `search__x` clear. Dropdown `.searchdd`: 340px, radius 14, layered shadow, grouped results (`dd-group`/`dd-item`/`dd-thumb`/`dd-item__hint`), `→ Ver todos en Mercado` |
| Table text filter | `.tq-wrap`, `.tq-glyph`, `.tq`, `.tq-x` | **search-grade mirror of the topbar input**: glyph 12px @ `.65rem`, radius 9, sans 0.8rem, focus ring steel + expands `158→190px`; `.tq-x` clear button (visible when `has-val`, gives right padding, click clears + re-renders + refocuses). Instant filter, in place — no dropdown |
| KPI cards | `.stats`, `.stat*`, `.stats__tags` | 4-col grid (2-col ≤830px): 1 **periwinkle hero** (`--peri-soft`, borderless — Índice general, or Índice internacional under Internacional) · 2 **lime hero** (`--lime-soft` — Volatilidad media) · 3–4 white (Precio medio, Tendencias). Embedded `svg` viz with explicit size: area spark / line / area spark / **`.stat__bar`** = 6px stacked bar (baja/estable/alza, `title`+`aria-label` per segment) flush at the card's bottom edge (`.stat` clips with `overflow: hidden`); no donut. Label may carry `.stat__info` (ⓘ tooltip with the derivation); values count up; staggered `statin` entrance (reduced-motion safe) |
| Insight | `.insight`, `.insight__icon`, `.insight__tag`, `.insight__wrap`, `.insight__next`, `.mover` | one-line market reading; semantic left accent (up/down/gray) + tinted icon circle (leaf); tag wraps to two lines; movers are direction-tinted pill links to the product view; `.insight__next` scrolls to `#sec-indice` (`data-jump`); reads the same in both geografías (no comparative copy) |
| Toast | `#toasts`, `.toast` | mono confirmation (ink card, **lime** left border, bottom-right, `role=status`); auto-dismiss ~2.6s — CSV export, copy JSON, guardar, de fábrica, cargas |
| Identidad | `.idbtn` | topbar avatar (ink circle, lime Inter 700 "B") → `#/cuenta` |
| Empty state | `.emptybox` | glyph + message + «Quitar filtros» when a filter is active — tables, treemap, heatmap |
| Figure | `.figcap` + `.figbox`, `.figfoot`, `.figkebab*`, `#figmenu`, `.rangetab` | charts; legend `.figcap__legend` (sans, sentence case), range pills `.rangetab` (1M·6M·YTD·1A·Todo — active = white pill + ring + card shadow); **every `Fig.` chart renders `inHead`** with `figfoot` inside the box; kebab = fullscreen + CSV (toast confirm); index charts pass `base: 100` (dashed), `bookends: true` (start+end labels), `expand()`ed daily series for 1M/6M with `xticks`; `< 3` points → per-point labels, no area fill; line `draw` animation, hover crosshair + `.xdot` readout, `.lighthalo` pulse on the live point. **Plaza subset (nacional)**: charts recompute over `activeMercados()` — thin gray per-plaza series (end labels `SIGLA · valor`) + the recomputed subset aggregate (main ink line); with a single plaza there is no aggregate — that plaza's series is the main line. **Empty coverage (0 plazas) → sin datos**: figures render the `.emptybox` state («Sin datos — la cobertura actual no incluye plazas.») and KPIs read `—`. International reference series render **only** under Internacional scope |
| Figure · card variant | `.figbox--mod`, `.figbox__head`, `.figbox__body`, `.figfoot` | board views and the producto chart only (Fig. 1): `.figcap` as in-card header band (border-bottom, caption in bold ink) — the chart is the one boxed figure; **the rest of the producto page is editorial** (see Producto rows): section identity comes from `figcap--section` headers with content flowing directly on the canvas, per the Método pattern — not from stacked cards |
| Table · board module | `.tmodule`, `.tmodule__head`, `.tmodule__body` | products tables on board + categoría views: card wrapping the tablebar (white header band) + chrome-less `.tablewrap`; `thead` sticky ≥1200px; `boardTable(..., mod)` |
| Page sections nav | `.pagenav`, `.pagenav__link` | sticky pills under the topbar — sans, sentence case, active = white pill with border + card shadow; **active pill computed on scroll** (`bindPagenav`, passive listener): the last section whose top crosses the sticky line (topbar + pagenav + margin), first pill above it — no IntersectionObserver, so short sections at the document end activate too; the page tail carries height (`#sec-referencia` min-height) so the last section can reach the line; section headers **lead with the section name matching the pill** (`.figcap__tag`), figure numbers live in the captions (Método pattern); sections `#sec-resumen / #sec-indice / #sec-productos` (board + categoría), `#sec-resumen / #sec-evolucion / #sec-plazas / #sec-produccion / #sec-cadena / #sec-proceso / #sec-derivados / #sec-preguntas / #sec-referencia` (producto), `#sec-catalogo` (catálogo) |
| Scroll progress | `.scrollprog` | 2px `--ink` fill overlaying the topbar's bottom border (`bottom: -1px`); `scaleX` tracks window scroll; shown on all `#/mercado*` views and `#/catalogo`; invisible at top |
| Table | `.tablewrap`, `.table`, `.tablebar`, `.tchips`, `.tbtn`, `.colpick`, `.viewmenu` | trend chips (arrows pre-tinted `.tu/.td/.tf`, active = white pill), density, export, columns picker, fullscreen; sparkline cells carry a min/max/actual `title`; spatial values (rango entre plazas, media) recompute over `activeMercados()`; under a plaza subset the `.source` footer states it: `agregado de N plazas — …` / `plaza única — …`; with empty coverage the table body is the `.emptybox` state. **Units/license note belongs in the `.source` footer** (e.g. «Precios RD$/unidad · datos ilustrativos · Fuente: …») — never in the tablebar header; the header's only meta is the live filter count («N de M productos»), rendered only while a filter is active |
| Table vistas | `.hm`, `.hm__*`, `.tm`, `.tm__*` | **Movement map** (`treemap` view id kept for state compat): equal-area squarify mosaic ordered by `|Δ sem|` desc — biggest movers top-left; color = the **shared diverging scale** (`hm__u1..5/hm__b1..5/hm__cf`, max `|Δ|` visible = step 5, palette defined once as `--tint/--tink` vars consumed by both heatmap `<td>` and treemap SVG `rect`/text); labels by cell size — fits → name + `▲ dif` (mono), medium → truncated name, tiny → arrow only; `title` = «Nombre — RD$ prev → RD$ cur · Δ ±X.XX sem»; product-level real deltas (`H.deltaSem`) — plaza-agnostic, no subset recompute. Heatmap — **a difference map at product × plaza grain**: each cell communicates `precio anterior → actual` (`.hm__pr`, mono) + the weekly difference `.hm__d` (▲/▼/—); the product row header carries no product-level Δ chip — movement lives only in the cells; prev prices are synthesized per plaza (`plazaDelta`, anchored on `H.deltaSem` with deterministic per-plaza wiggle). Both render in place of `.table` via the vista menu |
| Table pager | `.tpager`, `.tpager__btn`, `.tpager__num` | products tables: 20 rows/page; catrow re-emitted per category change; ellipsis windowing >7 pages; resets on filter/sort/route change |
| Product thumbnail | `.pthumb`, `.pthumb--page`, `.dd-thumb` | `D.productos[].img` → `img/productos/<id>.png`; white chip, radius, `--line` border, `object-fit: cover` — table cells & heatmap rows (26px), producto title, search results (20px); always decorative (`alt=""`, `loading="lazy"`) |
| Catálogo cards | `.gcards`, `.gcard*` | `#/catalogo` — responsive `auto-fill minmax(252px, 1fr)` grid; each card is one `<a class="gcard" href="#/mercado/producto/:id">`: thumb + nombre + categoría + trend pill (`.gcard__head`) · price row (`.gcard__val` mono + Δ sem + `sem` unit) · scope meta line (`.gcard__meta`: `RD$/unidad` · `media · N plazas · …` under a plaza subset · `serie nacional · …` under Internacional) · 8-month price-history sparkline (`.gcard__spark`, window sliced by the bar's range pills; under a subset the spark is the aggregate of synthesized per-plaza series — same recipe as the producto figure; under Internacional the series stays national, series-level artifacts never recompute) · footer (`.gcard__foot`): `vol` chip + rango min–max (subset-aware `rangoP`), or `intl` chip + prima % under Internacional. Toolbar = `.tmodule` with `.tablebar`: text filter (`#cq`, `.tq-wrap` mirror) · category chips (`#ccat`) · trend chips (`#ctrend`) · live filter count (`#cbar-meta`) · sort chips (`#csort`: Relevancia/Nombre/Precio/Δ sem/Vol) · range pills (`#crangetabs`, own `cstate.range`). State lives in session `cstate` (not persisted); grid swaps in place via `updateCatalogo()`/`bindCatalogo()`; empty coverage → `.emptybox` + `EMPTY_MSG`; zero matches → `.emptybox` + «Quitar filtros»; grid opens as `.skel` silhouette and fills via `qMap.cards` |
| Producto · ficha de cadena | `#sec-produccion/cadena/proceso/derivados`, `.figcap--section`, `.figcap--block`, `.chainkv*`, `.chainrow` | four sections after Plazas with **editorial identity (Método pattern)** — each section opens with a `.figcap--section` header **whose tag is the section name (matching its pagenav pill)** and whose caption carries the figure number; the `data-q` body flows **directly on the canvas** (no card), no per-figure `.source`: **Producción** (tag `PRODUCCIÓN` · *Fig. 3 — zonas, zafra, sistema, ciclo y rendimiento*) · **Cadena** (tag `CADENA` · one section header + three inner blocks, each with a `.figcap--block` sub-caption: Fig. 4 costos — `.chainkv` strip anchored to the partidas table; Fig. 5 post-cosecha y conservación; Fig. 6 comercialización — `.chainkv` margen del canal + canales table; partidas y canales suman 100) · **Procesamiento** (tag `PROCESAMIENTO` · *Fig. 7 — nivel y formas*) · **Derivados** (tag `DERIVADOS` · *Fig. 8 — chips; importados sin proceso local → `.emptybox`*). Tables use `.tablewrap` with `.mtrack/.mband` bars. Data from `H.ficha(p.id)` (`FICHAS` in `js/data.js`) |
| Producto · preguntas frecuentes | `#sec-preguntas`, `.figcap--section`, `.qa`, `.qa__item`, `.qa__q`, `.qa__a` | Q&A accordion per product from `QAS[p.id]` (`js/data.js`, 2–3 handwritten pairs each) under an editorial header tagged **PREGUNTAS** — no outer card; the accordion items themselves are the cards: native `<details>/<summary>` — no JS; question row (`.qa__q`, weight 600, `+`/`−` mono marker, hover tint, paper card at 12px) and answer body (`.qa__a`, ink-2); `[open]` item gains card shadow + strong border |
| Producto · referencia | `#sec-referencia`, `.figcap--section`, `.refs` | final section consolidating **all sources in one place** (no scattered `.source` lines on the page): editorial header tagged **Referencia** + `.refs` numbered list — the plaza network (precios RD$/unidad · elaboración propia · datos ilustrativos) plus, when `H.fuente(p.id)` exists, the SupermercadosRD group page (external link + slug in mono). Mirrors the Método «Referencias» pattern |
| Fuente de observación | `.chip--link` | product page head chip linking the product's retail observation source (`H.fuente(p.id)` → `FUENTES` in `js/data.js`; SupermercadosRD group page, external `target="_blank" rel="noopener"`); chip recipe with hover tint — present only on products with a mapped source (40 of 59). Documented centrally in Método · «Fuentes de observación» |
| Badges | `.pill--up/down/flat`, `.pill--vol-*`, `.delta-*` | movement semantics (convention-colored green/red/gray with ▲▼—; see Tokens); vol pills are risk-static (high = red, low = green) |
| Popovers | light: `.searchdd`, `.colpick`, `.viewmenu`; dark: none | light in content; shared `ddin` entrance, radius 12, layered shadow |
| Benchmark builder | `.refmode`, `.refmode--set`, `.reftile`, `.refreset` | reference constructor: Mercado (aggregate) vs Selección (multi-competidor tiles, ink when on) + Reiniciar |
| Benchmark compare | `.benchcard`, `.bench-row`, `.bench-row__fill/val` | rows grow with `grow` animation; values mono tabular |
| Vista previa · Alt+Click | `.pv-ov`, `.pv`, `.pv__*` | **Alt+Click on any internal `a[href^="#/"]`** opens the route in a modal iframe (`?v=p` + hash); Esc/×/outside close; «Abrir en la vista» sets the main hash; iframe fully interactive |
| Method page | `.metodo` (wrapper), `.lead`, `.mpipe`, `.mpipe__arrow` (→ right), `.mpipe__pair`, `.mfbranches`, `.mfbranch*`, `.mflevel`, `.mfarts`, `.mbench`, `.refs` | centered editorial axis at `calc(--frame - 3.2rem)`; pipeline **horizontal** (Observaciones → Estado \| Dinámica; vertical ≤960px); branches stretch to equal height; `.metodo .refs` = 2-column reference list; **each `.mfarts li` links to the artifact's epistemic profile `#/metodo/elemento/:id`** (27 artifacts); section **«Fuentes de observación»** (`metodoFuentesHTML`): dense `.table` built by inverting `FUENTES` — one row per SupermercadosRD group (external link, slug as label) · categoría · catalog products (inline product links) — plus a closing `.note` naming groups outside the catalog and the processed fruit-salad presentation pages |
| Epistemic element profile | `ELEMENTOS` + `vElemento(id)` | section order: **Perfil (lead proyección + nivel/viva table) → Límites y uso → Caso → Referencia**; titles in Title Case; crumb `Método / <artefacto>` |
| Epistemic case · interactive | `.caso`, `.caso__tab`, `.caso__res`, `.caso__in`, `.caso__base`, `.caso__key` | inline-editable observations (mono tabular inputs) + live recompute; 8 builders (`CASO_BUILD`): indice · media · volatilidad · distribucion · delta · relativa · prima · posicion |
| Herramientas · parámetros | `.pcsec__t`, `.pcard` (`p-frame`, `p-conv`, `p-geo`, `p-nivel`, `p-vista`, `p-ventana`, `p-plazas`) | persisted params, grouped in **config sections with a pagenav index** (Sitio / Datos — same sticky `pagenavHTML` + scrollspy as Mercado; ids `sec-sitio`/`sec-datos`): **Sitio** → card *Presentación* (Ancho de la columna `p-frame` 1440/1600/1760 setting `--frame` inline; **Color de movimiento** `p-conv` — site-wide presentation, options state the meaning plainly: «Subida en rojo, bajada en verde» / «Subida en verde, bajada en rojo», values `mercado`/`bolsa` kept for state compat); **Datos** → cards *Mercado* (geografía, nivel, vista, ventana) · *Cobertura* (master checkbox «Todas las plazas» `.pplazas__all`: checked = all six, indeterminate = mixed + `.pplazas` grid; default de fábrica = all six; an empty selection is saved as-is and means **no data** in the nacional views) · *Benchmark*. Applies on next navigation |
| Colección · carga | `.colrow`, `.colsteps`, `.pill--col-*`, `.tbtn--danger` | pipeline Recibido → Mapeando → En DB → Procesado |
| Dropzone | `.dropzone`, `.dropfile` | drag & drop + picker; `.is-drag` on dragover |
| SQL console | `.sqlwrap`, `.sqlschema*`, `.sqlchips__btn`, `.sqled`, `.sqlbar` | schema panel inserts into editor; results reuse `.tablewrap`/`.table` |
| Loading skeleton | `.skel`, `.skel--*`, `.is-in` | placeholder mirroring final geometry — no layout shift on load; content swaps **in place**; components resolve independently |
| Component query | `[data-q]`, `qMap`, `resolveQueries()` | per-section query hosts filled after a staggered 240–680ms latency; `qMap` cleared on route change |
| Cuenta view | composes `.acerca-crest`, `.figcap`, `.table` | identity, service status, access list |
| Docs & About | `.docs-toc`, `.refs`, `.acerca-crest*` | in-page ToC; numbered references (mono markers); identity card (paper, ink left border, serif-free) |

**Page anatomy — multi-part views.** Every `#/mercado*` page shares one identity: `pagehead` (title + chips + lede) → `pagenav` (section pills) → sections wrapped in `<div id="sec-*">`. Board and categoría: **Resumen** (`.stats`) · **Índice** (figure) · **Productos** (`.tmodule`). Producto: **Resumen** · **Evolución** (the page's one boxed figure, `.figbox--mod`) · **Plazas** (editorial + closing `.note`) · **Producción** · **Cadena** (costos + post-cosecha + comercialización) · **Procesamiento** · **Derivados** · **Preguntas** (Q&A accordion) · **Referencia** (consolidated sources, `.refs`) — all with **editorial section identity** (`figcap--section` header + content flowing directly on the canvas, Método pattern; cards reserved for the chart and the interactive accordion, never stacked), and **every section header tag is the section's own name — it always matches its pagenav pill**. Catálogo: **Catálogo** (one section: `.tmodule` toolbar + card grid). Data-bearing components open as `.skel` silhouettes and fade in place when their query resolves — the page frame never waits for data; section headers (`.figcap--section`) belong to the frame and render immediately, with the `data-q` host carrying only the data body.

---

## 4. Anti-heterogeneity rules

1. No new fonts, sizes, or colors outside the token list — extend tokens, never hardcode.
2. One section-header pattern (`.figcap`), one lead per page (`.lead`); serif does not exist.
3. Numbers always mono + tabular. Movement always green/red/gray with ▲▼— — which of the two colors means "up" follows the color convention (`params.conv`).
4. Parameters live in the topbar (`geoseg` = data filter, `winchip`) and search — never in the sidebar, never duplicated in page body.
5. Content caps to `--frame` with the shared container recipe (§1b) — crumb, title, body and footer on the same edges; the only centered column is `.metodo`, sized to the Mercado grid's inner width; full-width components never shrink.
6. Cards and popovers reuse the existing radius (`--radius` 16px cards, 12–14px popovers) / shadow / border recipes.
7. Before adding a class, check §3 — if it exists, compose it; if not, add it here first.
