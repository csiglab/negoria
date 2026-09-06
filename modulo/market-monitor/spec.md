# Market Monitor

## Technical Problem

Allow a given **market participant** to observe, track, and understand the agricultural market in which it operates.

More specifically:

> **How can a market participant transform dispersed price observations into a coherent representation of the market, its current state, its evolution through time, and its position relative to competitors and other markets?**

---

# Market Monitor

A monitoring and market-intelligence tool for **agricultural markets in the Dominican Republic**.

The system collects market-price observations and transforms them into:

* **State representations**
* **Dynamic representations**
* **Derived epistemic artifacts**

These representations support market tracking, international market monitoring, and competitive benchmarking.

---

# Dataset

The fundamental market observation is:

* **Marketplace**
* **Date**
* **Product**
* **Price**

Conceptually:

> **Market Observation = Marketplace × Time × Product → Price**

For example:

| Marketplace | Date       | Product |  Price |
| ----------- | ---------- | ------- | -----: |
| Market A    | 2026-01-01 | Tomato  | RD$ 40 |
| Market B    | 2026-01-01 | Tomato  | RD$ 45 |
| Market A    | 2026-01-08 | Tomato  | RD$ 52 |

These observations are the raw empirical data from which the system constructs representations of the market.

## Observation Sources

Two complementary sources feed the observation:

* **The plaza network** — the wholesale marketplaces whose observations compose the national aggregate and its spatial artifacts.
* **The retail reference (SupermercadosRD)** — an independent price comparator covering the main supermarket chains of the country. For catalog products it provides the retail observation anchored to product *groups* (e.g. `grupos/tomate`, `grupos/yautia`); the link lives on each product's page and is documented centrally in the Method page («Fuentes de observación»).

The retail reference observes groups beyond the current catalog and processed presentations (portioned fruit salads) — recorded as observed references, not as catalog products.

---

# Modelling Philosophy

The market is represented from two complementary perspectives.

## 1. State Representation

A state representation describes:

> **What is the condition of the market at a particular point in time?**

Examples:

* Current Product Price
* Current Average Market Price
* Current Price Index Value
* Current Volatility Index Value
* Current Market Price Range
* Current Price Spread
* Current Relative Price Position

---

## 2. Dynamic Representation

A dynamic representation describes:

> **How is the market evolving through time?**

Examples:

* Price Evolution
* Price Trend
* Price Volatility
* Aggregate Price Index
* Aggregate Price Index Evolution
* Price Momentum
* Seasonal Behavior
* Market Price Dispersion

---

# Derived Epistemic Artifacts

The system transforms raw observations into higher-level analytical objects.

## Dynamic Artifacts

These represent properties or processes that unfold through time.

* **Price Volatility**
* **Aggregate Price Index**
* Price Trend
* Price Momentum
* Rate of Price Change
* Seasonal Pattern
* Price Dispersion

For example:

> **Price Volatility** represents the variability of price movements through time.

> **Aggregate Price Index** represents the collective evolution of a group of product prices.

---

## State Artifacts

These represent the current condition or current value of a market property.

* **Current Product Price**
* **Current Average Market Price**
* **Current Price Index Value**
* **Current Volatility Index Value**
* **Current Trend State**
* **Current Price Range**
* **Current Relative Market Position**

The relationship can be expressed as:

| Dynamic Representation | State Representation     |
| ---------------------- | ------------------------ |
| Price Evolution        | Current Price            |
| Price Volatility       | Current Volatility Value |
| Aggregate Price Index  | Current Index Value      |
| Price Trend            | Current Trend State      |
| Price Dispersion       | Current Market Range     |

Therefore:

> **Dynamics describe how a market property behaves through time.**

> **State describes the current condition of that property.**

---

# Capabilities

## 1. Domestic Market Tracker

Allow a market participant to continuously monitor the Dominican agricultural market.

### Category Tracking

Track an entire agricultural category.

Examples:

