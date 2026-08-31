(function () {
  "use strict";

  const PREVIEW = new URLSearchParams(location.search).get("v") === "p";
  if (PREVIEW) document.documentElement.classList.add("is-preview");

  const OXFORD = "#17181c", STEEL = "#3a5fb5", GRAY = "#7d8090", REDC = "#b42318",
        SOFT = "#63666f", INK2 = "#45484f", GRID = "#eceef3",
        GREENC = "#4d7c0f", IRIS = "#4d7c0f";
  let SUBE = REDC, BAJA = GREENC;
  const MONO = "IBM Plex Mono, monospace";
  let uid = 0;
  const PDEFAULTS = { benchComp: "a", benchMode: "mercado", geo: "nacional", nivel: "todos", frame: 1600, ventana: "1m", vista: "tabla", sidebar: "abierta", conv: "mercado", plazas: D.mercados.map(m => m.id) };
  const FRAMES = [1440, 1600, 1760];
  const VENTANAS = ["1m", "6m", "ytd", "1a", "todo"];
  const VENTANA_LBL = { "1m": "Último mes", "6m": "6 meses", "ytd": "YTD", "1a": "1 año", "todo": "Todo" };
  const VISTAS = ["tabla", "compacta", "treemap", "heatmap"];
  const VIEWOPTS = [
    ["tabla", "Tabla", '<svg viewBox="0 0 12 12"><path d="M1.5 3h9M1.5 6h9M1.5 9h9"/></svg>'],
    ["compacta", "Compacta", '<svg viewBox="0 0 12 12"><path d="M1.5 2h9M1.5 4.4h9M1.5 6.8h9M1.5 9.2h9"/></svg>'],
    ["treemap", "Movimiento", '<svg viewBox="0 0 12 12"><rect x="1.5" y="1.5" width="6" height="6" rx="1"/><rect x="8.2" y="1.5" width="2.3" height="3.4" rx="1"/><rect x="8.2" y="5.4" width="2.3" height="5.1" rx="1"/><rect x="1.5" y="8.1" width="6" height="2.4" rx="1"/></svg>'],
    ["heatmap", "Mapa de Calor", '<svg viewBox="0 0 12 12"><rect x="1.5" y="1.5" width="4" height="4" rx="1"/><rect x="6.5" y="1.5" width="4" height="4" rx="1"/><rect x="1.5" y="6.5" width="4" height="4" rx="1"/><rect x="6.5" y="6.5" width="4" height="4" rx="1"/></svg>']
  ];
  const PKEY = "bremontix.params";
  const COL_KEY = "bremontix.colecciones";
  function validNivel(v) {
    if (v === "todos") return true;
    if (v && v.startsWith("cat:")) return D.categorias.some(c => c.id === v.slice(4));
    if (v && v.startsWith("prod:")) return D.productos.some(p => p.id === v.slice(5));
    return false;
  }
  function nivelFocus(v) {
    if (!validNivel(v) || v === "todos") return null;
    return v.startsWith("cat:") ? { type: "cat", id: v.slice(4) } : { type: "prod", id: v.slice(5) };
  }
  function loadParams() {
    const p = { ...PDEFAULTS };
    try {
      const raw = localStorage.getItem(PKEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (D.competidores.some(c => c.id === s.benchComp)) p.benchComp = s.benchComp;
        if (s.benchMode === "mercado" || s.benchMode === "subset") p.benchMode = s.benchMode;
        if (s.geo === "nacional" || s.geo === "internacional") p.geo = s.geo;
        if (validNivel(s.nivel)) p.nivel = s.nivel;
        if (FRAMES.includes(s.frame)) p.frame = s.frame;
        if (VENTANAS.includes(s.ventana)) p.ventana = s.ventana;
        if (VISTAS.includes(s.vista)) p.vista = s.vista;
        if (s.sidebar === "colapsada" || s.sidebar === "abierta") p.sidebar = s.sidebar;
        if (s.conv === "mercado" || s.conv === "bolsa") p.conv = s.conv;
        if (Array.isArray(s.plazas)) p.plazas = [...new Set(s.plazas)].filter(id => D.mercados.some(m => m.id === id));
      }
    } catch (e) {}
    return p;
  }
  function saveParams() { try { localStorage.setItem(PKEY, JSON.stringify(params)); } catch (e) {} }
  function loadColecciones() {
    let out = [];
    try {
      const raw = localStorage.getItem(COL_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      out = Array.isArray(arr) ? arr : [];
    } catch (e) { out = []; }
    const changed = out.some(c => c.estado && c.estado !== "procesado" && Date.now() - (c.t || 0) > 5200);
    if (changed) {
      out.forEach(c => { if (c.estado && c.estado !== "procesado" && Date.now() - (c.t || 0) > 5200) c.estado = "procesado"; });
      saveColecciones(out);
    }
    return out;
  }
  function saveColecciones(arr) { try { localStorage.setItem(COL_KEY, JSON.stringify(arr)); } catch (e) {} }
  function escHTML(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  const COL_STEPS = [
    { id: "recibido", label: "Recibido", delay: 0 },
    { id: "mapeando", label: "Mapeando", delay: 1400 },
    { id: "endb", label: "En DB", delay: 3000 },
    { id: "procesado", label: "Procesado", delay: 4600 }
  ];
  const COL_STEP_IDX = { recibido: 0, mapeando: 1, endb: 2, procesado: 3 };
  function colEstadoLabel(id) { const s = COL_STEPS.find(x => x.id === id); return s ? s.label : "Recibido"; }
  function colAdvance(id) {
    COL_STEPS.forEach((s, i) => {
      if (!s.delay) return;
      setTimeout(() => {
        const list = loadColecciones();
        const c = list.find(x => x.id === id);
        if (!c || (COL_STEP_IDX[c.estado] || 0) >= i) return;
        c.estado = s.id;
        saveColecciones(list);
        if (location.hash.indexOf("coleccion") >= 0) route();
        if (s.id === "procesado" && c && location.hash.indexOf("coleccion") >= 0) toast(`«${c.nombre}» procesado — disponible en Consultar`);
      }, s.delay);
    });
  }
  function colStepsHTML(estado) {
    const cur = COL_STEP_IDX[estado] || 0;
    return `<span class="colsteps">${COL_STEPS.map((s, i) => `<span class="${i < cur ? "is-done" : i === cur ? "is-now" : ""}">${i <= cur ? "●" : "○"} ${s.label}</span>`).join("<i>→</i>")}</span>`;
  }
  function colTipo(c) {
    const t = ((c.tipo || "") + " " + (c.nombre || ""));
    if (/json/i.test(t)) return "json";
    if (/csv/i.test(t)) return "csv";
    if (/pdf/i.test(t)) return "pdf";
    if (/image/i.test(t)) return "img";
    if (/txt|text/i.test(t)) return "txt";
    return "doc";
  }
  function colBaseCarga() {
    return { id: "base", nombre: "Catálogo Bremontix", fuente: "js/data.js · incorporado", tipo: "json", fechaISO: "2026-08-20", filas: D.productos.length, estado: "procesado", raw: { nota: "Conjunto ilustrativo embebido", productos: D.productos.length, mercados: D.mercados.length, categorias: D.categorias.length, competidores: D.competidores.length } };
  }
  function cargasHTML() {
    const all = [colBaseCarga()].concat(loadColecciones());
    return all.map(c => {
      const isBase = c.id === "base";
      const estado = c.estado || "procesado";
      const fecha = c.fechaISO ? new Date(c.fechaISO).toLocaleDateString("es-DO") : "—";
      const verBtn = `<button class="tbtn" type="button" data-ver="${c.id}">Ver datos</button>`;
      const delBtn = isBase ? "" : `<button class="tbtn tbtn--danger" type="button" data-del="${c.id}">Eliminar</button>`;
      return `<div class="colrow">
        <div class="colrow__main">
          <div class="colrow__name">${escHTML(c.nombre)} <span class="pill pill--col-${estado}">${colEstadoLabel(estado)}</span></div>
          <div class="colrow__meta mono">fuente: ${escHTML(c.fuente)} · ${fecha} · ${c.filas ?? "?"} filas · ${colTipo(c)}</div>
          ${colStepsHTML(estado)}
        </div>
        <div class="colrow__acts">${verBtn}${delBtn}</div>
      </div>`;
    }).join("") || `<div class="empty">Sin cargas — arrastra un documento arriba.</div>`;
  }
  function coleccionDetalleHTML(id) {
    const list = loadColecciones();
    const c = id === "base" ? colBaseCarga() : list.find(x => x.id === id);
    if (!c) return `<div class="empty">No encontrado.</div>`;
    const isImg = c.tipo && c.tipo.startsWith("image");
    const isPdf = c.tipo === "application/pdf";
    const estado = c.estado || "procesado";
    const fuenteBlock = `<div style="margin-bottom:0.7rem"><div class="mono" style="font-size:0.62rem;color:var(--ink-3);letter-spacing:0.06em;text-transform:uppercase">Fuente</div><div style="font-size:0.82rem;margin-top:0.15rem">${escHTML(c.fuente)} <span class="pill" style="margin-left:0.4rem">${colTipo(c)}</span></div>${c.dataURL ? (isImg ? `<img src="${c.dataURL}" alt="fuente" style="max-width:100%;max-height:180px;border:1px solid var(--line);border-radius:8px;margin-top:0.5rem;display:block">` : isPdf ? `<a href="${c.dataURL}" target="_blank" rel="noopener" style="display:inline-block;margin-top:0.5rem;font-size:0.78rem;color:var(--steel);text-decoration:underline">Abrir PDF original ↗</a>` : `<div style="margin-top:0.5rem"><a href="${c.dataURL}" download="${escHTML(c.nombre)}" style="font-size:0.78rem;color:var(--steel)">Descargar fuente</a></div>`) : ""}</div>`;
    const extraido = (() => {
      try { const pretty = JSON.stringify(c.raw, null, 2); return `<pre class="praw">${escHTML(pretty.slice(0, 4000))}${pretty.length > 4000 ? "\n… (truncado)" : ""}</pre><button class="tbtn" type="button" data-copy="${c.id}" style="margin-top:0.4rem">Copiar JSON</button>`; } catch (e) { return `<pre class="praw">${escHTML(String(c.raw).slice(0, 4000))}</pre>`; }
    })();
    return `${fuenteBlock}<div class="mono" style="font-size:0.62rem;color:var(--ink-3);letter-spacing:0.06em;text-transform:uppercase;margin-bottom:0.2rem">Data extraída</div>${extraido}<div class="mono" style="font-size:0.58rem;color:var(--ink-3);margin-top:0.6rem">Esta data provino de la carga <b>${escHTML(c.nombre)}</b> · estado: <b>${colEstadoLabel(estado)}</b></div>`;
  }
  let params = loadParams();
  const bench = { comp: params.benchComp, mode: params.benchMode, picks: [], mercadoGeo: "nacional" };
  let scope = params.geo === "internacional" ? "internacional" : "nacional";
  let focus = nivelFocus(params.nivel);
  let boardRange = params.ventana;
  let lastBoard = [];
  let boardView = params.vista;
  const tfilter = { q: "", trend: "all" };
  const tsort = { key: "", dir: 1 };
  let sqlLast = null;
  let viewClickBound = false;
  let colOpen = null;
  let pPage = 1;
  const TPSIZE = 20;
  const boardCols = { producto: true, precio: true, dsem: true, tend: true, vol: true, rango: true, media: true, serie: true };

  const ICO = {
    mercado: '<svg class="snav__icon" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M2.5 8h11M8 2c3.2 3.4 3.2 8.6 0 12M8 2c-3.2 3.4-3.2 8.6 0 12"/></svg>',
    productos: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h7"/></svg>',
    vegetales: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M13 3C7.5 3 4 6.2 4 10.5c0 1 .2 1.9.5 2.7.7.2 1.4.3 2.2.3C11 13.5 13 9.3 13 3z"/><path d="M4.5 13.5C6.8 9.8 9.4 7 12.6 4.6"/></svg>',
    viandas: '<svg class="snav__icon" viewBox="0 0 16 16"><ellipse cx="8" cy="9.4" rx="3.8" ry="4.8"/><path d="M8 4.6V2.4M6.2 5 4.6 3.4M9.8 5l1.6-1.6"/></svg>',
    frutas: '<svg class="snav__icon" viewBox="0 0 16 16"><circle cx="8" cy="9.6" r="4.4"/><path d="M8 5.2V3.6c1-1.1 2.4-1.4 3.6-1"/></svg>',
    granos: '<svg class="snav__icon" viewBox="0 0 16 16"><ellipse cx="8" cy="8" rx="3.2" ry="5.4"/><path d="M8 2.6v10.8M5 5.2c1.9 1.3 4.1 1.3 6 0M5 10.8c1.9-1.3 4.1-1.3 6 0"/></svg>',
    aves: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M13 3c-.4 6-4 9.3-9.4 9.6L3 15l2.4-2.4C6.4 9 9 5.2 13 3z"/></svg>',
    carnes: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M2.5 10c0-3.4 2.4-5.5 5.8-5.5 2.9 0 5.2 1.6 5.2 3.6 0 1.5-1.3 2.4-3.1 2.4-.5 1.7-1.8 2.9-3.7 2.9-2.5 0-4.2-1.5-4.2-3.4z"/><ellipse cx="6.2" cy="9.8" rx="1.5" ry="1.1"/></svg>',
    internacional: '<svg class="snav__icon" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M2 8h12"/><ellipse cx="8" cy="8" rx="2.7" ry="6"/></svg>',
    benchmark: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M3 13.5h10M8 3v10.5M4.5 13.5V9.5M11.5 13.5V6"/></svg>',
    params: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M2 4.5h6.5M12.5 4.5H14M2 11.5h2.5M8.5 11.5H14"/><circle cx="10.5" cy="4.5" r="1.9"/><circle cx="5.5" cy="11.5" r="1.9"/></svg>',
    coleccion: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M3 5.5l5-2.5 5 2.5-5 2.5z"/><path d="M3 8.5l5 2.5 5-2.5"/><path d="M3 11.5l5 2.5 5-2.5"/><path d="M8 3v10"/></svg>',
    metodo: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M3 3.6c2-.9 4-.9 5 .6 1-1.5 3-1.5 5-.6V12c-2-.9-4-.9-5 .6-1-1.5-3-1.5-5-.6z"/><path d="M8 4.2v8.4"/></svg>',
    docs: '<svg class="snav__icon" viewBox="0 0 16 16"><path d="M2.5 3.2A1.7 1.7 0 0 1 4.2 1.5H13v11H4.2A1.7 1.7 0 0 0 2.5 14.2z"/><path d="M2.5 12.5V13a1.7 1.7 0 0 0 1.7 1.5H13"/><path d="M5.5 5h5M5.5 7.5h3.5"/></svg>',
    cuenta: '<svg class="snav__icon" viewBox="0 0 16 16"><circle cx="8" cy="5.5" r="2.8"/><path d="M2.8 13.5c.9-2.7 2.8-4 5.2-4s4.3 1.3 5.2 4"/></svg>',
    acerca: '<svg class="snav__icon" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/><path d="M8 7.4v3.4"/><path d="M8 4.9v.2"/></svg>'
  };

  function dot(x, y, r, fill) {
    return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
  }

  function niceScale(min, max, n = 4) {
    const range = (max - min) || Math.max(1, Math.abs(max) * 0.1);
    const raw = range / n;
    const mag = Math.pow(10, Math.floor(Math.log10(raw)));
    const norm = raw / mag;
    const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
    const lo = Math.floor(min / step) * step;
    const hi = Math.ceil(max / step) * step;
    const ticks = [];
    for (let v = lo; v <= hi + step / 2; v += step) ticks.push(+v.toFixed(6));
    return { lo, hi, ticks };
  }

  function chart(labels, series, opts = {}) {
    const id = ++uid;
    const W = 820, H = opts.h || 230, P = 42, PB = 28;
    const vals = series.filter(s => s.data).flatMap(s => s.data);
    if (series.some(s => s.flat)) vals.push(...series.filter(s => s.flat).map(s => s.flat));
    const pad = opts.pad === undefined ? 2 : opts.pad;
    const scale = niceScale(Math.min(...vals) - pad, Math.max(...vals) + pad);
    const min = scale.lo, max = scale.hi;
    const fmtTick = v => Math.abs(v - Math.round(v)) < 1e-6 ? String(Math.round(v)) : String(+v.toFixed(2));
    const IW = W - P - 14, IH = H - P - PB;
    const sparse = series.some(s => s.data && s.data.length < 3);
    const sx = i => P + (IW / (labels.length - 1)) * i;
    const sy = v => P + IH - ((v - min) / (max - min)) * IH;
    let g = "";
    const xt = opts.xticks ? new Set(opts.xticks) : null;
    scale.ticks.forEach(t => {
      const y = sy(t);
      if (t !== min) g += `<line x1="${P}" x2="${W - 14}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" stroke="${GRID}" stroke-width="1"/>`;
      g += `<text x="${P - 7}" y="${(y + 3).toFixed(1)}" text-anchor="end" font-size="9.5" fill="${SOFT}" font-family="${MONO}">${fmtTick(t)}</text>`;
    });
    labels.forEach((m, i) => {
      if (xt && !xt.has(i)) return;
      g += `<text x="${sx(i)}" y="${H - 8}" text-anchor="${i === 0 ? "start" : i === labels.length - 1 ? "end" : "middle"}" font-size="9" letter-spacing="1.2" fill="${SOFT}" font-family="${MONO}">${m}</text>`;
    });
    const meta = { w: W, h: H, top: P, bot: P + IH, labels, rows: [], diff: !!opts.diff };
    const endl = [];
    series.forEach(s => {
      if (s.flat) {
        const y = sy(s.flat);
        g += `<line class="fadein" x1="${P}" x2="${W - 14}" y1="${y}" y2="${y}" stroke="${GRAY}" stroke-width="1.3" stroke-dasharray="5 4"/>`;
        g += `<text class="fadein" x="${W - 16}" y="${y - 6}" text-anchor="end" font-size="10" font-style="italic" fill="${INK2}" font-family="Inter, sans-serif">${s.name} · ${s.fmtFlat ? s.fmtFlat(s.flat) : s.flat}</text>`;
        meta.rows.push({ name: s.name, color: GRAY, ys: labels.map(() => y), vals: labels.map(() => s.flat), fmt: s.fmt || "n" });
        return;
      }
      const d = s.data.map((v, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(" ");
      if (s.fill && !sparse) {
        const gid = `ar${id}f${meta.rows.length}`;
        const sc = s.color || OXFORD;
        g += `<linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sc}" stop-opacity="0.18"/><stop offset="0.55" stop-color="${sc}" stop-opacity="0.05"/><stop offset="1" stop-color="${sc}" stop-opacity="0"/></linearGradient>`;
        g += `<path class="fadein" d="${d} L${sx(s.data.length - 1).toFixed(1)} ${P + IH} L${P} ${P + IH} Z" fill="url(#${gid})" stroke="none"/>`;
      }
      const solid = !s.dash;
      g += `<path ${solid ? 'pathLength="1" class="draw"' : 'class="fadein"'} d="${d}" fill="none" stroke="${s.color || OXFORD}" stroke-width="${s.width || 2}" ${s.dash ? `stroke-dasharray="${s.dash}"` : ""}/>`;
      const li = s.data.length - 1, lx = sx(li), ly = sy(s.data[li]);
      g += `<circle class="lighthalo" cx="${lx.toFixed(1)}" cy="${ly.toFixed(1)}" r="6" fill="${s.color || OXFORD}" opacity="0.15"/>`;
      g += dot(lx, ly, 3.2, s.color || OXFORD);
      const lbl = s.fmtLast ? s.fmtLast(s.data[li]) : (s.fmt === "rd" ? fmtVal(s.data[li], "rd") : s.data[li]);
      if (sparse) {
        s.data.forEach((v, i) => {
          g += `<text class="fadein" x="${sx(i).toFixed(1)}" y="${(sy(v) - 10).toFixed(1)}" text-anchor="middle" font-size="10.5" font-weight="600" fill="${s.color || OXFORD}" stroke="#ffffff" stroke-width="3" paint-order="stroke" font-family="${MONO}">${s.fmtLast ? s.fmtLast(v) : (s.fmt === "rd" ? fmtVal(v, "rd") : v)}</text>`;
        });
      } else {
        endl.push({ x: lx, y: ly, text: lbl, color: s.color || OXFORD, anchor: "end", dx: -7 });
        if (opts.bookends && !endl.some(l => l.anchor === "start" && l.color === s.color)) {
          endl.push({ x: sx(0), y: sy(s.data[0]), text: s.fmtLast ? s.fmtLast(s.data[0]) : (s.fmt === "rd" ? fmtVal(s.data[0], "rd") : s.data[0]), color: s.color || OXFORD, anchor: "start", dx: 7 });
        }
      }
      meta.rows.push({ name: s.name || "Serie", color: s.color || OXFORD, ys: s.data.map(v => +sy(v).toFixed(1)), vals: s.data, fmt: s.fmt || "n" });
    });
    endl.sort((a, b) => a.y - b.y);
    for (let i = 1; i < endl.length; i++) {
      if (endl[i].y - endl[i - 1].y < 13) endl[i].y = endl[i - 1].y + 13;
    }
    endl.forEach(l => {
      g += `<text class="fadein" x="${(l.x + l.dx).toFixed(1)}" y="${(l.y - 9).toFixed(1)}" text-anchor="${l.anchor}" font-size="10.5" font-weight="600" fill="${l.color}" stroke="#ffffff" stroke-width="3" paint-order="stroke" font-family="${MONO}">${l.text}</text>`;
    });
    if (opts.base !== undefined && opts.base > min && opts.base < max) {
      const by = sy(opts.base);
      g += `<line class="fadein" x1="${P}" x2="${W - 14}" y1="${by.toFixed(1)}" y2="${by.toFixed(1)}" stroke="${SOFT}" stroke-width="1" stroke-dasharray="2 3" opacity="0.75"/>`;
      g += `<text class="fadein" x="${W - 16}" y="${(by - 4).toFixed(1)}" text-anchor="end" font-size="8.5" letter-spacing="0.5" fill="${SOFT}" font-family="${MONO}">base ${fmtTick(opts.base)}</text>`;
    }
    g += `<line class="xhair" x1="0" x2="0" y1="${P}" y2="${P + IH}" stroke="#c7cad4" stroke-width="1" stroke-dasharray="3 3" opacity="0"/>`;
    meta.rows.forEach(r => { g += `<circle class="xdot" cx="0" cy="0" r="3.4" fill="${r.color}" stroke="#fff" stroke-width="1.5" opacity="0"/>`; });
    const dataAttr = encodeURIComponent(JSON.stringify(meta));
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${escAttr(opts.label || "gráfico de evolución")}" data-chart="${dataAttr}">${g}</svg>`;
  }

  function fmtVal(v, f) {
    if (f === "rd") return "RD$ " + (+v).toFixed(2);
    if (f === "i") return String(Math.round(v));
    return (+v).toFixed(1);
  }

  function bindCharts() {
    document.querySelectorAll("svg[data-chart]").forEach(svg => {
      const box = svg.parentElement;
      if (!box || box.querySelector(":scope > .charttip")) return;
      const meta = JSON.parse(decodeURIComponent(svg.getAttribute("data-chart")));
      const tip = document.createElement("div");
      tip.className = "charttip";
      box.appendChild(tip);
      const dots = svg.querySelectorAll(".xdot");
      svg.addEventListener("mousemove", e => {
        const rect = svg.getBoundingClientRect();
        const scale = rect.width / meta.w;
        const vx = (e.clientX - rect.left) / rect.width * meta.w;
        let bi = 0, bd = Infinity;
        meta.labels.forEach((_, i) => { const d = Math.abs((i / (meta.labels.length - 1)) * (meta.w - 56) + 42 - vx); if (d < bd) { bd = d; bi = i; } });
        const x = 42 + (bi / (meta.labels.length - 1)) * (meta.w - 56);
        const hair = svg.querySelector(".xhair");
        hair.setAttribute("x1", x); hair.setAttribute("x2", x); hair.setAttribute("opacity", "1");
        let minY = Infinity;
        meta.rows.forEach((r, j) => {
          const cy = r.ys[bi];
          if (cy < minY) minY = cy;
          dots[j].setAttribute("cx", x); dots[j].setAttribute("cy", cy); dots[j].setAttribute("opacity", "1");
        });
        let tipHTML = `<div class="charttip__t">${meta.labels[bi]}</div>` +
          meta.rows.map(r => `<div class="charttip__row"><i style="background:${r.color}"></i>${r.name}<span class="v">${fmtVal(r.vals[bi], r.fmt)}</span></div>`).join("");
        if (meta.diff && meta.rows.length >= 2) {
          const gap = meta.rows[0].vals[bi] - meta.rows[1].vals[bi];
          tipHTML += `<div class="charttip__row"><i style="background:#a3a6b1"></i>Brecha<span class="v">${(gap >= 0 ? "+" : "") + gap.toFixed(1)} pts</span></div>`;
        }
        tip.innerHTML = tipHTML;
        const px = x * scale, py = minY / meta.h * rect.height;
        tip.style.left = px + "px";
        tip.style.top = py + "px";
        tip.style.transform = px > rect.width - 100 ? "translate(-100%,-115%)" : px < 100 ? "translate(0,-115%)" : "translate(-50%,-115%)";
        tip.style.opacity = "1";
      });
      svg.addEventListener("mouseleave", () => {
        tip.style.opacity = "0";
        svg.querySelector(".xhair").setAttribute("opacity", "0");
        dots.forEach(d => d.setAttribute("opacity", "0"));
      });
    });
  }

  function spark(data, color, w = 60, h = 20) {
    const min = Math.min(...data), max = Math.max(...data), P = 3;
    const sx = i => P + ((w - 2 * P) / (data.length - 1)) * i;
    const sy = v => h - P - ((v - min) / (max - min || 1)) * (h - 2 * P);
    const d = data.map((v, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(" ");
    return `<svg viewBox="0 0 ${w} ${h}">${d ? `<path pathLength="1" class="draw" d="${d}" fill="none" stroke="${color}" stroke-width="1.4"/>` : ""}${dot(sx(data.length - 1), sy(data[data.length - 1]), 2.2, color)}</svg>`;
  }

  function trendBadge(t) {
    const map = { ascendente: ["pill--up", "▲", "ALZA"], descendente: ["pill--down", "▼", "BAJA"], estable: ["pill--flat", "—", "ESTABLE"] };
    const [cls, g, lbl] = map[t];
    const win = `Serie completa ${D.meses[0].toLowerCase()}–${D.meses[D.meses.length - 1].toLowerCase()} · Δ sem refleja solo la última semana`;
    return `<span class="pill ${cls}" title="${win}">${g} ${lbl}</span>`;
  }

  function volBadge(v) {
    const c = H.claseVol(v);
    const cls = c === "alta" ? "pill--vol-high" : c === "moderada" ? "pill--vol-mod" : "pill--vol-low";
    return `<span class="pill ${cls}">VOL ${(+v).toFixed(1)} ${c.toUpperCase()}</span>`;
  }

  function deltaHTML(v, dec = 1, suffix = "") {
    const cls = v > 0 ? "delta-up" : v < 0 ? "delta-down" : "delta-flat";
    const g = v > 0 ? "▲" : v < 0 ? "▼" : "—";
    return `<span class="${cls} mono">${g} ${v > 0 ? "+" : ""}${v.toFixed(dec)}${suffix}</span>`;
  }

  function pagehead(title, right, intro) {
    return `<div class="pagehead"><div class="pagehead__row"><h1>${title}</h1>${right ? `<span class="right">${right}</span>` : ""}</div>${intro ? `<blockquote class="bqintro">${intro}</blockquote>` : ""}</div>`;
  }

  function stats(items, tags) {
    return `<div class="stats">${tags && tags.length ? `<div class="stats__tags"><span class="chips">${tags.map(t => `<span class="chip">${t}</span>`).join("")}</span></div>` : ""}` + items.map(s =>
      `<div class="stat">
        <span class="stat__label">${s.label}${s.info ? `<span class="stat__info" title="${escAttr(s.info)}">i</span>` : ""}</span>
        <div class="stat__main">
          <div class="stat__col">
            <span class="stat__value">${s.value}</span>
            ${s.delta ? `<span class="stat__delta ${s.cls || ""}">${s.delta}</span>` : ""}
          </div>
          ${s.viz ? `<span class="stat__viz">${s.viz}</span>` : ""}
        </div>
        ${s.bar ? statBar(s.bar, s.barLabel) : ""}
      </div>`
    ).join("") + `</div>`;
  }

  function statBar(segs, label) {
    const total = segs.reduce((a, s) => a + s[0], 0) || 1;
    return `<div class="stat__bar" role="img" aria-label="${escAttr(label)}">${segs.map(s =>
      `<i style="width:${(s[0] / total * 100).toFixed(2)}%;background:${s[1]}" title="${escAttr(s[2])}"></i>`).join("")}</div>`;
  }

  function kpiSpark(data, color, w = 88, h = 38) {
    const min = Math.min(...data), max = Math.max(...data), P = 3;
    const sx = i => P + ((w - 2 * P) / (data.length - 1)) * i;
    const sy = v => h - P - ((v - min) / (max - min || 1)) * (h - 2 * P);
    const pts = data.map((v, i) => `${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(" ");
    const id = "kg" + (++uid);
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}">
      <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".18"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs>
      <polygon points="${P},${h - P} ${pts} ${sx(data.length - 1).toFixed(1)},${h - P}" fill="url(#${id})"/>
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"/>
      <circle cx="${sx(data.length - 1).toFixed(1)}" cy="${sy(data[data.length - 1]).toFixed(1)}" r="4.5" fill="${color}" opacity="0.15"/>
      <circle cx="${sx(data.length - 1).toFixed(1)}" cy="${sy(data[data.length - 1]).toFixed(1)}" r="2.3" fill="${color}"/>
    </svg>`;
  }

  function kpiVolLine(w = 88, h = 38) {
    const vols = D.productos.map(p => p.vol);
    const step = Math.max(1, Math.floor(vols.length / 13));
    const data = [];
    for (let i = 0; i < vols.length; i += step) data.push(vols[i]);
    const min = Math.min(...data), max = Math.max(...data), P = 3;
    const sx = i => P + ((w - 2 * P) / (data.length - 1)) * i;
    const sy = v => h - P - ((v - min) / (max - min || 1)) * (h - 2 * P);
    const d = data.map((v, i) => `${i ? "L" : "M"}${sx(i).toFixed(1)} ${sy(v).toFixed(1)}`).join(" ");
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" aria-hidden="true"><path d="${d}" fill="none" stroke="${IRIS}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>${dot(sx(data.length - 1), sy(data[data.length - 1]), 2.2, IRIS)}</svg>`;
  }

  function precioSerie() {
    return D.meses.map((_, i) => +(D.productos.reduce((a, p) => a + p.serie[i], 0) / D.productos.length).toFixed(1));
  }

  function insight(prods, gen, scoped) {
    const last = gen.length - 1;
    const gap = +(gen[last] - D.intlGeneral[last]).toFixed(1);
    const sem = +((gen[last] / gen[last - 1] - 1) * 100).toFixed(1);
    const ytd = H.varYTD(gen);
    const cls = ytd > 1 ? "up" : ytd < -1 ? "down" : "";
    const state = ytd > 1 ? "Mercado en alza" : ytd < -1 ? "Mercado a la baja" : "Mercado estable";
    const topCat = D.categorias.slice().sort((a, b) => H.varYTD(b.idx) - H.varYTD(a.idx))[0];
    const body = scoped
      ? `El índice doméstico ${gap >= 0 ? "supera al" : "queda por debajo del"} índice internacional en <b>${Math.abs(gap).toFixed(1)} puntos</b>, impulsado principalmente por <b>${topCat.nombre.toLowerCase()}</b>.`
      : `El índice general ${sem > 0.05 ? "sube" : sem < -0.05 ? "cede" : "se mantiene en"} <b>${H.pct(Math.abs(sem))}</b> esta semana, impulsado principalmente por <b>${topCat.nombre.toLowerCase()}</b>.`;
    const movers = prods.slice().sort((a, b) => Math.abs(H.deltaSem(b)) - Math.abs(H.deltaSem(a))).slice(0, 3);
    return `<div class="insight${cls ? " insight--" + cls : ""}">
      <span class="insight__icon" aria-hidden="true"><svg viewBox="0 0 16 16"><path d="M13 3C7.5 3 4 6.2 4 10.5c0 1 .2 1.9.5 2.7.7.2 1.4.3 2.2.3C11 13.5 13 9.3 13 3z"/><path d="M4.5 13.5C6.8 9.8 9.4 7 12.6 4.6"/></svg></span>
      <span class="insight__tag ${cls}">${state}</span>
      <div class="insight__wrap">
        <p class="insight__body">${body}</p>
        <div class="insight__movers">${movers.map(p => {
          const d = H.deltaSem(p);
          return `<a class="mover ${d >= 0 ? "up" : "down"}" href="#/mercado/producto/${p.id}" title="Abrir ${p.nombre}">${d >= 0 ? "↑" : "↓"} ${p.nombre} ${d >= 0 ? "+" : ""}${d.toFixed(2)}</a>`;
        }).join("")}</div>
      </div>
      <button class="insight__next" type="button" data-jump="sec-indice" title="Ir al índice" aria-label="Ir al índice"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M4.5 2.5 8 6l-3.5 3.5"/></svg></button>
    </div>`;
  }

  function pagenavHTML(links) {
    return `<nav class="pagenav" id="pagenav" aria-label="Secciones de la página"><div class="pagenav__in">` +
      links.map(s => `<button class="pagenav__link" type="button" data-jump="${s[0]}">${s[1]}</button>`).join("") +
      `</div></nav>`;
  }

  function rangetools() {
    const opts = [["1m", "1M"], ["6m", "6M"], ["ytd", "YTD"], ["1a", "1A"], ["todo", "Todo"]];
    return `<span class="rangetabs" id="rangetabs">` + opts.map(o =>
      `<button class="rangetab${boardRange === o[0] ? " is-active" : ""}" type="button" data-range="${o[0]}">${o[1]}</button>`).join("") + `</span>`;
  }

  function activeCols() { return Object.values(boardCols).filter(Boolean).length; }

  function escAttr(s) { return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;"); }

  /* — Aviso (toast): confirmación mono, esquina inferior derecha — */
  function toast(msg) {
    let box = document.getElementById("toasts");
    if (!box) { box = document.createElement("div"); box.id = "toasts"; document.body.appendChild(box); }
    const t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = msg;
    box.appendChild(t);
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add("is-in")));
    setTimeout(() => { t.classList.remove("is-in"); setTimeout(() => t.remove(), 260); }, 2600);
  }

  /* — Siluetas de carga: misma geometría que el componente final — */
  function skelStats() {
    const card = `<div class="stat"><span class="skel skel--label" style="width:46%"></span><span class="skel skel--num" style="width:58%"></span><span class="skel skel--text" style="width:38%"></span></div>`;
    return `<div class="stats">${card}${card}${card}${card}</div>`;
  }
  function skelInsight() {
    return `<div class="insight"><span class="skel skel--label" style="width:4.6rem"></span><div style="flex:1;display:flex;flex-direction:column;gap:0.45rem"><span class="skel skel--text" style="width:92%"></span><span class="skel skel--text" style="width:55%"></span></div></div>`;
  }
  function skelFig() {
    return `<div class="figbox figbox--mod"><div class="figbox__head"><span class="skel skel--label" style="width:32%"></span></div><div class="figbox__body"><div class="skel skel--chart"></div></div></div>`;
  }
  function skelFigs2() {
    return `<div class="figbox figbox--mod"><div class="figbox__head"><span class="skel skel--label" style="width:32%"></span></div><div class="figbox__body"><div class="skel" style="height:96px;border-radius:8px"></div></div></div>` + skelFig();
  }
  function skelTable() {
    return `<div class="tmodule"><div class="tmodule__head"><span class="skel skel--label" style="width:30%"></span></div><div class="tmodule__body"><div style="padding:0.55rem 0.85rem;display:flex;flex-direction:column;gap:0.4rem">${`<span class="skel skel--row"></span>`.repeat(10)}</div></div></div>`;
  }

  /* — Consultas por componente: cada sección resuelve con su propia latencia,
       en orden de lectura, y el contenido entra en sitio con un fade — */
  let qMap = null, qTimers = [];
  function resolveQueries() {
    qTimers.forEach(clearTimeout);
    qTimers = [];
    document.querySelectorAll("[data-q]").forEach((host, i) => {
      const build = qMap && qMap[host.getAttribute("data-q")];
      if (!build) return;
      const delay = Math.round(Math.min(680, 240 + i * 110 + Math.random() * 140));
      qTimers.push(setTimeout(() => {
        host.innerHTML = build();
        host.classList.add("is-in");
        bindCharts();
        if (host.querySelector("#board-table")) bindBoardTable();
        if (host.querySelector("#rangetabs")) bindRangetabs();
        animateCounts(host);
      }, delay));
    });
  }

  function animateCounts(scope) {
    if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    scope.querySelectorAll(".stat__value").forEach(el => {
      const txt = el.textContent;
      if (/[–/×]/.test(txt)) return;
      const m = txt.match(/^([^\d\-]*)(-?\d+(?:\.\d+)?)(.*)$/);
      if (!m) return;
      const target = parseFloat(m[2]);
      if (!isFinite(target) || Math.abs(target) > 100000) return;
      const dec = (m[2].split(".")[1] || "").length;
      const pre = m[1], post = m[3], t0 = performance.now(), dur = 560;
      let finished = false;
      const done = () => { finished = true; el.textContent = txt; };
      const step = t => {
        if (finished) return;
        const k = Math.max(0, Math.min(1, (t - t0) / dur));
        const e = 1 - Math.pow(1 - k, 3);
        el.textContent = pre + (target * e).toFixed(dec) + post;
        if (k < 1) requestAnimationFrame(step);
        else done();
      };
      requestAnimationFrame(step);
      setTimeout(done, dur + 60);
    });
  }

  function sparkTitle(p) {
    const s = p.serie;
    return `Serie 8m · mín ${H.fmtN(Math.min(...s))} · máx ${H.fmtN(Math.max(...s))} · actual ${H.fmtN(H.actual(p))}`;
  }

  function emptyBoxHTML(msg, fa) {
    return `<div class="emptybox">
      <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="9" cy="9" r="5.5"/><path d="M13.2 13.2 17.5 17.5"/></svg>
      <div class="emptybox__t">${msg}</div>
      ${fa ? `<button class="tbtn" type="button" id="clear-filters">Quitar filtros</button>` : ""}
    </div>`;
  }

  function passFilter(p) {
    if (tfilter.trend !== "all") {
      const t = H.tendencia(p);
      if (tfilter.trend === "up" && t !== "ascendente") return false;
      if (tfilter.trend === "down" && t !== "descendente") return false;
      if (tfilter.trend === "flat" && t !== "estable") return false;
    }
    const nq = norm(tfilter.q.trim());
    if (nq && !norm(p.nombre).includes(nq)) return false;
    return true;
  }

  function filterActive() { return !!(tfilter.q.trim() || tfilter.trend !== "all"); }

  const PLAZA_SIG = { nuevo: "MN", vjuana: "VJ", stgo: "SJ", scrist: "SC", vega: "VG", hig: "HY" };
  function activeMercados() { return D.mercados.filter(m => params.plazas.includes(m.id)); }
  function plazaSub() { return scope === "nacional" && params.plazas.length > 0 && params.plazas.length < D.mercados.length; }
  function plazaEmpty() { return scope === "nacional" && params.plazas.length === 0; }
  const EMPTY_MSG = "Sin datos — la cobertura actual no incluye plazas.";
  function plazaNote(ms) {
    return ms.length === 1
      ? ` · plaza única — ${ms[0].nombre}`
      : ` · agregado de ${ms.length} plazas — ${ms.map(m => m.nombre).join(", ")}`;
  }

  function tablebarHTML(meta, opts = {}) {
    const trends = [["all", "Todos"], ["up", "<span class='tu'>▲</span> Alza"], ["down", "<span class='td'>▼</span> Baja"], ["flat", "<span class='tf'>—</span> Estable"]];
    const isTable = boardView === "tabla" || boardView === "compacta";
    const cur = VIEWOPTS.find(v => v[0] === boardView) || VIEWOPTS[0];
    let actions = "";
    if (opts.vista) actions += `<div style="position:relative">
      <button class="tbtn" id="viewtoggle" type="button" title="Vista de productos" aria-haspopup="true" aria-expanded="false">${cur[2]}${cur[1]}</button>
      <div class="viewmenu" id="viewmenu">
        <div class="viewmenu__t">Vista de productos</div>
        ${VIEWOPTS.map(v => `<button class="viewopt${boardView === v[0] ? " is-active" : ""}" type="button" data-view="${v[0]}">${v[2]}${v[1]}</button>`).join("")}
      </div>
    </div>`;
    if (isTable && opts.export) actions += `<button class="tbtn" id="exportcsv" type="button" title="Exportar CSV"><svg viewBox="0 0 12 12"><path d="M6 1.5v6M3.5 5.5 6 8l2.5-2.5M2 10.5h8"/></svg>Exportar</button>`;
    if (isTable && opts.customize) actions += `<div style="position:relative">
      <button class="tbtn" id="colstoggle" type="button" aria-haspopup="true" aria-expanded="false"><svg viewBox="0 0 12 12"><circle cx="6" cy="6" r="2.8"/><path d="M6 1.2v1.9M6 8.9v1.9M1.2 6h1.9M8.9 6h1.9M2.7 2.7l1.3 1.3M8 8l1.3 1.3M9.3 2.7 8 4M4 8l-1.3 1.3"/></svg>Personalizar</button>
      <div class="colpick" id="colpick">
        <div class="colpick__t">Columnas visibles</div>
        ${[["producto", "Producto"], ["precio", "Precio"], ["dsem", "Δ sem"], ["tend", "Tendencia"], ["vol", "Vol"], ["rango", "Rango"], ["media", "Media"], ["serie", "Serie 8m"]].map(c => `<label><input type="checkbox" data-col="${c[0]}"${boardCols[c[0]] ? " checked" : ""}>${c[1]}</label>`).join("")}
      </div>
    </div>`;
    if (isTable && opts.fs) actions += `<button class="tbtn" id="tblfs" type="button" title="Pantalla completa"><svg viewBox="0 0 12 12"><path d="M1.5 4.5v-3h3M10.5 7.5v3h-3M10.5 4.5v-3h-3M1.5 7.5v3h3"/></svg></button>`;
    return `<div class="tablebar">
      <span class="tq-wrap${tfilter.q ? " has-val" : ""}"><span class="tq-glyph" aria-hidden="true"><svg viewBox="0 0 14 14"><circle cx="6" cy="6" r="4.2"/><path d="M9.2 9.2 12 12"/></svg></span><input class="tq" id="tq" type="text" placeholder="Filtrar producto…" value="${escAttr(tfilter.q)}" autocomplete="off" spellcheck="false"><button class="tq-x" id="tqx" type="button" title="Limpiar filtro" aria-label="Limpiar filtro de producto" ${tfilter.q ? "" : "hidden"}><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2 2 8"/></svg></button></span>
      <span class="tchips" id="ttrend">${trends.map(t => `<button class="tchip${tfilter.trend === t[0] ? " is-active" : ""}" type="button" data-trend="${t[0]}">${t[1]}</button>`).join("")}</span>
      ${meta ? `<span class="tablebar__meta">${meta}</span>` : ""}
      <div class="tablebar__actions">${actions}</div>
    </div>`;
  }

  function exportCSV(prods) {
    const rows = [["Producto", "Categoria", "Precio RD$", "Delta sem", "Tendencia", "Volatilidad", "Rango min", "Rango max", "Media"]];
    (prods || []).forEach(p => {
      const r = rangoP(p);
      const media = H.mediaMercados(p, activeMercados());
      rows.push([p.nombre, H.cat(p.cat).nombre, H.actual(p).toFixed(2), H.deltaSem(p).toFixed(2), H.tendencia(p), p.vol, r.mn == null ? "" : r.mn, r.mx == null ? "" : r.mx, media == null ? "" : media.toFixed(2)]);
    });
    const csv = rows.map(r => r.map(x => `"${String(x).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "bremontix-mercado.csv";
    a.click();
    URL.revokeObjectURL(a.href);
    toast("CSV exportado — " + (prods ? prods.length : 0) + " productos");
  }

  function fig(tag, caption, body, legendHTML, foot, tools, inHead) {
    const kebab = inHead ? `<div class="figkebab-wrap"><button class="figkebab" id="figkebab" type="button" title="Opciones de la figura" aria-haspopup="true" aria-expanded="false"><svg viewBox="0 0 12 12" aria-hidden="true"><circle cx="6" cy="2.2" r="1.15"/><circle cx="6" cy="6" r="1.15"/><circle cx="6" cy="9.8" r="1.15"/></svg></button><div class="viewmenu" id="figmenu"><div class="viewmenu__t">Figura</div><button class="viewopt" type="button" data-figact="fs"><svg viewBox="0 0 12 12"><path d="M1.5 4.5v-3h3M10.5 7.5v3h-3M10.5 4.5v-3h-3M1.5 7.5v3h3"/></svg>Pantalla completa</button><button class="viewopt" type="button" data-figact="csv"><svg viewBox="0 0 12 12"><path d="M6 1.5v6M3.5 5.5 6 8l2.5-2.5M2 10.5h8"/></svg>Descargar datos</button></div></div>` : "";
    const cap = `<span class="figcap__tag">Fig. ${tag}</span><span class="figcap__caption">${caption}</span>${legendHTML ? `<span class="figcap__legend">${legendHTML}</span>` : ""}${tools ? `<span class="figcap__tools">${tools}</span>` : ""}${kebab}`;
    if (inHead) return `<div class="figbox figbox--mod"><div class="figbox__head"><div class="figcap">${cap}</div></div><div class="figbox__body">${body}</div>${foot ? `<span class="figfoot">${foot}</span>` : ""}</div>`;
    return `<div class="figcap">${cap}</div>
      <div class="figbox">${body}${foot ? `<span class="figfoot">${foot}</span>` : ""}</div>`;
  }

  const legend = pairs => pairs.map(p => `<span><i style="border-color:${p[0]}${p[1] ? ";border-top-style:dashed" : ""}"></i>${p[2]}</span>`).join("");

  function tmoduleHTML(bar, body) {
    return `<div class="tmodule">${bar ? `<div class="tmodule__head">${bar}</div>` : ""}<div class="tmodule__body">${body}</div></div>`;
  }

  function pageList(cur, pages) {
    if (pages <= 7) return [...Array(pages)].map((_, i) => i + 1);
    const set = new Set([1, 2, cur - 1, cur, cur + 1, pages - 1, pages]);
    const arr = [...set].filter(p => p >= 1 && p <= pages).sort((a, b) => a - b);
    const out = [];
    let prev = 0;
    arr.forEach(p => { if (p - prev > 1) out.push("…"); out.push(p); prev = p; });
    return out;
  }

  function tpagerHTML(total) {
    const pages = Math.max(1, Math.ceil(total / TPSIZE));
    if (pPage > pages) pPage = pages;
    if (pages <= 1) return "";
    const nums = pageList(pPage, pages).map(p => p === "…"
      ? `<span class="tpager__gap">…</span>`
      : `<button class="tpager__num${p === pPage ? " is-active" : ""}" type="button" data-ppage="${p}">${p}</button>`).join("");
    return `<div class="tpager" data-pages="${pages}">
      <span class="tpager__meta">Pág. ${pPage} de ${pages} · ${total} productos</span>
      <div class="tpager__ctrl">
        <button class="tpager__btn" type="button" data-ppage="prev" title="Página anterior"${pPage === 1 ? " disabled" : ""}>‹</button>
        <span class="tpager__pages">${nums}</span>
        <button class="tpager__btn" type="button" data-ppage="next" title="Página siguiente"${pPage === pages ? " disabled" : ""}>›</button>
      </div>
    </div>`;
  }

  function pageSlice(list) { return list.slice((pPage - 1) * TPSIZE, pPage * TPSIZE); }

  function rangoP(p) {
    const vals = activeMercados().map(m => p.mercados[m.id]);
    if (!vals.length) return { mn: null, mx: null };
    return { mn: Math.min(...vals.map(v => v[0])), mx: Math.max(...vals.map(v => v[1])) };
  }

  function buildNav() {
    const sec = (t, cls = "") => `<span class="snav__sec${cls}">${t}</span>`;
    const val = v => v ? `<span class="val${String(v).trim().startsWith("-") ? " is-down" : ""}">${v}</span>` : "";
    let html = sec("Mercado");
    html += `<a class="snav__item" data-route="mercado" href="#/mercado">${ICO.mercado}<span class="snav__label">Mercado</span></a>`;
    D.categorias.forEach(c => {
      html += `<a class="snav__item" data-route="categoria" data-cat="${c.id}" href="#/mercado/categoria/${c.id}">${ICO[c.id]}<span class="snav__label">${c.nombre}</span>${val(H.pct(H.varYTD(c.idx)))}</a>`;
    });
    html += sec("Comparación");
    html += `<a class="snav__item" data-route="benchmark" href="#/benchmark">${ICO.benchmark}<span class="snav__label">Benchmark</span></a>`;
    html += sec("Herramientas");
    html += `<a class="snav__item" data-route="herramientas" href="#/herramientas">${ICO.params}<span class="snav__label">Parámetros</span></a>`;
    html += `<div class="snav__group" id="coleccion-group">`;
    html += `<a class="snav__item snav__item--parent" data-route="coleccion" href="#/herramientas/coleccion" id="coleccion-toggle">${ICO.coleccion}<span class="snav__label">Colección</span></a>`;
    html += `<div class="snav__sub" id="coleccion-sub">`;
    html += `<a class="snav__item snav__item--sub" data-route="coleccion" data-sub="consultar" href="#/herramientas/coleccion/consultar"><span class="snav__label">Consultar</span></a>`;
    html += `<a class="snav__item snav__item--sub" data-route="coleccion" data-sub="gestionar" href="#/herramientas/coleccion/gestionar"><span class="snav__label">Gestionar</span></a>`;
    html += `</div></div>`;
    html += sec("Documento");
    html += `<a class="snav__item" data-route="metodo" href="#/metodo">${ICO.metodo}<span class="snav__label">Método</span></a>`;
    html += sec("Sistema", " snav__sec--foot");
    html += `<a class="snav__item" data-route="cuenta" href="#/cuenta">${ICO.cuenta}<span class="snav__label">Cuenta</span></a>`;
    html += `<a class="snav__item" data-route="docs" href="#/docs">${ICO.docs}<span class="snav__label">Documentación</span></a>`;
    html += `<a class="snav__item" data-route="acerca" href="#/acerca">${ICO.acerca}<span class="snav__label">Acerca de</span></a>`;
    document.getElementById("snav").innerHTML = html;
    const colGrp = document.getElementById("coleccion-group");
    document.getElementById("coleccion-toggle").addEventListener("click", e => {
      e.preventDefault();
      colOpen = !colGrp.classList.contains("is-open");
      colGrp.classList.toggle("is-open", colOpen);
    });
  }

  function setActive(route, cat) {
    document.querySelectorAll(".snav__item").forEach(a => {
      const r = a.getAttribute("data-route"), c = a.getAttribute("data-cat"), s = a.getAttribute("data-sub");
      a.classList.toggle("is-active", r === route && (!c || c === cat) && (!s || s === cat));
    });
    const grp = document.getElementById("coleccion-group");
    if (grp) {
      if (route === "coleccion") grp.classList.toggle("is-open", colOpen === null ? true : colOpen);
      else { grp.classList.remove("is-open"); colOpen = null; }
    }
  }

  function setCrumb(parts) {
    document.getElementById("crumb").innerHTML =
      parts.map((p, i) => i === parts.length - 1 ? `<b>${p}</b>` : `<span>${p}</span>`).join(`<span class="sep">/</span>`);
  }

  function productRow(p) {
    const r = rangoP(p);
    let tds = "";
    if (boardCols.producto) tds += `<td><a class="product-link" href="#/mercado/producto/${p.id}"><img class="pthumb" src="${p.img}" alt="" loading="lazy">${p.nombre}</a></td>`;
    if (boardCols.precio) tds += `<td class="num">${H.fmtRD(H.actual(p))}</td>`;
    if (boardCols.dsem) tds += `<td class="num">${deltaHTML(H.deltaSem(p), 2)}</td>`;
    if (boardCols.tend) tds += `<td>${trendBadge(H.tendencia(p))}</td>`;
    if (boardCols.vol) tds += `<td class="num">${(+p.vol).toFixed(1)}</td>`;
    if (boardCols.rango) tds += `<td class="num">${H.fmtN(r.mn)}–${H.fmtN(r.mx)}</td>`;
    if (boardCols.media) tds += `<td class="num">${H.mediaMercados(p, activeMercados()).toFixed(2)}</td>`;
    if (boardCols.serie) tds += `<td class="sparkcell" title="${escAttr(sparkTitle(p))}">${spark(p.serie, H.tendencia(p) === "descendente" ? BAJA : STEEL)}</td>`;
    return `<tr>${tds}</tr>`;
  }

  function boardHead() {
    const thSort = (key, label) => {
      const active = tsort.key === key;
      return `<th class="num th-sort${active ? " is-sorted" : ""}" data-sort="${key}" title="Ordenar"${active ? ` aria-sort="${tsort.dir === 1 ? "ascending" : "descending"}"` : ""}>${label}${active ? `<span class="th-arrow">${tsort.dir === 1 ? " ▲" : " ▼"}</span>` : ""}</th>`;
    };
    let h = "";
    if (boardCols.producto) h += `<th>Producto</th>`;
    if (boardCols.precio) h += thSort("precio", "Precio RD$/unidad");
    if (boardCols.dsem) h += thSort("dsem", "Δ sem");
    if (boardCols.tend) h += `<th title="Dirección de la serie completa — Δ sem refleja solo la última semana">Tend</th>`;
    if (boardCols.vol) h += thSort("vol", "Vol");
    if (boardCols.rango) h += thSort("rango", "Rango");
    if (boardCols.media) h += thSort("media", "Media");
    if (boardCols.serie) h += `<th>Serie 8m</th>`;
    return `<thead><tr>${h}</tr></thead>`;
  }

  function sortVal(p, key) {
    if (key === "precio") return H.actual(p);
    if (key === "dsem") return H.deltaSem(p);
    if (key === "vol") return p.vol;
    if (key === "rango") return rangoP(p).mn;
    if (key === "media") return H.mediaMercados(p, activeMercados());
    return 0;
  }

  function sortProds(arr) {
    if (!tsort.key) return arr;
    return arr.slice().sort((a, b) => (sortVal(a, tsort.key) - sortVal(b, tsort.key)) * tsort.dir);
  }

  function squarify(items, x, y, w, h, out) {
    if (!items.length || w <= 0 || h <= 0) return;
    if (items.length === 1) { out.push({ it: items[0], x, y, w, h }); return; }
    const area = w * h;
    const total = items.reduce((a, i) => a + i.v, 0);
    const areas = items.map(i => area * i.v / total);
    const side = Math.min(w, h);
    let bestK = 1, bestWorst = Infinity;
    for (let k = 1; k <= items.length; k++) {
      const rowArea = areas.slice(0, k).reduce((a, b) => a + b, 0);
      const thick = rowArea / side;
      let worst = 0;
      for (let j = 0; j < k; j++) {
        const len = areas[j] / thick;
        worst = Math.max(worst, Math.max(len / thick, thick / len));
      }
      if (worst <= bestWorst) { bestWorst = worst; bestK = k; } else break;
    }
    const thick = areas.slice(0, bestK).reduce((a, b) => a + b, 0) / side;
    let off = 0;
    for (let j = 0; j < bestK; j++) {
      const len = areas[j] / thick;
      if (w >= h) out.push({ it: items[j], x, y: y + off, w: thick, h: len });
      else out.push({ it: items[j], x: x + off, y, w: len, h: thick });
      off += len;
    }
    if (w >= h) squarify(items.slice(bestK), x + thick, y, w - thick, h, out);
    else squarify(items.slice(bestK), x, y + thick, w, h - thick, out);
  }

  function treemapHTML(prods) {
    if (!prods.length) return emptyBoxHTML("Sin productos para el filtro actual.", filterActive());
    const TW = 780, TH = 340, PAD = 2.5;
    const items = prods.map(p => ({ p, d: H.deltaSem(p), v: 1 })).sort((a, b) => Math.abs(b.d) - Math.abs(a.d));
    const maxAbs = Math.max(...items.map(i => Math.abs(i.d)), 0.001);
    const cls = d => d === 0 ? "hm__cf" : d > 0 ? `hm__u${Math.min(5, Math.max(1, Math.ceil(d / maxAbs * 5)))}` : `hm__b${Math.min(5, Math.max(1, Math.ceil(-d / maxAbs * 5)))}`;
    const out = [];
    squarify(items, 0, 0, TW, TH, out);
    const g = out.map(r => {
      const p = r.it.p, d = r.it.d;
      const x = r.x + PAD, y = r.y + PAD, w = Math.max(0, r.w - 2 * PAD), h = Math.max(0, r.h - 2 * PAD);
      const arrow = d > 0 ? "▲" : d < 0 ? "▼" : "—";
      const cx = x + w / 2, cy = y + h / 2;
      const budget = Math.max(3, Math.floor((w - 10) / 6.2));
      const nm = p.nombre.length > budget ? p.nombre.slice(0, budget - 1) + "…" : p.nombre;
      const lbl = w < 34 || h < 18
        ? `<text class="tm__arr" x="${cx.toFixed(1)}" y="${(cy + 3.5).toFixed(1)}" text-anchor="middle">${arrow}</text>`
        : h > 46
          ? `<text class="tm__name" x="${cx.toFixed(1)}" y="${(cy - 3).toFixed(1)}" text-anchor="middle">${nm}</text><text class="tm__d" x="${cx.toFixed(1)}" y="${(cy + 11).toFixed(1)}" text-anchor="middle">${arrow} ${Math.abs(d).toFixed(2)}</text>`
          : `<text class="tm__name" x="${cx.toFixed(1)}" y="${(cy + 3.5).toFixed(1)}" text-anchor="middle">${nm}</text>`;
      return `<a class="tm__cell ${cls(d)}" href="#/mercado/producto/${p.id}"><rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" rx="6"/>${lbl}<title>${p.nombre} — RD$ ${H.previo(p).toFixed(2)} → RD$ ${H.actual(p).toFixed(2)} · Δ ${d > 0 ? "+" : ""}${d.toFixed(2)} sem</title></a>`;
    }).join("");
    return `<div class="figbox tmbox"><svg class="tm" viewBox="0 0 ${TW} ${TH}" role="img">${g}</svg></div>`;
  }

  function heatmapHTML(prods) {
    if (!prods.length) return emptyBoxHTML("Sin productos para el filtro actual.", filterActive());
    if (!activeMercados().length) return emptyBoxHTML(EMPTY_MSG, false);
    const ms = activeMercados();
    const deltas = prods.flatMap(p => ms.map(m => plazaDelta(p, m).dif));
    const maxAbs = Math.max(...deltas.map(d => Math.abs(d)), 0.001);
    const cls = d => d === 0 ? "hm__cf" : d > 0 ? `hm__u${Math.min(5, Math.max(1, Math.ceil(d / maxAbs * 5)))}` : `hm__b${Math.min(5, Math.max(1, Math.ceil(-d / maxAbs * 5)))}`;
    const rows = prods.map(p => {
      return `<tr>
        <th class="hm__prod"><a class="product-link" href="#/mercado/producto/${p.id}"><img class="pthumb" src="${p.img}" alt="" loading="lazy">${p.nombre}</a></th>
        ${ms.map(m => {
          const d = plazaDelta(p, m);
          const arrow = d.dif > 0 ? "▲" : d.dif < 0 ? "▼" : "—";
          return `<td class="hm__c ${cls(d.dif)}" title="${p.nombre} · ${m.nombre} — RD$ ${d.prev.toFixed(2)} → RD$ ${d.cur.toFixed(2)} · Δ ${d.dif > 0 ? "+" : ""}${d.dif.toFixed(2)} sem"><a class="hm__v" href="#/mercado/producto/${p.id}"><span class="hm__pr">${H.fmtN(d.prev)} → ${H.fmtN(d.cur)}</span><span class="hm__d">${arrow} ${Math.abs(d.dif).toFixed(2)}</span></a></td>`;
        }).join("")}
      </tr>`;
    }).join("");
    return `<div class="figbox hmbox"><table class="hm">
      <thead><tr><th class="hm__corner"></th>${ms.map(m => `<th class="hm__plaza" title="${m.nombre} · ${m.ciudad}">${m.nombre.replace(/^Mercado (de )?/, "")}</th>`).join("")}</tr></thead>
      <tbody>${rows}</tbody>
    </table></div>`;
  }

  function boardTable(prods, grouped, tools, mod) {
    const shown = prods.filter(passFilter);
    const fa = filterActive();
    if (plazaEmpty()) {
      const meta = fa ? `${shown.length} de ${prods.length} productos` : "";
      const opts = boardView === "treemap" || boardView === "heatmap" ? { vista: true } : { export: true, customize: true, fs: true, vista: true };
      const bar = tools ? tablebarHTML(meta, opts) : "";
      const body = emptyBoxHTML(EMPTY_MSG, false) +
        `<div class="source">Fuente: red de plazas observadas · elaboración propia</div>`;
      return mod ? tmoduleHTML(bar, body) : bar + body;
    }
    if (boardView === "treemap") {
      const meta = fa ? `${shown.length} de ${prods.length} productos` : "";
      const bar = tools ? tablebarHTML(meta, { vista: true }) : "";
      const body = treemapHTML(shown) +
        `<div class="source">Celda = producto · orden: |Δ sem| · color = Δ semanal · datos ilustrativos · Fuente: red de plazas observadas · elaboración propia${plazaSub() ? plazaNote(activeMercados()) : ""}</div>`;
      return mod ? tmoduleHTML(bar, body) : bar + body;
    }
    if (boardView === "heatmap") {
      const meta = fa ? `${shown.length} de ${prods.length} productos` : "";
      const bar = tools ? tablebarHTML(meta, { vista: true }) : "";
      const body = heatmapHTML(shown) +
        `<div class="source">Color = Δ semanal · celda: precio anterior → actual · datos ilustrativos · Fuente: red de plazas observadas · elaboración propia${plazaSub() ? plazaNote(activeMercados()) : ""}</div>`;
      return mod ? tmoduleHTML(bar, body) : bar + body;
    }
    const meta = fa ? `${shown.length} de ${prods.length} productos` : "";
    const head = boardHead();
    const span = activeCols();
    const emptyRow = `<tr><td colspan="${span}">${emptyBoxHTML(`Sin productos${fa ? " para el filtro actual" : ""}.`, fa)}</td></tr>`;
    let rows = "";
    if (grouped) {
      const seq = [];
      D.categorias.forEach(c => {
        const all = prods.filter(p => p.cat === c.id);
        const ps = fa ? all.filter(passFilter) : all;
        if (fa && !ps.length) return;
        sortProds(ps).forEach(p => seq.push({ c, all, ps, p }));
      });
      let lastCat = null;
      pageSlice(seq).forEach(e => {
        if (e.c.id !== lastCat) {
          const volM = +(e.all.reduce((a, p) => a + p.vol, 0) / e.all.length).toFixed(1);
          rows += `<tr class="catrow"><td colspan="${span}"><a class="cat-link catname" href="#/mercado/categoria/${e.c.id}">${e.c.nombre}</a><span class="catstats">${fa ? `${e.ps.length}/${e.all.length} productos` : `${e.ps.length} productos`} · YTD ${H.pct(H.varYTD(e.c.idx))} · vol ${volM}</span></td></tr>`;
          lastCat = e.c.id;
        }
        rows += productRow(e.p);
      });
    } else {
      rows = pageSlice(sortProds(shown)).map(productRow).join("");
    }
    const bar = tools ? tablebarHTML(meta, { export: true, customize: true, fs: true, vista: true }) : "";
    const body = `<div class="tablewrap"><table class="table">${head}<tbody>${rows || emptyRow}</tbody></table></div>${tpagerHTML(shown.length)}
      <div class="source">Precios RD$/unidad · datos ilustrativos · Fuente: red de plazas observadas · elaboración propia${plazaSub() ? plazaNote(activeMercados()) : ""}</div>`;
    return mod ? tmoduleHTML(bar, body) : bar + body;
  }

  function updateBoardTable(keepPage) {
    if (!keepPage) pPage = 1;
    const host = document.getElementById("board-table");
    if (!host) { route(); return; }
    const mode = host.getAttribute("data-board");
    if (mode === "board") host.innerHTML = boardTable(focusProds(D.productos), !focus, true, true);
    else if (mode && mode.startsWith("cat:")) host.innerHTML = boardTable(H.productosDe(mode.slice(4)), false, true, true);
    bindBoardTable();
  }

  function focusProds(base) {
    let prods = base || D.productos;
    if (focus) {
      if (focus.type === "cat") prods = prods.filter(p => p.cat === focus.id);
      else if (focus.type === "prod") prods = prods.filter(p => p.id === focus.id);
    }
    return prods;
  }

  function expand(serie, k = 14) {
    const out = [];
    for (let i = 0; i < serie.length - 1; i++) {
      const a = serie[i], b = serie[i + 1];
      for (let j = 0; j < k; j++) {
        const t = j / k, e = 0.5 - 0.5 * Math.cos(Math.PI * t);
        out.push(+(a + (b - a) * e + Math.sin(j * 0.55 + i * 1.3) * 0.05).toFixed(1));
      }
    }
    out.push(serie[serie.length - 1]);
    return out;
  }

  function plazaSerie(serie, refLast, key) {
    const last = serie[serie.length - 1];
    const f = last ? refLast / last : 1;
    const ph = key.length * 1.7;
    return serie.map((v, i) => +Math.max(0, v * f + Math.sin(i * 0.9 + ph) * Math.min(0.4, v * 0.006)).toFixed(2));
  }

  function plazaDelta(p, m) {
    const cur = p.mercados[m.id][2];
    const base = H.deltaSem(p);
    const wig = Math.sin((p.id + m.id).length * 1.7) * Math.abs(base) * 0.35;
    const dif = +(base + (base >= 0 ? wig : -wig)).toFixed(2);
    const prev = +(cur - dif).toFixed(2);
    return { cur, prev, dif };
  }

  function expandLabels(labels, k = 14) {
    const out = [];
    for (let i = 0; i < labels.length - 1; i++) for (let j = 0; j < k; j++) out.push(labels[i]);
    out.push(labels[labels.length - 1]);
    return out;
  }

  function boardPartBuilders() {
    const scoped = scope === "internacional";
    return {
      stats: () => {
        if (plazaEmpty()) {
          return stats([
            { label: "Índice general", value: "—", info: EMPTY_MSG },
            { label: "Volatilidad media", value: "—", info: EMPTY_MSG },
            { label: "Precio medio", value: "—", info: EMPTY_MSG },
            { label: "Tendencias", value: "—", info: EMPTY_MSG }
          ], [`${D.productos.length} productos`, "0 plazas"]);
        }
        const gen = H.indiceGeneral();
        const tend = { up: 0, down: 0, flat: 0 };
        D.productos.forEach(p => {
          const t = H.tendencia(p);
          tend[t === "ascendente" ? "up" : t === "descendente" ? "down" : "flat"]++;
        });
        const pm = precioSerie();
        const kpis = [
          scoped
            ? { label: "Índice internacional", value: H.fmtN(D.intlGeneral[D.intlGeneral.length - 1]), delta: `${deltaHTML(H.varYTD(D.intlGeneral))} YTD`, cls: "up", viz: kpiSpark(D.intlGeneral, SUBE), info: "La referencia externa agregada · base enero 2026 = 100" }
            : { label: "Índice general", value: H.fmtN(gen[gen.length - 1]), delta: `${deltaHTML(H.varYTD(gen))} YTD`, cls: "up", viz: kpiSpark(gen, SUBE), info: "Agregado de los índices de categoría · base enero 2026 = 100" },
          { label: "Volatilidad media", value: H.volMedia().toFixed(1), delta: `${D.productos.length} series · 30d`, viz: kpiVolLine(), info: "Promedio de la dispersión de cada serie de producto" },
          { label: "Precio medio", value: H.fmtRD(pm[pm.length - 1]), delta: `${deltaHTML(+((pm[pm.length - 1] / pm[pm.length - 2] - 1) * 100).toFixed(1))} sem`, viz: kpiSpark(pm, STEEL), info: "Media simple de los precios corrientes de todos los productos" },
          { label: "Tendencias", value: `${Math.round(tend.up / (tend.up + tend.down + tend.flat || 1) * 100)}%`, delta: `<span class="delta-down">▼ ${tend.down} baja</span> · <span class="delta-flat">— ${tend.flat} estable</span>`, bar: [[tend.down, BAJA, `${tend.down} baja`], [tend.flat, GRAY, `${tend.flat} estable`], [tend.up, SUBE, `${tend.up} alza`]], barLabel: `${tend.up} alzas, ${tend.flat} estables, ${tend.down} bajas`, info: "Series clasificadas contra su base de enero · banda ±5%" }
        ];
        return stats(kpis);
      },
      insight: () => plazaEmpty()
        ? `<div class="note">${EMPTY_MSG}</div>`
        : insight(focusProds(), H.indiceGeneral(), false),
      fig: () => {
        if (plazaEmpty()) {
          return fig("1", "Índice general de precios — sin datos",
            emptyBoxHTML(EMPTY_MSG, false),
            null,
            "Índice, enero 2026 = 100 · datos ilustrativos",
            rangetools(), true);
        }
        let labels = D.meses, genS = H.indiceGeneral(), intlS = D.intlGeneral, xticks = null;
        const sub = plazaSub();
        let ms = null, aggS = null, plazaIdx = null;
        if (sub) {
          ms = activeMercados();
          const idx = s => s.map(v => +(v / s[0] * 100).toFixed(1));
          const meanSer = list => D.meses.map((_, i) => +(list.reduce((a, s) => a + s[i], 0) / list.length).toFixed(2));
          const pIdx = (p, m) => idx(plazaSerie(p.serie, p.mercados[m.id][2], p.id + m.id));
          plazaIdx = ms.map(m => ({ m, s: meanSer(D.productos.map(p => pIdx(p, m))) }));
          aggS = meanSer(plazaIdx.map(x => x.s));
        }
        const ex2 = s => expand(s.slice(-2)), ex6 = s => expand(s.slice(-6));
        if (boardRange === "1m") { labels = expandLabels(D.meses.slice(-2)); genS = ex2(genS); intlS = ex2(intlS); if (aggS) { aggS = ex2(aggS); plazaIdx = plazaIdx.map(x => ({ m: x.m, s: ex2(x.s) })); } }
        else if (boardRange === "6m") { labels = expandLabels(D.meses.slice(-6)); genS = ex6(genS); intlS = ex6(intlS); if (aggS) { aggS = ex6(aggS); plazaIdx = plazaIdx.map(x => ({ m: x.m, s: ex6(x.s) })); } }
        if (genS.length !== D.meses.length) xticks = [0, genS.length - 1];
        if (sub) {
          const one = ms.length === 1;
          const cap = one ? `Índice general de precios — ${ms[0].nombre}` : `Índice general de precios — agregado de ${ms.length} plazas`;
          const series = [{ data: aggS, color: OXFORD, fill: true, name: one ? ms[0].nombre : "Agregado subset" }];
          if (!one) series.push(...plazaIdx.map(x => ({ data: x.s, color: GRAY, width: 1.25, name: x.m.nombre, fmtLast: v => `${PLAZA_SIG[x.m.id]} · ${v.toFixed(0)}` })));
          return fig("1", cap,
            chart(labels, series, { base: 100, label: "Índice general de precios — evolución", xticks, bookends: true }),
            one ? legend([[OXFORD, 0, ms[0].nombre]]) : legend([[OXFORD, 0, "Agregado subset"], [GRAY, 1, "Por plaza"]]),
            null,
            rangetools(), true);
        }
        return scoped
          ? fig("1", "Índice internacional",
              chart(labels, [{ data: intlS, color: GRAY, width: 2, name: "Internacional" }], { base: 100, label: "Índice internacional — evolución", xticks, bookends: true }),
              legend([[GRAY, 0, "Internacional"]]),
              null,
              rangetools(), true)
          : fig("1", "Índice general de precios — mercado nacional",
              chart(labels, [{ data: genS, color: OXFORD, fill: true, name: "Nacional" }], { base: 100, label: "Índice general de precios — evolución", xticks, bookends: true }),
              legend([[OXFORD, 0, "Nacional"]]),
              null,
              rangetools(), true);
      },
      table: () => {
        lastBoard = focusProds();
        return `<div id="board-table" data-board="board">${boardTable(lastBoard, !focus, true, true)}</div>`;
      }
    };
  }

  function vBoard() {
    const scoped = scope === "internacional";
    qMap = boardPartBuilders();
    const prods = focusProds();
    const tags = [
      `${prods.length} ${prods.length === 1 ? "producto" : "productos"}`,
      scoped ? "índice internacional" : `${activeMercados().length} plazas`
    ];
    const chips = `<span class="chips">${tags.map(t => `<span class="chip">${t}</span>`).join("")}</span>`;
    const nav = pagenavHTML([["sec-resumen", "Resumen"], ["sec-indice", "Índice"], ["sec-productos", "Productos"]]);
    return pagehead(scoped ? "Mercado Internacional" : "Mercado Nacional", chips,
      scoped
        ? `El <em>índice internacional</em> de referencia — la misma observación, sobre el conjunto de datos externo.`
        : `Lo observado en las plazas del país, agregado — la condición corriente del <em>mercado doméstico</em>.`) +
      nav +
      `<div id="sec-resumen" data-q="stats">${skelStats()}</div>` +
      `<div data-q="insight">${skelInsight()}</div>` +
      `<div id="sec-indice" data-q="fig">${skelFig()}</div>` +
      `<div id="sec-productos" data-q="table">${skelTable()}</div>`;
  }

  function vCategoria(id) {
    const c = H.cat(id);
    if (!c) return notFound();
    const prods = H.productosDe(id);
    qMap = {
      stats: () => {
        if (plazaEmpty()) {
          return stats([
            { label: "Variación YTD", value: "—", info: EMPTY_MSG },
            { label: "Precio medio", value: "—", info: EMPTY_MSG },
            { label: "Volatilidad media", value: "—", info: EMPTY_MSG },
            { label: "Tendencias", value: "—", info: EMPTY_MSG }
          ], [`${prods.length} productos`, "0 plazas"]);
        }
        const ps = H.productosDe(id);
        const volM = +(ps.reduce((a, p) => a + p.vol, 0) / ps.length).toFixed(1);
        const tend = { up: 0, down: 0, flat: 0 };
        ps.forEach(p => {
          const t = H.tendencia(p);
          tend[t === "ascendente" ? "up" : t === "descendente" ? "down" : "flat"]++;
        });
        const pm = D.meses.map((_, i) => +(ps.reduce((a, p) => a + p.serie[i], 0) / ps.length).toFixed(1));
        return stats([
          { label: "Variación YTD", value: H.pct(H.varYTD(c.idx)), delta: "índice de categoría", cls: "up", info: "Índice del grupo contra su base · enero 2026 = 100" },
          { label: "Precio medio", value: H.fmtRD(pm[pm.length - 1]), delta: `${deltaHTML(+((pm[pm.length - 1] / pm[pm.length - 2] - 1) * 100).toFixed(1))} sem`, viz: kpiSpark(pm, STEEL), info: "Media simple de los precios corrientes del grupo" },
          { label: "Volatilidad media", value: volM.toFixed(1), delta: `${ps.length} productos`, info: "Promedio de la dispersión de las series del grupo" },
          { label: "Tendencias", value: `${Math.round(tend.up / (tend.up + tend.down + tend.flat || 1) * 100)}%`, delta: `<span class="delta-down">▼ ${tend.down} baja</span> · <span class="delta-flat">— ${tend.flat} estable</span>`, bar: [[tend.down, BAJA, `${tend.down} baja`], [tend.flat, GRAY, `${tend.flat} estable`], [tend.up, SUBE, `${tend.up} alza`]], barLabel: `${tend.up} alzas, ${tend.flat} estables, ${tend.down} bajas`, info: "Series del grupo clasificadas contra su base · banda ±5%" }
        ], [`${ps.length} productos`, "índice de categoría"]);
      },
      fig: () => {
        const intl = scope === "internacional" && c.intl;
        const sub = plazaSub();
        let series, lg, cap;
        if (plazaEmpty()) {
          return fig("1", `Índice de ${c.nombre.toLowerCase()} — sin datos`,
            emptyBoxHTML(EMPTY_MSG, false),
            null,
            "Índice, enero 2026 = 100 · datos ilustrativos", null, true);
        }
        if (sub) {
          const ms = activeMercados();
          const idx = s => s.map(v => +(v / s[0] * 100).toFixed(1));
          const meanSer = list => D.meses.map((_, i) => +(list.reduce((a, s) => a + s[i], 0) / list.length).toFixed(2));
          const pIdx = (p, m) => idx(plazaSerie(p.serie, p.mercados[m.id][2], p.id + m.id));
          const plazaIdx = ms.map(m => ({ m, s: meanSer(prods.map(p => pIdx(p, m))) }));
          const agg = meanSer(plazaIdx.map(x => x.s));
          if (ms.length === 1) {
            series = [{ data: agg, color: OXFORD, fill: true, name: ms[0].nombre }];
            lg = [[OXFORD, 0, ms[0].nombre]];
            cap = `Índice de ${c.nombre.toLowerCase()} — ${ms[0].nombre}`;
          } else {
            series = [
              { data: agg, color: OXFORD, fill: true, name: "Agregado subset" },
              ...plazaIdx.map(x => ({ data: x.s, color: GRAY, width: 1.25, name: x.m.nombre, fmtLast: v => `${PLAZA_SIG[x.m.id]} · ${v.toFixed(0)}` }))
            ];
            lg = [[OXFORD, 0, "Agregado subset"], [GRAY, 1, "Por plaza"]];
            cap = `Índice de ${c.nombre.toLowerCase()} — agregado de ${ms.length} plazas`;
          }
        } else if (intl) {
          series = [
            { data: c.idx, color: OXFORD, fill: true, name: "Doméstico" },
            { data: c.intl, color: GRAY, dash: "5 4", width: 1.5, name: "Internacional" }
          ];
          lg = [[OXFORD, 0, "Doméstico"], [GRAY, 1, "Internacional"]];
          cap = `Índice de ${c.nombre.toLowerCase()} — contra la referencia internacional`;
        } else {
          series = [{ data: c.idx, color: OXFORD, fill: true, name: "Doméstico" }];
          lg = [[OXFORD, 0, "Doméstico"]];
          cap = `Índice de ${c.nombre.toLowerCase()} — mercado nacional`;
        }
        return fig("1", cap,
          chart(D.meses, series, { base: 100, label: `Índice de ${c.nombre} — evolución` }),
          legend(lg),
          "Índice, enero 2026 = 100 · datos ilustrativos", null, true);
      },
      table: () => `<div id="board-table" data-board="cat:${c.id}">${boardTable(H.productosDe(id), false, true, true)}</div>`
    };
    return pagehead(c.nombre, null,
      `La categoría <em>${c.nombre.toLowerCase()}</em> — ${prods.length} productos agregados en su propio índice.`) +
      pagenavHTML([["sec-resumen", "Resumen"], ["sec-indice", "Índice"], ["sec-productos", "Productos"]]) +
      `<div id="sec-resumen" data-q="stats">${skelStats()}</div>` +
      `<div id="sec-indice" data-q="fig">${skelFig()}</div>` +
      `<div id="sec-productos" data-q="table">${skelTable()}</div>`;
  }

  function vProducto(id) {
    const p = H.producto(id);
    if (!p) return notFound();
    const c = H.cat(p.cat);
    qMap = {
      stats: () => {
        const precio = H.actual(p);
        const media = H.mediaMercados(p, activeMercados());
        const r = rangoP(p);
        return stats([
          { label: "Precio", value: H.fmtRD(precio), delta: `${deltaHTML(H.deltaSem(p), 2)} sem`, cls: H.deltaSem(p) >= 0 ? "up" : "down", info: `Última observación de la serie · RD$ por ${p.unidad}` },
          { label: "Media nacional", value: media == null ? "—" : H.fmtRD(media), delta: `${activeMercados().length} plazas agregadas`, info: activeMercados().length ? "La media que construye el mercado como referencia" : EMPTY_MSG },
          { label: "Rango nacional", value: r.mn == null ? "—" : `${H.fmtN(r.mn)}–${H.fmtN(r.mx)}`, delta: "mín–máx entre plazas", info: "La dispersión espacial del precio entre las plazas observadas" },
          { label: "Volatilidad", value: p.vol.toFixed(1), delta: "clase " + H.claseVol(p.vol), info: "Oscilación alrededor de su media · baja < 4 · moderada < 8 · alta ≥ 8" }
        ], [
          `<a class="cat-link" href="#/mercado/categoria/${c.id}">${c.nombre}</a>`,
          `RD$/${p.unidad}`,
          trendBadge(H.tendencia(p)),
          volBadge(p.vol)
        ]);
      },
      fig: () => {
        const intl = scope === "internacional";
        const sub = plazaSub();
        const ms = sub ? activeMercados() : null;
        const pser = m => plazaSerie(p.serie, p.mercados[m.id][2], p.id + m.id);
        let series, lg, cap = `Evolución del precio de ${p.nombre}`;
        if (plazaEmpty()) {
          return fig("1", `Evolución del precio — ${p.nombre.toLowerCase()}`,
            emptyBoxHTML(EMPTY_MSG, false),
            null,
            `RD$ por ${p.unidad} · datos ilustrativos`, null, true);
        }
        if (sub) {
          if (ms.length === 1) {
            series = [{ data: pser(ms[0]), color: OXFORD, fill: true, fmtLast: v => v.toFixed(2), fmt: "rd", name: ms[0].nombre }];
            lg = [[OXFORD, 0, ms[0].nombre]];
            cap += ` — ${ms[0].nombre}`;
          } else {
            const agg = D.meses.map((_, i) => +(ms.reduce((a, m) => a + pser(m)[i], 0) / ms.length).toFixed(2));
            series = [
              { data: agg, color: OXFORD, fill: true, fmtLast: v => v.toFixed(2), fmt: "rd", name: "Agregado subset" },
              ...ms.map(m => ({ data: pser(m), color: GRAY, width: 1.25, fmt: "rd", name: m.nombre, fmtLast: v => `${PLAZA_SIG[m.id]} · ${v.toFixed(2)}` }))
            ];
            lg = [[OXFORD, 0, "Agregado subset"], [GRAY, 1, "Por plaza"]];
            cap += ` · agregado de ${ms.length} plazas`;
          }
        } else if (intl) {
          series = [
            { data: p.serie, color: OXFORD, fill: true, fmtLast: v => v.toFixed(2), fmt: "rd", name: "Doméstico" },
            { flat: p.intl, color: GRAY, name: "Internacional", fmtFlat: v => "RD$ " + (+v).toFixed(2), fmt: "rd" }
          ];
          lg = [[OXFORD, 0, "Doméstico"], [GRAY, 1, "Internacional"]];
          cap += " contra la referencia internacional";
        } else {
          series = [{ data: p.serie, color: OXFORD, fill: true, fmtLast: v => v.toFixed(2), fmt: "rd", name: "Doméstico" }];
          lg = [[OXFORD, 0, "Doméstico"]];
        }
        return fig("1", `Evolución del precio — ${p.nombre.toLowerCase()}`,
          chart(D.meses, series, { label: cap }),
          legend(lg),
          `RD$ por ${p.unidad} · datos ilustrativos`, null, true);
      },
      table: () => {
        const ms = activeMercados();
        if (!ms.length) {
          return `<div class="figcap"><span class="figcap__tag">Fig. 2</span><span class="figcap__caption">Precio por plaza — banda mín–máx, ◆ media, contra la media del agregado</span></div>
      ${emptyBoxHTML(EMPTY_MSG, false)}
      <div class="source">Fuente: red de plazas observadas · elaboración propia</div>
      <p class="note">${EMPTY_MSG}</p>`;
        }
        const media = H.mediaMercados(p, ms);
        const r = rangoP(p);
        const lo = r.mn, hi = r.mx, span = hi - lo;
        const trows = ms.map(m => {
          const [mn, mx, mean] = p.mercados[m.id];
          const dif = mean - media;
          const pos = dif > media * 0.03 ? `<span class="delta-up">▲ sobre media</span>` : dif < -media * 0.03 ? `<span class="delta-down">▼ bajo media</span>` : `<span class="delta-flat">— en media</span>`;
          return `<tr>
        <td>${m.nombre} <span style="color:var(--ink-3)">· ${m.ciudad}</span></td>
        <td class="num">${H.fmtRD(mean)}</td>
        <td class="num">${H.fmtN(mn)}–${H.fmtN(mx)}</td>
        <td><div class="mtrack"><div class="mband" style="left:${((mn - lo) / span * 100).toFixed(1)}%;width:${((mx - mn) / span * 100).toFixed(1)}%"></div><div class="mmean" style="left:${((mean - lo) / span * 100).toFixed(1)}%"></div></div></td>
        <td class="num">${deltaHTML(dif, 2)}</td>
        <td>${pos}</td>
      </tr>`;
        }).join("");
        return `<div class="figcap"><span class="figcap__tag">Fig. 2</span><span class="figcap__caption">Precio por plaza — banda mín–máx, ◆ media, contra la media del agregado</span></div>
      <div class="tablewrap"><table class="table">
        <thead><tr><th>Plaza</th><th class="num">Medio RD$</th><th class="num">Mín–Máx</th><th>Rango</th><th class="num">vs media</th><th>Posición</th></tr></thead>
        <tbody>${trows}</tbody>
      </table></div>
      <div class="source">Fuente: red de plazas observadas · elaboración propia${plazaSub() ? plazaNote(ms) : ""}</div>
      <p class="note">La media se construye agregando las ${ms.length} ${ms.length === 1 ? "plaza observada" : "plazas observadas"} — el mercado mismo sirve de referencia.</p>`;
      }
    };
    return pagehead(`<img class="pthumb pthumb--page" src="${p.img}" alt="">${p.nombre}`, null,
      `<em>${p.nombre}</em> — una sola pieza observada: su precio corriente y su rango entre plazas.`) +
      pagenavHTML([["sec-resumen", "Resumen"], ["sec-evolucion", "Evolución"], ["sec-plazas", "Plazas"]]) +
      `<div id="sec-resumen" data-q="stats">${skelStats()}</div>` +
      `<div id="sec-evolucion" data-q="fig">${skelFig()}</div>` +
      `<div id="sec-plazas" data-q="table">${skelTable()}</div>`;
  }

  function benchPicks() { return bench.picks.filter(id => id !== bench.comp); }

  function currentRef() {
    if (bench.mode === "mercado") {
      if (!bench.mercadoGeo) return null;
      if (bench.mercadoGeo === "internacional") {
        const t = H.producto("tomate");
        return { tipo: "mercado", nombre: "Mercado Internacional", precio: t.intl, vol: D.volIntlTomate, nota: "referencia internacional del tomate", fill: "bench-row__fill--gray" };
      }
      return { tipo: "mercado", nombre: "Mercado Nacional", precio: H.mediaMercados(H.producto("tomate")), vol: D.volMercadoTomate, nota: "las seis plazas observadas", fill: "bench-row__fill--brass" };
    }
    if (bench.mode === "subset") {
      const sel = D.competidores.filter(c => bench.picks.includes(c.id) && c.id !== bench.comp);
      if (!sel.length) return null;
      const one = sel.length === 1;
      return {
        tipo: "subset", ids: sel.map(c => c.id),
        nombre: one ? sel[0].nombre : `Selección ⟨n = ${sel.length}⟩`,
        precio: +(sel.reduce((a, c) => a + c.precio, 0) / sel.length).toFixed(2),
        vol: +(sel.reduce((a, c) => a + c.vol, 0) / sel.length).toFixed(1),
        nota: one ? "un solo competidor marcado" : "agregado de la selección",
        fill: "bench-row__fill--hatch2"
      };
    }
    return null;
  }

  function refPathHTML() {
    const sep = "<i>›</i>";
    const st = (t, on) => `<span${on ? ' class="is-here"' : ""}>${t}</span>`;
    if (bench.mode === "mercado") return st("agregado") + sep + st("mercado", !bench.mercadoGeo) + (bench.mercadoGeo ? sep + st(bench.mercadoGeo === "internacional" ? "internacional" : "nacional", 1) : "");
    if (bench.mode === "subset") return st("agregado") + sep + st("selección", 1);
    return st("agregado", 1);
  }

  function refCardHTML() {
    const picks = benchPicks();
    const sel = D.competidores.filter(c => picks.includes(c.id));
    const mercado = H.mediaMercados(H.producto("tomate"));
    const head = `<div class="benchcard__head"><span class="benchcard__tag">Referencia</span>${bench.mode ? `<button class="refreset" type="button" id="ref-reset" title="Volver al estado inicial">↩ reiniciar</button>` : ""}<span class="benchcard__path">${refPathHTML()}</span></div>`;
    if (bench.mode === "mercado") {
      if (!bench.mercadoGeo) return head +
        `<div class="refmodes fadein">
          <button class="refmode" type="button" data-mgeo="nacional">Nacional</button>
          <button class="refmode" type="button" data-mgeo="internacional">Internacional</button>
        </div>`;
      return head + `<div class="refmode refmode--set">${bench.mercadoGeo === "internacional" ? "Internacional" : "Nacional"}</div>`;
    }
    if (bench.mode === "subset") {
      const rivals = D.competidores.filter(c => c.id !== bench.comp);
      return head +
        `<div class="reflist fadein">${rivals.map(c => {
          const on = bench.picks.includes(c.id);
          return `<button class="reftile${on ? " is-on" : ""}" type="button" data-tile="${c.id}" title="${c.nombre} — RD$ ${c.precio.toFixed(2)}"><span class="reftile__id">${c.nombre.split(" ").pop()}</span><span class="reftile__name">RD$ ${c.precio.toFixed(2)}</span></button>`;
        }).join("")}</div>
        <div class="reflive">${picks.length
          ? `n = ${picks.length} · RD$ ${(sel.reduce((a, c) => a + c.precio, 0) / sel.length).toFixed(2)} · vol ${(sel.reduce((a, c) => a + c.vol, 0) / sel.length).toFixed(1)} — ${picks.length === 1 ? "un solo competidor marcado" : "agregado de la selección"}`
          : "clic marca · clic desmarca"}</div>`;
    }
    return head + `<div class="refmodes">
      <button class="refmode" type="button" data-mode="mercado">Mercado</button>
      <button class="refmode" type="button" data-mode="subset">Selección</button>
    </div>`;
  }

  function vBenchmark() {
    const comp = D.competidores.find(c => c.id === bench.comp);
    const ref = currentRef();
    let html = pagehead("Benchmark", null,
      `El punto de referencia no está dado — se construye: <em>el mercado agregado</em> de las seis plazas, o <em>una selección</em> de competidores.`) +
      `<div class="benchsetup">
        <div class="benchcard benchcard--obs">
          <div class="benchcard__head"><span class="benchcard__tag">Competidor observado</span><span class="benchcard__path">sujeto</span></div>
          <div class="control benchcard__sel">
            <select id="bench-comp" aria-label="Competidor observado">${D.competidores.map(c => `<option value="${c.id}"${c.id === bench.comp ? " selected" : ""}>${c.nombre} — RD$ ${c.precio.toFixed(2)}</option>`).join("")}</select>
          </div>
        </div>
        <div class="benchcard benchcard--ref" id="bench-ref">${refCardHTML()}</div>
      </div>`;
    if (!ref) return html +
      `<div class="mbench mbench--bench"><b>Referencia sin construir</b>${bench.mode === "mercado"
        ? `El mercado tiene dos geografías — elige una: <span class="benchpend-opts">nacional · internacional</span>`
        : `El punto de referencia no está dado — se construye. Elige «Mercado» o «Selección» en la tarjeta «Referencia»:<span class="benchpend-opts">el todo · uno · varios competidores</span>`}</div>
      <p class="note">Una plaza contra otra, contra una selección de competidores —que puede ser uno o varios—, o contra el mercado agregado de las seis plazas.</p>
      <div class="source">Fuente: red de plazas observadas · elaboración propia</div>`;
    const dif = +(comp.precio - ref.precio).toFixed(2);
    const prima = +((comp.precio - ref.precio) / ref.precio * 100).toFixed(1);
    const volRatio = +(comp.vol / ref.vol).toFixed(2);
    const precios = H.preciosTomate();
    const pct = H.percentil(comp.precio, precios);
    const rango = H.rango(comp.precio, precios);
    const max = Math.max(comp.precio, ref.precio, ...precios);
    const p = H.producto("tomate");
    qMap = {
      stats: () => stats([
        { label: "Diferencia de precio", value: (dif >= 0 ? "+" : "") + dif.toFixed(2), delta: `contra ${ref.nombre.toLowerCase()}`, cls: dif >= 0 ? "up" : "down", info: "Precio del competidor menos precio de la referencia construida" },
        { label: prima >= 0 ? "Prima" : "Descuento", value: H.pct(prima), delta: `sobre la referencia · ${ref.nota}`, cls: prima >= 0 ? "up" : "down", info: "La brecha en porcentaje de la referencia" },
        { label: "Volatilidad relativa", value: volRatio.toFixed(2) + "×", delta: `vol ${comp.vol} vs vol ${ref.vol}`, info: "Cuántas veces la volatilidad de la referencia tiembla la del competidor" },
        { label: "Posición en el mercado", value: "P" + pct, delta: `${rango}.º de ${precios.length} precios observados`, info: "Percentil del precio contra todos los precios observados del tomate" }
      ]),
      fig: () =>
        fig("1", `${comp.nombre} contra ${ref.nombre} — tomate, RD$/lb`,
          `<div class="benchrows">
            <div class="bench-row"><span class="bench-row__name">${comp.nombre}<small>vol ${comp.vol}</small></span><div class="bench-row__bar"><span class="bench-row__fill bench-row__fill--indigo" style="width:${(comp.precio / max * 100).toFixed(1)}%"></span></div><span class="bench-row__val">${H.fmtRD(comp.precio)}</span></div>
            <div class="bench-row"><span class="bench-row__name">${ref.nombre}<small>vol ${ref.vol} · ${ref.nota}</small></span><div class="bench-row__bar"><span class="bench-row__fill ${ref.fill}" style="width:${(ref.precio / max * 100).toFixed(1)}%"></span></div><span class="bench-row__val">${H.fmtRD(ref.precio)}</span></div>
          </div>`, null, null, null, true) +
        fig("2", "Evolución — competidor vs serie nacional del producto",
          chart(D.meses, [
            { data: comp.serie, color: OXFORD, fill: true, fmtLast: v => v.toFixed(2), fmt: "rd", name: comp.nombre },
            { data: p.serie, color: GRAY, dash: "5 4", width: 1.5, fmtLast: v => v.toFixed(2), fmt: "rd", name: "Serie nacional" }
          ], { label: "Evolución del competidor contra la serie nacional" }),
          legend([[OXFORD, 0, comp.nombre], [GRAY, 1, "Serie nacional"]]),
          "RD$ por libra · datos ilustrativos", null, true)
    };
    return html +
      `<div data-q="stats">${skelStats()}</div>` +
      `<div data-q="fig">${skelFigs2()}</div>` +
      `<p class="note">El punto de referencia no está dado — se construye: «Mercado» toma el agregado de las seis plazas; «Selección» agrega los competidores marcados —clic marca, clic desmarca—. «Reiniciar» devuelve la carta a su estado inicial.</p>
      <div class="source">Fuente: red de plazas observadas · elaboración propia</div>`;
  }

  const MF_ARTS = {
    nac: {
      nombre: "Nacional", sub: "el mercado dominicano",
      niveles: [
        { nivel: "Todos", sub: "el conjunto completo", link: "#/mercado", arts: [
          { id: "indice-general", n: "índice general" },
          { id: "volatilidad-media", n: "volatilidad media" },
          { id: "precio-medio", n: "precio medio" },
          { id: "distribucion-tendencias", n: "distribución de tendencias" }
        ] },
        { nivel: "Categoría", sub: "viandas · vegetales · frutas · granos · aves · carnes", link: "#/mercado/categoria/vegetales", arts: [
          { id: "indice-categoria", n: "índice de categoría" },
          { id: "variacion-ytd", n: "variación YTD" },
          { id: "precio-medio-categoria", n: "precio medio" },
          { id: "tendencia-categoria", n: "tendencia" },
          { id: "volatilidad-categoria", n: "volatilidad" }
        ] },
        { nivel: "Producto", sub: "un solo producto", link: "#/mercado/producto/tomate", arts: [
          { id: "precio", n: "precio" },
          { id: "delta-semanal", n: "Δ Semanal" },
          { id: "tendencia-producto", n: "tendencia" },
          { id: "volatilidad-producto", n: "volatilidad" },
          { id: "rango-plazas", n: "rango entre plazas" },
          { id: "media-nacional", n: "media nacional" },
          { id: "posicion-plaza", n: "posición por plaza" }
        ] }
      ]
    },
    intl: {
      nombre: "Internacional", sub: "la referencia externa",
      niveles: [
        { nivel: "Todos", sub: "el conjunto completo", link: "#/internacional", arts: [
          { id: "indice-internacional", n: "índice internacional" },
          { id: "brecha", n: "brecha doméstico–internacional" },
          { id: "prima-media", n: "prima media del conjunto" },
          { id: "productos-con-prima", n: "productos con prima" }
        ] },
        { nivel: "Categoría", sub: "una categoría contra la referencia", link: null, arts: [
          { id: "indice-ref-categoria", n: "índice de referencia de categoría" },
          { id: "variacion-relativa", n: "variación relativa" },
          { id: "posicion-categoria", n: "posición de la categoría dominicana" }
        ] },
        { nivel: "Producto", sub: "un producto contra la referencia", link: null, arts: [
          { id: "precio-internacional", n: "precio internacional" },
          { id: "diferencia-absoluta", n: "diferencia absoluta" },
          { id: "prima-descuento", n: "prima o descuento" },
          { id: "desvio-referencia", n: "desvío de la referencia" }
        ] }
      ]
    }
  };

  function mfBranch(b, cls) {
    return `<div class="mfbranch ${cls}">
      <div class="mfbranch__head">${b.nombre}<small>${b.sub}</small></div>
      ${b.niveles.map(l => `<div class="mflevel">
        <${l.link ? `a class="mflevel__name" href="${l.link}"` : `span class="mflevel__name"`}>${l.nivel}<small>${l.sub}</small></${l.link ? "a" : "span"}>
        <ul class="mfarts">${l.arts.map(a => `<li><a href="#/metodo/elemento/${a.id}" title="Perfil del elemento epistémico — explicación, referencia y caso">${a.n}</a></li>`).join("")}</ul>
      </div>`).join("")}
    </div>`;
  }

  const REFS = {
    working: `Working, H. (1927). What do statistical "demand curves" mean? <i>Journal of the American Statistical Association, 22</i>(157), 26–39.`,
    stone: `Stone, R. (1954). Linear expenditure functions and an extension to the linear expenditure system. <i>Econometrica, 22</i>(4), 461–471.`,
    dm: `Deaton, A. S., &amp; Muellbauer, J. N. (1980). An almost ideal demand system. <i>The American Economic Review, 70</i>(3), 312–326.`,
    banks: `Banks, J., Blundell, R., &amp; Lewbel, A. (1997). Quadratic Engel curves and consumer demand. <i>The Review of Economics and Statistics, 79</i>(4), 527–539.`,
    schultz: `Schultz, H. (1938). <i>The theory and measurement of demand</i>. University of Chicago Press.`,
    andreyeva: `Andreyeva, T., Long, M. W., &amp; Brownell, K. D. (2010). The impact of food prices on consumption: A systematic review of price elasticities of demand for foods. <i>American Journal of Public Health, 100</i>(2), 216–222.`,
    mcfadden: `McFadden, D. (1974). Conditional logit analysis of qualitative choice behavior. En P. Zarembka (Ed.), <i>Frontiers in econometrics</i> (pp. 105–142). Academic Press.`,
    berry: `Berry, S. (1994). Estimating discrete-choice models of product differentiation. <i>The RAND Journal of Economics, 25</i>(2), 242–262.`,
    nevo: `Nevo, A. (2000). A practitioner's guide to estimation of random-coefficients logit models of demand. <i>Journal of Economics &amp; Management Strategy, 9</i>(4), 513–548.`,
    muhammad: `Muhammad, A., D'Souza, A., Meade, B., &amp; Michałek, J. (2011). <i>International evidence on food consumption patterns: An update using 2005 ICP data</i> (Technical Bulletin TB-1929). U.S. Department of Agriculture, Economic Research Service.`
  };

  const NIVEL_CTX = {
    mercado: { nombre: "Mercado — nacional", sub: "nivel de agregación · el conjunto completo", vista: "#/mercado", ver: "Abrir Mercado" },
    categoria: { nombre: "Categoría", sub: "un subconjunto de productos con índice propio", vista: "#/mercado/categoria/vegetales", ver: "Abrir Categoría" },
    producto: { nombre: "Producto", sub: "una sola pieza observada", vista: "#/mercado/producto/tomate", ver: "Abrir Producto" },
    intl: { nombre: "Mercado — internacional", sub: "la referencia externa del conjunto", vista: "#/internacional", ver: "Abrir Internacional" },
    "intl-cat": { nombre: "Categoría — contra la referencia", sub: "el grupo contra la referencia externa", vista: "#/internacional", ver: "Abrir Internacional" },
    "intl-prod": { nombre: "Producto — contra la referencia", sub: "la pieza contra la referencia externa", vista: "#/internacional", ver: "Abrir Internacional" }
  };

  function casoIn(id, v) {
    return `<input class="caso__in" type="number" min="0" step="0.1" value="${v}" data-p="${id}" aria-label="editar valor">`;
  }
  function casoRow(label, out, key) {
    return `<tr${key ? ' class="caso__key"' : ""}><td class="mono">${label}</td><td class="num" data-out="${out}">—</td></tr>`;
  }
  function casoIndiceHTML() {
    const plazas = ["Mercado Nuevo", "Santiago", "La Vega"];
    const defs = [
      { p: "a", n: "Producto A", base: 10, v: [10, 11, 10.5] },
      { p: "b", n: "Producto B", base: 20, v: [20, 19, 21] }
    ];
    return `<div class="caso" data-caso="indice">
      <table class="table is-dense caso__tab">
        <thead><tr><th>Plaza</th>${defs.map(d => `<th>${d.n}<span class="caso__base">base RD$ ${d.base.toFixed(2)}</span></th>`).join("")}</tr></thead>
        <tbody>${plazas.map((pl, i) => `<tr><td>${pl}</td>${defs.map(d => `<td>${casoIn(d.p + i, d.v[i])}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
      <table class="table is-dense caso__res"><tbody>
        ${defs.map(d => casoRow("Índice " + d.n, "idx-" + d.p) + casoRow("Media " + d.n, "media-" + d.p)).join("")}
        ${casoRow("Índice del conjunto", "idx-gen", 1)}
      </tbody></table>
    </div>`;
  }
  function casoMediaHTML() {
    const plazas = ["Mercado Nuevo", "Santiago", "San Cristóbal", "Higüey"];
    const v = [52, 55, 47, 51];
    return `<div class="caso" data-caso="media">
      <table class="table is-dense caso__tab">
        <thead><tr><th>Plaza</th><th>Precio observado</th></tr></thead>
        <tbody>${plazas.map((pl, i) => `<tr><td>${pl}</td><td>${casoIn("p" + i, v[i])}</td></tr>`).join("")}</tbody>
      </table>
      <table class="table is-dense caso__res"><tbody>
        ${casoRow("Media", "media") + casoRow("Rango mín–máx", "rango") + casoRow("Brecha máx–mín", "brecha", 1)}
      </tbody></table>
    </div>`;
  }
  function casoVolatilidadHTML() {
    const prods = [
      { n: "Serie A", v: [10, 10.4, 10.2, 10.6] },
      { n: "Serie B", v: [10, 11, 10.4, 11.2] },
      { n: "Serie C", v: [10, 12.1, 9.6, 12.4] }
    ];
    return `<div class="caso" data-caso="volatilidad">
      <table class="table is-dense caso__tab">
        <thead><tr><th>Producto</th><th>S1</th><th>S2</th><th>S3</th><th>S4</th></tr></thead>
        <tbody>${prods.map((p, r) => `<tr><td>${p.n}</td>${p.v.map((x, i) => `<td>${casoIn("v" + r + i, x)}</td>`).join("")}</tr>`).join("")}</tbody>
      </table>
      <table class="table is-dense caso__res"><tbody>
        ${prods.map((p, r) => casoRow("Vol " + p.n, "vol" + r)).join("")}
        ${casoRow("Vol media", "volmedia", 1)}
      </tbody></table>
    </div>`;
  }
  function casoDistribucionHTML() {
    const prods = [
      { n: "Producto A", b: 100, o: 106 },
      { n: "Producto B", b: 100, o: 103 },
      { n: "Producto C", b: 100, o: 94 },
      { n: "Producto D", b: 100, o: 101 }
    ];
    return `<div class="caso" data-caso="distribucion">
      <table class="table is-dense caso__tab">
        <thead><tr><th>Producto</th><th>Base · enero</th><th>Observado</th></tr></thead>
        <tbody>${prods.map((p, i) => `<tr><td>${p.n}</td><td>${casoIn("b" + i, p.b)}</td><td>${casoIn("o" + i, p.o)}</td></tr>`).join("")}</tbody>
      </table>
      <table class="table is-dense caso__res"><tbody>
        ${prods.map((p, i) => casoRow(p.n, "t" + i)).join("")}
        ${casoRow("Distribución", "dist", 1)}
      </tbody></table>
    </div>`;
  }
  function casoDeltaHTML() {
    return `<div class="caso" data-caso="delta">
      <table class="table is-dense caso__tab">
        <thead><tr><th>Lectura</th><th>Precio</th></tr></thead>
        <tbody>
          <tr><td>Semana anterior</td><td>${casoIn("b", 50)}</td></tr>
          <tr><td>Semana actual</td><td>${casoIn("a", 52)}</td></tr>
        </tbody>
      </table>
      <table class="table is-dense caso__res"><tbody>
        ${casoRow("Δ en pesos", "d") + casoRow("Δ porcentual", "pct", 1)}
      </tbody></table>
    </div>`;
  }
  function casoRelativaHTML() {
    return `<div class="caso" data-caso="relativa">
      <table class="table is-dense caso__tab">
        <thead><tr><th>Serie</th><th>Base · enero</th><th>Observado</th></tr></thead>
        <tbody>
          <tr><td>Categoría local</td><td>${casoIn("db", 100)}</td><td>${casoIn("do", 115)}</td></tr>
          <tr><td>Referencia internacional</td><td>${casoIn("rb", 100)}</td><td>${casoIn("ro", 106)}</td></tr>
        </tbody>
      </table>
      <table class="table is-dense caso__res"><tbody>
        ${casoRow("Variación local", "yd") + casoRow("Variación referencia", "yr") + casoRow("Variación relativa", "rel", 1)}
      </tbody></table>
    </div>`;
  }
  function casoPrimaHTML() {
    const prods = [
      { n: "Producto A", d: 52, r: 45 },
      { n: "Producto B", d: 34, r: 30 }
    ];
    return `<div class="caso" data-caso="prima">
      <table class="table is-dense caso__tab">
        <thead><tr><th>Producto</th><th>Doméstico</th><th>Referencia</th></tr></thead>
        <tbody>${prods.map((p, i) => `<tr><td>${p.n}</td><td>${casoIn("d" + i, p.d)}</td><td>${casoIn("r" + i, p.r)}</td></tr>`).join("")}</tbody>
      </table>
      <table class="table is-dense caso__res"><tbody>
        ${prods.map((p, i) => casoRow("Prima " + p.n, "pr" + i)).join("")}
        ${casoRow("Prima media", "pm") + casoRow("Con prima", "np", 1)}
      </tbody></table>
    </div>`;
  }
  function casoPosicionHTML() {
    const obs = ["Observado 1", "Observado 2", "Observado 3", "Observado 4", "Observado 5", "Observado 6"];
    return `<div class="caso" data-caso="posicion">
      <table class="table is-dense caso__tab">
        <thead><tr><th>Conjunto observado</th><th>Precio</th></tr></thead>
        <tbody>
          ${obs.map((o, i) => `<tr><td>${o}</td><td>${casoIn("p" + i, [45, 47, 50, 53, 56, 60][i])}</td></tr>`).join("")}
          <tr><td class="mono" style="color:var(--oxford);font-weight:600">Sujeto</td><td>${casoIn("s", 52)}</td></tr>
        </tbody>
      </table>
      <table class="table is-dense caso__res"><tbody>
        ${casoRow("Posición", "pos", 1) + casoRow("Percentil", "pct")}
      </tbody></table>
    </div>`;
  }
  const CASO_BUILD = { indice: casoIndiceHTML, media: casoMediaHTML, volatilidad: casoVolatilidadHTML, distribucion: casoDistribucionHTML, delta: casoDeltaHTML, relativa: casoRelativaHTML, prima: casoPrimaHTML, posicion: casoPosicionHTML };
  const CASO_TITULO = {
    indice: "De la observación al índice — 2 productos × 3 plazas",
    media: "Cuatro plazas, un precio — media, rango y brecha",
    volatilidad: "Tres series, cuatro semanas — la oscilación como clase",
    distribucion: "Base contra observado — clasificar y contar",
    delta: "Dos lecturas — el cambio en pesos y en porcentaje",
    relativa: "Dos acumuladas — la variación relativa en puntos",
    prima: "Doméstico contra referencia — brecha y prima",
    posicion: "Un precio contra el conjunto — posición y percentil"
  };
  const CASO_CALC = {
    indice(g, gn, set) {
      const defs = [{ p: "a", base: 10 }, { p: "b", base: 20 }];
      const idx = {};
      defs.forEach(d => {
        const vals = [0, 1, 2].map(i => gn(d.p + i)).filter(v => v !== null);
        const media = vals.length ? vals.reduce((x, y) => x + y, 0) / vals.length : 0;
        idx[d.p] = media > 0 ? media / d.base * 100 : 0;
        set("idx-" + d.p, media > 0 ? idx[d.p].toFixed(1) : "—");
        set("media-" + d.p, media > 0 ? H.fmtRD(media) : "—");
      });
      set("idx-gen", (idx.a || idx.b) ? ((idx.a + idx.b) / 2).toFixed(1) : "—");
    },
    media(g, gn, set) {
      const vals = [0, 1, 2, 3].map(i => gn("p" + i)).filter(v => v !== null);
      if (!vals.length) { set("media", "—"); set("rango", "—"); set("brecha", "—"); return; }
      const media = vals.reduce((a, b) => a + b, 0) / vals.length;
      set("media", H.fmtRD(media));
      set("rango", H.fmtN(Math.min(...vals)) + "–" + H.fmtN(Math.max(...vals)));
      set("brecha", H.fmtRD(Math.max(...vals) - Math.min(...vals)));
    },
    volatilidad(g, gn, set) {
      const vols = [];
      for (let r = 0; r < 3; r++) {
        const vals = [0, 1, 2, 3].map(i => gn("v" + r + i)).filter(v => v !== null);
        if (vals.length < 2) { set("vol" + r, "—"); vols.push(null); continue; }
        const m = vals.reduce((a, b) => a + b, 0) / vals.length;
        const sd = Math.sqrt(vals.reduce((a, b) => a + (b - m) * (b - m), 0) / (vals.length - 1));
        const vol = m > 0 ? sd / m * 100 : 0;
        vols.push(vol);
        set("vol" + r, vol.toFixed(1) + " · " + H.claseVol(vol));
      }
      const ok = vols.filter(v => v !== null);
      set("volmedia", ok.length ? (ok.reduce((a, b) => a + b, 0) / ok.length).toFixed(1) : "—");
    },
    distribucion(g, gn, set) {
      let up = 0, down = 0, flat = 0;
      for (let i = 0; i < 4; i++) {
        const b = gn("b" + i), o = gn("o" + i);
        if (b === null || o === null) { set("t" + i, "—"); continue; }
        const pct = (o / b - 1) * 100;
        const cls = pct > 5 ? "delta-up" : pct < -5 ? "delta-down" : "delta-flat";
        const lbl = pct > 5 ? "▲ alza" : pct < -5 ? "▼ baja" : "— estable";
        if (pct > 5) up++; else if (pct < -5) down++; else flat++;
        set("t" + i, `${lbl} ${H.pct(pct)}`, cls);
      }
      set("dist", `${up} ▲ · ${flat} — · ${down} ▼`);
    },
    delta(g, gn, set) {
      const b = gn("b"), a = gn("a");
      if (b === null || a === null) { set("d", "—"); set("pct", "—"); return; }
      const d = a - b, pct = d / b * 100;
      const cls = d > 0 ? "delta-up" : d < 0 ? "delta-down" : "delta-flat";
      set("d", (d > 0 ? "+" : "") + d.toFixed(2), cls);
      set("pct", H.pct(pct), cls);
    },
    relativa(g, gn, set) {
      const y = (b, o) => b !== null && o !== null && b > 0 ? (o / b - 1) * 100 : null;
      const yd = y(gn("db"), gn("do")), yr = y(gn("rb"), gn("ro"));
      set("yd", yd === null ? "—" : H.pct(yd), yd === null ? "" : yd > 0 ? "delta-up" : "delta-down");
      set("yr", yr === null ? "—" : H.pct(yr), yr === null ? "" : yr > 0 ? "delta-up" : "delta-down");
      set("rel", yd === null || yr === null ? "—" : (yd - yr >= 0 ? "+" : "") + (yd - yr).toFixed(1) + " pts");
    },
    prima(g, gn, set) {
      const primas = [];
      for (let i = 0; i < 2; i++) {
        const d = gn("d" + i), r = gn("r" + i);
        if (d === null || r === null || r <= 0) { set("pr" + i, "—"); continue; }
        const p = (d - r) / r * 100;
        primas.push(p);
        set("pr" + i, H.pct(p), p >= 0 ? "delta-up" : "delta-down");
      }
      set("pm", primas.length ? H.pct(primas.reduce((a, b) => a + b, 0) / primas.length) : "—");
      set("np", primas.length ? `${primas.filter(p => p >= 0).length} de ${primas.length}` : "—");
    },
    posicion(g, gn, set) {
      const others = [0, 1, 2, 3, 4, 5].map(i => gn("p" + i)).filter(v => v !== null);
      const s = gn("s");
      if (!others.length || s === null) { set("pos", "—"); set("pct", "—"); return; }
      const rank = others.filter(x => x < s).length + 1, total = others.length + 1;
      set("pos", `${rank}.º de ${total}`);
      set("pct", "P" + Math.round((rank - 1) / (total - 1) * 100));
    }
  };
  function casoRecalc(scope) {
    const f = CASO_CALC[scope.getAttribute("data-caso")];
    if (!f) return;
    const g = n => { const el = scope.querySelector(`[data-p="${n}"]`); const v = parseFloat(el && el.value); return isFinite(v) ? v : 0; };
    const gn = n => { const el = scope.querySelector(`[data-p="${n}"]`); const v = parseFloat(el && el.value); return isFinite(v) && v > 0 ? v : null; };
    const set = (out, txt, cls) => { const el = scope.querySelector(`[data-out="${out}"]`); if (!el) return; el.textContent = txt; el.className = "num" + (cls ? " " + cls : ""); };
    f(g, gn, set, scope);
  }

  const ELEMENTOS = {
    "indice-general": { n: "Índice General", nivel: "mercado", ref: "working", caso: "indice",
      tagline: "la condición del conjunto en una sola línea.",
      proyeccion: `Agrega todas las observaciones del país en un solo número — enero 2026 = 100 — y su serie en el tiempo. La inteligibilidad es de <b>posición</b>: dice dónde está parado el conjunto y cuánto se movió desde la base. Todo lo demás del observatorio se lee contra esta línea.`,
      limites: `No dice por qué: el índice no atribuye causas — para eso se desagrega en categorías y productos. Úsese como punto de partida, no de llegada: toda lectura del mercado comienza en esta línea y se abre después.` },
    "volatilidad-media": { n: "Volatilidad Media", nivel: "mercado", ref: "stone", caso: "volatilidad",
      tagline: "cuánto tiembla el conjunto.",
      proyeccion: `Promedia la dispersión de cada serie — cuánto oscila cada precio alrededor de su propia media — en una volatilidad del conjunto. No dice hacia dónde: dice <b>cuánto tiembla</b>. Es la medida de confianza del resto de los artefactos: un alza sobre volatilidad alta pesa menos.`,
      limites: `No distingue alzas de bajas: la oscilación es simétrica y un mercado volátil puede estar subiendo con fuerza. Úsese como calificador de confianza: un Δ o una prima se leen distinto sobre volatilidad alta.` },
    "precio-medio": { n: "Precio Medio", nivel: "mercado", ref: "schultz", caso: "media",
      tagline: "el índice traducido a pesos.",
      proyeccion: `Reduce todas las observaciones de la semana a un precio medio por unidad. Es la proyección más simple y la más citada: traduce el índice —una abstracción— a la escala del mercado, <b>RD$ por unidad</b>.`,
      limites: `Mezcla unidades y productos: libras con unidades, ajo con berro — es una escala del nivel general, no una canasta de compra. Úsese para seguir la dirección del conjunto; para decidir qué comprar, vaya al producto.` },
    "distribucion-tendencias": { n: "Distribución de Tendencias", nivel: "mercado", ref: "working", caso: "distribucion",
      tagline: "la forma del mercado: cuántas series suben, ceden o se mantienen.",
      proyeccion: `Clasifica cada serie del conjunto —ascendente, estable, descendente— contra su base y cuenta. Devuelve la <b>forma</b> del mercado: cuántas series empujan, cuántas ceden, cuántas se mantienen. El alza del índice se vuelve aquí un paisaje de direcciones.`,
      limites: `La banda de ±5% es una convención: una serie al 4.9% cuenta como estable. Úsese para leer la forma del mercado — amplitud y dirección —, no para ordenar productos: eso lo hace la tabla.` },
    "indice-categoria": { n: "Índice de Categoría", nivel: "categoria", ref: "dm", caso: "indice",
      tagline: "el índice general enfocado en un grupo.",
      proyeccion: `Agrega los índices de producto del grupo en un índice propio — misma base, enero = 100. Es el índice general <b>enfocado</b>: aísla la contribución del grupo y permite atribuir el movimiento del conjunto. El «impulsado por vegetales» del tablero sale de aquí.`,
      limites: `La media simple da igual peso a cada producto: el alza de un berro pesa como la de un repollo. Úsese para atribuir el movimiento del conjunto a un grupo, no para medir el gasto de un consumidor.` },
    "variacion-ytd": { n: "Variación YTD", nivel: "categoria", ref: "dm", caso: "delta",
      tagline: "la variación acumulada que ordena los grupos.",
      proyeccion: `Compara el índice de la categoría contra su base de enero y lo expresa en puntos porcentuales. Es la <b>variación acumulada</b> del año — el artefacto que ordena las categorías entre sí en la barra lateral.`,
      limites: `Acumula desde enero: a mitad de año puede esconder el impulso reciente o arrastrar una base lejana. Úsese para ordenar categorías entre sí; para el momento, véase el índice semanal de la categoría.` },
    "precio-medio-categoria": { n: "Precio Medio", nivel: "categoria", ref: "schultz", caso: "media",
      tagline: "el grupo en pesos corrientes.",
      proyeccion: `El precio medio del grupo: media simple de los precios corrientes de sus productos. Traduce el índice de categoría —otra abstracción— a la <b>escala del mercado</b>.`,
      limites: `Hereda la mezcla de unidades del grupo — libras con unidades en la misma media. Úsese como escala del grupo contra el conjunto; para comparar productos específicos, compárelos en la tabla.` },
    "tendencia-categoria": { n: "Tendencia", nivel: "categoria", ref: "working", caso: "distribucion",
      tagline: "el verbo del grupo: hacia dónde va su índice.",
      proyeccion: `La dirección sostenida del índice del grupo contra su base — ascendente, estable o descendente, con una banda de ±5%. Es el <b>verbo</b> de la categoría.`,
      limites: `Con banda de ±5%, un grupo lento puede vivir ciclos enteros en «estable» sin estar quieto. Úsese para caracterizar el rumbo del grupo; para detectar el giro temprano, véase la serie del índice.` },
    "volatilidad-categoria": { n: "Volatilidad", nivel: "categoria", ref: "banks", caso: "volatilidad",
      tagline: "cuánto vibra el grupo.",
      proyeccion: `La dispersión media de las series del grupo. Distingue un alza sostenida de un grupo que solo <b>vibra</b> — la estructura del grupo incluye cuánto se dispersa dentro de él.`,
      limites: `Responde al cuánto, nunca al hacia dónde: un grupo volátil puede estar en alza sostenida. Úsese para calificar la lectura del índice del grupo y dimensionar el riesgo de extrapolar su tendencia.` },
    "precio": { n: "Precio", nivel: "producto", ref: "schultz", caso: "media",
      tagline: "el dato en su forma más directa.",
      proyeccion: `El precio corriente del producto — la observación en su forma más directa, en RD$ por unidad. Es el único artefacto que <b>no agrega nada</b>: el dato mismo, citado.`,
      limites: `Es una fotografía a fecha fija: el precio corriente no dice si conviene esperar ni de dónde vino. Úsese como cita puntual — el movimiento lo aportan el Δ Semanal y la serie.` },
    "delta-semanal": { n: "Δ Semanal", nivel: "producto", ref: "schultz", caso: "delta",
      tagline: "el pulso: cambio contra la semana anterior.",
      proyeccion: `El cambio de precio contra la semana anterior, en pesos y en porcentaje. Es el <b>pulso</b> del producto: la unidad mínima de movimiento que todos los demás artefactos acaban transportando.`,
      limites: `Una semana es ruido hasta que se sostiene: el Δ no distingue un giro de una fluctuación. Úsese para leer el pulso corto; para el rumbo, contrálo con la tendencia de la serie.` },
    "tendencia-producto": { n: "Tendencia", nivel: "producto", ref: "working", caso: "distribucion",
      tagline: "el rumbo de la serie, contra el ruido semanal.",
      proyeccion: `La dirección sostenida de la serie del producto contra su base — con banda de ±5%. Separa el <b>rumbo</b> del ruido semanal: una semana de baja sobre una serie ascendente sigue siendo alza.`,
      limites: `La banda de ±5% suaviza a propósito: un producto que se mueve dentro de ella se lee como estable aunque oscile. Úsese para el rumbo de fondo; el pulso semanal vive en el Δ.` },
    "volatilidad-producto": { n: "Volatilidad", nivel: "producto", ref: "nevo", caso: "volatilidad",
      tagline: "cuánto oscila la pieza.",
      proyeccion: `Cuánto oscila el precio del producto alrededor de su media, clasificado en <b>baja, moderada o alta</b>. El calificador de todos sus demás artefactos: el mismo Δ pesa distinto con volatilidad alta.`,
      limites: `Califica, no explica: volatilidad alta no implica escasez ni anomalía — solo oscilación. Úsese para saber cuánta confianza dar al Δ y a la tendencia del producto.` },
    "rango-plazas": { n: "Rango entre Plazas", nivel: "producto", ref: "andreyeva", caso: "media",
      tagline: "el precio entre plazas: integración o fragmentación.",
      proyeccion: `El mínimo y el máximo del producto entre las plazas observadas — la <b>dispersión espacial</b> del precio. Mide el mercado mismo: un rango estrecho es integración; uno ancho, fragmentación.`,
      limites: `Depende de las plazas observadas: más plazas pueden ensanchar el rango sin que el mercado cambie. Úsese para leer la dispersión geográfica del día, no para fijar un precio justo.` },
    "media-nacional": { n: "Media Nacional", nivel: "producto", ref: "stone", caso: "media",
      tagline: "el número que construye el mercado como referencia.",
      proyeccion: `El agregado de las plazas en un solo precio — la media que <b>construye el mercado</b> como referencia. Cuando el benchmark dice «mercado nacional», es exactamente este número.`,
      limites: `Es una construcción, no un lugar: nadie compra «en la media». Úsese como referencia de comparación — contra ella se leen cada plaza, la prima y la posición.` },
    "posicion-plaza": { n: "Posición por Plaza", nivel: "producto", ref: "mcfadden", caso: "posicion",
      tagline: "dónde conviene: cada plaza contra la media.",
      proyeccion: `La posición de cada plaza contra la media nacional — sobre, bajo o en la media. Convierte la tabla de precios en un <b>mapa de lectura</b>: dónde conviene comprar, dónde se paga la prima.`,
      limites: `Compara niveles, no causas: una plaza cara puede reflejar calidad, transporte u horario de feria. Úsese para ubicar cada plaza en el mapa del precio; la explicación exige ir al terreno.` },
    "indice-internacional": { n: "Índice Internacional", nivel: "intl", ref: "muhammad", caso: "indice",
      tagline: "el espejo externo, base 100.",
      proyeccion: `El mismo gesto del índice general, sobre la referencia externa: las series internacionales agregadas con <b>base 100</b>. Es el espejo contra el que se lee el mercado doméstico.`,
      limites: `La referencia externa no es la canasta local: composición y unidades difieren del mercado dominicano. Úsese como espejo de lectura, no como meta de política de precios.` },
    "brecha": { n: "Brecha Doméstico–Internacional", nivel: "intl", ref: "muhammad", caso: "prima",
      tagline: "cuánto se separa lo local de lo externo.",
      proyeccion: `La diferencia entre el índice doméstico y el internacional, en <b>puntos</b>. El artefacto central de la vista internacional: cuánto se separa lo que raya aquí de lo que raya afuera.`,
      limites: `En puntos de índice, no en pesos: la brecha no dice cuánto se paga de más en la compra concreta. Úsese para leer la dirección de la separación; la escala en pesos vive en la Diferencia Absoluta.` },
    "prima-media": { n: "Prima Media del Conjunto", nivel: "intl", ref: "muhammad", caso: "prima",
      tagline: "el sobreprecio medio del conjunto.",
      proyeccion: `El promedio de las primas producto a producto — cuánto cuesta <b>en promedio</b> el conjunto doméstico sobre la referencia internacional, en porcentaje.`,
      limites: `El promedio esconde la distribución: una prima media de +14% puede ser generalizada o la suma de extremos. Úsese junto al conteo de Productos con Prima para leer extensión e intensidad.` },
    "productos-con-prima": { n: "Productos con Prima", nivel: "intl", ref: "andreyeva", caso: "prima",
      tagline: "la brecha como conteo: extensión, no promedio.",
      proyeccion: `Cuántos productos del conjunto cotizan sobre la referencia — la prima como <b>conteo</b>, no como promedio. Mide extensión: si la brecha es generalizada o la sostienen pocos productos.`,
      limites: `El conteo ignora magnitud: un producto con +1% cuenta igual que uno con +80%. Úsese para medir cuán generalizada es la brecha; la intensidad vive en la Prima Media del Conjunto.` },
    "indice-ref-categoria": { n: "Índice de Referencia de Categoría", nivel: "intl-cat", ref: "muhammad", caso: "indice",
      tagline: "la categoría vista desde afuera.",
      proyeccion: `El índice internacional del grupo de referencia — la categoría <b>vista desde afuera</b>. Contra él se mide la categoría dominicana.`,
      limites: `La referencia internacional del grupo usa su propia composición — no replica la canasta local de la categoría. Úsese como contrafactual de lectura, no como índice paralelo del grupo local.` },
    "variacion-relativa": { n: "Variación Relativa", nivel: "intl-cat", ref: "banks", caso: "relativa",
      tagline: "subir, pero ¿más o menos que la referencia?",
      proyeccion: `La variación YTD de la categoría doméstica menos la de su referencia internacional — en <b>puntos porcentuales</b>. Si el grupo sube pero su referencia sube más, el grupo pierde terreno aun subiendo.`,
      limites: `En puntos porcentuales: dice quién corre más, no quién está más alto — eso es la posición. Úsese para leer la carrera del grupo contra su referencia entre dos fechas.` },
    "posicion-categoria": { n: "Posición de la Categoría Dominicana", nivel: "intl-cat", ref: "berry", caso: "posicion",
      tagline: "el grupo en el paisaje: percentil, no rumbo.",
      proyeccion: `La posición del índice de la categoría dominicana contra el conjunto observado — <b>percentil</b> de la categoría en su paisaje. Dónde está el grupo, no solo hacia dónde va.`,
      limites: `El percentil depende del conjunto con que se compare: el mismo grupo sube o baja de posición al cambiar el paisaje. Úsese para ubicar el grupo hoy; la trayectoria vive en las variaciones.` },
    "precio-internacional": { n: "Precio Internacional", nivel: "intl-prod", ref: "muhammad", caso: "media",
      tagline: "el contrafactual: lo que cuesta afuera.",
      proyeccion: `El precio de referencia externa del producto — el <b>contrafactual</b>: lo que costaría fuera. En RD$ por unidad, citado contra el precio doméstico.`,
      limites: `Es un contrafactual calculado, no una cotización local: no incorpora flete, arancel ni margen minorista. Úsese como referencia de comparación, no como precio alternativo de compra.` },
    "diferencia-absoluta": { n: "Diferencia Absoluta", nivel: "intl-prod", ref: "muhammad", caso: "prima",
      tagline: "la brecha en pesos, sin relativizar.",
      proyeccion: `La brecha del producto en pesos — precio doméstico menos referencia internacional, <b>sin relativizar</b>. La escala del sobreprecio.`,
      limites: `Sin relativizar: RD$ de diferencia pesan distinto en un producto de RD$ 20 que en uno de RD$ 120. Úsese para dimensionar la escala del sobreprecio; para ordenar productos, véase la Prima o Descuento.` },
    "prima-descuento": { n: "Prima o Descuento", nivel: "intl-prod", ref: "andreyeva", caso: "prima",
      tagline: "prima si sube, descuento si cede — en porcentaje.",
      proyeccion: `La brecha en porcentaje — <b>prima</b> si es positiva, <b>descuento</b> si es negativa. El artefacto que permite ordenar productos por cuánto se desvían de la referencia.`,
      limites: `Porcentual contra la referencia: en productos baratos una prima grande puede ser pocos pesos. Úsese para ordenar y comparar desvíos; el impacto en pesos vive en la Diferencia Absoluta.` },
    "desvio-referencia": { n: "Desvío de la Referencia", nivel: "intl-prod", ref: "nevo", caso: "prima",
      tagline: "cuán lejos está el precio de lo esperado.",
      proyeccion: `El desvío del producto contra su referencia — la <b>distancia relativa</b> de la pieza a su contrafactual. La versión fina de la prima: mide cuán lejos está el precio observado del precio esperado.`,
      limites: `Mide distancia, no conducta: un desvío grande no dice si el precio local está alto o la referencia está baja. Úsese como lectura fina de la brecha, junto a la prima y la diferencia.` }
  };

  function vElemento(id) {
    const e = ELEMENTOS[id];
    if (!e) return notFound();
    const ctx = NIVEL_CTX[e.nivel];
    return pagehead(e.n, `<span class="chips"><span class="chip">elemento epistémico</span><span class="chip">${ctx.nombre}</span></span>`,
      `Proyección del nivel <em>${ctx.nombre.toLowerCase()}</em> sobre la data — ${e.tagline}`) +
      `<div class="figcap figcap--section"><span class="figcap__tag">Perfil</span><span class="figcap__caption">la proyección que genera inteligibilidad</span></div>` +
      `<p class="lead" style="margin-top:0.4rem">${e.proyeccion}</p>` +
      `<div class="tablewrap"><table class="table is-dense"><tbody>
        <tr><td class="mono">Nivel</td><td>${ctx.nombre} <span style="color:var(--ink-3)">· ${ctx.sub}</span></td></tr>
        <tr><td class="mono">Vista viva</td><td><a href="${ctx.vista}">${ctx.ver}</a> — el elemento operando sobre el conjunto completo.</td></tr>
      </tbody></table></div>` +
      `<div class="figcap figcap--section"><span class="figcap__tag">Límites y uso</span><span class="figcap__caption">qué no dice el artefacto, y cómo leerlo</span></div>` +
      `<p class="lead" style="margin-top:0.4rem">${e.limites}</p>` +
      `<div class="figcap figcap--section"><span class="figcap__tag">Caso</span><span class="figcap__caption">${e.tagline}</span></div>` +
      `<div class="figbox figbox--mod"><div class="figbox__head"><div class="figcap"><span class="figcap__tag">Caso</span><span class="figcap__caption">${CASO_TITULO[e.caso]}</span></div></div>` +
      `<div class="figbox__body">${CASO_BUILD[e.caso]()}</div>` +
      `<span class="figfoot">edita los datos — la proyección recalcula en línea · cifras ilustrativas</span></div>` +
      `<div class="figcap figcap--section"><span class="figcap__tag">Referencia</span><span class="figcap__caption">la base que sostiene la lectura</span></div>` +
      `<ol class="refs"><li>${REFS[e.ref]} <i>— ${e.tagline}</i></li></ol>` +
      `<p class="note"><a href="#/metodo">← volver a Método</a></p>`;
  }

  function vMetodo() {
    return `<div class="metodo">` +
      pagehead("Método") +
      `<p class="lead">Todo lo que muestra el observatorio se levanta sobre un mismo material: <b>la observación de precios</b> — plaza, fecha, producto, precio. Sobre ella se construyen primero el <b>estado</b> y la <b>dinámica</b> del mercado; después la <b>geografía</b> —nacional o internacional— y el <b>nivel de datos</b> —todos, categoría, producto—; y de cada combinación surge su listado de <b>artefactos epistémicos</b>.</p>

      <div class="figcap figcap--section"><span class="figcap__tag">Representación</span><span class="figcap__caption">del material observado al modelo del mercado</span></div>
      <div class="mpipe">
        <div class="mfnode">Observaciones<small>plaza · fecha · producto · precio</small></div>
        <span class="mpipe__arrow"></span>
        <div class="mpipe__pair">
          <div class="mfnode">Estado<small>la condición actual</small></div>
          <div class="mfnode">Dinámica<small>la evolución en el tiempo</small></div>
        </div>
      </div>

      <div class="figcap figcap--section"><span class="figcap__tag">Geografía × Nivel</span><span class="figcap__caption">el nivel de datos se repite dentro de cada geografía — cada artefacto abre su perfil</span></div>
      <div class="mfbranches">
        ${mfBranch(MF_ARTS.nac, "mfbranch--nac")}
        ${mfBranch(MF_ARTS.intl, "mfbranch--intl")}
      </div>

      <div class="figcap figcap--section"><span class="figcap__tag">Benchmark</span><span class="figcap__caption">transversal a las seis combinaciones</span></div>
      <div class="mbench">Una plaza contra otra, contra un subconjunto de plazas —que puede ser el todo—, o contra el mercado agregado.</div>

      <p class="note">La dinámica describe cómo se comporta una propiedad del mercado a través del tiempo; el estado describe la condición corriente. Cifras ilustrativas.</p>

      <div class="figcap figcap--section"><span class="figcap__tag">Referencias</span><span class="figcap__caption">estimación de demanda</span></div>
      <ol class="refs">
        <li>Andreyeva, T., Long, M. W., &amp; Brownell, K. D. (2010). The impact of food prices on consumption: A systematic review of price elasticities of demand for foods. <i>American Journal of Public Health, 100</i>(2), 216–222.</li>
        <li>Banks, J., Blundell, R., &amp; Lewbel, A. (1997). Quadratic Engel curves and consumer demand. <i>The Review of Economics and Statistics, 79</i>(4), 527–539.</li>
        <li>Berry, S. (1994). Estimating discrete-choice models of product differentiation. <i>The RAND Journal of Economics, 25</i>(2), 242–262.</li>
        <li>Berry, S., Levinsohn, J., &amp; Pakes, A. (1995). Automobile prices in market equilibrium. <i>Econometrica, 63</i>(4), 841–890.</li>
        <li>Deaton, A. S., &amp; Muellbauer, J. N. (1980). An almost ideal demand system. <i>The American Economic Review, 70</i>(3), 312–326.</li>
        <li>McFadden, D. (1974). Conditional logit analysis of qualitative choice behavior. En P. Zarembka (Ed.), <i>Frontiers in econometrics</i> (pp. 105–142). Academic Press.</li>
        <li>Muhammad, A., D'Souza, A., Meade, B., &amp; Michałek, J. (2011). <i>International evidence on food consumption patterns: An update using 2005 ICP data</i> (Technical Bulletin TB-1929). U.S. Department of Agriculture, Economic Research Service.</li>
        <li>Nevo, A. (2000). A practitioner's guide to estimation of random-coefficients logit models of demand. <i>Journal of Economics &amp; Management Strategy, 9</i>(4), 513–548.</li>
        <li>Schultz, H. (1938). <i>The theory and measurement of demand</i>. University of Chicago Press.</li>
        <li>Stone, R. (1954). Linear expenditure functions and an extension to the linear expenditure system. <i>Econometrica, 22</i>(4), 461–471.</li>
        <li>Working, H. (1927). What do statistical "demand curves" mean? <i>Journal of the American Statistical Association, 22</i>(157), 26–39.</li>
      </ol>
      </div>
      `;
  }

  const DOCS_SECCIONES = [
    ["doc-quickstart", "Inicio rápido"],
    ["doc-mercado", "Mercado"],
    ["doc-benchmark", "Benchmark"],
    ["doc-coleccion", "Colección"],
    ["doc-atajos", "Atajos de teclado"],
    ["doc-glosario", "Glosario"]
  ];
  function vCuenta() {
    return pagehead("Cuenta", null, `Identidad y estado del instrumento. Las preferencias de apertura —geografía, nivel de datos, vistas y ventana— se ajustan en <a href="#/herramientas">Parámetros</a>.`) +
      `<div class="acerca-crest">
        <div>
          <div class="acerca-crest__name">Mercado Observatorio</div>
          <div class="mono acerca-crest__sub">BREMONTIX · CUENTA INSTITUCIONAL</div>
        </div>
      </div>
      <div class="figcap figcap--section"><span class="figcap__tag">Estado</span><span class="figcap__caption">el servicio y los datos con los que abre la sesión</span></div>
      <div class="tablewrap"><table class="table is-dense">
        <tbody>
          <tr><td class="mono">Servicio</td><td><span class="pill pill--up">● Operativo</span></td></tr>
          <tr><td class="mono">Datos</td><td>Semana del 20 de agosto de 2026 · cierre 08:00 AST</td></tr>
          <tr><td class="mono">Versión</td><td>v0.9 — agosto 2026</td></tr>
          <tr><td class="mono">Elaboración</td><td>Bremontix</td></tr>
        </tbody>
      </table></div>
      <div class="figcap figcap--section"><span class="figcap__tag">Accesos</span><span class="figcap__caption">todo lo que ofrece el sistema, en un lugar</span></div>
      <div class="tablewrap"><table class="table is-dense">
        <tbody>
          <tr><td class="mono">Parámetros</td><td><a href="#/herramientas">Preferencias de apertura</a> — geografía, nivel, vista, ventana y ancho de página.</td></tr>
          <tr><td class="mono">Documentación</td><td><a href="#/docs">Guía de uso</a> — qué hace cada vista y cómo se opera.</td></tr>
          <tr><td class="mono">Método</td><td><a href="#/metodo">Base conceptual</a> — de la observación al artefacto.</td></tr>
          <tr><td class="mono">Acerca de</td><td><a href="#/acerca">El instrumento</a> — qué es y qué cubre.</td></tr>
        </tbody>
      </table></div>
      <p class="note">Los datos mostrados por el instrumento son ilustrativos.</p>
      <div class="source">Mercado Observatorio · Bremontix</div>`;
  }

  function vDocs() {
    const toc = DOCS_SECCIONES.map(s => `<button class="tbtn" type="button" data-docs-jump="${s[0]}">${s[1]}</button>`).join("");
    const tabla = (head, rows) => `<div class="tablewrap"><table class="table is-dense"><thead><tr>${head.map(h => `<th>${h}</th>`).join("")}</tr></thead><tbody>${rows.map(r => `<tr>${r.map((c, i) => i === 0 ? `<td class="mono">${c}</td>` : `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`;
    return pagehead("Documentación", null, `Guía de uso del <b>Mercado Observatorio</b> — qué hace cada parte del sistema y cómo se usa. Para la base conceptual, ver <a href="#/metodo">Método</a>.`) +
      `<div class="docs-toc">${toc}</div>` +

      `<div class="figcap figcap--section" id="doc-quickstart"><span class="figcap__tag">Inicio rápido</span><span class="figcap__caption">los tres gestos del observatorio</span></div>
      <p class="lead" style="margin-top:0.4rem">El sistema se usa con tres gestos: <b>observar</b> el mercado en <a href="#/mercado">Mercado</a>, <b>comparar</b> posiciones en <a href="#/benchmark">Benchmark</a> y <b>cargar</b> tus propios datos en <a href="#/herramientas/coleccion/gestionar">Colección</a>. Todo lo demás —geografía, niveles, vistas, parámetros— son variantes de estos tres.</p>` +

      `<div class="figcap figcap--section" id="doc-mercado"><span class="figcap__tag">Mercado</span><span class="figcap__caption">observar el estado y la dinámica</span></div>
      <p class="lead" style="margin-top:0.4rem">La vista principal representa el mercado dominicano y su referencia internacional. Dos parámetros la enfocan:</p>
      ${tabla(["Control", "Qué hace"], [
        ["Geografía", "Nacional o Internacional — se alterna en la barra superior. La internacional es la referencia externa contra la que se mide lo doméstico."],
        ["Nivel de datos", "Todos, una categoría o un producto. Se elige navegando la barra lateral o con la búsqueda (⌘K); la vista se re-enfoca sin cambiar de página."],
        ["Ventana de datos", "El horizonte temporal de las series: último mes, 6 meses, YTD, 1 año o todo. Vive en el chip de la barra superior."],
        ["Vistas", "Tabla, Compacta, Movimiento o Mapa de calor — la misma información con lecturas distintas."],
        ["Tabla de productos", "Filtro de texto y de tendencia, densidad, exportar CSV, elegir columnas y pantalla completa desde la barra de la tabla."]
      ])}` +

      `<div class="figcap figcap--section" id="doc-benchmark"><span class="figcap__tag">Benchmark</span><span class="figcap__caption">comparar una posición contra un referente</span></div>
      <p class="lead" style="margin-top:0.4rem">Compara la plaza que elijas contra <b>otro competidor</b>, contra una <b>selección</b> de plazas marcadas, o contra el <b>mercado agregado</b> — el agregado se construye con todas las plazas observadas. La vista muestra la brecha de precio, la evolución conjunta y la posición relativa.</p>` +

      `<div class="figcap figcap--section" id="doc-coleccion"><span class="figcap__tag">Colección</span><span class="figcap__caption">cargar datasets y consultar la data procesada</span></div>
      <p class="lead" style="margin-top:0.4rem">Colección incorpora datos propios al sistema en dos pasos — <a href="#/herramientas/coleccion/gestionar">Gestionar</a> y <a href="#/herramientas/coleccion/consultar">Consultar</a>:</p>
      ${tabla(["Paso", "Qué sucede"], [
        ["1 · Cargar", "Arrastra cualquier documento —pdf, imagen, csv, json— a la zona de carga de Gestionar y pulsa Cargar. La fuente es opcional: sirve para recordar de dónde provino el dato."],
        ["2 · Pipeline", "Cada carga avanza por cuatro estados: Recibido → Mapeando → En DB → Procesado. Cuando termina, su data ya forma parte de la base."],
        ["3 · Ver datos", "El botón «Ver datos» de cada carga muestra la fuente y la data que el sistema extrajo de ella; Eliminar retira la carga y su data."],
        ["4 · Consultar", "La consola SQL pregunta a la base procesada: escribe una consulta, elige un ejemplo o inserta tablas y columnas desde el panel de esquema; Ejecutar o ⌘↵ responde en la tabla de resultados."]
      ])}
      <p class="note" style="margin-top:0.6rem">Las tablas de la base son <span class="mono">observaciones</span> — mercado × fecha × producto → precio—, <span class="mono">productos</span>, <span class="mono">mercados</span> y <span class="mono">cargas</span>.</p>` +

      `<div class="figcap figcap--section" id="doc-atajos"><span class="figcap__tag">Atajos de teclado</span><span class="figcap__caption">operar sin soltar el teclado</span></div>
      ${tabla(["Atajo", "Acción"], [
        ["⌘K / Ctrl+K", "Abrir la búsqueda de categorías, productos y referencias."],
        ["Alt + Click", "Vista previa de cualquier enlace — explora sin salir de la vista; «Abrir en la vista» la trae al frente."],
        ["⌘↵ / Ctrl+↵", "Ejecutar la consulta SQL en Colección — Consultar."]
      ])}` +

      `<div class="figcap figcap--section" id="doc-glosario"><span class="figcap__tag">Glosario</span><span class="figcap__caption">los artefactos que calcula el sistema</span></div>
      ${tabla(["Término", "Lectura"], [
        ["Índice", "Evolución conjunta de un grupo de precios, base 100 en enero de 2026."],
        ["Volatilidad", "Cuánto varía un precio en el tiempo; baja, moderada o alta."],
        ["Tendencia", "Dirección sostenida de la serie: ascendente, estable o descendente."],
        ["Δ semanal", "Cambio de precio frente a la semana anterior."],
        ["Rango entre plazas", "Mínimo y máximo del producto entre las plazas observadas."],
        ["Prima", "Posición porcentual frente a una referencia — internacional o de mercado."],
        ["YTD", "Variación acumulada del año en curso."]
      ])}
      <div class="source">Mercado Observatorio · Bremontix · documentación del sistema</div>`;
  }

  function vAcerca() {
    return pagehead("Acerca de") +
      `<div class="acerca-crest">
        <div>
          <div class="acerca-crest__name">Mercado Observatorio</div>
          <div class="mono acerca-crest__sub">BREMONTIX · OBSERVAR · REPRESENTAR · COMPARAR</div>
        </div>
      </div>
      <p class="lead">Un instrumento de <b>observación, representación y comparación de mercados agrícolas</b>. Transforma observaciones de precios dispersas —plaza, fecha, producto, precio— en representaciones del <b>estado</b> y la <b>dinámica</b> del mercado, y en artefactos que apoyan el seguimiento doméstico, el monitoreo internacional y el benchmarking competitivo.</p>
      <div class="tablewrap"><table class="table is-dense">
        <tbody>
          <tr><td class="mono">Versión</td><td>v0.9 — agosto 2026</td></tr>
          <tr><td class="mono">Datos</td><td>Cifras ilustrativas — semana del 20 de agosto de 2026</td></tr>
          <tr><td class="mono">Cobertura</td><td>Mercado dominicano · referencia internacional</td></tr>
          <tr><td class="mono">Elaboración</td><td>Bremontix</td></tr>
        </tbody>
      </table></div>
      <p class="note">Los conceptos que sostienen las representaciones se detallan en <a href="#/metodo">Método</a>; el uso de cada vista, en <a href="#/docs">Documentación</a>.</p>
      <div class="source">Mercado Observatorio · Bremontix</div>`;
  }

  function vHerramientas() {
    return pagehead("Herramientas") +
      `<p class="lead">Los <b>parámetros por defecto</b> definen el estado inicial de cada vista. Se aplican de inmediato y se guardan en este navegador.</p>` +
      pagenavHTML([["sec-sitio", "Sitio"], ["sec-datos", "Datos"]]) +
      `<div id="sec-sitio">
        <div class="pcsec__t">Sitio — cómo se presenta el instrumento</div>
        <div class="pcards">
          <div class="pcard">
            <div class="pcard__t">Presentación</div>
            <p class="phint">Preferencias de todo el sitio — aplican a todas las vistas por igual.</p>
            <div class="control">
              <label for="p-frame">Ancho de la columna</label>
              <select id="p-frame">
                <option value="1440"${params.frame === 1440 ? " selected" : ""}>Compacto · 1440 px</option>
                <option value="1600"${params.frame === 1600 ? " selected" : ""}>Equilibrado · 1600 px</option>
                <option value="1760"${params.frame === 1760 ? " selected" : ""}>Amplio · 1760 px</option>
              </select>
            </div>
            <div class="control">
              <label for="p-conv">Color de movimiento</label>
              <select id="p-conv">
                <option value="mercado"${params.conv !== "bolsa" ? " selected" : ""}>Subida en rojo, bajada en verde</option>
                <option value="bolsa"${params.conv === "bolsa" ? " selected" : ""}>Subida en verde, bajada en rojo</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div id="sec-datos">
        <div class="pcsec__t">Datos — con qué se abre cada vista</div>
        <div class="pcards">
          <div class="pcard">
            <div class="pcard__t">Mercado</div>
            <p class="phint">Geografía, nivel, vista y ventana con los que abre la vista.</p>
            <div class="control">
              <label for="p-geo">Geografía</label>
              <select id="p-geo">
                <option value="nacional"${params.geo === "nacional" ? " selected" : ""}>Nacional</option>
                <option value="internacional"${params.geo === "internacional" ? " selected" : ""}>Internacional</option>
              </select>
            </div>
            <div class="control">
              <label for="p-nivel">Nivel de datos</label>
              <select id="p-nivel">
                <option value="todos"${params.nivel === "todos" ? " selected" : ""}>Todos</option>
                <optgroup label="Categoría">${D.categorias.map(c => `<option value="cat:${c.id}"${params.nivel === "cat:" + c.id ? " selected" : ""}>${c.nombre}</option>`).join("")}</optgroup>
                <optgroup label="Producto">${D.productos.map(p => `<option value="prod:${p.id}"${params.nivel === "prod:" + p.id ? " selected" : ""}>${p.nombre}</option>`).join("")}</optgroup>
              </select>
            </div>
            <div class="control">
              <label for="p-vista">Vista de productos</label>
              <select id="p-vista">
                <option value="tabla"${params.vista === "tabla" ? " selected" : ""}>Tabla</option>
                <option value="compacta"${params.vista === "compacta" ? " selected" : ""}>Compacta</option>
                <option value="treemap"${params.vista === "treemap" ? " selected" : ""}>Movimiento</option>
                <option value="heatmap"${params.vista === "heatmap" ? " selected" : ""}>Mapa de Calor</option>
               </select>
            </div>
            <div class="control">
              <label for="p-ventana">Ventana de datos</label>
              <select id="p-ventana">
                <option value="1m"${params.ventana === "1m" ? " selected" : ""}>Último mes</option>
                <option value="6m"${params.ventana === "6m" ? " selected" : ""}>6 meses</option>
                <option value="ytd"${params.ventana === "ytd" ? " selected" : ""}>YTD — el año en curso</option>
                <option value="1a"${params.ventana === "1a" ? " selected" : ""}>1 año</option>
                <option value="todo"${params.ventana === "todo" ? " selected" : ""}>Todo</option>
              </select>
            </div>
          </div>
          <div class="pcard">
            <div class="pcard__t">Cobertura</div>
            <p class="phint">Plazas observadas que componen el agregado nacional — sin selección no hay datos.</p>
            <div class="control">
              <label>Plazas</label>
              <label class="pplazas__all"><input type="checkbox" id="p-plazas-all">Todas las plazas</label>
              <div class="pplazas" id="p-plazas">
                ${D.mercados.map(m => `<label><input type="checkbox" value="${m.id}"${params.plazas.includes(m.id) ? " checked" : ""}>${m.nombre} <span>· ${m.ciudad}</span></label>`).join("")}
              </div>
            </div>
          </div>
          <div class="pcard">
            <div class="pcard__t">Benchmark</div>
            <p class="phint">Cómo llega la vista al abrirla: competidor observado y referencia ya construida.</p>
            <div class="control">
              <label for="p-comp">Competidor observado</label>
              <select id="p-comp">${D.competidores.map(c => `<option value="${c.id}"${c.id === params.benchComp ? " selected" : ""}>${c.nombre}</option>`).join("")}</select>
            </div>
            <div class="control">
              <label for="p-mode">Referencia</label>
              <select id="p-mode">
                <option value="mercado"${params.benchMode === "mercado" ? " selected" : ""}>Mercado</option>
                <option value="subset"${params.benchMode === "subset" ? " selected" : ""}>Selección</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div class="pactions">
        <button class="psave" type="button" id="psave">Guardar</button>
        <button class="pdefault" type="button" id="pdefault">De fábrica</button>
        <span class="pnote" id="pnote"></span>
      </div>`;
  }

  const SQL_TABLAS = [
    { nombre: "observaciones", desc: "observación de mercado — mercado × fecha × producto → precio", cols: ["mercado", "fecha", "producto", "precio", "carga"] },
    { nombre: "productos", desc: "catálogo de productos", cols: ["id", "nombre", "categoria", "unidad"] },
    { nombre: "mercados", desc: "plazas observadas", cols: ["id", "nombre", "ciudad"] },
    { nombre: "cargas", desc: "cargas del pipeline de colección", cols: ["id", "nombre", "fuente", "tipo", "fecha", "filas", "estado"] }
  ];
  const SQL_EJEMPLOS = [
    { label: "Observaciones · tomate", q: "SELECT mercado, fecha, producto, precio, carga\nFROM observaciones\nWHERE producto = 'Tomate'" },
    { label: "Precio medio por producto", q: "SELECT producto, COUNT(*) AS observaciones, AVG(precio) AS precio_medio\nFROM observaciones\nGROUP BY producto" },
    { label: "Cargas recientes", q: "SELECT nombre, tipo, filas, estado, fecha\nFROM cargas\nORDER BY fecha DESC" },
    { label: "Precio medio por ciudad", q: "SELECT m.ciudad, AVG(o.precio) AS precio_medio\nFROM observaciones o JOIN mercados m ON o.mercado = m.id\nGROUP BY m.ciudad" }
  ];
  function sqlObservaciones() {
    const out = [];
    D.productos.forEach(p => {
      D.mercados.forEach(m => {
        out.push({ mercado: m.id, mercadoNombre: m.nombre, ciudad: m.ciudad, fecha: "2026-08-20", producto: p.nombre, precio: p.mercados[m.id][2], carga: "base" });
      });
    });
    return out;
  }
  function sqlRun(qRaw) {
    const q = String(qRaw || "").trim();
    if (!q) return { ok: false, msg: "Consulta vacía — escribe SQL o elige un ejemplo.", cols: [], rows: [] };
    const U = q.replace(/\s+/g, " ").toUpperCase();
    if (!U.startsWith("SELECT")) return { ok: false, msg: "La consola responde a consultas SELECT sobre la base procesada.", cols: [], rows: [] };
    const obs = sqlObservaciones();
    const rxCol = col => new RegExp(col + "\\s*(?:=|LIKE)\\s*'([^']*)'", "i");
    const likeVal = v => v.replace(/%/g, "").toLowerCase();
    const mProd = q.match(rxCol("producto"));
    const mMer = q.match(rxCol("mercado"));
    let cols = [], rows = [], label = "";
    if (U.includes("FROM CARGAS")) {
      label = "cargas";
      const all = [colBaseCarga()].concat(loadColecciones());
      cols = ["nombre", "tipo", "filas", "estado", "fecha"];
      rows = all.map(c => [c.nombre, colTipo(c), String(c.filas ?? "—"), colEstadoLabel(c.estado || "procesado"), (c.fechaISO || "").slice(0, 10)]);
    } else if (U.includes("FROM MERCADOS")) {
      label = "mercados";
      cols = ["id", "nombre", "ciudad"];
      rows = D.mercados.map(m => [m.id, m.nombre, m.ciudad]);
    } else if (U.includes("FROM PRODUCTOS")) {
      label = "productos";
      cols = ["id", "nombre", "categoria", "unidad"];
      rows = D.productos.map(p => [p.id, p.nombre, H.cat(p.cat).nombre, p.unidad]);
    } else if (U.includes("FROM OBSERVACIONES")) {
      if (U.includes("GROUP BY") && U.includes("CIUDAD")) {
        label = "agregado por ciudad";
        cols = ["ciudad", "precio_medio"];
        const by = {};
        obs.forEach(o => { (by[o.ciudad] = by[o.ciudad] || []).push(o.precio); });
        rows = Object.entries(by).map(([ciudad, ps]) => [ciudad, H.fmtRD(ps.reduce((a, b) => a + b, 0) / ps.length)]);
      } else if (U.includes("GROUP BY PRODUCTO")) {
        label = "agregado por producto";
        cols = ["producto", "observaciones", "precio_medio"];
        const by = {};
        obs.forEach(o => { (by[o.producto] = by[o.producto] || []).push(o.precio); });
        rows = Object.entries(by).map(([producto, ps]) => [producto, String(ps.length), H.fmtRD(ps.reduce((a, b) => a + b, 0) / ps.length)]);
      } else if (U.includes("COUNT(*)")) {
        label = "conteo";
        cols = ["count(*)"];
        rows = [[String(obs.length)]];
      } else {
        label = "observaciones";
        let data = obs;
        if (mProd) { const w = likeVal(mProd[1]); data = data.filter(o => o.producto.toLowerCase().includes(w)); }
        if (mMer) { const w = likeVal(mMer[1]); data = data.filter(o => (o.mercado + " " + o.mercadoNombre).toLowerCase().includes(w)); }
        cols = ["mercado", "fecha", "producto", "precio", "carga"];
        rows = data.map(o => [o.mercadoNombre, o.fecha, o.producto, H.fmtRD(o.precio), o.carga]);
      }
    } else {
      return { ok: false, msg: "Tabla no reconocida — la consola responde sobre observaciones · productos · mercados · cargas.", cols: [], rows: [] };
    }
    const ms = (2 + rows.length * 0.37 + Math.random()).toFixed(0);
    return { ok: true, msg: `${rows.length} fila${rows.length === 1 ? "" : "s"} · ${label} · ${ms} ms · simulado`, cols, rows };
  }
  function sqlResultadoHTML(res) {
    if (!res) return `<div class="sqlbar mono" id="sqlbar">listo — ⌘↵ / Ctrl+↵ ejecuta · tablas: observaciones · productos · mercados · cargas</div>`;
    if (!res.ok) return `<div class="sqlbar sqlbar--err mono" id="sqlbar">${escHTML(res.msg)}</div>`;
    const shown = res.rows.slice(0, 80);
    return `<div class="sqlbar sqlbar--ok mono" id="sqlbar">${escHTML(res.msg)}</div>
      <div class="tablewrap"><table class="table is-dense">
        <thead><tr>${res.cols.map(c => `<th>${escHTML(c)}</th>`).join("")}</tr></thead>
        <tbody>${shown.map(r => `<tr>${r.map(x => `<td>${escHTML(x)}</td>`).join("")}</tr>`).join("") || `<tr><td colspan="${res.cols.length}" class="empty">0 filas.</td></tr>`}</tbody>
      </table></div>
      ${res.rows.length > 80 ? `<span class="figfoot">Mostrando 80 de ${res.rows.length} filas.</span>` : ""}`;
  }
  function vColeccionGestionar() {
    return pagehead("Colección — Gestionar", null, `Cargar un dataset en <b>múltiples formas</b>: cualquier documento —pdf, imagen, csv, json— entra al pipeline <span class="mono">recibido → mapeando → en db → procesado</span> y queda disponible para consulta en <a href="#/herramientas/coleccion/consultar">Consultar</a>.`) +
      `<div class="figcap figcap--section"><span class="figcap__tag">Cargar</span><span class="figcap__caption">arrastra cualquier documento — luego se mapea al esquema de dataset y se carga en la base</span></div>
      <div class="pcard">
        <div class="pcard__t">Nueva carga</div>
        <p class="phint">El documento puede tener cualquier formato; el mapeo al esquema <span class="mono">mercado × fecha × producto → precio</span> es responsabilidad del pipeline.</p>
        <div class="dropzone" id="col-drop" tabindex="0" role="button" aria-label="Arrastra o selecciona un documento">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 15V4M7.5 8.5 12 4l4.5 4.5"/><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15"/></svg>
          <div class="dropzone__t">Arrastra un documento aquí</div>
          <div class="dropzone__s">o haz clic para seleccionar — cualquier tipo: pdf · imagen · csv · json · texto</div>
          <input type="file" id="p-carga-file" hidden>
        </div>
        <div class="dropfile" id="col-filechip" hidden>
          <span class="mono" id="col-filechip-name"></span>
          <button class="dropfile__x" id="col-filechip-x" type="button" title="Quitar documento" aria-label="Quitar documento"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2 2 8"/></svg></button>
        </div>
        <div class="control" style="margin-top:0.75rem">
          <label for="p-carga-fuente">Fuente — opcional</label>
          <input id="p-carga-fuente" type="text" placeholder="ej. MINAGRI — informe semanal pdf" style="font-size:0.78rem;padding:0.38rem 0.6rem;border:1px solid var(--line);border-radius:7px;width:100%">
        </div>
        <div style="display:flex;align-items:center;gap:0.7rem;margin-top:0.8rem">
          <button class="psave" type="button" id="p-carga-btn">Cargar</button>
        </div>
      </div>
      <div class="figcap figcap--section"><span class="figcap__tag">Cargas</span><span class="figcap__caption">ver los datos que produjo cada carga — y su posición en el pipeline</span></div>
      ${cargasHTML()}
      <div id="coleccion-detalle" style="margin-top:0.7rem"></div>`;
  }
  function vColeccionConsultar() {
    const schema = SQL_TABLAS.map(t => `<div class="sqlschema__table">
        <button class="sqlschema__t mono" type="button" data-sqlins="${t.nombre}" title="Insertar en el editor">${t.nombre}</button>
        <span class="sqlschema__d">${t.desc}</span>
        <div class="sqlschema__cols">${t.cols.map(c => `<button class="sqlschema__col mono" type="button" data-sqlins="${c}">${c}</button>`).join("")}</div>
      </div>`).join("");
    const chips = SQL_EJEMPLOS.map((e, i) => `<button class="sqlchips__btn" type="button" data-sqlidx="${i}">${e.label}</button>`).join("");
    return pagehead("Colección — Consultar", null, `Consola SQL sobre la <b>data procesada</b> en la base de datos — la data que produjeron las cargas de <a href="#/herramientas/coleccion/gestionar">Gestionar</a>. Escribe una consulta, parte de un ejemplo, o insértala desde el panel de esquema.`) +
      `<div class="figcap figcap--section"><span class="figcap__tag">Consultar</span><span class="figcap__caption">SQL sobre la base procesada — data proveniente de las cargas</span></div>
      <div class="sqlwrap">
        <aside class="sqlschema">
          <div class="sqlschema__head mono">Esquema</div>
          ${schema}
          <span class="figfoot">clic inserta en el editor</span>
        </aside>
        <div class="sqlmain">
          <div class="sqlchips">${chips}</div>
          <textarea class="sqled mono" id="sqled" rows="6" spellcheck="false" placeholder="SELECT mercado, fecha, producto, precio FROM observaciones">${sqlLast && sqlLast.q ? escHTML(sqlLast.q) : escHTML(SQL_EJEMPLOS[0].q)}</textarea>
          <div style="display:flex;align-items:center;gap:0.6rem;margin:0.6rem 0 0.8rem">
            <button class="psave" type="button" id="sqlrun">Ejecutar</button>
            <button class="tbtn" type="button" id="sqlclear">Limpiar</button>
            <span class="mono" style="font-size:0.6rem;color:var(--ink-3)">⌘↵ ejecutar</span>
          </div>
          ${sqlResultadoHTML(sqlLast)}
        </div>
      </div>`;
  }

  function notFound() {
    return `<div class="empty">Página no encontrada — <a href="#/mercado">volver al mercado</a>.</div>`;
  }

  function route() {
    pPage = 1;
    qMap = null;
    const seg = location.hash.replace(/^#\/?/, "").split("/");
    const sp = document.getElementById("scrollprog");
    const dataScope = !seg[0] || seg[0] === "mercado" || seg[0] === "internacional";
    if (sp) sp.style.display = dataScope ? "" : "none";
    const geoseg = document.getElementById("geoseg");
    if (geoseg) geoseg.style.display = dataScope ? "" : "none";
    const winchip = document.getElementById("winchip");
    if (winchip) winchip.style.display = dataScope ? "" : "none";
    const v = document.getElementById("view");
    let title = "Mercado", crumb = ["Mercado"], active = "mercado", cat = null, html;

    if (!seg[0] || seg[0] === "mercado") {
      if (seg[1] === "categoria") {
        const c = H.cat(seg[2]);
        if (!c) { html = notFound(); }
        else {
          html = vCategoria(c.id);
          title = c.nombre; crumb = ["Mercado", c.nombre];
          active = "categoria"; cat = c.id;
        }
      } else if (seg[1] === "producto") {
        const p = H.producto(seg[2]);
        if (!p) { html = notFound(); }
        else {
          html = vProducto(p.id);
          title = p.nombre; crumb = ["Mercado", H.cat(p.cat).nombre, p.nombre];
          active = "categoria"; cat = p.cat;
        }
      } else {
        html = vBoard();
      }
    }
    else if (seg[0] === "internacional") {
      scope = "internacional";
      html = vBoard();
    }
    else if (seg[0] === "benchmark") { html = vBenchmark(); title = "Benchmark"; crumb = ["Benchmark"]; active = "benchmark"; }
    else if (seg[0] === "herramientas") {
      if (seg[1] === "coleccion") {
        const sub = seg[2] === "gestionar" ? "gestionar" : "consultar";
        html = sub === "gestionar" ? vColeccionGestionar() : vColeccionConsultar();
        title = "Colección"; crumb = ["Herramientas", "Colección", sub === "gestionar" ? "Gestionar" : "Consultar"]; active = "coleccion"; cat = sub;
      }
      else { html = vHerramientas(); title = "Herramientas"; crumb = ["Herramientas", "Parámetros"]; active = "herramientas"; }
    }
    else if (seg[0] === "coleccion") {
      const sub = seg[1] === "gestionar" ? "gestionar" : "consultar";
      html = sub === "gestionar" ? vColeccionGestionar() : vColeccionConsultar();
      title = "Colección"; crumb = ["Herramientas", "Colección", sub === "gestionar" ? "Gestionar" : "Consultar"]; active = "coleccion"; cat = sub;
    }
    else if (seg[0] === "metodo") {
      if (seg[1] === "elemento") {
        const e = ELEMENTOS[seg[2]];
        if (!e) { html = notFound(); }
        else { html = vElemento(seg[2]); title = e.n; crumb = ["Método", e.n]; active = "metodo"; }
      }
      else { html = vMetodo(); title = "Método"; crumb = ["Método"]; active = "metodo"; }
    }
    else if (seg[0] === "cuenta") { html = vCuenta(); title = "Cuenta"; crumb = ["Sistema", "Cuenta"]; active = "cuenta"; }
    else if (seg[0] === "docs") { html = vDocs(); title = "Documentación"; crumb = ["Sistema", "Documentación"]; active = "docs"; }
    else if (seg[0] === "acerca") { html = vAcerca(); title = "Acerca de"; crumb = ["Sistema", "Acerca de"]; active = "acerca"; }
    else { html = notFound(); }

    v.innerHTML = `<div class="page">${html}</div>`;
    v.classList.toggle("is-dense", boardView === "compacta");
    setActive(active, cat);
    setCrumb(crumb);
    document.title = `Mercado Observatorio — ${title}`;
    syncViewParams();
    bindView();
    bindCharts();
    resolveQueries();
    window.scrollTo({ top: 0, behavior: "instant" });
  }

  function bindBoardTable() {
    const bthead = document.querySelector("#board-table thead");
    if (bthead) bthead.addEventListener("click", e => {
      const th = e.target.closest("[data-sort]");
      if (!th) return;
      const key = th.getAttribute("data-sort");
      if (tsort.key === key) tsort.dir *= -1;
      else { tsort.key = key; tsort.dir = 1; }
      updateBoardTable();
    });
    const tq = document.getElementById("tq");
    if (tq) tq.addEventListener("input", () => {
      tfilter.q = tq.value;
      updateBoardTable();
      const ntq = document.getElementById("tq");
      if (ntq) { ntq.focus(); try { ntq.setSelectionRange(ntq.value.length, ntq.value.length); } catch (e) {} }
    });
    const tqx = document.getElementById("tqx");
    if (tqx) tqx.addEventListener("click", () => {
      tfilter.q = "";
      updateBoardTable();
      const ntq = document.getElementById("tq");
      if (ntq) ntq.focus();
    });
    const tpager = document.querySelector("#board-table .tpager");
    if (tpager) tpager.addEventListener("click", e => {
      const b = e.target.closest("[data-ppage]");
      if (!b || b.disabled) return;
      const pages = parseInt(tpager.getAttribute("data-pages"), 10) || 1;
      const v = b.getAttribute("data-ppage");
      if (v === "prev") pPage = Math.max(1, pPage - 1);
      else if (v === "next") pPage = Math.min(pages, pPage + 1);
      else pPage = Math.min(pages, Math.max(1, parseInt(v, 10) || 1));
      updateBoardTable(true);
    });
    const ttrend = document.getElementById("ttrend");
    if (ttrend) ttrend.addEventListener("click", e => {
      const b = e.target.closest("[data-trend]");
      if (!b) return;
      tfilter.trend = b.getAttribute("data-trend");
      updateBoardTable();
    });
    const clearBtn = document.getElementById("clear-filters");
    if (clearBtn) clearBtn.addEventListener("click", () => {
      tfilter.q = "";
      tfilter.trend = "all";
      updateBoardTable();
    });
    const viewtoggle = document.getElementById("viewtoggle");
    const viewmenu = document.getElementById("viewmenu");
    if (viewtoggle && viewmenu) {
      viewtoggle.addEventListener("click", () => {
        const open = viewmenu.classList.toggle("is-open");
        viewtoggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (open && colpick) colpick.classList.remove("is-open"), colstoggle && colstoggle.setAttribute("aria-expanded", "false");
      });
      viewmenu.addEventListener("click", e => {
        const b = e.target.closest("[data-view]");
        if (!b) return;
        boardView = b.getAttribute("data-view");
        const v = document.getElementById("view");
        if (v) v.classList.toggle("is-dense", boardView === "compacta");
        updateBoardTable();
      });
    }
    const exportbtn = document.getElementById("exportcsv");
    if (exportbtn) exportbtn.addEventListener("click", () => exportCSV(lastBoard));
    const colstoggle = document.getElementById("colstoggle");
    const colpick = document.getElementById("colpick");
    if (colstoggle && colpick) {
      colstoggle.addEventListener("click", () => {
        const open = colpick.classList.toggle("is-open");
        colstoggle.setAttribute("aria-expanded", open ? "true" : "false");
        if (open && viewmenu) viewmenu.classList.remove("is-open"), viewtoggle && viewtoggle.setAttribute("aria-expanded", "false");
      });
      colpick.addEventListener("change", e => {
        const c = e.target.getAttribute("data-col");
        if (!c) return;
        boardCols[c] = e.target.checked;
        if (!Object.values(boardCols).some(Boolean)) boardCols.producto = true;
        updateBoardTable();
      });
    }
    const tblfs = document.getElementById("tblfs");
    if (tblfs) tblfs.addEventListener("click", () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else {
        const t = document.querySelector(".tablewrap");
        if (t && t.requestFullscreen) t.requestFullscreen();
      }
    });
  }

  let spy = null;
  function bindPagenav() {
    const nav = document.getElementById("pagenav");
    if (spy) { spy.disconnect(); spy = null; }
    if (!nav) return;
    document.documentElement.style.setProperty("--pagenav-h", nav.offsetHeight + "px");
    nav.addEventListener("click", e => {
      const b = e.target.closest("[data-jump]");
      if (!b) return;
      const sec = document.getElementById(b.getAttribute("data-jump"));
      if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    const links = [...nav.querySelectorAll(".pagenav__link")];
    const secs = links.map(l => document.getElementById(l.getAttribute("data-jump"))).filter(Boolean);
    if (!secs.length || !("IntersectionObserver" in window)) return;
    spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        links.forEach(l => l.classList.toggle("is-active", l.getAttribute("data-jump") === en.target.id));
      });
    }, { rootMargin: "-30% 0px -60% 0px", threshold: 0 });
    secs.forEach(s => spy.observe(s));
  }

  function bindRangetabs() {
    const rangetabs = document.getElementById("rangetabs");
    if (!rangetabs) return;
    rangetabs.addEventListener("click", e => {
      const b = e.target.closest("[data-range]");
      if (!b) return;
      boardRange = b.getAttribute("data-range");
      const host = document.querySelector('[data-q="fig"]');
      if (host && qMap && qMap.fig) {
        host.innerHTML = qMap.fig();
        host.classList.remove("is-in");
        void host.offsetWidth;
        host.classList.add("is-in");
        bindCharts();
        bindRangetabs();
      }
      syncViewParams();
    });
  }

  function bindView() {
    const refcard = document.getElementById("bench-ref");
    if (refcard) refcard.addEventListener("click", e => {
      const mg = e.target.closest("[data-mgeo]");
      if (mg) { bench.mercadoGeo = mg.getAttribute("data-mgeo"); route(); return; }
      const m = e.target.closest("[data-mode]");
      if (m) { bench.mode = m.getAttribute("data-mode"); if (bench.mode === "mercado") bench.mercadoGeo = null; route(); return; }
      const t = e.target.closest("[data-tile]");
      if (t) {
        const id = t.getAttribute("data-tile"), i = bench.picks.indexOf(id);
        if (i >= 0) bench.picks.splice(i, 1); else bench.picks.push(id);
        route(); return;
      }
      if (e.target.closest("#ref-reset")) { bench.mode = null; bench.picks = []; bench.mercadoGeo = null; route(); }
    });
    const comp = document.getElementById("bench-comp");
    if (comp) comp.addEventListener("change", e => {
      bench.comp = e.target.value;
      bench.picks = bench.picks.filter(id => id !== bench.comp);
      route();
    });
    const psave = document.getElementById("psave");
    if (psave) psave.addEventListener("click", () => {
      const pc = document.getElementById("p-comp"), pm = document.getElementById("p-mode");
      if (!pc || !pm) return;
      params.benchComp = pc.value;
      params.benchMode = pm.value === "subset" ? "subset" : "mercado";
      bench.comp = params.benchComp;
      bench.picks = bench.picks.filter(id => id !== bench.comp);
      bench.mode = params.benchMode;
      if (bench.mode === "mercado") bench.mercadoGeo = "nacional";
      const pg = document.getElementById("p-geo"), pn = document.getElementById("p-nivel"), pf = document.getElementById("p-frame"), pv = document.getElementById("p-ventana"), pvis = document.getElementById("p-vista"), pcn = document.getElementById("p-conv");
      if (pg) { params.geo = pg.value === "internacional" ? "internacional" : "nacional"; scope = params.geo; }
      if (pn && validNivel(pn.value)) { params.nivel = pn.value; focus = nivelFocus(params.nivel); }
      if (pf && FRAMES.includes(+pf.value)) params.frame = +pf.value;
      if (pv && VENTANAS.includes(pv.value)) { params.ventana = pv.value; boardRange = params.ventana; }
      if (pvis && VISTAS.includes(pvis.value)) { params.vista = pvis.value; boardView = params.vista; }
      if (pcn) params.conv = pcn.value === "bolsa" ? "bolsa" : "mercado";
      const pp = document.getElementById("p-plazas");
      if (pp) params.plazas = [...pp.querySelectorAll("input:checked")].map(i => i.value).filter(id => D.mercados.some(m => m.id === id));
      applyLayout();
      saveParams();
      const n = document.getElementById("pnote");
      if (n) n.textContent = "Guardado ✓";
      toast("Parámetros guardados — se aplican al abrir cada vista");
    });
    const ppAll = document.getElementById("p-plazas-all"), ppl = document.getElementById("p-plazas");
    if (ppAll && ppl) {
      const syncAll = () => {
        const boxes = [...ppl.querySelectorAll("input")];
        const n = boxes.filter(i => i.checked).length;
        ppAll.checked = n === boxes.length;
        ppAll.indeterminate = n > 0 && n < boxes.length;
      };
      ppAll.addEventListener("change", () => {
        ppl.querySelectorAll("input").forEach(i => { i.checked = ppAll.checked; });
        ppAll.indeterminate = false;
      });
      ppl.addEventListener("change", syncAll);
      syncAll();
    }
    const pdefault = document.getElementById("pdefault");
    if (pdefault) pdefault.addEventListener("click", () => {
      params.benchComp = PDEFAULTS.benchComp;
      params.benchMode = PDEFAULTS.benchMode;
      params.geo = PDEFAULTS.geo;
      params.nivel = PDEFAULTS.nivel;
      params.frame = PDEFAULTS.frame;
      params.ventana = PDEFAULTS.ventana;
      params.vista = PDEFAULTS.vista;
      params.plazas = PDEFAULTS.plazas.slice();
      bench.comp = params.benchComp;
      bench.picks = bench.picks.filter(id => id !== bench.comp);
      bench.mode = params.benchMode;
      if (bench.mode === "mercado") bench.mercadoGeo = "nacional";
      scope = params.geo;
      focus = nivelFocus(params.nivel);
      boardRange = params.ventana;
      boardView = params.vista;
      params.sidebar = PDEFAULTS.sidebar;
      params.conv = PDEFAULTS.conv;
      applyLayout();
      applySidebar();
      saveParams();
      const pc = document.getElementById("p-comp"), pm = document.getElementById("p-mode"),
            pg = document.getElementById("p-geo"), pn = document.getElementById("p-nivel"),
            pf = document.getElementById("p-frame"),
            pv = document.getElementById("p-ventana"), pvis = document.getElementById("p-vista"),
            pcn = document.getElementById("p-conv"),
            n = document.getElementById("pnote");
      if (pc) pc.value = params.benchComp;
      if (pm) pm.value = params.benchMode;
      if (pg) pg.value = params.geo;
      if (pn) pn.value = params.nivel;
      if (pf) pf.value = String(params.frame);
      if (pv) pv.value = params.ventana;
      if (pvis) pvis.value = params.vista;
      if (pcn) pcn.value = params.conv;
      const pp = document.getElementById("p-plazas");
      if (pp) pp.querySelectorAll("input").forEach(i => { i.checked = true; });
      const ppa = document.getElementById("p-plazas-all");
      if (ppa) { ppa.checked = true; ppa.indeterminate = false; }
      if (n) n.textContent = "De fábrica ✓";
      toast("Parámetros de fábrica restaurados");
    });
    const rangetabs = document.getElementById("rangetabs");
    if (rangetabs) bindRangetabs();
    bindBoardTable();
    // Colección — Gestionar: dropzone + carga + pipeline simulado (luego backend)
    const drop = document.getElementById("col-drop");
    const dropInput = document.getElementById("p-carga-file");
    const chip = document.getElementById("col-filechip");
    const chipName = document.getElementById("col-filechip-name");
    const chipX = document.getElementById("col-filechip-x");
    if (drop && dropInput) {
      const showChip = () => {
        const f = dropInput.files && dropInput.files[0];
        if (!f) { if (chip) chip.hidden = true; return; }
        if (chipName) chipName.textContent = `${f.name} · ${(f.size / 1024).toFixed(1)} KB · ${f.type || "tipo desconocido"}`;
        if (chip) chip.hidden = false;
      };
      drop.addEventListener("click", () => dropInput.click());
      drop.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); dropInput.click(); } });
      ["dragenter", "dragover"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("is-drag"); }));
      ["dragleave", "drop"].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove("is-drag"); }));
      drop.addEventListener("drop", e => {
        const fs = e.dataTransfer && e.dataTransfer.files;
        if (fs && fs.length) { try { dropInput.files = fs; } catch (err) {} showChip(); }
      });
      dropInput.addEventListener("change", showChip);
      if (chipX) chipX.addEventListener("click", () => { dropInput.value = ""; showChip(); });
    }
    const cargaBtn = document.getElementById("p-carga-btn");
    if (cargaBtn) cargaBtn.addEventListener("click", () => {
      const inp = document.getElementById("p-carga-file");
      const fuenteEl = document.getElementById("p-carga-fuente");
      const fuente = fuenteEl ? fuenteEl.value.trim() : "";
      const file = inp && inp.files && inp.files[0];
      if (!file) { alert("Arrastra o selecciona un documento primero"); return; }
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        const tipo = file.type || "application/octet-stream";
        let raw, filas;
        try {
          if (tipo.includes("json") || file.name.endsWith(".json")) { raw = JSON.parse(typeof dataURL === "string" && dataURL.startsWith("data:") ? atob(dataURL.split(",")[1]) : dataURL); filas = Array.isArray(raw) ? raw.length : (raw.productos ? raw.productos.length : 1); }
          else if (file.name.endsWith(".csv") || tipo.includes("csv")) { const txt = typeof dataURL === "string" && dataURL.startsWith("data:") ? atob(dataURL.split(",")[1]) : String(dataURL); raw = txt.slice(0, 8000); filas = txt.split("\n").filter(l => l.trim()).length - 1; }
          else { raw = { nota: "Fuente binaria (imagen/pdf) — mapeo simulado del pipeline", nombre: file.name, tipo }; filas = 1; }
        } catch (e) { raw = String(dataURL).slice(0, 8000); filas = 1; }
        const list = loadColecciones();
        const id = "c" + Date.now();
        list.push({ id, nombre: file.name, fuente: fuente || file.name, tipo, fechaISO: new Date().toISOString(), filas, raw: typeof raw === "string" ? raw.slice(0, 6000) : raw, dataURL: typeof dataURL === "string" && dataURL.length < 900000 ? dataURL : "", estado: "recibido", t: Date.now() });
        saveColecciones(list);
        colAdvance(id);
        route();
        toast("Carga recibida — pipeline iniciado");
      };
      if (file.type.startsWith("image/") || file.type === "application/pdf" || file.name.match(/\.(json|csv)$/i)) reader.readAsDataURL(file);
      else reader.readAsText(file);
    });
    // Colección — delegación única en #view: ver datos · eliminar · copiar · consola SQL
    if (!viewClickBound) {
      viewClickBound = true;
      const viewEl = document.getElementById("view");
      if (viewEl) viewEl.addEventListener("click", e => {
        const ver = e.target.closest("[data-ver]");
        if (ver) {
          const det = document.getElementById("coleccion-detalle");
          if (det) { det.innerHTML = coleccionDetalleHTML(ver.getAttribute("data-ver")); if (det.scrollIntoView) det.scrollIntoView({ behavior: "smooth", block: "nearest" }); }
          return;
        }
        const del = e.target.closest("[data-del]");
        if (del) {
          const id = del.getAttribute("data-del");
          const list = loadColecciones().filter(x => x.id !== id);
          saveColecciones(list);
          route(); return;
        }
        const cp = e.target.closest("[data-copy]");
        if (cp) {
          const id = cp.getAttribute("data-copy");
          const list = loadColecciones();
          const base = { id: "base", raw: { productos: D.productos, mercados: D.mercados } };
          const c = id === "base" ? base : list.find(x => x.id === id);
          if (c && navigator.clipboard) navigator.clipboard.writeText(typeof c.raw === "string" ? c.raw : JSON.stringify(c.raw, null, 2)).then(() => toast("JSON copiado al portapapeles"));
          return;
        }
        const chipBtn = e.target.closest("[data-sqlidx]");
        if (chipBtn) {
          const ex = SQL_EJEMPLOS[+chipBtn.getAttribute("data-sqlidx")];
          const ed = document.getElementById("sqled");
          if (ex && ed) { ed.value = ex.q; ed.focus(); }
          return;
        }
        const ins = e.target.closest("[data-sqlins]");
        if (ins) {
          const ed = document.getElementById("sqled");
          if (ed) {
            const txt = ins.getAttribute("data-sqlins");
            const s = ed.selectionStart == null ? ed.value.length : ed.selectionStart;
            const epos = ed.selectionEnd == null ? s : ed.selectionEnd;
            ed.value = ed.value.slice(0, s) + txt + ed.value.slice(epos);
            ed.focus();
            ed.selectionStart = ed.selectionEnd = s + txt.length;
          }
          return;
        }
        const jump = e.target.closest("[data-docs-jump]");
        if (jump) {
          const target = document.getElementById(jump.getAttribute("data-docs-jump"));
          if (target && target.scrollIntoView) target.scrollIntoView({ behavior: "smooth", block: "start" });
          return;
        }
        const figKebab = e.target.closest("#figkebab");
        if (figKebab) {
          const menu = document.getElementById("figmenu");
          if (menu) {
            const open = menu.classList.toggle("is-open");
            figKebab.setAttribute("aria-expanded", open ? "true" : "false");
          }
          return;
        }
        const figAct = e.target.closest("[data-figact]");
        if (figAct) {
          const menu = document.getElementById("figmenu");
          if (menu) menu.classList.remove("is-open");
          const box = figAct.closest(".figbox");
          const svg = box ? box.querySelector("svg[data-chart]") : null;
          if (figAct.getAttribute("data-figact") === "fs" && box && box.requestFullscreen) {
            if (document.fullscreenElement) document.exitFullscreen();
            else box.requestFullscreen();
          } else if (figAct.getAttribute("data-figact") === "csv" && svg) {
            const meta = JSON.parse(decodeURIComponent(svg.getAttribute("data-chart")));
            const lines = [meta.rows.map(r => r.name).join(",")].concat(
              meta.labels.map((l, i) => [`"${l}"`].concat(meta.rows.map(r => r.vals[i])).join(",")));
            const blob = new Blob(["\uFEFF" + lines.join("\n")], { type: "text/csv;charset=utf-8" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "figura.csv";
            a.click();
            URL.revokeObjectURL(a.href);
            toast("Datos de la figura exportados");
          }
          return;
        }
        const insNext = e.target.closest(".insight__next");
        if (insNext) {
          const sec = document.getElementById(insNext.getAttribute("data-jump"));
          if (sec && sec.scrollIntoView) sec.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    }
    // Colección — Consultar: consola SQL simulada
    const sqled = document.getElementById("sqled");
    const sqlrun = document.getElementById("sqlrun");
    const sqlExec = () => {
      if (!sqled) return;
      const q = sqled.value;
      const res = sqlRun(q);
      sqlLast = { q, ok: res.ok, msg: res.msg, cols: res.cols, rows: res.rows };
      route();
    };
    if (sqlrun) sqlrun.addEventListener("click", sqlExec);
    if (sqled) sqled.addEventListener("keydown", e => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); sqlExec(); } });
    const sqlclear = document.getElementById("sqlclear");
    if (sqlclear) sqlclear.addEventListener("click", () => { sqlLast = null; route(); });
    document.querySelectorAll("[data-caso]").forEach(scope => {
      const rec = () => casoRecalc(scope);
      scope.addEventListener("input", rec);
      rec();
    });
    bindPagenav();
  }

  document.getElementById("footdate").textContent = "20 AGO 2026 · 08:00 · Santo Domingo · RD · UTC−4";

  const topbarEl = document.querySelector(".topbar");
  const setTopbarH = () => { if (topbarEl) document.documentElement.style.setProperty("--topbar-h", topbarEl.offsetHeight + "px"); };
  setTopbarH();
  window.addEventListener("resize", setTopbarH);

  const appEl = document.querySelector(".app");
  function applyLayout() {
    if (!appEl) return;
    appEl.style.setProperty("--frame", params.frame + "px");
    applyConv();
  }
  function applyConv() {
    const m = params.conv !== "bolsa";
    SUBE = m ? REDC : GREENC;
    BAJA = m ? GREENC : REDC;
    if (appEl) appEl.setAttribute("data-conv", m ? "mercado" : "bolsa");
  }
  applyLayout();
  function applySidebar() {
    if (!appEl) return;
    const c = params.sidebar === "colapsada";
    appEl.classList.toggle("is-collapsed", c);
    const mb = document.getElementById("menubtn");
    if (mb) {
      mb.setAttribute("aria-expanded", c ? "false" : "true");
      mb.title = c ? "Expandir menú" : "Colapsar menú";
    }
  }
  applySidebar();
  function toggleSidebar() {
    params.sidebar = params.sidebar === "colapsada" ? "abierta" : "colapsada";
    saveParams();
    applySidebar();
  }
  const menubtn = document.getElementById("menubtn");
  if (menubtn) menubtn.addEventListener("click", toggleSidebar);

  function syncViewParams() {
    const geo = scope === "internacional" ? "internacional" : "nacional";
    document.querySelectorAll("#geoseg .seg__btn").forEach(b =>
      b.classList.toggle("is-active", b.getAttribute("data-geo") === geo));
    const nacBtn = document.querySelector('#geoseg [data-geo="nacional"]');
    if (nacBtn) {
      const cov = scope === "nacional" && params.plazas.length < D.mercados.length;
      nacBtn.innerHTML = "Nacional" + (cov ? ' <span class="seg__sub">⊂</span>' : "");
      nacBtn.title = cov
        ? (params.plazas.length
          ? `Subconjunto de plazas — ${activeMercados().map(m => m.nombre).join(", ")}`
          : "Subconjunto de plazas — ninguna seleccionada (sin datos)")
        : "";
    }
    const winchip = document.getElementById("winchip");
    if (winchip) winchip.textContent = VENTANA_LBL[boardRange] || boardRange;
    const chip = document.getElementById("searchchip");
    const chipLabel = document.getElementById("searchchip__label");
    const qEl = document.getElementById("q");
    const kbdEl = document.querySelector(".search__kbd");
    if (chip && chipLabel && qEl) {
      const label = focus
        ? (focus.type === "cat" ? (H.cat(focus.id) || {}).nombre : (H.producto(focus.id) || {}).nombre)
        : null;
      chip.hidden = !label;
      qEl.hidden = !!label;
      if (kbdEl) kbdEl.hidden = !!label;
      chipLabel.textContent = label || "";
    }
  }

  const geoseg = document.getElementById("geoseg");
  if (geoseg) geoseg.addEventListener("click", e => {
    const b = e.target.closest("[data-geo]");
    if (!b) return;
    scope = b.getAttribute("data-geo") === "internacional" ? "internacional" : "nacional";
    route();
  });

  const searchx = document.getElementById("searchx");
  if (searchx) searchx.addEventListener("click", () => {
    ddHide();
    applyNivel(() => { focus = null; });
  });

  const norm = s => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const IDX = [];
  IDX.push({ t: "todos", label: "Todos", hint: "nivel de datos · conjunto completo", kw: norm("todos nivel datos conjunto completo") });
  D.categorias.forEach(c => IDX.push({ t: "cat", id: c.id, label: c.nombre, hint: "YTD " + H.pct(H.varYTD(c.idx)) + " · categoría", kw: norm(c.nombre + " categoria nivel") }));
  D.productos.forEach(p => IDX.push({ t: "prod", id: p.id, label: p.nombre, img: p.img, hint: H.fmtRD(H.actual(p)) + " · " + H.cat(p.cat).nombre, kw: norm(p.nombre + " producto nivel") }));

  const GROUPS = [
    { t: "todos", label: "Nivel de datos" },
    { t: "cat", label: "Categorías" },
    { t: "prod", label: "Productos" }
  ];

  const q = document.getElementById("q");
  const dd = document.getElementById("searchdd");
  let ddItems = [], ddActive = -1, ddOpen = false;

  function ddRender(items, active) {
    if (!items.length) {
      dd.innerHTML = `<div class="dd-empty">Sin resultados para «${esc(q.value)}».</div>` +
        `<div class="dd-foot"><span>↑↓ navegar</span><span>↵ abrir</span><span>esc cerrar</span></div>`;
      return;
    }
    let html = "", lastT = null;
    items.forEach((it, i) => {
      const grp = GROUPS.find(g => g.t === it.t);
      if (grp && it.t !== lastT) { html += `<div class="dd-group">${grp.label}</div>`; lastT = it.t; }
      html += `<div class="dd-item${i === active ? " is-active" : ""}${it.t === "vertodos" ? " is-vertodos" : ""}" data-i="${i}" role="option">
        ${it.t === "prod" && it.img ? `<img class="dd-thumb" src="${it.img}" alt="" loading="lazy">` : `<i class="t-${it.t}"></i>`}<span class="dd-item__label">${it.t === "vertodos" ? "→ " : ""}${esc(it.label)}</span><span class="dd-item__hint">${esc(it.hint)}</span>
      </div>`;
    });
    html += `<div class="dd-foot"><span>↑↓ navegar</span><span>↵ abrir</span><span>esc cerrar</span></div>`;
    dd.innerHTML = html;
  }

  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

  function ddUpdate() {
    const nq = norm(q.value.trim());
    if (!nq) {
      const sample = D.productos.slice().sort(() => Math.random() - 0.5).slice(0, 4);
      ddItems = IDX.filter(it => it.t === "todos")
        .concat(IDX.filter(it => it.t === "cat"))
        .concat(sample.map(p => IDX.find(it => it.t === "prod" && it.id === p.id)));
    } else {
      ddItems = IDX.filter(it => it.kw.includes(nq) || norm(it.label).includes(nq)).slice(0, 12);
    }
    ddItems.push({ t: "vertodos", label: "Ver todos en Mercado", hint: "conjunto completo" });
    ddActive = ddItems.length ? 0 : -1;
    ddRender(ddItems, ddActive);
  }

  function ddShow() { if (!ddOpen) { dd.classList.add("is-open"); ddOpen = true; } ddUpdate(); }
  function ddHide() { dd.classList.remove("is-open"); ddOpen = false; ddActive = -1; }

  function applyNivel(mut) {
    mut();
    if (location.hash === "#/mercado" || location.hash === "" || location.hash === "#") route();
    else location.hash = "#/mercado";
  }

  function ddGo(item) {
    if (!item) return;
    ddHide();
    q.value = "";
    if (item.t === "todos" || item.t === "vertodos") applyNivel(() => { focus = null; });
    else if (item.t === "cat") applyNivel(() => { focus = { type: "cat", id: item.id }; });
    else if (item.t === "prod") applyNivel(() => { focus = { type: "prod", id: item.id }; });
  }

  q.addEventListener("focus", ddShow);
  q.addEventListener("input", ddShow);
  q.addEventListener("keydown", e => {
    if (!ddOpen) return;
    if (e.key === "ArrowDown") { e.preventDefault(); if (ddItems.length) { ddActive = (ddActive + 1) % ddItems.length; ddRender(ddItems, ddActive); } }
    else if (e.key === "ArrowUp") { e.preventDefault(); if (ddItems.length) { ddActive = (ddActive - 1 + ddItems.length) % ddItems.length; ddRender(ddItems, ddActive); } }
    else if (e.key === "Enter") { e.preventDefault(); ddGo(ddItems[ddActive]); }
    else if (e.key === "Escape") { ddHide(); q.blur(); }
  });
  dd.addEventListener("mousedown", e => {
    const item = e.target.closest(".dd-item");
    if (!item) return;
    e.preventDefault();
    ddGo(ddItems[+item.getAttribute("data-i")]);
  });
  document.addEventListener("mousedown", e => {
    if (ddOpen && !e.target.closest(".search")) ddHide();
    const cp = document.getElementById("colpick");
    if (cp && cp.classList.contains("is-open") && !e.target.closest(".tablebar__actions")) cp.classList.remove("is-open");
    const vm = document.getElementById("viewmenu");
    if (vm && vm.classList.contains("is-open") && !e.target.closest(".tablebar__actions")) vm.classList.remove("is-open");
    const fm = document.getElementById("figmenu");
    if (fm && fm.classList.contains("is-open") && !e.target.closest(".figkebab-wrap")) fm.classList.remove("is-open");
  });
  document.addEventListener("keydown", e => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); q.focus(); q.select(); }
    if (e.key === "Escape") {
      closePreview();
      const cp = document.getElementById("colpick");
      const vm = document.getElementById("viewmenu");
      const ct = document.getElementById("colstoggle");
      const vt = document.getElementById("viewtoggle");
      if (cp) cp.classList.remove("is-open");
      if (vm) vm.classList.remove("is-open");
      if (ct) ct.setAttribute("aria-expanded", "false");
      if (vt) vt.setAttribute("aria-expanded", "false");
    }
  });

  function initScrollProg() {
    const bar = document.getElementById("scrollprog");
    if (!bar) return;
    const doc = document.documentElement;
    const update = () => {
      const max = Math.max(0, doc.scrollHeight - window.innerHeight);
      const y = window.scrollY || doc.scrollTop || 0;
      bar.style.transform = "scaleX(" + (max > 0 ? Math.min(1, Math.max(0, y / max)) : 0) + ")";
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  // — Vista previa (Alt+Click): la ruta destino se abre en un iframe navegable —
  function previewTitle(hash) {
    const seg = hash.replace(/^#\/?/, "").split("/");
    if (seg[0] === "mercado") {
      if (seg[1] === "producto") { const p = H.producto(seg[2]); if (p) return p.nombre; }
      if (seg[1] === "categoria") { const c = H.cat(seg[2]); if (c) return c.nombre; }
      return "Mercado Nacional";
    }
    if (seg[0] === "internacional") return "Mercado Internacional";
    if (seg[0] === "benchmark") return "Benchmark";
    if (seg[0] === "herramientas") {
      if (seg[1] === "coleccion") return seg[2] === "gestionar" ? "Colección — Gestionar" : "Colección — Consultar";
      return "Parámetros";
    }
    if (seg[0] === "coleccion") return seg[1] === "gestionar" ? "Colección — Gestionar" : "Colección — Consultar";
    if (seg[0] === "metodo") {
      if (seg[1] === "elemento") { const e = ELEMENTOS[seg[2]]; if (e) return e.n; }
      return "Método";
    }
    if (seg[0] === "cuenta") return "Cuenta";
    if (seg[0] === "docs") return "Documentación";
    if (seg[0] === "acerca") return "Acerca de";
    return "Mercado Observatorio";
  }

  let pvReturnFocus = null;
  function openPreview(hash) {
    let ov = document.getElementById("pv-ov");
    if (!ov) {
      ov = document.createElement("div");
      ov.id = "pv-ov";
      ov.innerHTML = `<div class="pv" role="dialog" aria-modal="true" aria-label="Vista previa">
        <div class="pv__head">
          <span class="pv__tag">Vista previa</span>
          <span class="pv__title" id="pv-title"></span>
          <button class="pv__open" type="button" id="pv-open">Abrir en la vista<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 10 10 2M4.5 2H10v5.5"/></svg></button>
          <button class="pv__x" type="button" id="pv-x" title="Cerrar vista previa" aria-label="Cerrar vista previa"><svg viewBox="0 0 10 10" aria-hidden="true"><path d="M2 2l6 6M8 2 2 8"/></svg></button>
        </div>
        <div class="pv__body" id="pv-body"></div>
      </div>`;
      document.body.appendChild(ov);
      ov.addEventListener("mousedown", e => { if (e.target === ov) closePreview(); });
      ov.querySelector("#pv-x").addEventListener("click", closePreview);
      ov.querySelector("#pv-open").addEventListener("click", () => {
        const h = ov.getAttribute("data-hash");
        closePreview();
        if (h) location.hash = h;
      });
    }
    pvReturnFocus = document.activeElement;
    ov.setAttribute("data-hash", hash);
    ov.classList.add("is-open");
    document.getElementById("pv-title").textContent = previewTitle(hash);
    const body = document.getElementById("pv-body");
    body.innerHTML = `<div class="pv__skel"></div><iframe class="pv__frame" src="${location.pathname + "?v=p" + hash}" title="Vista previa — ${previewTitle(hash)}"></iframe>`;
    const frame = body.querySelector("iframe");
    frame.addEventListener("load", () => {
      frame.classList.add("is-in");
      const sk = body.querySelector(".pv__skel");
      if (sk) sk.remove();
    });
    document.getElementById("pv-open").focus();
  }

  function closePreview() {
    const ov = document.getElementById("pv-ov");
    if (!ov || !ov.classList.contains("is-open")) return;
    ov.classList.remove("is-open");
    const body = document.getElementById("pv-body");
    if (body) body.innerHTML = "";
    if (pvReturnFocus && pvReturnFocus.focus) pvReturnFocus.focus();
    pvReturnFocus = null;
  }

  // Trampa de foco: Tab cicla dentro de la vista previa abierta
  document.addEventListener("keydown", e => {
    if (e.key !== "Tab") return;
    const ov = document.getElementById("pv-ov");
    if (!ov || !ov.classList.contains("is-open")) return;
    const f = ov.querySelectorAll("button, a[href], iframe, [tabindex]:not([tabindex='-1'])");
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || !ov.contains(document.activeElement))) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (document.activeElement === last || !ov.contains(document.activeElement))) { e.preventDefault(); first.focus(); }
  });

  if (!PREVIEW) {
    document.addEventListener("click", e => {
      if (!e.altKey) return;
      const a = e.target && e.target.closest ? e.target.closest('a[href^="#/"]') : null;
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      openPreview(a.getAttribute("href"));
    }, true);
    // La vista previa (iframe) avisa al padre cuando el usuario pulsa Esc dentro
    window.addEventListener("message", e => { if (e.data === "pv:close") closePreview(); });
  } else {
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && window.parent !== window) window.parent.postMessage("pv:close", "*");
    });
    document.addEventListener("click", e => {
      if (!e.altKey) return;
      const a = e.target && e.target.closest ? e.target.closest('a[href^="#/"]') : null;
      if (!a) return;
      e.preventDefault();
      e.stopPropagation();
      location.hash = a.getAttribute("href");
    }, true);
  }

  window.addEventListener("hashchange", route);
  buildNav();
  initScrollProg();
  if (!location.hash) location.hash = "#/mercado";
  route();
})();
