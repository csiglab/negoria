const D = {
  fecha: "VII KAL. SEP. MMXXVI",
  semana: "Semana del 20 de agosto de 2026",
  meses: ["ENE","FEB","MAR","ABR","MAY","JUN","JUL","AGO"],
  mercados: [
    { id: "nuevo", nombre: "Mercado Nuevo", ciudad: "Santo Domingo" },
    { id: "vjuana", nombre: "Villa Juana", ciudad: "Santo Domingo" },
    { id: "stgo", nombre: "Mercado de Santiago", ciudad: "Santiago" },
    { id: "scrist", nombre: "San Cristóbal", ciudad: "San Cristóbal" },
    { id: "vega", nombre: "Mercado de La Vega", ciudad: "La Vega" },
    { id: "hig", nombre: "Mercado de Higüey", ciudad: "Higüey" }
  ],
  categorias: [
    { id: "viandas", nombre: "Viandas", folio: "II", idx: [100, 100.6, 101.8, 102.5, 103.9, 104.6, 105.3, 106.2], intl: null },
    { id: "vegetales", nombre: "Vegetales", folio: "III", idx: [100, 103.2, 108.1, 106.4, 112, 118.3, 115.6, 121.4], intl: [100, 101.1, 102.8, 103.5, 102.2, 104.9, 106.1, 105.4] },
    { id: "frutas", nombre: "Frutas", folio: "IV", idx: [100, 98.2, 101.5, 104.1, 103, 106.8, 109.2, 111.5], intl: null },
    { id: "granos", nombre: "Granos", folio: "V", idx: [100, 100.8, 101.9, 102.4, 103.6, 104.1, 105, 105.8], intl: null },
    { id: "aves", nombre: "Aves", folio: "VI", idx: [100, 101.2, 102.8, 103.5, 104.2, 105.1, 105.9, 106.8], intl: null },
    { id: "carnes", nombre: "Carnes", folio: "VII", idx: [100, 101.5, 103.2, 104.8, 106.1, 108.3, 109.6, 111.2], intl: null }
  ],
  intlGeneral: [100, 100.9, 101.6, 102.4, 101.8, 103.2, 104, 103.6],
  productos: [
    { id: "cebolla-blanca", nombre: "Cebolla blanca", img: "img/productos/cebolla-blanca.png", cat: "vegetales", unidad: "lb", serie: [34.5, 35.1, 35.4, 36.3, 36, 36.4, 37, 36.3], vol: 6.8, intl: 29,
      mercados: { nuevo: [30.4, 39, 34.7], vjuana: [31.4, 42, 36.7], stgo: [32.7, 39.3, 36], scrist: [32.5, 43.8, 38.1], vega: [31.2, 39.6, 35.4], hig: [33.2, 43.9, 38.5] } },
    { id: "name", nombre: "Ñame", img: "img/productos/name.png", cat: "viandas", unidad: "lb", serie: [20.5, 20.6, 20.2, 19.5, 19.1, 19, 18.5, 17.9], vol: 11.9, intl: 11.2,
      mercados: { nuevo: [17.1, 20.2, 18], vjuana: [15.6, 19, 16.7], stgo: [16.9, 20.6, 19.1], scrist: [16.5, 18.9, 17.6], vega: [17.4, 20.8, 18.6], hig: [16.9, 20.6, 18.4] } },
    { id: "batata", nombre: "Batata", img: "img/productos/batata.png", cat: "viandas", unidad: "lb", serie: [81.1, 80.1, 83.4, 83.5, 86.4, 85.3, 88.3, 87.3], vol: 10.3, intl: 69.3,
      mercados: { nuevo: [80.4, 93.3, 87.2], vjuana: [74, 88.8, 81.7], stgo: [84.5, 100, 89.2], scrist: [76.1, 93.7, 83.1], vega: [77.2, 92.6, 83], hig: [84.1, 99.3, 92.8] } },
    { id: "yautia-amarilla", nombre: "Yautía amarilla", img: "img/productos/yautia-amarilla.png", cat: "viandas", unidad: "lb", serie: [55.9, 56.2, 56.9, 56.8, 56.4, 56.3, 55.7, 55.8], vol: 8.2, intl: 43.5,
      mercados: { nuevo: [46.8, 60.6, 53.7], vjuana: [46.5, 62.4, 54.5], stgo: [50.7, 65.5, 58.1], scrist: [49.9, 64.1, 57], vega: [48.5, 61.2, 54.9], hig: [50.5, 62.6, 56.5] } },
    { id: "yuca", nombre: "Yuca", img: "img/productos/yuca.png", cat: "viandas", unidad: "lb", serie: [65.7, 67.8, 65.4, 66.3, 65.2, 67, 68.4, 70.4], vol: 9.8, intl: 43.8,
      mercados: { nuevo: [58.7, 74.9, 66], vjuana: [64.1, 77.2, 70.2], stgo: [67.2, 76.7, 70.8], scrist: [62.1, 74.1, 65.6], vega: [62.3, 74.4, 68.6], hig: [69.2, 80, 74.9] } },
    { id: "jengibre", nombre: "Jengibre", img: "img/productos/jengibre.png", cat: "vegetales", unidad: "lb", serie: [92, 92.6, 92.5, 91, 91.6, 93.7, 95.6, 95.7], vol: 7.1, intl: 68.9,
      mercados: { nuevo: [79.8, 104.1, 91.9], vjuana: [81.5, 109.7, 95.6], stgo: [82.6, 107.9, 95.3], scrist: [91.1, 113.7, 102.4], vega: [81.1, 108.7, 94.9], hig: [87.3, 112.5, 99.9] } },
    { id: "yautia-coco", nombre: "Yautía coco", img: "img/productos/yautia-coco.png", cat: "viandas", unidad: "lb", serie: [51.2, 50, 50.6, 51.1, 51, 51.2, 50.2, 49.7], vol: 7.6, intl: 37.8,
      mercados: { nuevo: [45.3, 60, 52.6], vjuana: [44.7, 54.3, 49.5], stgo: [42.7, 51.8, 47.3], scrist: [45.1, 56.3, 50.7], vega: [47, 59, 53], hig: [42.4, 51.7, 47] } },
    { id: "remolacha", nombre: "Remolacha", img: "img/productos/remolacha.png", cat: "vegetales", unidad: "lb", serie: [51.9, 52.5, 51.8, 51.2, 52.9, 55, 53.8, 54.4], vol: 5.5, intl: 55.4,
      mercados: { nuevo: [53.3, 62.2, 57.6], vjuana: [49, 55.6, 51.6], stgo: [54.7, 63.2, 57.5], scrist: [54.1, 61.5, 57.5], vega: [46.3, 53.3, 50.7], hig: [51.4, 62.3, 56.8] } },
    { id: "zanahoria", nombre: "Zanahoria", img: "img/productos/zanahoria.png", cat: "vegetales", unidad: "lb", serie: [48.9, 49.8, 48.8, 50.8, 52.8, 54.3, 55.9, 56], vol: 13.6, intl: 45.2,
      mercados: { nuevo: [49.8, 61, 55.6], vjuana: [50.5, 59.2, 56.4], stgo: [51.2, 61.1, 56.2], scrist: [47.8, 57.8, 53.8], vega: [52.7, 59.8, 55], hig: [53.5, 62.8, 56.6] } },
    { id: "papa", nombre: "Papa", img: "img/productos/papa.png", cat: "viandas", unidad: "lb", serie: [54.9, 53.6, 53.6, 54.3, 53.2, 51.9, 50.9, 50], vol: 4.3, intl: 33.9,
      mercados: { nuevo: [46.2, 53.6, 48.7], vjuana: [41.7, 50.1, 46.6], stgo: [45.8, 53.4, 48.7], scrist: [43.8, 51.9, 47], vega: [49.3, 57.6, 52.4], hig: [47.2, 58.7, 52.2] } },
    { id: "berenjena", nombre: "Berenjena", img: "img/productos/berenjena.png", cat: "vegetales", unidad: "lb", serie: [35, 36, 34, 37, 38, 37, 39, 38], vol: 4, intl: 33,
      mercados: { nuevo: [35, 41, 38], vjuana: [34, 39, 36.5], stgo: [36, 42, 39], scrist: [33, 38, 35.5], vega: [35, 40, 37.5], hig: [34, 40, 37] } },
    { id: "apio", nombre: "Apio", img: "img/productos/apio.png", cat: "vegetales", unidad: "lb", serie: [63.1, 63.9, 66.3, 67.2, 66.5, 67.5, 70.1, 70.2], vol: 7.4, intl: 60.9,
      mercados: { nuevo: [67.5, 79.8, 74.7], vjuana: [66.4, 78.4, 73.5], stgo: [66.3, 78.5, 69.2], scrist: [67.4, 80.5, 73.8], vega: [64, 78.6, 70.5], hig: [66.9, 82, 73.1] } },
    { id: "puerro", nombre: "Puerro", img: "img/productos/puerro.png", cat: "vegetales", unidad: "lb", serie: [76.5, 76, 75.3, 76.4, 75.8, 77.2, 77.4, 78.8], vol: 6.4, intl: 55.2,
      mercados: { nuevo: [75.3, 91.3, 83.3], vjuana: [76.3, 92.9, 84.6], stgo: [71.9, 95.4, 83.7], scrist: [67.6, 84.8, 76.2], vega: [74.4, 91.1, 82.8], hig: [68.3, 84.5, 76.4] } },
    { id: "cebolla", nombre: "Cebolla", img: "img/productos/cebolla.png", cat: "vegetales", unidad: "lb", serie: [28, 27, 30, 33, 31, 34, 36, 34.5], vol: 7.4, intl: 30.1,
      mercados: { nuevo: [32, 37, 34.5], vjuana: [30, 35, 32.5], stgo: [33, 38, 35], scrist: [31, 36, 33], vega: [32, 36, 34], hig: [33, 37, 34.5] } },
    { id: "ajo", nombre: "Ajo", img: "img/productos/ajo.png", cat: "vegetales", unidad: "lb", serie: [125, 122, 124, 120, 119, 121, 118, 118], vol: 5.2, intl: 98,
      mercados: { nuevo: [112, 124, 118], vjuana: [110, 122, 116], stgo: [115, 127, 121], scrist: [108, 118, 113], vega: [114, 124, 119], hig: [111, 121, 116] } },
    { id: "platano-maduro", nombre: "Plátano maduro", img: "img/productos/platano-maduro.png", cat: "viandas", unidad: "ud", serie: [25.8, 26.5, 26.2, 25.9, 26.1, 26.5, 26.6, 26.5], vol: 7.9, intl: 19.6,
      mercados: { nuevo: [24.2, 31.9, 28], vjuana: [24.5, 29.6, 27.1], stgo: [22.7, 30.4, 26.5], scrist: [23.9, 31, 27.4], vega: [24.7, 32.3, 28.5], hig: [22.4, 27.7, 25] } },
    { id: "yautia-blanca", nombre: "Yautía blanca", img: "img/productos/yautia-blanca.png", cat: "viandas", unidad: "lb", serie: [48.1, 48.5, 49.1, 49.6, 49, 49.6, 50, 50.5], vol: 7.2, intl: 38.9,
      mercados: { nuevo: [46.7, 57.1, 51.9], vjuana: [46, 56.3, 51.1], stgo: [44.6, 53.7, 49.2], scrist: [46.7, 61.6, 54.2], vega: [43.2, 58.3, 50.8], hig: [43.2, 55.8, 49.5] } },
    { id: "platano-verde", nombre: "Plátano verde", img: "img/productos/platano-verde.png", cat: "viandas", unidad: "ud", serie: [18, 19, 17, 20, 21, 20.5, 22, 23], vol: 8.7, intl: 19.5,
      mercados: { nuevo: [21, 25, 23], vjuana: [20, 24, 22], stgo: [22, 26, 24], scrist: [19, 23, 21], vega: [21, 25, 23], hig: [20, 25, 22.5] } },
    { id: "guineo-verde", nombre: "Guineo verde", img: "img/productos/guineo-verde.png", cat: "viandas", unidad: "ud", serie: [40.4, 39.4, 40.2, 39.5, 39, 39.4, 39.6, 40.8], vol: 12.9, intl: 25.1,
      mercados: { nuevo: [36.8, 45.8, 41.2], vjuana: [38.2, 44.3, 40.1], stgo: [36, 43.8, 39.5], scrist: [38.8, 47.1, 41.4], vega: [38.8, 45.3, 42.1], hig: [39.1, 44.5, 41.5] } },
    { id: "repollo", nombre: "Repollo", img: "img/productos/repollo.png", cat: "vegetales", unidad: "lb", serie: [66.8, 65, 67.1, 65.9, 64.6, 66.2, 68.7, 70.9], vol: 12.6, intl: 74.2,
      mercados: { nuevo: [63.2, 79.4, 69.8], vjuana: [66, 79.4, 71.2], stgo: [69.5, 81.4, 75], scrist: [66.1, 74.8, 69.7], vega: [68.7, 83.1, 75.3], hig: [70.6, 84.5, 75.2] } },
    { id: "auyama", nombre: "Auyama", img: "img/productos/auyama.png", cat: "vegetales", unidad: "lb", serie: [74.8, 75.2, 76.1, 76.2, 77, 77.9, 78.4, 75.9], vol: 7.5, intl: 54.6,
      mercados: { nuevo: [76.5, 85.7, 79.9], vjuana: [68.2, 81.2, 74.4], stgo: [74.2, 87, 77.8], scrist: [72.8, 89.6, 79], vega: [70.7, 84.3, 74.2], hig: [67, 77.7, 73.7] } },
    { id: "aji-morron", nombre: "Ají morrón", img: "img/productos/aji-morron.png", cat: "vegetales", unidad: "lb", serie: [66.2, 68, 66.6, 65.9, 66.4, 64.9, 63.9, 63.2], vol: 6, intl: 51.2,
      mercados: { nuevo: [58, 72.8, 64.5], vjuana: [55.3, 64.7, 60.4], stgo: [53.1, 63.7, 59], scrist: [57.3, 70.2, 64.2], vega: [55.4, 69.2, 61.3], hig: [57.8, 72.6, 65.1] } },
    { id: "aji-cubanela", nombre: "Ají cubanela", img: "img/productos/aji-cubanela.png", cat: "vegetales", unidad: "lb", serie: [61.5, 60.6, 59.3, 60.1, 60.1, 60.7, 62, 63.1], vol: 8.4, intl: 44.2,
      mercados: { nuevo: [53.3, 71.2, 62.3], vjuana: [55.3, 69.1, 62.2], stgo: [60.9, 73.7, 67.3], scrist: [58, 74.4, 66.2], vega: [58.8, 70.5, 64.7], hig: [52.1, 67.3, 59.7] } },
    { id: "lechuga-rizada", nombre: "Lechuga rizada", img: "img/productos/lechuga-rizada.png", cat: "vegetales", unidad: "lb", serie: [54.7, 55.5, 54.8, 56.5, 58.2, 58.2, 57.7, 59.1], vol: 13.6, intl: 58.4,
      mercados: { nuevo: [52.6, 64.1, 57.9], vjuana: [52.2, 64, 58.4], stgo: [54.5, 63.7, 58.3], scrist: [50.7, 63.6, 56.9], vega: [54.2, 67.1, 60.9], hig: [53.7, 61.6, 59] } },
    { id: "lechuga-coco", nombre: "Lechuga coco", img: "img/productos/lechuga-coco.png", cat: "vegetales", unidad: "lb", serie: [51.7, 52.6, 53.4, 52.5, 52.2, 51.9, 51.9, 50.7], vol: 9.3, intl: 36.5,
      mercados: { nuevo: [48.4, 59.7, 54], vjuana: [41.7, 55.9, 48.8], stgo: [46.2, 62.4, 54.3], scrist: [43.7, 55.8, 49.8], vega: [41.4, 56, 48.7], hig: [48.8, 58.9, 53.8] } },
    { id: "pepino", nombre: "Pepino", img: "img/productos/pepino.png", cat: "vegetales", unidad: "lb", serie: [85.2, 82.2, 81.8, 80.7, 81.3, 80.2, 78.5, 77.6], vol: 6.7, intl: 73.5,
      mercados: { nuevo: [68.7, 86.5, 76.5], vjuana: [71.6, 78.6, 75], stgo: [70.6, 84.3, 76.6], scrist: [73.8, 88.9, 80.1], vega: [67.8, 80.4, 72.9], hig: [73.9, 89.2, 78.8] } },
    { id: "tomate", nombre: "Tomate", img: "img/productos/tomate.png", cat: "vegetales", unidad: "lb", serie: [40, 42, 45, 44, 48, 52, 50, 52], vol: 9.1, intl: 45.2,
      mercados: { nuevo: [48, 56, 52], vjuana: [45, 52, 49], stgo: [50, 60, 55], scrist: [43, 50, 47], vega: [46, 54, 50], hig: [47, 53, 51] } },
    { id: "coco-seco", nombre: "Coco seco", img: "img/productos/coco-seco.png", cat: "frutas", unidad: "ud", serie: [31.1, 32.4, 31.9, 32.4, 33.4, 32.9, 33.6, 33.5], vol: 10.2, intl: 29.9,
      mercados: { nuevo: [31.7, 37.7, 35.7], vjuana: [31.2, 36.7, 34], stgo: [31.4, 38.3, 35.3], scrist: [30, 34.6, 31.3], vega: [32, 37.7, 34.2], hig: [30.6, 34.1, 32] } },
    { id: "aguacate", nombre: "Aguacate", img: "img/productos/aguacate.png", cat: "frutas", unidad: "ud", serie: [65, 68, 72, 70, 74, 78, 82, 80], vol: 6.8, intl: 72,
      mercados: { nuevo: [75, 85, 80], vjuana: [72, 82, 77], stgo: [78, 88, 83], scrist: [70, 80, 75], vega: [74, 84, 79], hig: [76, 86, 81] } },
    { id: "manzana-roja", nombre: "Manzana roja", img: "img/productos/manzana-roja.png", cat: "frutas", unidad: "ud", serie: [96.4, 97, 96.7, 98.6, 101, 99.8, 99.4, 97.7], vol: 5.6, intl: 80.1,
      mercados: { nuevo: [86.2, 108.5, 97.3], vjuana: [79.8, 107.6, 93.7], stgo: [92.9, 111.5, 102.2], scrist: [83.5, 105.4, 94.5], vega: [86, 108.7, 97.3], hig: [87.5, 112.3, 99.9] } },
    { id: "zapote", nombre: "Zapote", img: "img/productos/zapote.png", cat: "frutas", unidad: "ud", serie: [66.2, 65.7, 65.9, 64.5, 63.9, 65, 65.9, 67], vol: 6.9, intl: 50.3,
      mercados: { nuevo: [62.7, 81.2, 72], vjuana: [56.8, 71, 63.9], stgo: [56.3, 75.4, 65.8], scrist: [57.8, 74.7, 66.3], vega: [61.7, 74.9, 68.3], hig: [56.7, 75.6, 66.2] } },
    { id: "huevo-blanco", nombre: "Huevo blanco", img: "img/productos/huevo-blanco.png", cat: "aves", unidad: "ud", serie: [16.2, 16.4, 17, 17.2, 17.3, 17.5, 17.1, 17.5], vol: 4.1, intl: 16.9,
      mercados: { nuevo: [15.7, 18.6, 17.4], vjuana: [15.1, 17.9, 16.5], stgo: [16, 19.3, 17.7], scrist: [14.8, 18.9, 16.7], vega: [16.8, 18.8, 18], hig: [16.6, 19, 18] } },
    { id: "huevo-blanco-empacado", nombre: "Huevo blanco empacado (Endy)", img: "img/productos/huevo-blanco-empacado.png", cat: "aves", unidad: "ud", serie: [17.8, 18.2, 18.1, 18.3, 18.1, 18.3, 18.1, 18], vol: 3.6, intl: 15.3,
      mercados: { nuevo: [15.1, 19.5, 17.3], vjuana: [16.7, 20.4, 18.5], stgo: [15.8, 19.7, 17.8], scrist: [16.7, 20.4, 18.5], vega: [17.3, 21.3, 19.3], hig: [17, 21.6, 19.3] } },
    { id: "huevo-marron", nombre: "Huevo marrón", img: "img/productos/huevo-marron.png", cat: "aves", unidad: "ud", serie: [19.5, 19.2, 19, 18.9, 19, 18.8, 19.2, 19.7], vol: 4.9, intl: 15.8,
      mercados: { nuevo: [18.1, 24.1, 21.1], vjuana: [17.9, 21.8, 19.9], stgo: [18.6, 23.1, 20.9], scrist: [17.2, 23.2, 20.2], vega: [17.4, 23.3, 20.4], hig: [16.1, 21.8, 19] } },
    { id: "lechoza", nombre: "Lechoza", img: "img/productos/lechoza.png", cat: "frutas", unidad: "ud", serie: [12.3, 12.3, 12.8, 13.3, 13.8, 14, 13.8, 13.6], vol: 12.3, intl: 9.8,
      mercados: { nuevo: [12, 13.9, 13.1], vjuana: [12.7, 14.6, 13.8], stgo: [11.8, 13.5, 13], scrist: [12.8, 14.4, 13.4], vega: [12.2, 14.6, 13], hig: [12.3, 15.3, 13.7] } },
    { id: "tamarindo-empacado", nombre: "Tamarindo empacado", img: "img/productos/tamarindo-empacado.png", cat: "frutas", unidad: "ud", serie: [55.7, 54.8, 56.4, 55.9, 54.8, 56.6, 57.2, 55.8], vol: 9.5, intl: 56.9,
      mercados: { nuevo: [49, 58.5, 54.8], vjuana: [46.6, 59.1, 52.4], stgo: [48.6, 57.5, 52.9], scrist: [50.1, 57.6, 53.5], vega: [50.6, 58.3, 54.8], hig: [55.8, 66.9, 58.7] } },
    { id: "pina", nombre: "Piña", img: "img/productos/pina.png", cat: "frutas", unidad: "ud", serie: [58.9, 60.6, 59.4, 61.4, 62.2, 60.6, 61.9, 60], vol: 5.8, intl: 48.2,
      mercados: { nuevo: [55.4, 68.7, 61.7], vjuana: [58.8, 67.8, 61.8], stgo: [54.3, 62.8, 60.1], scrist: [55.9, 69, 61.8], vega: [54.4, 65, 58.3], hig: [58.2, 69.9, 61.8] } },
    { id: "pollo-gringo", nombre: "Pollo gringo", img: "img/productos/pollo-gringo.png", cat: "aves", unidad: "lb", serie: [88.2, 87.7, 89.7, 86.8, 84.9, 87.2, 90.1, 89.6], vol: 2.1, intl: 72.4,
      mercados: { nuevo: [77.4, 88.9, 83.4], vjuana: [88.5, 107.8, 94.9], stgo: [81.1, 95.4, 91.1], scrist: [75.6, 91.4, 85.6], vega: [90.3, 108.2, 94.9], hig: [83, 98.5, 92.5] } },
    { id: "brocoli", nombre: "Brócoli", img: "img/productos/brocoli.png", cat: "vegetales", unidad: "lb", serie: [70.8, 70.3, 68.8, 70.9, 69.9, 71.4, 73, 71.7], vol: 10.9, intl: 60,
      mercados: { nuevo: [63.4, 72.1, 66.7], vjuana: [66.3, 74.6, 71.7], stgo: [63, 75.1, 69.2], scrist: [67.9, 76.3, 72.8], vega: [65.4, 77.1, 71.2], hig: [70.1, 82.4, 73.2] } },
    { id: "coliflor", nombre: "Coliflor", img: "img/productos/coliflor.png", cat: "vegetales", unidad: "lb", serie: [69.8, 70.5, 70.6, 71, 73.6, 76.4, 79.2, 80.6], vol: 5.1, intl: 74.3,
      mercados: { nuevo: [73.4, 87.1, 82.1], vjuana: [71.7, 85.3, 79.2], stgo: [72.5, 83.4, 76.4], scrist: [73.5, 91.8, 81.8], vega: [74.9, 92.2, 82.7], hig: [72.3, 83.3, 78.6] } },
    { id: "limon", nombre: "Limón", img: "img/productos/limon.png", cat: "frutas", unidad: "ud", serie: [28.6, 29.7, 30.5, 29.6, 30, 30.6, 31.5, 30.4], vol: 11.5, intl: 23.3,
      mercados: { nuevo: [28.4, 33.1, 31.2], vjuana: [29.2, 32.7, 31.2], stgo: [25.7, 31.4, 28.5], scrist: [29.2, 31.8, 30.5], vega: [26, 30.9, 29.1], hig: [26, 31.2, 29] } },
    { id: "rabano", nombre: "Rábano", img: "img/productos/rabano.png", cat: "vegetales", unidad: "lb", serie: [27.8, 27.9, 27.3, 26.5, 26.6, 27.3, 27.4, 27.6], vol: 10.4, intl: 23.9,
      mercados: { nuevo: [24.4, 30.8, 27.5], vjuana: [24.2, 30.6, 27.4], stgo: [27.9, 30.8, 29.5], scrist: [23.2, 29.2, 25.8], vega: [25.8, 29.1, 27.5], hig: [24.9, 30.2, 26.7] } },
    { id: "mandarina", nombre: "Mandarina", img: "img/productos/mandarina.png", cat: "frutas", unidad: "ud", serie: [52.2, 52.6, 54.3, 56.4, 56.4, 57.8, 59.1, 60.1], vol: 5.4, intl: 48.8,
      mercados: { nuevo: [53.5, 66.3, 58.8], vjuana: [51.8, 61.8, 58.4], stgo: [57.6, 64.4, 60.8], scrist: [55.6, 65.3, 59.2], vega: [59.9, 68.4, 64.2], hig: [58.3, 70.7, 62.7] } },
    { id: "recaito", nombre: "Recaíto", img: "img/productos/recaito.png", cat: "vegetales", unidad: "ud", serie: [61.8, 61.3, 62.3, 64, 64.7, 65.9, 66.4, 67.9], vol: 5.2, intl: 54.3,
      mercados: { nuevo: [62.4, 80.4, 71.4], vjuana: [61.1, 79.4, 70.3], stgo: [55.9, 72.1, 64], scrist: [58.3, 75.5, 66.9], vega: [62.6, 81.3, 72], hig: [57.6, 71.8, 64.7] } },
    { id: "zucchini", nombre: "Zucchini", img: "img/productos/zucchini.png", cat: "vegetales", unidad: "lb", serie: [68.9, 70.7, 71.6, 72, 71.7, 71.4, 72.5, 71.4], vol: 8.1, intl: 54.3,
      mercados: { nuevo: [62.1, 76.9, 69.5], vjuana: [61.1, 82.5, 71.8], stgo: [61.9, 77.6, 69.8], scrist: [63.8, 86.1, 74.9], vega: [64.3, 78.8, 71.5], hig: [64.7, 83.8, 74.3] } },
    { id: "pitahaya", nombre: "Pitahaya", img: "img/productos/pitahaya.png", cat: "frutas", unidad: "ud", serie: [120.3, 121.6, 121.1, 119.9, 118.4, 116.7, 117.2, 116.3], vol: 7.4, intl: 98.9,
      mercados: { nuevo: [96.2, 123.4, 109.8], vjuana: [102, 122.9, 112.5], stgo: [97.8, 131.1, 114.4], scrist: [103.7, 130.8, 117.3], vega: [111.1, 138, 124.5], hig: [100.8, 131.9, 116.3] } },
    { id: "batata-asada", nombre: "Batata asada", img: "img/productos/batata-asada.png", cat: "viandas", unidad: "lb", serie: [90, 89.5, 91, 92.7, 94.5, 92.4, 92.7, 94.2], vol: 6.6, intl: 73.5,
      mercados: { nuevo: [80.8, 104.6, 92.7], vjuana: [84.7, 108.8, 96.8], stgo: [83.3, 100.2, 91.8], scrist: [85.2, 108.6, 96.9], vega: [82, 102.2, 92.1], hig: [81.1, 108.9, 95] } },
    { id: "fresa", nombre: "Fresa", img: "img/productos/fresa.png", cat: "frutas", unidad: "lb", serie: [124.6, 122.7, 125.6, 124.8, 122, 120.4, 122.1, 121.7], vol: 9.8, intl: 109.5,
      mercados: { nuevo: [107.6, 141.3, 124.5], vjuana: [108.5, 138, 123.3], stgo: [107.9, 139.7, 123.8], scrist: [99.6, 131.1, 115.3], vega: [113.5, 146.1, 129.8], hig: [109.4, 142.9, 126.2] } },
    { id: "coco-de-agua", nombre: "Coco de agua", img: "img/productos/coco-de-agua.png", cat: "frutas", unidad: "ud", serie: [46.3, 46.2, 45.1, 45.7, 46.5, 46.7, 48, 48], vol: 8.6, intl: 34.6,
      mercados: { nuevo: [41.7, 51.3, 46.5], vjuana: [43.8, 55.3, 49.5], stgo: [42.2, 52.4, 47.3], scrist: [44.4, 59, 51.7], vega: [40.3, 51.4, 45.8], hig: [39.9, 52, 46] } },
    { id: "molondron", nombre: "Molondrón", img: "img/productos/molondron.png", cat: "vegetales", unidad: "lb", serie: [44.2, 45, 45.9, 46.6, 46.3, 46.1, 45.2, 45.8], vol: 7.8, intl: 32.1,
      mercados: { nuevo: [36.9, 49.9, 43.4], vjuana: [39.8, 49.3, 44.5], stgo: [41.1, 53.7, 47.4], scrist: [41.9, 50.8, 46.3], vega: [43.2, 52.7, 48], hig: [41, 52.8, 46.9] } },
    { id: "habichuela-verde", nombre: "Habichuela verde", img: "img/productos/habichuela-verde.png", cat: "vegetales", unidad: "lb", serie: [34.9, 35.2, 36.1, 36.8, 36.5, 36.1, 35.4, 35.7], vol: 5.6, intl: 26.6,
      mercados: { nuevo: [34.9, 41.6, 37.4], vjuana: [35.6, 40.1, 38.1], stgo: [32.8, 40.5, 37.1], scrist: [33.7, 39.1, 35.8], vega: [35.3, 39.5, 36.9], hig: [32.4, 37.4, 35.5] } },
    { id: "habichuela-jacumelo", nombre: "Habichuela jacumelo", img: "img/productos/habichuela-jacumelo.png", cat: "granos", unidad: "lb", serie: [94.2, 93.9, 94.5, 94.1, 95.8, 95.6, 97.8, 97.5], vol: 5.4, intl: 76,
      mercados: { nuevo: [90.6, 110.6, 100.6], vjuana: [80.9, 105.2, 93.1], stgo: [85.6, 107.9, 96.8], scrist: [87.2, 114, 100.6], vega: [86.1, 110.3, 98.2], hig: [85.7, 112.7, 99.2] } },
    { id: "habichuela-negra", nombre: "Habichuela negra", img: "img/productos/habichuela-negra.png", cat: "granos", unidad: "lb", serie: [49.4, 51.5, 52.5, 52.3, 53.8, 52.2, 54.2, 53.2], vol: 5.7, intl: 54,
      mercados: { nuevo: [45, 56.9, 50.9], vjuana: [49.1, 59, 53.1], stgo: [51.6, 63.4, 56], scrist: [51.9, 58.6, 56.1], vega: [50.7, 60.9, 54.5], hig: [47.3, 54.1, 50.5] } },
    { id: "maiz", nombre: "Maíz", img: "img/productos/maiz.png", cat: "granos", unidad: "lb", serie: [76, 77.1, 80, 78.5, 80.2, 81.2, 80.4, 81.5], vol: 4.4, intl: 52.1,
      mercados: { nuevo: [83.1, 97.8, 86.7], vjuana: [75.4, 88.9, 80.7], stgo: [77.2, 90.1, 86], scrist: [78, 94.8, 86], vega: [75.8, 94, 82.5], hig: [70.2, 83.6, 76.2] } },
    { id: "carne-de-vaca", nombre: "Carne de vaca", img: "img/productos/carne-de-vaca.png", cat: "carnes", unidad: "lb", serie: [258.3, 255.8, 254.5, 252.8, 247.8, 254.2, 257.8, 254], vol: 4.2, intl: 223.5,
      mercados: { nuevo: [233.3, 291.2, 262.3], vjuana: [233.8, 302.7, 268.3], stgo: [215.7, 279.7, 247.7], scrist: [241.9, 289.9, 265.9], vega: [236.8, 308.4, 272.6], hig: [211.2, 270.3, 240.8] } },
    { id: "carne-de-cerdo", nombre: "Carne de cerdo", img: "img/productos/carne-de-cerdo.png", cat: "carnes", unidad: "lb", serie: [143.7, 143.7, 142.7, 142.4, 141.6, 144.7, 144.3, 144.3], vol: 3.8, intl: 122.7,
      mercados: { nuevo: [125.7, 159.3, 142.5], vjuana: [121, 151.9, 136.4], stgo: [133.6, 167.1, 150.3], scrist: [136.8, 166, 151.4], vega: [136.2, 165.3, 150.8], hig: [139.5, 169.7, 154.6] } },
    { id: "chuleta", nombre: "Chuleta", img: "img/productos/chuleta.png", cat: "carnes", unidad: "lb", serie: [158.8, 161.4, 162, 166.8, 166.6, 164.2, 165, 161.4], vol: 4.4, intl: 138.8,
      mercados: { nuevo: [152, 186.1, 169.1], vjuana: [131.3, 177.5, 154.4], stgo: [137.9, 186.1, 162], scrist: [141.1, 181.1, 161.1], vega: [139.5, 184.8, 162.2], hig: [139.7, 177.9, 158.8] } },
    { id: "costilla-ahumada", nombre: "Costilla ahumada", img: "img/productos/costilla-ahumada.png", cat: "carnes", unidad: "lb", serie: [184.3, 188.6, 185.9, 189.5, 189.8, 191.2, 193.9, 191.3], vol: 4, intl: 172.2,
      mercados: { nuevo: [176, 224.8, 200.4], vjuana: [160, 202.7, 181.3], stgo: [173.4, 210.3, 191.9], scrist: [167.5, 204.8, 186.2], vega: [172.6, 230.1, 201.3], hig: [176.7, 215.5, 196.1] } },
    { id: "sandia", nombre: "Sandía", img: "img/productos/sandia.png", cat: "frutas", unidad: "ud", serie: [12.9, 12.7, 13.1, 13.2, 13.1, 13.5, 13.3, 13.4], vol: 4.8, intl: 9.1,
      mercados: { nuevo: [12.2, 14, 13.4], vjuana: [13.2, 16, 14.3], stgo: [11.4, 13.7, 12.5], scrist: [12.5, 14.7, 13.2], vega: [12.2, 14.2, 13.4], hig: [11.9, 14.1, 12.5] } }
  ],
  competidores: [
    { id: "a", nombre: "Competidor A", precio: 58, vol: 11.2, serie: [48, 50, 52, 51, 54, 56, 55, 58] },
    { id: "b", nombre: "Competidor B", precio: 47, vol: 8.9, serie: [42, 43, 44, 44, 45, 46, 46, 47] },
    { id: "c", nombre: "Competidor C", precio: 53.5, vol: 9.8, serie: [46, 48, 50, 49, 52, 53, 52, 53.5] },
    { id: "d", nombre: "Competidor D", precio: 44, vol: 7.6, serie: [40, 41, 41, 42, 43, 43, 44, 44] }
  ],
  volMercadoTomate: 8.3,
  volIntlTomate: 7.1
};