* Vegetables
* Fruits
* Grains
* Poultry

Possible derived artifacts:

* Category Price Index
* Category Price Trend
* Category Volatility
* Category Average Price

---

### Product Tracking

Track an individual product.

For example:

> **Tomato**

Monitor:

* Current Price
* Price History
* Price Trend
* Price Volatility
* Price Index
* Price Range Across Marketplaces

---

### Product Catalog

Browse the whole market as a card catalog — one card per product, the catalog as a market entry point.

> **Every product in the dataset is a card.**

Each card renders the product's price behavior under the active data filters (geography, plaza coverage, and the catalog's own product/category/trend/range filters):

* Current Price
* Weekly Change
* Price History (sparkline)
* Trend State
* Volatility
* Price Range Across Marketplaces

Selecting a card opens the product page.

---

### Product Chain Profile

The product page complements the observation (price) with the object observed (the product) — a chain profile built per product.

> **Price is the observation; the chain is the context that produces it.**

Sections:

* **Production** — producing regions, harvest calendar, production system, cycle, yield
* **Chain** — production costs (total unit cost, cost structure by line item, gross margin against the current price), post-harvest & preservation (shelf life, temperature, humidity, handling, losses), and commercialization (placement channels, channel gross margin)
* **Processing** — level (fresh / processed) and forms
* **Derived Products** — the products this product becomes
* **Frequently Asked Questions** — an accordion of authored Q&A pairs per product (season, storage, channels, exports, derivatives)

