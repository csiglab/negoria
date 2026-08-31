# Sistema de Operaciones (SO)

> **Nivel VSM: Sistema 1 — Operaciones.**

## Problema funcional

Todo negocio viable debe producir el valor que justifica su existencia:

> **¿Cómo ejecuta una empresa, de forma confiable y repetible, las transacciones que crean valor — vender, producir, servir — y captura lo aprendido en cada una?**

Las operaciones son la razón de ser del sistema: cada uno de los demás niveles existe para que estas funcionen mejor cada día.

## Definición

Un sistema de operaciones organiza las unidades de valor del negocio — cada una con su propio ciclo local de hacer y medir:

- **Ventas** — pipeline, clientes, cotizaciones, cierres.
- **Producción / abastecimiento** — órdenes, insumos, calidad, tiempos.
- **Servicio** — entrega, postventa, satisfacción.
- **Captura operativa** — cada transacción deja registro (→ Recursos) y sus procesos quedan documentados (→ Conocimiento).

## Alcance

**Dentro:**

- Las unidades operativas de valor y su ejecución transaccional.
- El registro sistemático de cada transacción como evento.
- La mejora local de cada unidad (su propio mini-lazo de regulación).

**Fuera:**

- Priorizar entre unidades o cargar trabajo (Control, S3).
- Consolidar los registros transaccionales en estados financieros (Recursos, S3).
- Observar el mercado externo (Mercado Observatorio, S4).

## Interfaces

| Dirección | Sistema | Qué fluye |
| --- | --- | --- |
| Recibe | Control (S3) | El trabajo comprometido, ordenado en el tiempo |
| Recibe | Coordinación (S2) | Disparadores a tiempo |
| Entrega | Recursos (S3) | Transacciones: ventas, compras, consumos |
| Entrega | Mercado Observatorio (S4) | Observaciones primarias del mercado propio |

## Estado

**Entrada conceptual · próximamente.** Sin implementación. El negocio ya opera (existen ventas, producción y servicio); esta entrada formaliza la unidad operativa como objeto del sistema para que sus transacciones alimenten al resto del modelo.
