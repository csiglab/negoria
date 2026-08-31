# Mercado Observatorio — Sistema de Inteligencia de Mercado

> **Nivel VSM: Sistema 4 — Inteligencia.** · **Estado: operativo.**

## Problema funcional

Todo negocio viable debe observar su entorno mejor que sus competidores:

> **¿Cómo puede un participante del mercado transformar observaciones dispersas de precios en una representación coherente del mercado, su estado actual, su evolución en el tiempo y su posición relativa frente a competidores y otros mercados?**

## Definición

El **Mercado Observatorio** (market-monitor) es el instrumento de inteligencia de Negoria: un sistema de observación, representación y comparación de mercados agrícolas en la República Dominicana.

El sistema colecta observaciones de precios de mercado y las transforma en:

- **Representaciones de estado** — dónde está el mercado hoy.
- **Representaciones dinámicas** — cómo se movió y hacia dónde tiende.
- **Artefactos epistémicos derivados** — índices, volatilidad, rangos entre plazas, posicionamiento competitivo.

**Frontera con su complemento:** el Mercado Observatorio observa el **intercambio** — precios, plazas, competidores: el indicador *actual* de lo que ya ocurrió. Su hermano, el [Observatorio de Producción](../observatorio-produccion/spec.md), observa lo **adelantado** — la base productiva de bienes y servicios y los modelos de interacción entidad → cliente, cuya dinámica luego reverbera en este mercado. Uno mira la causa; el otro, el efecto.

## Alcance

**Dentro:**

- Observación de precios (nacional e internacional).
- Representación de estado y dinámica por categoría y producto.
- Benchmark competitivo y comparación entre plazas.
- Método epistémico documentado (qué artefacto responde a qué pregunta).

**Fuera:**

- La decisión estratégica sobre esas lecturas (Política, S5).
- La programación de compras/ventas que se derive (Control, S3).
- La transacción misma (Operaciones, S1).
- La observación de la base productiva y de la interacción entidad → cliente — eso es el [Observatorio de Producción](../observatorio-produccion/spec.md) (S4), su complemento aguas arriba.

## Interfaces

| Dirección | Sistema | Qué fluye |
| --- | --- | --- |
| Recibe | Entorno | Observaciones de precios de mercado |
| Entrega | Política (S5) | Lecturas del entorno para la estrategia |
| Entrega | Control (S3) | Referencias de precio y tendencia para planificar |
| Entrega | Auditoría (S3) | Series contra las cuales detectar desviaciones |

## Estado

**Operativo.** Implementación en [`market-monitor/`](../../modulo/market-monitor/index.html) — ver su [especificación conceptual](../../modulo/market-monitor/spec.md) y su [especificación de diseño](../../modulo/market-monitor/design.md). Es el análogo empresarial del PEOS de Autoregia: el órgano sensorial del mundo externo.