const FICHAS = {
  "cebolla-blanca": {
    prod: { zonas: ["San José de Ocoa", "Valle del Cibao", "San Juan"], zafra: "NOV–ABR", sistema: "riego", ciclo: 120, rendimiento: "18,000 lb/ha" },
    costos: { total: 26.8, margen: 26.2, partidas: [["Semilla", 14], ["Fertilizante", 20], ["Mano de obra", 28], ["Riego", 10], ["Transporte", 16], ["Otros", 12]] },
    post: { vida: 30, temp: "4–8 °C", hum: "65–70 %", manejo: "curado en campo · mallas de 50 lb", perdidas: 9.2 },
    com: { canales: [["Mayorista", 52], ["Minorista", 30], ["Industria", 10], ["Exportación", 8]], margen: 24.8 },
    proc: { nivel: "fresco", formas: ["deshidratada en escamas", "conservas"] },
    derivados: ["Cebolla deshidratada", "Sopas instantáneas", "Conservas encurtidas"]
  },
  "name": {
    prod: { zonas: ["San José de Ocoa", "Azua", "San Juan"], zafra: "todo el año", sistema: "secano", ciclo: 270, rendimiento: "9,000 lb/ha" },
    costos: { total: 12.9, margen: 27.9, partidas: [["Semilla", 18], ["Mano de obra", 32], ["Tutores", 12], ["Fertilizante", 12], ["Transporte", 16], ["Otros", 10]] },
    post: { vida: 60, temp: "13–15 °C", hum: "70–80 %", manejo: "curado · cajas ventiladas", perdidas: 8.4 },
    com: { canales: [["Mayorista", 46], ["Minorista", 38], ["Exportación", 10], ["Industria", 6]], margen: 22.6 },
    proc: { nivel: "fresco", formas: ["congelado pelado", "harina"] },
    derivados: ["Ñame congelado", "Harina de ñame"]
  },
  "batata": {
    prod: { zonas: ["San Cristóbal", "Peravia", "Azua"], zafra: "todo el año", sistema: "riego", ciclo: 110, rendimiento: "14,000 lb/ha" },
    costos: { total: 63.4, margen: 27.4, partidas: [["Semilla", 16], ["Mano de obra", 28], ["Fertilizante", 18], ["Riego", 10], ["Transporte", 16], ["Otros", 12]] },
    post: { vida: 25, temp: "13–15 °C", hum: "75–85 %", manejo: "clasificación por calibre · cajas", perdidas: 8.9 },
    com: { canales: [["Mayorista", 44], ["Minorista", 34], ["Industria", 12], ["Exportación", 10]], margen: 23.4 },
    proc: { nivel: "fresco", formas: ["batata asada", "puré congelado", "harina"] },
    derivados: ["Batata asada lista", "Puré congelado", "Harina de batata"]
  },
  "yautia-amarilla": {
    prod: { zonas: ["San José de Ocoa", "San Juan", "Bahoruco"], zafra: "todo el año", sistema: "secano", ciclo: 300, rendimiento: "11,000 lb/ha" },
    costos: { total: 40.7, margen: 27.1, partidas: [["Semilla", 20], ["Mano de obra", 30], ["Fertilizante", 14], ["Transporte", 18], ["Otros", 18]] },
    post: { vida: 45, temp: "7–10 °C", hum: "70–80 %", manejo: "selección · sacos ventilados", perdidas: 9.6 },
    com: { canales: [["Mayorista", 50], ["Minorista", 36], ["Exportación", 14]], margen: 21.8 },
    proc: { nivel: "fresco", formas: ["congelado pelado"] },
    derivados: ["Yautía congelada", "Viandas mixtas congeladas"]
  },
  "yuca": {
    prod: { zonas: ["Hato Mayor", "Monte Plata", "San Juan"], zafra: "todo el año", sistema: "secano", ciclo: 270, rendimiento: "16,000 lb/ha" },
    costos: { total: 51.2, margen: 27.3, partidas: [["Semilla", 14], ["Mano de obra", 30], ["Fertilizante", 14], ["Transporte", 20], ["Riego", 8], ["Otros", 14]] },
    post: { vida: 5, temp: "ambiente fresco", hum: "60–70 %", manejo: "desenterrado a demanda · cera en raíces seleccionadas", perdidas: 12.4 },
    com: { canales: [["Mayorista", 40], ["Industria", 26], ["Minorista", 24], ["Exportación", 10]], margen: 24.2 },
    proc: { nivel: "fresco · procesado", formas: ["casabe", "almidón", "yuca congelada"] },
    derivados: ["Casabe", "Almidón de yuca", "Yuca congelada", "Tapioca"]
  },
  "jengibre": {
    prod: { zonas: ["Jarabacoa", "Constanza"], zafra: "DIC–MAY", sistema: "riego", ciclo: 300, rendimiento: "12,000 lb/ha" },
    costos: { total: 69.6, margen: 27.3, partidas: [["Semilla", 22], ["Mano de obra", 26], ["Fertilizante", 16], ["Riego", 10], ["Transporte", 14], ["Otros", 12]] },
    post: { vida: 21, temp: "10–13 °C", hum: "75–85 %", manejo: "lavado y selección · cajas", perdidas: 9.8 },
    com: { canales: [["Mayorista", 38], ["Exportación", 30], ["Minorista", 22], ["Industria", 10]], margen: 25.4 },
    proc: { nivel: "fresco · procesado", formas: ["deshidratado", "cerveza de jengibre", "té"] },
    derivados: ["Jengibre deshidratado", "Ginger beer", "Infusiones"]
  },
  "yautia-coco": {
    prod: { zonas: ["San José de Ocoa", "San Juan"], zafra: "todo el año", sistema: "secano", ciclo: 290, rendimiento: "10,500 lb/ha" },
    costos: { total: 36.3, margen: 27.0, partidas: [["Semilla", 20], ["Mano de obra", 30], ["Fertilizante", 14], ["Transporte", 18], ["Otros", 18]] },
    post: { vida: 40, temp: "7–10 °C", hum: "70–80 %", manejo: "sacos ventilados", perdidas: 9.4 },
    com: { canales: [["Mayorista", 50], ["Minorista", 38], ["Exportación", 12]], margen: 22.1 },
    proc: { nivel: "fresco", formas: ["congelado pelado"] },
    derivados: ["Yautía congelada"]
  },
  "remolacha": {
    prod: { zonas: ["Constanza", "Jarabacoa"], zafra: "NOV–ABR", sistema: "riego", ciclo: 90, rendimiento: "15,000 lb/ha" },
    costos: { total: 39.6, margen: 27.2, partidas: [["Semilla", 14], ["Fertilizante", 20], ["Mano de obra", 28], ["Riego", 12], ["Transporte", 14], ["Otros", 12]] },
    post: { vida: 35, temp: "0–4 °C", hum: "90–95 %", manejo: "corte de follaje · bolsas perforadas", perdidas: 8.1 },
    com: { canales: [["Mayorista", 46], ["Minorista", 38], ["Industria", 10], ["Exportación", 6]], margen: 23.9 },
    proc: { nivel: "fresco", formas: ["enlatada", "jugo"] },
    derivados: ["Remolacha encurtida", "Jugo de remolacha"]
  },
  "zanahoria": {
    prod: { zonas: ["Constanza", "Jarabacoa"], zafra: "todo el año", sistema: "riego", ciclo: 110, rendimiento: "18,000 lb/ha" },
    costos: { total: 40.9, margen: 27.0, partidas: [["Semilla", 15], ["Fertilizante", 20], ["Mano de obra", 27], ["Riego", 12], ["Transporte", 14], ["Otros", 12]] },
    post: { vida: 30, temp: "0–4 °C", hum: "90–95 %", manejo: "lavado · bolsas", perdidas: 8.7 },
    com: { canales: [["Mayorista", 44], ["Minorista", 36], ["Industria", 14], ["Exportación", 6]], margen: 24.6 },
    proc: { nivel: "fresco · procesado", formas: ["jugo", "congelada rallada"] },
    derivados: ["Jugo de zanahoria", "Zanahoria congelada"]
  },
  "papa": {
    prod: { zonas: ["Constanza", "San José de Ocoa", "San Juan"], zafra: "DIC–MAR", sistema: "riego", ciclo: 100, rendimiento: "16,000 lb/ha" },
    costos: { total: 36.4, margen: 27.2, partidas: [["Semilla certificada", 24], ["Fertilizante", 18], ["Mano de obra", 24], ["Riego", 10], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 90, temp: "8–12 °C", hum: "85–90 %", manejo: "curado 2 semanas · bodega ventilada", perdidas: 7.8 },
    com: { canales: [["Mayorista", 42], ["Minorista", 38], ["Industria", 20]], margen: 23.8 },
    proc: { nivel: "fresco · procesado", formas: ["papas fritas", "puré instantáneo"] },
    derivados: ["Papas fritas en bolsa", "Puré instantáneo"]
  },
  "berenjena": {
    prod: { zonas: ["La Vega", "Bonao", "San Cristóbal"], zafra: "todo el año", sistema: "riego", ciclo: 95, rendimiento: "22,000 lb/ha" },
    costos: { total: 27.8, margen: 26.8, partidas: [["Semilla", 16], ["Fertilizante", 20], ["Mano de obra", 28], ["Riego", 10], ["Transporte", 14], ["Otros", 12]] },
    post: { vida: 14, temp: "8–12 °C", hum: "85–90 %", manejo: "empaque en cajas", perdidas: 9.1 },
    com: { canales: [["Mayorista", 44], ["Exportación", 22], ["Minorista", 24], ["Industria", 10]], margen: 24.1 },
    proc: { nivel: "fresco", formas: ["encurtidos", "congelada"] },
    derivados: ["Berenjena encurtida"]
  },
  "apio": {
    prod: { zonas: ["Constanza"], zafra: "todo el año", sistema: "riego", ciclo: 140, rendimiento: "20,000 lb/ha" },
    costos: { total: 51.1, margen: 27.2, partidas: [["Semilla", 15], ["Fertilizante", 20], ["Mano de obra", 29], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 21, temp: "0–4 °C", hum: "90–95 %", manejo: "lavado · atado", perdidas: 9.4 },
    com: { canales: [["Mayorista", 48], ["Minorista", 40], ["Industria", 12]], margen: 23.5 },
    proc: { nivel: "fresco", formas: ["sofrito", "sazones deshidratados"] },
    derivados: ["Sazón completo", "Sofrito industrial"]
  },
  "puerro": {
    prod: { zonas: ["Constanza"], zafra: "todo el año", sistema: "riego", ciclo: 130, rendimiento: "16,000 lb/ha" },
    costos: { total: 57.4, margen: 27.2, partidas: [["Semilla", 16], ["Fertilizante", 20], ["Mano de obra", 28], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 20, temp: "0–4 °C", hum: "90–95 %", manejo: "atado · bolsas", perdidas: 9.2 },
    com: { canales: [["Mayorista", 46], ["Minorista", 40], ["Industria", 14]], margen: 23.7 },
    proc: { nivel: "fresco", formas: ["deshidratado"] },
    derivados: ["Puerro deshidratado"]
  },
  "cebolla": {
    prod: { zonas: ["San Juan", "San José de Ocoa", "Valle del Cibao"], zafra: "NOV–ABR", sistema: "riego", ciclo: 125, rendimiento: "17,000 lb/ha" },
    costos: { total: 25.1, margen: 27.2, partidas: [["Semilla", 14], ["Fertilizante", 20], ["Mano de obra", 28], ["Riego", 10], ["Transporte", 16], ["Otros", 12]] },
    post: { vida: 30, temp: "4–8 °C", hum: "65–70 %", manejo: "curado en campo · mallas", perdidas: 9.0 },
    com: { canales: [["Mayorista", 50], ["Minorista", 32], ["Industria", 10], ["Exportación", 8]], margen: 24.4 },
    proc: { nivel: "fresco", formas: ["deshidratada"] },
    derivados: ["Cebolla deshidratada"]
  },
  "ajo": {
    prod: { zonas: ["Constanza"], zafra: "MAR–ABR", sistema: "riego", ciclo: 180, rendimiento: "8,000 lb/ha" },
    costos: { total: 86.1, margen: 27.0, partidas: [["Semilla importada", 34], ["Fertilizante", 16], ["Mano de obra", 22], ["Riego", 8], ["Transporte", 8], ["Otros", 12]] },
    post: { vida: 120, temp: "0–4 °C", hum: "60–65 %", manejo: "tejido y trenzado · bodega seca", perdidas: 7.2 },
    com: { canales: [["Mayorista", 48], ["Minorista", 40], ["Industria", 12]], margen: 22.9 },
    proc: { nivel: "fresco · procesado", formas: ["ajo pelado", "pasta", "deshidratado"] },
    derivados: ["Ajo pelado al vacío", "Pasta de ajo", "Ajo deshidratado"]
  },
  "platano-maduro": {
    prod: { zonas: ["Monte Plata", "Hato Mayor", "Barahona"], zafra: "todo el año", sistema: "secano", ciclo: "perenne", rendimiento: "700 racimos/ha/año" },
    costos: { total: 19.3, margen: 27.2, partidas: [["Manejo del cultivo", 24], ["Fertilizante", 16], ["Mano de obra", 26], ["Transporte", 16], ["Riego", 6], ["Otros", 12]] },
    post: { vida: 8, temp: "18–22 °C", hum: "75–85 %", manejo: "racimo → dedos · cajas", perdidas: 10.8 },
    com: { canales: [["Mayorista", 46], ["Minorista", 36], ["Industria", 12], ["Exportación", 6]], margen: 23.2 },
    proc: { nivel: "fresco · procesado", formas: ["maduro frito congelado", "harina"] },
    derivados: ["Tostones de maduro", "Harina de plátano"]
  },
  "yautia-blanca": {
    prod: { zonas: ["San José de Ocoa", "San Juan"], zafra: "todo el año", sistema: "secano", ciclo: 290, rendimiento: "10,000 lb/ha" },
    costos: { total: 36.8, margen: 27.1, partidas: [["Semilla", 20], ["Mano de obra", 30], ["Fertilizante", 14], ["Transporte", 18], ["Otros", 18]] },
    post: { vida: 40, temp: "7–10 °C", hum: "70–80 %", manejo: "sacos ventilados", perdidas: 9.5 },
    com: { canales: [["Mayorista", 48], ["Minorista", 38], ["Exportación", 14]], margen: 22.0 },
    proc: { nivel: "fresco", formas: ["congelado pelado"] },
    derivados: ["Yautía congelada"]
  },
  "platano-verde": {
    prod: { zonas: ["Monte Plata", "Hato Mayor", "Azua"], zafra: "todo el año", sistema: "secano", ciclo: "perenne", rendimiento: "700 racimos/ha/año" },
    costos: { total: 16.7, margen: 27.4, partidas: [["Manejo del cultivo", 24], ["Fertilizante", 16], ["Mano de obra", 26], ["Transporte", 16], ["Riego", 6], ["Otros", 12]] },
    post: { vida: 9, temp: "13–15 °C", hum: "80–90 %", manejo: "cajas de dedos", perdidas: 10.2 },
    com: { canales: [["Mayorista", 44], ["Minorista", 34], ["Industria", 16], ["Exportación", 6]], margen: 23.6 },
    proc: { nivel: "fresco · procesado", formas: ["tostones congelados", "mangú industrial", "chips"] },
    derivados: ["Tostones congelados", "Chips de plátano", "Sazón criollo"]
  },
  "guineo-verde": {
    prod: { zonas: ["Barahona", "Azua", "San Cristóbal"], zafra: "todo el año", sistema: "secano", ciclo: "perenne", rendimiento: "1,100 racimos/ha/año" },
    costos: { total: 29.7, margen: 27.2, partidas: [["Manejo del cultivo", 24], ["Mano de obra", 26], ["Fertilizante", 16], ["Transporte", 16], ["Riego", 6], ["Otros", 12]] },
    post: { vida: 10, temp: "13–15 °C", hum: "80–90 %", manejo: "cajas de dedos", perdidas: 10.6 },
    com: { canales: [["Mayorista", 46], ["Minorista", 38], ["Industria", 10], ["Exportación", 6]], margen: 23.3 },
    proc: { nivel: "fresco", formas: ["chips"] },
    derivados: ["Chips de guineo"]
  },
  "repollo": {
    prod: { zonas: ["Constanza", "Jarabacoa", "San Juan"], zafra: "todo el año", sistema: "riego", ciclo: 100, rendimiento: "24,000 lb/ha" },
    costos: { total: 51.7, margen: 27.1, partidas: [["Semilla", 14], ["Fertilizante", 20], ["Mano de obra", 28], ["Riego", 12], ["Transporte", 14], ["Otros", 12]] },
    post: { vida: 40, temp: "0–4 °C", hum: "90–95 %", manejo: "corte de tallo · malla", perdidas: 8.6 },
    com: { canales: [["Mayorista", 46], ["Minorista", 38], ["Industria", 16]], margen: 23.9 },
    proc: { nivel: "fresco", formas: ["encurtidos"] },
    derivados: ["Repollo encurtido", "Ensaladas listas"]
  },
  "auyama": {
    prod: { zonas: ["San Juan", "Azua", "Baní"], zafra: "DIC–ABR", sistema: "secano", ciclo: 110, rendimiento: "20,000 lb/ha" },
    costos: { total: 55.3, margen: 27.1, partidas: [["Semilla", 12], ["Mano de obra", 28], ["Fertilizante", 16], ["Transporte", 20], ["Plagas", 12], ["Otros", 12]] },
    post: { vida: 90, temp: "10–15 °C", hum: "60–70 %", manejo: "curado al sol · bodega seca", perdidas: 7.4 },
    com: { canales: [["Mayorista", 48], ["Minorista", 36], ["Industria", 16]], margen: 23.7 },
    proc: { nivel: "fresco", formas: ["puré"] },
    derivados: ["Puré de auyama", "Sopas cremas"]
  },
  "aji-morron": {
    prod: { zonas: ["La Vega", "Constanza", "Mao"], zafra: "todo el año", sistema: "riego", ciclo: 110, rendimiento: "16,000 lb/ha" },
    costos: { total: 46.1, margen: 27.1, partidas: [["Semilla híbrida", 22], ["Fertilizante", 18], ["Mano de obra", 26], ["Riego", 10], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 16, temp: "7–10 °C", hum: "85–90 %", manejo: "clasificación por color · cajas", perdidas: 9.8 },
    com: { canales: [["Exportación", 28], ["Mayorista", 38], ["Minorista", 24], ["Industria", 10]], margen: 25.8 },
    proc: { nivel: "fresco", formas: ["deshidratado", "pasta"] },
    derivados: ["Paprika", "Pasta de ají"]
  },
  "aji-cubanela": {
    prod: { zonas: ["La Vega", "Mao", "San Juan"], zafra: "todo el año", sistema: "riego", ciclo: 100, rendimiento: "15,000 lb/ha" },
    costos: { total: 46.0, margen: 27.1, partidas: [["Semilla", 20], ["Fertilizante", 18], ["Mano de obra", 27], ["Riego", 10], ["Transporte", 13], ["Otros", 12]] },
    post: { vida: 14, temp: "7–10 °C", hum: "85–90 %", manejo: "cajas ventiladas", perdidas: 10.1 },
    com: { canales: [["Mayorista", 44], ["Minorista", 32], ["Industria", 16], ["Exportación", 8]], margen: 24.7 },
    proc: { nivel: "fresco", formas: ["sazones", "deshidratado"] },
    derivados: ["Sazón criollo", "Ají deshidratado"]
  },
  "lechuga-rizada": {
    prod: { zonas: ["Constanza"], zafra: "todo el año", sistema: "riego", ciclo: 75, rendimiento: "18,000 ud/ha" },
    costos: { total: 43.1, margen: 27.1, partidas: [["Semilla", 16], ["Fertilizante", 18], ["Mano de obra", 30], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 10, temp: "0–4 °C", hum: "90–95 %", manejo: "campo → cuarto frío · cajas", perdidas: 11.8 },
    com: { canales: [["Mayorista", 42], ["Minorista", 42], ["Industria", 16]], margen: 24.3 },
    proc: { nivel: "fresco", formas: ["bolsa lista para consumir"] },
    derivados: ["Ensaladas de bolsa"]
  },
  "lechuga-coco": {
    prod: { zonas: ["Constanza"], zafra: "todo el año", sistema: "riego", ciclo: 75, rendimiento: "20,000 ud/ha" },
    costos: { total: 37.0, margen: 27.0, partidas: [["Semilla", 16], ["Fertilizante", 18], ["Mano de obra", 30], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 10, temp: "0–4 °C", hum: "90–95 %", manejo: "cuarto frío · cajas", perdidas: 11.5 },
    com: { canales: [["Mayorista", 44], ["Minorista", 40], ["Industria", 16]], margen: 24.1 },
    proc: { nivel: "fresco", formas: ["bolsa lista para consumir"] },
    derivados: ["Ensaladas de bolsa"]
  },
  "pepino": {
    prod: { zonas: ["La Vega", "San Juan", "Constanza"], zafra: "todo el año", sistema: "riego", ciclo: 65, rendimiento: "20,000 lb/ha" },
    costos: { total: 56.5, margen: 27.2, partidas: [["Semilla", 18], ["Fertilizante", 18], ["Mano de obra", 28], ["Riego", 10], ["Transporte", 14], ["Otros", 12]] },
    post: { vida: 14, temp: "10–12 °C", hum: "85–90 %", manejo: "cajas", perdidas: 9.6 },
    com: { canales: [["Mayorista", 44], ["Minorista", 36], ["Industria", 20]], margen: 23.8 },
    proc: { nivel: "fresco", formas: ["encurtidos"] },
    derivados: ["Pepinillos en vinagre"]
  },
  "tomate": {
    prod: { zonas: ["Azua", "San Juan", "Baní"], zafra: "NOV–ABR", sistema: "riego", ciclo: 105, rendimiento: "22,000 lb/ha" },
    costos: { total: 37.9, margen: 27.1, partidas: [["Semilla híbrida", 20], ["Fertilizante", 18], ["Mano de obra", 28], ["Riego", 10], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 10, temp: "10–12 °C", hum: "85–90 %", manejo: "clasificación por grado · cajas", perdidas: 11.2 },
    com: { canales: [["Mayorista", 42], ["Industria", 24], ["Minorista", 26], ["Exportación", 8]], margen: 25.2 },
    proc: { nivel: "fresco · procesado", formas: ["pasta", "salsa", "conservas"] },
    derivados: ["Pasta de tomate", "Salsa de tomate", "Tomate enlatado"]
  },
  "coco-seco": {
    prod: { zonas: ["Sabana Grande de Boyá", "Monte Plata", "Duarte"], zafra: "todo el año", sistema: "secano", ciclo: "perenne", rendimiento: "19,000 nueces/ha/año" },
    costos: { total: 24.4, margen: 27.2, partidas: [["Manejo de palma", 20], ["Cosecha", 28], ["Mano de obra", 16], ["Transporte", 22], ["Beneficio", 8], ["Otros", 6]] },
    post: { vida: 30, temp: "ambiente", hum: "70–80 %", manejo: "descopete · pila ventilada", perdidas: 8.9 },
    com: { canales: [["Mayorista", 40], ["Industria", 34], ["Minorista", 20], ["Exportación", 6]], margen: 23.1 },
    proc: { nivel: "fresco · procesado", formas: ["aceite", "leche", "copra"] },
    derivados: ["Aceite de coco", "Leche de coco", "Copra"]
  },
  "aguacate": {
    prod: { zonas: ["Baní", "San José de Ocoa", "Miches"], zafra: "SEP–ENE", sistema: "secano", ciclo: "perenne", rendimiento: "9,000 kg/ha" },
    costos: { total: 58.3, margen: 27.1, partidas: [["Manejo del cultivo", 22], ["Fertilizante", 16], ["Cosecha", 24], ["Mano de obra", 14], ["Transporte", 14], ["Otros", 10]] },
    post: { vida: 12, temp: "5–8 °C", hum: "85–90 %", manejo: "cajas de una capa", perdidas: 9.7 },
    com: { canales: [["Exportación", 30], ["Mayorista", 36], ["Minorista", 24], ["Industria", 10]], margen: 25.9 },
    proc: { nivel: "fresco · procesado", formas: ["guacamole", "aceite"] },
    derivados: ["Guacamole", "Aceite de aguacate"]
  },
  "manzana-roja": {
    prod: { zonas: ["Importación — EE. UU.", "Importación — Chile"], zafra: "todo el año", sistema: "—", ciclo: "—", rendimiento: "—" },
    costos: { total: 80.4, margen: 17.7, partidas: [["FOB", 62], ["Flete y seguro", 14], ["Aranceles", 8], ["Distribución", 10], ["Otros", 6]] },
    post: { vida: 60, temp: "0–1 °C", hum: "90–95 %", manejo: "cadena de frío continua · atmósfera controlada", perdidas: 4.8 },
    com: { canales: [["Distribuidor", 40], ["Mayorista", 34], ["Minorista", 26]], margen: 18.2 },
    proc: { nivel: "fresco", formas: [] },
    derivados: []
  },
  "zapote": {
    prod: { zonas: ["San Cristóbal", "Baní", "Peravia"], zafra: "FEB–ABR", sistema: "secano", ciclo: "perenne", rendimiento: "9,000 ud/ha" },
    costos: { total: 48.8, margen: 27.2, partidas: [["Manejo del cultivo", 22], ["Cosecha", 24], ["Fertilizante", 14], ["Mano de obra", 16], ["Transporte", 14], ["Otros", 10]] },
    post: { vida: 10, temp: "12–15 °C", hum: "85–90 %", manejo: "cosecha en preclimaterio", perdidas: 11.4 },
    com: { canales: [["Mayorista", 52], ["Minorista", 36], ["Industria", 12]], margen: 22.8 },
    proc: { nivel: "fresco", formas: ["pulpa"] },
    derivados: ["Pulpa de zapote", "Batidos industriales"]
  },
  "huevo-blanco": {
    prod: { zonas: ["La Vega", "Santiago", "Monte Plata"], zafra: "todo el año", sistema: "intensivo", ciclo: 380, rendimiento: "300 huevos/ave/año" },
    costos: { total: 12.8, margen: 26.9, partidas: [["Alimento", 60], ["Pollona", 16], ["Sanidad", 6], ["Mano de obra", 6], ["Energía", 5], ["Otros", 7]] },
    post: { vida: 30, temp: "ambiente fresco", hum: "70–75 %", manejo: "recolección diaria · planchas", perdidas: 3.4 },
    com: { canales: [["Mayorista", 52], ["Minorista", 38], ["Industria", 10]], margen: 25.7 },
    proc: { nivel: "fresco", formas: ["huevo líquido pasteurizado"] },
    derivados: ["Huevo líquido pasteurizado"]
  },
  "huevo-blanco-empacado": {
    prod: { zonas: ["La Vega", "Santiago — plantas de empaque"], zafra: "todo el año", sistema: "intensivo", ciclo: 380, rendimiento: "300 huevos/ave/año" },
    costos: { total: 12.9, margen: 28.3, partidas: [["Huevo suelto", 78], ["Empaque", 10], ["Frío y logística", 6], ["Otros", 6]] },
    post: { vida: 30, temp: "15–20 °C", hum: "70–75 %", manejo: "clasificación por peso · cartones de 12 y 30", perdidas: 2.9 },
    com: { canales: [["Mayorista", 46], ["Minorista", 44], ["Industria", 10]], margen: 26.8 },
    proc: { nivel: "procesado", formas: ["cartón de 12 y 30"] },
    derivados: ["Mezclas de horno"]
  },
  "huevo-marron": {
    prod: { zonas: ["La Vega", "Moca"], zafra: "todo el año", sistema: "intensivo", ciclo: 380, rendimiento: "280 huevos/ave/año" },
    costos: { total: 14.3, margen: 27.4, partidas: [["Alimento", 60], ["Pollona", 16], ["Sanidad", 6], ["Mano de obra", 6], ["Energía", 5], ["Otros", 7]] },
    post: { vida: 30, temp: "ambiente fresco", hum: "70–75 %", manejo: "recolección diaria · planchas", perdidas: 3.5 },
    com: { canales: [["Mayorista", 50], ["Minorista", 40], ["Industria", 10]], margen: 26.1 },
    proc: { nivel: "fresco", formas: ["huevo líquido pasteurizado"] },
    derivados: ["Huevo líquido pasteurizado"]
  },
  "lechoza": {
    prod: { zonas: ["San Juan", "Azua", "Barahona"], zafra: "todo el año", sistema: "secano", ciclo: 300, rendimiento: "14,000 ud/ha" },
    costos: { total: 9.9, margen: 27.2, partidas: [["Semilla", 10], ["Manejo del cultivo", 20], ["Mano de obra", 28], ["Fertilizante", 14], ["Transporte", 18], ["Otros", 10]] },
    post: { vida: 14, temp: "7–10 °C", hum: "85–90 %", manejo: "cosecha en verde · empaque en espuma", perdidas: 10.9 },
    com: { canales: [["Mayorista", 48], ["Minorista", 34], ["Industria", 18]], margen: 23.4 },
    proc: { nivel: "fresco", formas: ["pulpa", "jugo"] },
    derivados: ["Pulpa de lechoza", "Batidos"]
  },
  "tamarindo-empacado": {
    prod: { zonas: ["San Juan", "Baní", "Azua"], zafra: "ENE–MAR", sistema: "secano", ciclo: "perenne", rendimiento: "10,000 kg/ha" },
    costos: { total: 40.7, margen: 27.1, partidas: [["Cosecha", 26], ["Beneficio y empaque", 24], ["Mano de obra", 18], ["Manejo del cultivo", 14], ["Transporte", 12], ["Otros", 6]] },
    post: { vida: 180, temp: "ambiente seco", hum: "60–65 %", manejo: "vaina → pulpa · bolsas de 1 lb", perdidas: 6.8 },
    com: { canales: [["Mayorista", 40], ["Minorista", 36], ["Industria", 24]], margen: 23.2 },
    proc: { nivel: "procesado", formas: ["pulpa", "jugo", "salsa"] },
    derivados: ["Pulpa de tamarindo", "Salsa de tamarindo"]
  },
  "pina": {
    prod: { zonas: ["Monte Plata", "Higüey", "San Juan"], zafra: "todo el año", sistema: "riego", ciclo: 540, rendimiento: "30,000 ud/ha" },
    costos: { total: 43.7, margen: 27.2, partidas: [["Material vegetal", 14], ["Fertilizante", 18], ["Mano de obra", 26], ["Riego", 10], ["Transporte", 14], ["Otros", 18]] },
    post: { vida: 21, temp: "7–10 °C", hum: "85–90 %", manejo: "despunte · cajas", perdidas: 8.7 },
    com: { canales: [["Exportación", 24], ["Mayorista", 36], ["Industria", 22], ["Minorista", 18]], margen: 24.6 },
    proc: { nivel: "fresco · procesado", formas: ["jugo", "trozos enlatados", "concentrado"] },
    derivados: ["Jugo de piña", "Piña enlatada"]
  },
  "pollo-gringo": {
    prod: { zonas: ["La Vega", "Moca", "Monte Plata"], zafra: "todo el año", sistema: "intensivo", ciclo: 45, rendimiento: "5.8 lb/ave" },
    costos: { total: 65.3, margen: 27.1, partidas: [["Alimento", 62], ["Pollito", 15], ["Sanidad", 7], ["Mano de obra", 6], ["Energía", 4], ["Otros", 6]] },
    post: { vida: 6, temp: "0–4 °C", hum: "80–85 %", manejo: "beneficio en planta · cadena de frío", perdidas: 3.8 },
    com: { canales: [["Mayorista", 54], ["Minorista", 36], ["Industria", 10]], margen: 25.4 },
    proc: { nivel: "fresco · procesado", formas: ["presas congeladas", "empanizado"] },
    derivados: ["Presas congeladas", "Pollo empanizado"]
  },
  "brocoli": {
    prod: { zonas: ["Constanza"], zafra: "todo el año", sistema: "riego", ciclo: 95, rendimiento: "12,000 lb/ha" },
    costos: { total: 52.3, margen: 27.1, partidas: [["Semilla", 16], ["Fertilizante", 20], ["Mano de obra", 28], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 14, temp: "0–2 °C", hum: "90–95 %", manejo: "cuartos fríos · hielo", perdidas: 10.2 },
    com: { canales: [["Mayorista", 44], ["Exportación", 24], ["Minorista", 22], ["Industria", 10]], margen: 25.3 },
    proc: { nivel: "fresco", formas: ["congelado"] },
    derivados: ["Brócoli congelado"]
  },
  "coliflor": {
    prod: { zonas: ["Constanza", "Jarabacoa"], zafra: "NOV–MAR", sistema: "riego", ciclo: 100, rendimiento: "13,000 lb/ha" },
    costos: { total: 58.7, margen: 27.2, partidas: [["Semilla", 16], ["Fertilizante", 20], ["Mano de obra", 28], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 16, temp: "0–2 °C", hum: "90–95 %", manejo: "hojas envolventes · cajas", perdidas: 9.8 },
    com: { canales: [["Mayorista", 48], ["Minorista", 36], ["Industria", 16]], margen: 23.7 },
    proc: { nivel: "fresco", formas: ["congelada"] },
    derivados: ["Coliflor congelada"]
  },
  "limon": {
    prod: { zonas: ["San Cristóbal", "Yaguate", "Baní"], zafra: "todo el año", sistema: "riego", ciclo: "perenne", rendimiento: "180,000 ud/ha/año" },
    costos: { total: 22.1, margen: 27.3, partidas: [["Manejo del cultivo", 22], ["Cosecha", 24], ["Fertilizante", 16], ["Mano de obra", 14], ["Transporte", 14], ["Otros", 10]] },
    post: { vida: 30, temp: "8–10 °C", hum: "85–90 %", manejo: "cajas", perdidas: 8.2 },
    com: { canales: [["Mayorista", 44], ["Industria", 24], ["Minorista", 26], ["Exportación", 6]], margen: 23.5 },
    proc: { nivel: "fresco · procesado", formas: ["jugo concentrado", "aceite esencial"] },
    derivados: ["Jugo de limón", "Aceite de limón"]
  },
  "rabano": {
    prod: { zonas: ["Constanza", "La Vega"], zafra: "todo el año", sistema: "riego", ciclo: 35, rendimiento: "10,000 lb/ha" },
    costos: { total: 20.1, margen: 27.2, partidas: [["Semilla", 14], ["Fertilizante", 20], ["Mano de obra", 30], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 12, temp: "0–4 °C", hum: "90–95 %", manejo: "atado con follaje", perdidas: 9.6 },
    com: { canales: [["Mayorista", 46], ["Minorista", 42], ["Industria", 12]], margen: 23.8 },
    proc: { nivel: "fresco", formas: ["encurtidos"] },
    derivados: ["Rábanos encurtidos"]
  },
  "mandarina": {
    prod: { zonas: ["Jarabacoa", "Constanza"], zafra: "OCT–ENE", sistema: "riego", ciclo: "perenne", rendimiento: "120,000 ud/ha/año" },
    costos: { total: 43.8, margen: 27.1, partidas: [["Manejo del cultivo", 22], ["Cosecha", 24], ["Fertilizante", 16], ["Mano de obra", 14], ["Transporte", 14], ["Otros", 10]] },
    post: { vida: 21, temp: "5–8 °C", hum: "90 %", manejo: "cajas", perdidas: 9.1 },
    com: { canales: [["Mayorista", 48], ["Minorista", 38], ["Industria", 14]], margen: 23.1 },
    proc: { nivel: "fresco", formas: ["jugo"] },
    derivados: ["Jugo de mandarina"]
  },
  "recaito": {
    prod: { zonas: ["La Vega", "San Cristóbal", "San Juan"], zafra: "todo el año", sistema: "riego", ciclo: 75, rendimiento: "14,000 ud/ha" },
    costos: { total: 49.5, margen: 27.1, partidas: [["Semilla", 16], ["Fertilizante", 18], ["Mano de obra", 30], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 7, temp: "0–4 °C", hum: "90–95 %", manejo: "manojos · rociado", perdidas: 11.7 },
    com: { canales: [["Mayorista", 46], ["Minorista", 38], ["Industria", 16]], margen: 23.5 },
    proc: { nivel: "fresco", formas: ["sofrito", "sazones"] },
    derivados: ["Sofrito envasado", "Sazón criollo"]
  },
  "zucchini": {
    prod: { zonas: ["Constanza", "La Vega"], zafra: "todo el año", sistema: "riego", ciclo: 60, rendimiento: "16,000 lb/ha" },
    costos: { total: 52.0, margen: 27.2, partidas: [["Semilla híbrida", 20], ["Fertilizante", 18], ["Mano de obra", 28], ["Riego", 10], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 10, temp: "5–8 °C", hum: "85–90 %", manejo: "cajas", perdidas: 9.9 },
    com: { canales: [["Mayorista", 46], ["Exportación", 18], ["Minorista", 26], ["Industria", 10]], margen: 24.3 },
    proc: { nivel: "fresco", formas: ["congelado"] },
    derivados: ["Zucchini congelado"]
  },
  "pitahaya": {
    prod: { zonas: ["Monte Plata", "Baní", "San Cristóbal"], zafra: "MAY–NOV", sistema: "riego", ciclo: 540, rendimiento: "15,000 ud/ha" },
    costos: { total: 84.8, margen: 27.1, partidas: [["Tutores y postes", 24], ["Material vegetal", 16], ["Mano de obra", 24], ["Fertilizante", 14], ["Riego", 10], ["Transporte", 12]] },
    post: { vida: 12, temp: "5–8 °C", hum: "85–90 %", manejo: "clasificación por brix · cajas individuales", perdidas: 9.9 },
    com: { canales: [["Exportación", 34], ["Mayorista", 32], ["Minorista", 24], ["Industria", 10]], margen: 26.4 },
    proc: { nivel: "fresco", formas: ["pulpa", "deshidratada"] },
    derivados: ["Pulpa de pitahaya", "Pitahaya deshidratada"]
  },
  "batata-asada": {
    prod: { zonas: ["Planta de proceso — Santo Domingo", "Materia prima — San Cristóbal", "Materia prima — Peravia"], zafra: "todo el año", sistema: "—", ciclo: "—", rendimiento: "92 % de conversión" },
    costos: { total: 74.1, margen: 21.3, partidas: [["Materia prima (batata)", 64], ["Proceso horneado", 14], ["Empaque", 10], ["Frío", 6], ["Distribución", 6]] },
    post: { vida: 12, temp: "2–4 °C", hum: "80–85 %", manejo: "horneado · empaque individual", perdidas: 4.6 },
    com: { canales: [["Minorista", 48], ["Mayorista", 34], ["Industria", 18]], margen: 22.7 },
    proc: { nivel: "procesado", formas: ["lista para consumir"] },
    derivados: ["Batata lista para microondas", "Purés"]
  },
  "fresa": {
    prod: { zonas: ["Constanza"], zafra: "NOV–ABR", sistema: "riego", ciclo: 150, rendimiento: "28,000 lb/ha" },
    costos: { total: 88.7, margen: 27.1, partidas: [["Plántulas", 26], ["Preparación y mulch", 18], ["Mano de obra", 24], ["Fertilizante", 12], ["Riego", 10], ["Transporte", 10]] },
    post: { vida: 5, temp: "0–2 °C", hum: "90–95 %", manejo: "cosecha diaria · bandejas", perdidas: 14.6 },
    com: { canales: [["Mayorista", 46], ["Minorista", 34], ["Industria", 20]], margen: 24.7 },
    proc: { nivel: "fresco · procesado", formas: ["pulpa", "mermelada"] },
    derivados: ["Mermelada de fresa", "Pulpa de fresa"]
  },
  "coco-de-agua": {
    prod: { zonas: ["Monte Plata", "Sabana Grande de Boyá", "Duarte"], zafra: "todo el año", sistema: "secano", ciclo: "perenne", rendimiento: "16,000 cocos/ha/año" },
    costos: { total: 35.0, margen: 27.1, partidas: [["Manejo de palma", 20], ["Cosecha", 28], ["Mano de obra", 16], ["Transporte", 22], ["Beneficio", 8], ["Otros", 6]] },
    post: { vida: 14, temp: "5–8 °C", hum: "85–90 %", manejo: "rebaje de corona · empaque", perdidas: 9.3 },
    com: { canales: [["Mayorista", 38], ["Minorista", 32], ["Industria", 24], ["Exportación", 6]], margen: 23.6 },
    proc: { nivel: "fresco · procesado", formas: ["agua embotellada", "gel"] },
    derivados: ["Agua de coco embotellada", "Gel de coco"]
  },
  "molondron": {
    prod: { zonas: ["San Juan", "Azua"], zafra: "DIC–ABR", sistema: "riego", ciclo: 80, rendimiento: "9,000 lb/ha" },
    costos: { total: 33.3, margen: 27.3, partidas: [["Semilla", 14], ["Fertilizante", 18], ["Mano de obra", 30], ["Riego", 12], ["Transporte", 14], ["Otros", 12]] },
    post: { vida: 10, temp: "7–10 °C", hum: "85 %", manejo: "atado · cajas", perdidas: 10.4 },
    com: { canales: [["Mayorista", 52], ["Minorista", 38], ["Industria", 10]], margen: 23.2 },
    proc: { nivel: "fresco", formas: ["deshidratado"] },
    derivados: ["Molondrón deshidratado"]
  },
  "habichuela-verde": {
    prod: { zonas: ["La Vega", "Constanza", "San Juan"], zafra: "todo el año", sistema: "riego", ciclo: 55, rendimiento: "11,000 lb/ha" },
    costos: { total: 26.0, margen: 27.2, partidas: [["Semilla", 16], ["Fertilizante", 18], ["Mano de obra", 30], ["Riego", 12], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 10, temp: "4–7 °C", hum: "90–95 %", manejo: "selección · bolsas", perdidas: 9.8 },
    com: { canales: [["Mayorista", 44], ["Minorista", 34], ["Exportación", 14], ["Industria", 8]], margen: 24.1 },
    proc: { nivel: "fresco", formas: ["congelada"] },
    derivados: ["Habichuela verde congelada"]
  },
  "habichuela-jacumelo": {
    prod: { zonas: ["San Juan", "Azua", "Bahoruco"], zafra: "DIC–MAR · AGO–NOV", sistema: "secano", ciclo: 85, rendimiento: "1,800 lb/ha" },
    costos: { total: 71.0, margen: 27.2, partidas: [["Semilla certificada", 26], ["Fertilizante", 18], ["Mano de obra", 24], ["Plagas", 12], ["Transporte", 12], ["Otros", 8]] },
    post: { vida: 270, temp: "ambiente seco", hum: "60–65 %", manejo: "trillado · sacos de 100 lb", perdidas: 5.6 },
    com: { canales: [["Mayorista", 46], ["Minorista", 38], ["Industria", 16]], margen: 23.4 },
    proc: { nivel: "fresco · procesado", formas: ["enlatadas", "precocida"] },
    derivados: ["Habichuelas enlatadas", "Sopas de bolsa"]
  },
  "habichuela-negra": {
    prod: { zonas: ["San Juan", "Importación — Centroamérica"], zafra: "todo el año", sistema: "secano", ciclo: 90, rendimiento: "1,700 lb/ha" },
    costos: { total: 40.9, margen: 23.1, partidas: [["Compra en grano", 52], ["Beneficio y limpieza", 14], ["Transporte", 14], ["Financiamiento", 12], ["Empaque", 8]] },
    post: { vida: 270, temp: "ambiente seco", hum: "60–65 %", manejo: "sacos de 100 lb", perdidas: 5.2 },
    com: { canales: [["Mayorista", 48], ["Minorista", 36], ["Industria", 16]], margen: 21.7 },
    proc: { nivel: "fresco · procesado", formas: ["enlatadas"] },
    derivados: ["Habichuelas negras enlatadas"]
  },
  "maiz": {
    prod: { zonas: ["San Juan", "Azua", "Monte Plata"], zafra: "FEB–AGO", sistema: "riego", ciclo: 115, rendimiento: "8,000 lb/ha" },
    costos: { total: 59.4, margen: 27.1, partidas: [["Semilla híbrida", 22], ["Fertilizante", 24], ["Mano de obra", 20], ["Riego", 10], ["Transporte", 12], ["Otros", 12]] },
    post: { vida: 240, temp: "ambiente seco (13 % humedad)", hum: "60–65 %", manejo: "secado · silos", perdidas: 5.4 },
    com: { canales: [["Industria", 46], ["Mayorista", 36], ["Minorista", 18]], margen: 22.6 },
    proc: { nivel: "procesado", formas: ["harina", "alimento balanceado"] },
    derivados: ["Harina de maíz", "Alimento balanceado", "Cereales"]
  },
  "carne-de-vaca": {
    prod: { zonas: ["Higüey", "San Juan", "Dajabón"], zafra: "todo el año", sistema: "pastoreo", ciclo: 900, rendimiento: "52 % de canal" },
    costos: { total: 192.0, margen: 24.4, partidas: [["Pasto y suplemento", 42], ["Sanidad", 10], ["Mano de obra", 16], ["Infraestructura", 12], ["Transporte", 8], ["Otros", 12]] },
    post: { vida: 21, temp: "0–2 °C", hum: "80–85 %", manejo: "maduración 7 días · envasado al vacío", perdidas: 3.9 },
    com: { canales: [["Mayorista", 48], ["Minorista", 32], ["Industria", 20]], margen: 24.4 },
    proc: { nivel: "fresco · procesado", formas: ["embutidos", "hamburguesa"] },
    derivados: ["Hamburguesas", "Embutidos", "Tasajo"]
  },
  "carne-de-cerdo": {
    prod: { zonas: ["La Vega", "Moca", "Santo Domingo Oeste"], zafra: "todo el año", sistema: "intensivo", ciclo: 185, rendimiento: "200 lb vivo/animal" },
    costos: { total: 105.5, margen: 26.9, partidas: [["Alimento", 65], ["Lechón", 12], ["Sanidad", 6], ["Mano de obra", 7], ["Energía", 4], ["Otros", 6]] },
    post: { vida: 12, temp: "0–2 °C", hum: "80–85 %", manejo: "beneficio en planta certificada · vacío", perdidas: 3.6 },
    com: { canales: [["Mayorista", 44], ["Industria", 32], ["Minorista", 24]], margen: 25.1 },
    proc: { nivel: "fresco · procesado", formas: ["jamón", "salchichón", "tocineta"] },
    derivados: ["Jamón ahumado", "Salchichón", "Tocineta"]
  },
  "chuleta": {
    prod: { zonas: ["Plantas de corte — La Vega", "Plantas de corte — Moca"], zafra: "todo el año", sistema: "—", ciclo: "—", rendimiento: "78 % de rendimiento" },
    costos: { total: 122.6, margen: 24.0, partidas: [["Materia prima", 68], ["Corte y deshuese", 12], ["Empaque", 8], ["Frío", 6], ["Distribución", 6]] },
    post: { vida: 14, temp: "0–2 °C", hum: "80–85 %", manejo: "corte en bandejas · atmósfera modificada", perdidas: 3.2 },
    com: { canales: [["Minorista", 44], ["Mayorista", 36], ["Industria", 20]], margen: 24.6 },
    proc: { nivel: "procesado", formas: ["ahumada", "empanizada"] },
    derivados: ["Chuleta ahumada", "Chuleta empanizada"]
  },
  "costilla-ahumada": {
    prod: { zonas: ["Plantas de proceso — Santo Domingo"], zafra: "todo el año", sistema: "—", ciclo: "—", rendimiento: "72 % de rendimiento" },
    costos: { total: 148.2, margen: 22.5, partidas: [["Materia prima", 66], ["Salmuera y ahumado", 14], ["Empaque", 8], ["Frío", 6], ["Distribución", 6]] },
    post: { vida: 60, temp: "0–4 °C", hum: "75–80 %", manejo: "curado en salmuera · envasado al vacío", perdidas: 2.8 },
    com: { canales: [["Minorista", 52], ["Mayorista", 30], ["Industria", 18]], margen: 23.4 },
    proc: { nivel: "procesado", formas: ["porciones envasadas"] },
    derivados: ["Porciones al vacío", "Trozos para frijoles"]
  },
  "sandia": {
    prod: { zonas: ["San Juan", "Azua", "Baní"], zafra: "DIC–ABR", sistema: "secano", ciclo: 85, rendimiento: "12,000 ud/ha" },
    costos: { total: 9.8, margen: 26.9, partidas: [["Semilla", 14], ["Mano de obra", 28], ["Fertilizante", 16], ["Plagas", 12], ["Transporte", 18], ["Otros", 12]] },
    post: { vida: 14, temp: "10–12 °C", hum: "80–85 %", manejo: "cosecha con 2 hojas · carga suave", perdidas: 8.4 },
    com: { canales: [["Mayorista", 52], ["Minorista", 38], ["Industria", 10]], margen: 22.9 },
    proc: { nivel: "fresco", formas: ["jugo"] },
    derivados: ["Jugo de sandía"]
  }
};

const QAS = {
  "cebolla-blanca": [
    ["¿Cuándo es la zafra?", "La zafra corre de noviembre a abril, con San José de Ocoa, el Cibao y San Juan como principales zonas productoras."],
    ["¿Qué pesa más en el costo?", "La mano de obra (28%), seguida del fertilizante (20%); el costo total ronda RD$ 26.80 por libra."],
    ["¿Cómo se conserva?", "Curada en campo, dura unas 4 semanas a 4–8 °C, con pérdidas en torno al 9%."]
  ],
  "name": [
    ["¿Se exporta?", "Sí — cerca del 10% de la colocación sale al exterior, además del mercado mayorista y minorista."],
    ["¿Por qué requiere tutores?", "El ñame es un bejuco: el tutoreo (12% del costo) sostiene la planta y protege el rendimiento de raíz."],
    ["¿Cómo se conserva?", "En curado y cajas ventiladas, dura hasta 60 días a 13–15 °C."]
  ],
  "batata": [
    ["¿Cuándo se produce?", "Todo el año, con San Cristóbal, Peravia y Azua como zonas principales bajo riego."],
    ["¿Qué derivados tiene?", "Batata asada lista, puré congelado y harina de batata — la industria toma cerca del 12% del volumen."],
    ["¿Qué pesa más en el costo?", "La mano de obra (28%) y la semilla (16%); el costo total ronda RD$ 63.40 por unidad."]
  ],
  "yautia-amarilla": [
    ["¿Cuándo se produce?", "Todo el año en secano, con San José de Ocoa, San Juan y el Bahoruco como zonas principales."],
    ["¿Se exporta?", "Sí — alrededor del 14% se coloca en mercados externos."],
    ["¿Cómo se conserva?", "En sacos ventilados a 7–10 °C, dura hasta 45 días con pérdidas cercanas al 9.6%."]
  ],
  "yuca": [
    ["¿Por qué su vida útil es tan corta?", "La raíz se deteriora en 3–5 días tras la cosecha: se desentierra a demanda y las raíces seleccionadas van enceradas."],
    ["¿Qué derivados tiene?", "Casabe, almidón, yuca congelada y tapioca — la industria absorbe cerca del 26% del volumen."],
    ["¿Qué pesa más en el costo?", "La mano de obra (30%) y el transporte (20%), agravados por la perecibilidad."]
  ],
  "jengibre": [
    ["¿Se exporta?", "Sí — cerca del 30% de la cosecha sale al exterior, uno de los rubros exportadores más fuertes de la canasta."],
    ["¿Qué derivados tiene?", "Jengibre deshidratado, ginger beer e infusiones."],
    ["¿Cuándo es la zafra?", "De diciembre a mayo, con Jarabacoa y Constanza como zonas productoras bajo riego."]
  ],
  "yautia-coco": [
    ["¿Cuándo se produce?", "Todo el año en secano, en San José de Ocoa y San Juan."],
    ["¿Cómo se conserva?", "En sacos ventilados a 7–10 °C, dura unas 6 semanas."],
    ["¿Cuál es el canal principal?", "El mayorista, con cerca de la mitad del volumen colocado."]
  ],
  "remolacha": [
    ["¿Cuándo es la zafra?", "De noviembre a abril, con Constanza y Jarabacoa como zonas productoras."],
    ["¿Qué derivados tiene?", "Remolacha encurtida y jugo de remolacha."],
    ["¿Cómo se conserva?", "Con el follaje cortado y en bolsas perforadas, dura unas 5 semanas a 0–4 °C."]
  ],
  "zanahoria": [
    ["¿Cuándo se produce?", "Todo el año en Constanza y Jarabacoa, bajo riego."],
    ["¿Qué derivados tiene?", "Jugo de zanahoria y zanahoria congelada rallada — la industria toma cerca del 14%."],
    ["¿Cómo se conserva?", "Lavada y en bolsas, dura un mes a 0–4 °C con humedad de 90–95%."]
  ],
  "papa": [
    ["¿Cuándo es la zafra?", "De diciembre a marzo, con Constanza, San José de Ocoa y San Juan como zonas principales."],
    ["¿Por qué la semilla pesa tanto en el costo?", "Usa semilla certificada importada (24% del costo), la partida más pesada del cultivo."],
    ["¿Cómo se conserva?", "Curada dos semanas, dura hasta 3 meses en bodega ventilada a 8–12 °C."]
  ],
  "berenjena": [
    ["¿Se exporta?", "Sí — cerca del 22% de la colocación sale al exterior."],
    ["¿Cuándo se produce?", "Todo el año en La Vega, Bonao y San Cristóbal, bajo riego."],
    ["¿Qué derivados tiene?", "Principalmente encurtidos y berenjena congelada."]
  ],
  "apio": [
    ["¿Cuándo se produce?", "Todo el año, exclusivamente en Constanza, bajo riego."],
    ["¿Qué derivados tiene?", "Sazón completo y sofrito industrial — la industria toma cerca del 12%."],
    ["¿Cómo se conserva?", "Lavado y atado, dura 3 semanas a 0–4 °C."]
  ],
  "puerro": [
    ["¿Dónde se produce?", "En Constanza, todo el año bajo riego, con ciclo de unos 130 días."],
    ["¿Cómo se conserva?", "Atado y en bolsas, dura 20 días a 0–4 °C."],
    ["¿Qué pesa más en el costo?", "La mano de obra (28%) y el fertilizante (20%); el costo ronda RD$ 57.40 por unidad."]
  ],
  "cebolla": [
    ["¿Cuándo es la zafra?", "De noviembre a abril, con San Juan, Ocoa y el Cibao como zonas principales."],
    ["¿Cuál es el canal principal?", "El mayorista, con cerca de la mitad del volumen; también abastece industria y exportación."],
    ["¿Cómo se conserva?", "Curada en campo, dura un mes a 4–8 °C."]
  ],
  "ajo": [
    ["¿Por qué es tan costoso su cultivo?", "La semilla es importada y representa el 34% del costo — la partida más pesada de la canasta."],
    ["¿Cuándo es la zafra?", "De marzo a abril, en Constanza, con ciclo de unos 180 días."],
    ["¿Cómo se conserva?", "Tejido y trenzado en bodega seca, dura hasta 4 meses a 0–4 °C."]
  ],
  "platano-maduro": [
    ["¿Cuándo se produce?", "Todo el año: el plátano es perenne y cada racimo tarda cerca de 12 meses."],
    ["¿Qué derivados tiene?", "Tostones de maduro y harina de plátano."],
    ["¿Cómo se conserva?", "Separado en dedos y en cajas, dura cerca de una semana a 18–22 °C."]
  ],
  "yautia-blanca": [
    ["¿Cuándo se produce?", "Todo el año en secano, en San José de Ocoa y San Juan."],
    ["¿Se exporta?", "Sí — alrededor del 14% de la colocación sale al exterior."],
    ["¿Cómo se conserva?", "En sacos ventilados a 7–10 °C, dura cerca de 6 semanas."]
  ],
  "platano-verde": [
    ["¿Qué derivados tiene?", "Tostones congelados, chips y mangú industrial — la industria toma cerca del 16%."],
    ["¿Cuándo se produce?", "Todo el año en Monte Plata, Hato Mayor y Azua; el cultivo es perenne."],
    ["¿Cómo se conserva?", "En cajas de dedos a 13–15 °C, dura cerca de 10 días."]
  ],
  "guineo-verde": [
    ["¿Cuándo se produce?", "Todo el año en Barahona, Azua y San Cristóbal, bajo secano."],
    ["¿Qué derivados tiene?", "Chips de guineo, su forma procesada principal."],
    ["¿Cómo se conserva?", "En cajas de dedos a 13–15 °C, dura unos 10 días, con pérdidas cercanas al 10.6%."]
  ],
  "repollo": [
    ["¿Cuándo se produce?", "Todo el año en Constanza, Jarabacoa y San Juan, bajo riego."],
    ["¿Qué derivados tiene?", "Repollo encurtido y ensaladas listas — la industria toma cerca del 16%."],
    ["¿Cómo se conserva?", "Con el tallo cortado y en malla, dura hasta 40 días a 0–4 °C."]
  ],
  "auyama": [
    ["¿Cuándo es la zafra?", "De diciembre a abril, en San Juan, Azua y Baní, bajo secano."],
    ["¿Por qué dura tanto en almacenamiento?", "Curada al sol y guardada en bodega seca a 10–15 °C, dura hasta 3 meses."],
    ["¿Qué derivados tiene?", "Puré de auyama y sopas cremas industriales."]
  ],
  "aji-morron": [
    ["¿Se exporta?", "Sí — es el canal más fuerte junto al mayorista: cerca del 28% sale al exterior."],
    ["¿Cuándo se produce?", "Todo el año en La Vega, Constanza y Mao, bajo riego."],
    ["¿Qué derivados tiene?", "Paprika y pasta de ají, a partir del fruto deshidratado."]
  ],
  "aji-cubanela": [
    ["¿Cuál es el canal principal?", "El mayorista (44%), con presencia fuerte de la industria de sazones (16%)."],
    ["¿Cuándo se produce?", "Todo el año en La Vega, Mao y San Juan, bajo riego."],
    ["¿Qué derivados tiene?", "Sazón criollo y ají deshidratado."]
  ],
  "lechuga-rizada": [
    ["¿Por qué es tan perecedera?", "Su vida útil es de unos 10 días y exige cuarto frío inmediato a 0–4 °C; las pérdidas rondan el 11.8%."],
    ["¿Quién la compra?", "Mayoristas y el canal minorista — hoteles y restaurantes — en partes casi iguales."],
    ["¿Dónde se produce?", "En Constanza, todo el año, con ciclo de 75 días."]
  ],
  "lechuga-coco": [
    ["¿Dónde se produce?", "En Constanza, todo el año, bajo riego."],
    ["¿Cómo se conserva?", "En cuarto frío a 0–4 °C, dura unos 10 días; las pérdidas rondan el 11.5%."],
    ["¿Qué derivados tiene?", "Ensaladas de bolsa listas para consumir."]
  ],
  "pepino": [
    ["¿Cuándo se produce?", "Todo el año en La Vega, San Juan y Constanza, con ciclo corto de 65 días."],
    ["¿Qué derivados tiene?", "Pepinillos en vinagre — la industria toma cerca del 20% del volumen."],
    ["¿Cómo se conserva?", "En cajas a 10–12 °C, dura unas 2 semanas."]
  ],
  "tomate": [
    ["¿Cuándo es la zafra?", "De noviembre a abril, con Azua, San Juan y Baní como zonas principales."],
    ["¿Qué pesa más en el costo?", "La mano de obra (28%) y la semilla híbrida (20%); el costo ronda RD$ 37.90 por libra."],
    ["¿Qué derivados tiene?", "Pasta, salsa y tomate enlatado — la industria absorbe cerca del 24% del volumen."]
  ],
  "coco-seco": [
    ["¿Qué derivados tiene?", "Aceite, leche de coco y copra — la industria toma cerca del 34%, el mayor peso industrial de la canasta."],
    ["¿Cuándo se produce?", "Todo el año: la palma es perenne y produce en todo el calendario."],
    ["¿Cuál es el canal principal?", "El mayorista (40%), seguido de cerca por la industria."]
  ],
  "aguacate": [
    ["¿Cuándo es la zafra?", "De septiembre a enero, con Baní, Ocoa y Miches como zonas principales."],
    ["¿Se exporta?", "Sí — cerca del 30% de la cosecha sale al exterior."],
    ["¿Qué derivados tiene?", "Guacamole y aceite de aguacate."]
  ],
  "manzana-roja": [
    ["¿De dónde viene la manzana?", "Es un producto importado: procede de EE. UU. y Chile, y se mueve todo el año."],
    ["¿Por qué su margen es menor?", "La estructura es de importación — FOB, flete y aranceles concentran el 84% del costo — y el margen del canal es más delgado que en la oferta local."]
  ],
  "zapote": [
    ["¿Cuándo es la zafra?", "De febrero a abril, en San Cristóbal, Baní y Peravia, bajo secano."],
    ["¿Qué derivados tiene?", "Pulpa de zapote para batidos industriales."],
    ["¿Por qué se cosecha en preclimaterio?", "El fruto madura después de cosechado: se corta en verde para resistir el manejo y madurar en destino."]
  ],
  "huevo-blanco": [
    ["¿Qué pesa más en el costo?", "El alimento balanceado (60%) — la partida dominante de toda la cadena avícola."],
    ["¿Cómo se conserva?", "Recolectado a diario y puesto en planchas, dura un mes en ambiente fresco; las pérdidas son mínimas (3.4%)."],
    ["¿Cuál es el canal principal?", "El mayorista, con cerca de la mitad del volumen."]
  ],
  "huevo-blanco-empacado": [
    ["¿Qué diferencia al huevo empacado?", "Pasa por planta de empaque: se clasifica por peso y va en cartones de 12 y 30 unidades."],
    ["¿Qué pesa más en su costo?", "El huevo suelto (78%) — el empaque y la logística en frío agregan el resto."],
    ["¿Cuál es el canal principal?", "Mayorista y minorista en partes casi iguales: colmados y supermercados."]
  ],
  "huevo-marron": [
    ["¿Qué pesa más en el costo?", "El alimento balanceado (60%), igual que en el resto de la línea avícola."],
    ["¿Cuál es el canal principal?", "El mayorista (50%), con fuerte presencia minorista."],
    ["¿Cómo se conserva?", "Un mes en ambiente fresco, con recolección diaria."]
  ],
  "lechoza": [
    ["¿Cuándo se produce?", "Todo el año en San Juan, Azua y Barahona; cada planta tarda unos 10 meses en producir."],
    ["¿Qué derivados tiene?", "Pulpa de lechoza para batidos — la industria toma cerca del 18%."],
    ["¿Cómo se conserva?", "Cosechada en verde y empacada en espuma, dura 2 semanas a 7–10 °C."]
  ],
  "tamarindo-empacado": [
    ["¿Qué diferencia al tamarindo empacado?", "Ya viene beneficiado: la vaina se convierte en pulpa y se empaca en bolsas de 1 lb."],
    ["¿Cuándo es la zafra?", "De enero a marzo, en San Juan, Baní y Azua, bajo secano."],
    ["¿Cómo se conserva?", "Hasta 6 meses en ambiente seco — una de las vidas útiles más largas de la canasta."]
  ],
  "pina": [
    ["¿Cuándo se cosecha?", "Todo el año: la plantación tarda unos 18 meses en producir por primera vez."],
    ["¿Se exporta?", "Sí — cerca del 24% sale al exterior, y la industria toma otro 22%."],
    ["¿Qué derivados tiene?", "Jugo, trozos enlatados y concentrado."]
  ],
  "pollo-gringo": [
    ["¿Cuánto dura el ciclo de engorde?", "Unos 45 días desde el pollito hasta el peso de faena (~5.8 lb por ave)."],
    ["¿Qué pesa más en el costo?", "El alimento (62%), seguido del pollito (15%) — típico de la producción intensiva."],
    ["¿Cómo se conserva?", "Beneficiado en planta y en cadena de frío a 0–4 °C, dura cerca de una semana."]
  ],
  "brocoli": [
    ["¿Se exporta?", "Sí — cerca del 24% de la colocación sale al exterior."],
    ["¿Dónde se produce?", "En Constanza, todo el año, con enfriamiento inmediato a 0–2 °C."],
    ["¿Qué derivados tiene?", "Brócoli congelado."]
  ],
  "coliflor": [
    ["¿Cuándo es la zafra?", "De noviembre a marzo, en Constanza y Jarabacoa."],
    ["¿Cómo se conserva?", "Con hojas envolventes y en cajas, dura unas 2 semanas a 0–2 °C."],
    ["¿Qué derivados tiene?", "Coliflor congelada."]
  ],
  "limon": [
    ["¿Cuándo se produce?", "Todo el año: la limonera es perenne y produce en todo el calendario."],
    ["¿Qué derivados tiene?", "Jugo concentrado y aceite esencial — la industria toma cerca del 24%."],
    ["¿Dónde se produce?", "En San Cristóbal, Yaguate y Baní, bajo riego."]
  ],
  "rabano": [
    ["¿Cuál es el ciclo más corto de la canasta?", "El rábano se cosecha a los 35 días — el cultivo más rápido del catálogo."],
    ["¿Cómo se conserva?", "Atado con follaje, dura 12 días a 0–4 °C."],
    ["¿Qué derivados tiene?", "Rábanos encurtidos."]
  ],
  "mandarina": [
    ["¿Cuándo es la zafra?", "De octubre a enero, en Jarabacoa y Constanza."],
    ["¿Qué derivados tiene?", "Jugo de mandarina."],
    ["¿Cómo se conserva?", "En cajas a 5–8 °C, dura unas 3 semanas."]
  ],
  "recaito": [
    ["¿Para qué se usa principalmente?", "Es la base del sofrito criollo: la industria lo procesa en sofritos envasados y sazones (16%)."],
    ["¿Cómo se conserva?", "En manojos rociados, dura apenas una semana a 0–4 °C."],
    ["¿Dónde se produce?", "En La Vega, San Cristóbal y San Juan, todo el año."]
  ],
  "zucchini": [
    ["¿Cuándo se produce?", "Todo el año en Constanza y La Vega, con ciclo corto de 60 días."],
    ["¿Se exporta?", "Sí — cerca del 18% de la colocación sale al exterior."],
    ["¿Qué derivados tiene?", "Zucchini congelado."]
  ],
  "pitahaya": [
    ["¿Se exporta?", "Sí — es el canal principal: cerca del 34% de la cosecha sale al exterior."],
    ["¿Por qué su costo de instalación es alto?", "Requiere tutores y postes (24% del costo), además del material vegetal certificado."],
    ["¿Cómo se conserva?", "Clasificada por brix y en cajas individuales, dura 12 días a 5–8 °C."]
  ],
  "batata-asada": [
    ["¿Qué diferencia a la batata asada?", "Es un producto procesado: batata horneada y empacada lista para consumir, con 92% de conversión."],
    ["¿Qué pesa más en el costo?", "La materia prima (64%) — la batata fresca que sirve de insumo."],
    ["¿Quién la compra?", "Supermercados y el canal minorista (48%), seguidos del mayorista y los hoteles."]
  ],
  "fresa": [
    ["¿Cuándo es la zafra?", "De noviembre a abril, exclusivamente en Constanza."],
    ["¿Por qué es tan perecedera?", "Dura apenas 5 días: se cosecha a diario en bandejas y va directo a frío a 0–2 °C; las pérdidas rondan el 14.6%."],
    ["¿Qué derivados tiene?", "Mermelada y pulpa de fresa."]
  ],
  "coco-de-agua": [
    ["¿Qué derivados tiene?", "Agua de coco embotellada y gel de coco — la industria toma cerca del 24%."],
    ["¿Cuándo se produce?", "Todo el año, en palmares de Monte Plata, Boyá y Duarte."],
    ["¿Cómo se conserva?", "Con la corona rebajada y empacado, dura 2 semanas a 5–8 °C."]
  ],
  "molondron": [
    ["¿Cuándo es la zafra?", "De diciembre a abril, en San Juan y Azua, bajo riego."],
    ["¿Para qué se usa?", "Es ingrediente del sofrito; también se deshidrata para sazones."],
    ["¿Cómo se conserva?", "Atado y en cajas, dura unos 10 días a 7–10 °C."]
  ],
  "habichuela-verde": [
    ["¿Cuándo se produce?", "Todo el año en La Vega, Constanza y San Juan, con ciclo corto de 55 días."],
    ["¿Se exporta?", "Sí — cerca del 14% de la colocación sale al exterior."],
    ["¿Qué derivados tiene?", "Habichuela verde congelada."]
  ],
  "habichuela-jacumelo": [
    ["¿Cuándo es la zafra?", "Dos ciclos: diciembre–marzo y agosto–noviembre, en San Juan, Azua y Bahoruco."],
    ["¿Cómo se conserva?", "Trillada y en sacos de 100 lb, dura hasta 9 meses en ambiente seco."],
    ["¿Qué derivados tiene?", "Habichuelas enlatadas y sopas de bolsa."]
  ],
  "habichuela-negra": [
    ["¿Se produce en el país?", "Parcialmente: la oferta se completa con importación de Centroamérica, lo que modera el margen del canal."],
    ["¿Cómo se conserva?", "En sacos de 100 lb, hasta 9 meses en ambiente seco."],
    ["¿Qué derivados tiene?", "Habichuelas negras enlatadas."]
  ],
  "maiz": [
    ["¿Quién compra el maíz?", "La industria de alimento balanceado (46%) es el canal dominante de la cosecha."],
    ["¿Cómo se conserva?", "Secado a 13% de humedad y silado, dura hasta 8 meses."],
    ["¿Qué derivados tiene?", "Harina de maíz, alimento balanceado y cereales."]
  ],
  "carne-de-vaca": [
    ["¿Cuánto dura el ciclo de ceba?", "Entre 24 y 30 meses hasta el peso de faena, bajo pastoreo en Higüey, San Juan y Dajabón."],
    ["¿Cómo se conserva?", "Madurada 7 días y envasada al vacío, dura 3 semanas a 0–2 °C."],
    ["¿Qué derivados tiene?", "Hamburguesas, embutidos y tasajo."]
  ],
  "carne-de-cerdo": [
    ["¿Cuánto dura el ciclo de engorde?", "Unos 185 días desde el lechón hasta los ~200 lb de peso vivo."],
    ["¿Qué pesa más en el costo?", "El alimento (65%) — la partida dominante de la producción intensiva."],
    ["¿Qué derivados tiene?", "Jamón ahumado, salchichón y tocineta — la industria toma cerca del 32%."]
  ],
  "chuleta": [
    ["¿De dónde proviene?", "Es un corte del cerdo nacional: se procesa en plantas de corte de La Vega y Moca."],
    ["¿Qué pesa más en el costo?", "La materia prima (68%) — el cerdo en canal que sirve de insumo."],
    ["¿Cómo se conserva?", "En bandejas con atmósfera modificada, dura 2 semanas a 0–2 °C."]
  ],
  "costilla-ahumada": [
    ["¿En qué consiste el proceso?", "La costilla se cura en salmuera y se ahuma, y luego se envasa al vacío: dura hasta 2 meses refrigerada."],
    ["¿Qué pesa más en el costo?", "La materia prima (66%), seguida de la salmuera y el ahumado (14%)."],
    ["¿Quién la compra?", "Supermercados y el canal minorista (52%), con hoteles e industria (18%)."]
  ],
  "sandia": [
    ["¿Cuándo es la zafra?", "De diciembre a abril, en San Juan, Azua y Baní, bajo secano."],
    ["¿Cómo se manipula?", "Con carga suave y cosecha dejando dos hojas: el golpe degrada la fruta; dura 2 semanas a 10–12 °C."],
    ["¿Qué derivados tiene?", "Jugo de sandía, su forma procesada principal."]
  ]
};

const FUENTES = {
  "name": "https://supermercadosrd.com/grupos/name",
  "batata": "https://supermercadosrd.com/grupos/batata",
  "yautia-amarilla": "https://supermercadosrd.com/grupos/yautia",
  "yautia-coco": "https://supermercadosrd.com/grupos/yautia",
  "yuca": "https://supermercadosrd.com/grupos/yuca",
  "guineo-verde": "https://supermercadosrd.com/grupos/guineo-verde",
  "platano-maduro": "https://supermercadosrd.com/grupos/platano",
  "platano-verde": "https://supermercadosrd.com/grupos/platano",
  "papa": "https://supermercadosrd.com/grupos/papa-fresca",
  "yautia-blanca": "https://supermercadosrd.com/grupos/yautia",
  "auyama": "https://supermercadosrd.com/grupos/auyama",
  "cebolla-blanca": "https://supermercadosrd.com/grupos/cebolla",
  "cebolla": "https://supermercadosrd.com/grupos/cebolla",
  "aguacate": "https://supermercadosrd.com/grupos/aguacate",
  "coco-seco": "https://supermercadosrd.com/grupos/coco-seco",
  "manzana-roja": "https://supermercadosrd.com/grupos/manzana",
  "zapote": "https://supermercadosrd.com/grupos/zapote",
  "lechoza": "https://supermercadosrd.com/grupos/lechosa",
  "pina": "https://supermercadosrd.com/grupos/pina",
  "limon": "https://supermercadosrd.com/grupos/limon",
  "mandarina": "https://supermercadosrd.com/grupos/mandarina",
  "sandia": "https://supermercadosrd.com/grupos/sandia",
  "fresa": "https://supermercadosrd.com/grupos/fresa-fresca",
  "recaito": "https://supermercadosrd.com/grupos/hierbas-frescas",
  "aji-morron": "https://supermercadosrd.com/grupos/ajies-dulces",
  "aji-cubanela": "https://supermercadosrd.com/grupos/ajies-dulces",
  "ajo": "https://supermercadosrd.com/grupos/ajo",
  "apio": "https://supermercadosrd.com/grupos/apio",
  "berenjena": "https://supermercadosrd.com/grupos/berenjena",
  "brocoli": "https://supermercadosrd.com/grupos/brocoli",
  "lechuga-rizada": "https://supermercadosrd.com/grupos/lechuga",
  "lechuga-coco": "https://supermercadosrd.com/grupos/lechuga",
  "maiz": "https://supermercadosrd.com/grupos/maiz-fresco",
  "molondron": "https://supermercadosrd.com/grupos/molondron",
  "rabano": "https://supermercadosrd.com/grupos/rabano",
  "remolacha": "https://supermercadosrd.com/grupos/remolacha-cruda",
  "repollo": "https://supermercadosrd.com/grupos/repollo",
  "habichuela-verde": "https://supermercadosrd.com/grupos/vainita",
  "zanahoria": "https://supermercadosrd.com/grupos/zanahoria",
  "zucchini": "https://supermercadosrd.com/grupos/zucchini"
};

const H = {
  fmtRD(v) { return "RD$ " + v.toFixed(2); },
  fmtN(v) { return (+v).toFixed(1); },
  pct(v, dec) { return (v >= 0 ? "+" : "") + v.toFixed(dec === undefined ? 1 : dec) + "%"; },
  cat(id) { return D.categorias.find(c => c.id === id); },
  ficha(id) { return FICHAS[id] || null; },
  fuente(id) { return FUENTES[id] || null; },
  producto(id) { return D.productos.find(p => p.id === id); },
  productosDe(cat) { return D.productos.filter(p => p.cat === cat); },
  actual(p) { return p.serie[p.serie.length - 1]; },
  previo(p) { return p.serie[p.serie.length - 2]; },
  deltaSem(p) { return this.actual(p) - this.previo(p); },
  idxProducto(p) { const f = p.serie[0], l = this.actual(p); return +(l / f * 100).toFixed(1); },
  tendencia(p) {
    const f = p.serie[0], l = this.actual(p);
    if (l > f * 1.05) return "ascendente";
    if (l < f * 0.95) return "descendente";
    return "estable";
  },
  claseVol(v) { return v < 4 ? "baja" : v < 8 ? "moderada" : "alta"; },
  primaIntl(p) { return +((this.actual(p) - p.intl) / p.intl * 100).toFixed(1); },
  mediaMercados(p, ms) {
    const m = (ms || D.mercados).map(x => p.mercados[x.id][2]);
    if (!m.length) return null;
    return +(m.reduce((a, b) => a + b, 0) / m.length).toFixed(2);
  },
  volMedia() { return +(D.productos.reduce((a, p) => a + p.vol, 0) / D.productos.length).toFixed(1); },
  primaMedia() { return +(D.productos.reduce((a, p) => a + this.primaIntl(p), 0) / D.productos.length).toFixed(1); },
  indiceGeneral() {
    const n = D.categorias[0].idx.length, out = [];
    for (let i = 0; i < n; i++) out.push(+(D.categorias.reduce((a, c) => a + c.idx[i], 0) / D.categorias.length).toFixed(1));
    return out;
  },
  varYTD(serie) { return +((serie[serie.length - 1] / serie[0] - 1) * 100).toFixed(1); },
  preciosTomate() {
    return D.competidores.map(c => c.precio).concat(D.mercados.map(m => H.producto("tomate").mercados[m.id][2]));
  },
  percentil(v, arr) {
    const below = arr.filter(x => x < v).length;
    return Math.round(below / (arr.length - 1) * 100);
  },
  rango(v, arr) { return arr.filter(x => x < v).length + 1; }
};