Each topic is an identifiable page section with editorial identity — a section header **leading with the section's own name** (it always matches its navigation pill, and the active pill follows scroll) followed by content flowing directly on the canvas, in the manner of the Method page; the chart is the page's only boxed figure and the Q&A items its only interactive cards. All sources consolidate in a final **Reference** section per product (the plaza network and, where present, the product's SupermercadosRD group). Cost shares and channel shares are closed compositions — each structure sums to 100%.

---

# 2. International Market Tracker

Extend monitoring beyond the domestic market.

International markets provide an external representation against which the Dominican market can be observed and compared.

### International Category Tracking

Track the international behavior of an agricultural category.

For example:

> Dominican Vegetable Market
> ↔
> International Vegetable Market

Possible artifacts:

* International Category Price Index
* International Trend
* International Volatility
* Relative Domestic vs International Movement

---

### International Product Tracking

Track a specific product in external markets.

For example:

> Dominican Tomato Market
> ↔
> International Tomato Market

Monitor:

* International Price
* Price Evolution
* Trend
* Volatility
* Price Index

This enables the system to identify:

* Domestic vs International Price Differences
* Relative Price Trends
* Relative Volatility
* Domestic Price Premium or Discount
* Deviation from an International Reference

---

# 3. Competitor Benchmark

## Compare Competitor A Against a Reference

The reference does not have to be a single competitor.

A competitor can be compared against:

### Individual Competitor

```text id="xq3t5z"
COMPETITOR A
      │
      ▼
COMPARE
      │
      ▼
COMPETITOR B
```

Possible comparisons:

* Price Difference
* Relative Price Position
* Relative Volatility
* Relative Trend

---

### Group of Competitors

```text id="yofxe2"
COMPETITOR A
      │
      ▼
COMPARE
      │
      ▼
SELECTED COMPETITOR GROUP
```

The benchmark is derived from the aggregate behavior of a selected group.

---

### The Relevant Market

The most interesting case is:

```text id="7g37hv"
COMPETITOR A
      │
      │ Compare
      ▼
AGGREGATE MARKET
```

The system constructs a representation of the relevant market from its observations.

For example:

```text id="scykz7"
Market A ─┐
Market B ─┤
Market C ─┼──► AGGREGATE TOMATO MARKET
Market D ─┘
                    ▲
                    │
               Compare
                    │
              COMPETITOR A
```

The **entire relevant market** becomes the benchmark.

Possible derived artifacts include:

* Difference from Market Average
* Percentage Premium or Discount
* Relative Price Position
* Relative Volatility
* Relative Price Trend
* Deviation from Market Price Index

For example:

> **Competitor A Price: RD$ 58**

> **Aggregate Market Price: RD$ 50**

Derived artifact:

> **Competitor A Price Premium: +16%**

The same principle applies to volatility:

> **Competitor A Volatility vs Aggregate Market Volatility**

---

# Axes of Analysis

After state and dynamic representation, observation is structured along **two orthogonal axes**: geography first, then data level.

## Geography

* **Nacional** — the Dominican market itself
* **Internacional** — the external reference market

**International is not a level of analysis.** It is a geographic axis — an external reference against which any level can be compared.

## Data Level

| Level      | Scope                                       |
| ---------- | ------------------------------------------- |
| Todos      | the entire market — all products            |
| Category   | an agricultural category                    |
| Product    | a single product                            |

> **Todos** refers to the complete set of products — the market as a whole.

## Epistemic Artifacts per Combination

The data-level axis **repeats within each geography** — Nacional {Todos, Category, Product} and Internacional {Todos, Category, Product} — yielding six combinations, each with its own artifacts:

| Geography | Level | Artifacts |
| --------- | ----- | --------- |
| Nacional | Todos | general index · average volatility · trend distribution · gap vs reference · average premium |
| Nacional | Category | category index · YTD variation · trend · volatility · position vs international reference |
| Nacional | Product | price · weekly Δ · trend · volatility · range across marketplaces · national mean · position by marketplace |
| Internacional | Todos | international index · domestic–international gap · average premium · products with premium |
| Internacional | Category | category reference index · relative movement · domestic category position |
| Internacional | Product | international price · absolute difference · premium or discount · deviation from reference |

Selecting a level filters the data and recomputes the corresponding aggregations — it does not navigate away. The current view is refocused at the chosen level, and the active level is always visible, for example:

> **Frutas › Aguacate**

# Search

Search operates across levels and references:

* **Level of analysis** — Todos, categories, products
* **References** — the international market
* **Competitors**

Selecting a result applies it as a filter in context.

---

# Core Conceptual Model

```text id="wuv1ct"
                         MARKET OBSERVATIONS
                                  │
                                  ▼
                  Marketplace · Date · Product · Price
                                  │
                                  ▼
                           MARKET MODEL
                           /           \
                          ▼             ▼
                 STATE REPRESENTATION   DYNAMIC REPRESENTATION
                          │             │
                          └──────┬──────┘
                                 ▼
                      EPISTEMIC ARTIFACTS
                                 │
          ┌──────────────────────┼──────────────────────┐
          ▼                      ▼                      ▼
   DOMESTIC MARKET          INTERNATIONAL          COMPETITOR
      TRACKER               MARKET TRACKER         BENCHMARK
          │                      │                      │
          │                      │              ┌───────┼────────┐
          │                      │              ▼       ▼        ▼
          ▼                      ▼          INDIVIDUAL  GROUP   MARKET
      CATEGORY                CATEGORY
      PRODUCT                 PRODUCT
```

## Core Structure

The conceptual pipeline is:

> **Market Observations**
> ↓
> **State + Dynamic Market Representations**
> ↓
> **Derived Epistemic Artifacts**
> ↓
> **Market Tracking · International Monitoring · Competitive Benchmarking**

The particularly important idea is that **“the market” can itself be constructed as an aggregate representation and used as a benchmark**.

Therefore, the benchmark capability becomes:

> **Competitor A → Individual Competitor**

or

> **Competitor A → Competitor Group**

or

> **Competitor A → Aggregate Market**

This gives *Market Monitor* a strong conceptual foundation: it is not merely displaying prices, but **constructing representations of markets and using those representations to support observation, comparison, and positioning**.

---

# Interface

`spec.jpeg` defines the visual contract of the main view (**Mercado**). The language is an institutional fintech terminal — near-black ink, white rounded cards on a lavender canvas, lime brand accent, blue analytical accent. Movement colors follow a configurable convention (`Herramientas · Color de movimiento`): by default the platform speaks to **buyers** — red for upward moves (paying more), green for downward (paying less), gray for neutral; a «Bolsa» convention inverts it (green up / red down) for stock-market-trained eyes.

| Zone | Content |
| --- | --- |
| Sidebar | Brand (wordmark + group endorsement), navigation (Mercado · Comparación · Herramientas · Documento, with line icons and category YTD deltas), Sistema pinned at the bottom (Cuenta · Documentación · Acerca de); collapse via the topbar menu button |
| Top bar | Breadcrumb, session **view parameters** — geography (Nacional / Internacional, a data filter), plaza coverage (which plazas compose the national aggregate) and ventana —, search (⌘K) with grouped results, account button |
| Page header | Title, metadata chips, intro lead |
| KPI cards | Índice general (or Índice internacional), average volatility, average price, trend distribution — each with an embedded micro-chart (area sparks, line, and a stacked distribution bar) |
| Fig. 1 | Aggregate price index with range controls (1M · 6M · YTD · 1A · Todo), hover readout, start/end value labels. Under a **plaza subset**, the chart recomputes: one line per chosen plaza plus the recomputed aggregate of that subset (with a single plaza, just that plaza's series) |

The **national aggregate is plaza-scoped**: the plazas chosen in Herramientas · Cobertura (a «Todas las plazas» master switch over per-plaza checkboxes; de fábrica = all six) define the aggregate of the national market, and all spatial values (ranges across plazas, plaza means, the plazas table, the heatmap columns) recompute over the selection. Whenever the coverage is not the full set — **including an empty selection** — the Nacional toggle carries a `⊂` marker. An empty selection means **no data**: the nacional views render their empty states (figures and tables show «Sin datos — la cobertura actual no incluye plazas.», KPIs read `—`). Internacional is never subset — it is already an aggregation and ignores coverage. Tables always state their scope in the footer («agregado de N plazas — …»).
| Insight | A one-line reading of the market: direction, leading category, top weekly movers |
| Table | Products grouped by category: catalog thumbnail, price, Δ week, trend badge, volatility, range, mean, 8-month sparkline; toolbar with product text filter, trend filter, density toggle, CSV export, column customization, fullscreen. Alternative vistas: **Movimiento** — an equal-area mosaic of products ordered by weekly move size, colored green/red by the direction and strength of the move (labels fit by cell size; the week's shape at a glance) — and a **difference heatmap** — a product × plaza matrix where each cell shows `precio anterior → actual` and the weekly difference (▲/▼), with a diverging green/red background scaled to the size of the move; movement is only ever read at the product × plaza grain |

The **Catálogo** (`#/catalogo`) renders the same market as a card grid — one card per product with its price history under the active filters (geography, plaza coverage, product/category/trend filters, sparkline range); each card opens the product page with its chain profile (production, costs, post-harvest, commercialization, processing, derivatives).

Numerals are tabular. Selecting a level refocuses the view in place — it never navigates away.

---

# Component Loading

Every analytical component — KPI cards, figures, insight lines, tables — is computed from its own **particular data query**. Queries are specific to the component, and they carry **latency**: data is never available at render time.

While a component's query is pending, the component renders a **loading silhouette** (skeleton): a neutral placeholder that mirrors the final layout — same geometry, same position, no data.

Rules of the transition from unloaded to loaded:

* The skeleton occupies the **exact space** of the final content — no layout shift when data arrives.
* Content replaces the skeleton **in place**, with a soft fade — never a jump, never a reflow of neighboring components.
* Components resolve **independently**: one slow query never blocks the rest of the view.
* The frame of the page — title, navigation, section headers — renders immediately; only the data-bearing bodies wait.

> **Render the frame immediately; fill the data as it arrives.**

