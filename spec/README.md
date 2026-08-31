# Negoria — Especificaciones

> Las **entradas conceptuales** de cada sistema del Modelo de Sistema Viable Empresarial (BVSM).

Cada entrada define el problema funcional que el sistema resuelve, su definición, su alcance y sus interfaces con los demás sistemas. **Ninguna entrada especifica implementación** — eso corresponde a una etapa posterior, cuando cada sistema se materialice.

---

## Metodología

1. **Modelar el ciclo de control empresarial** con independencia de cualquier implementación.
2. **Formalizar los componentes funcionales** que hacen viable una empresa.
3. **Mapear sistemas concretos** a esas funciones, para analizar, ingeniar y mejorar continuamente la viabilidad del negocio.

## Entradas

| Nivel VSM | Sistema | Entrada | Estado |
| --- | --- | --- | --- |
| S5 · Política | Sistema de Política Empresarial | [politica/spec.md](politica/spec.md) | próximamente |
| S4 · Inteligencia | Observatorio de Producción | [observatorio-produccion/spec.md](observatorio-produccion/spec.md) | próximamente |
| S4 · Inteligencia | **Mercado Observatorio** | [mercado-observatorio/spec.md](mercado-observatorio/spec.md) | **operativo** |
| S4 · Inteligencia | Sistema de Conocimiento | [conocimiento/spec.md](conocimiento/spec.md) | próximamente |
| S3 · Control | Sistema de Control | [control/spec.md](control/spec.md) | próximamente |
| S3 · Contabilidad | Sistema de Recursos | [recursos/spec.md](recursos/spec.md) | próximamente |
| S3 · Auditoría | Sistema de Auditoría | [auditoria/spec.md](auditoria/spec.md) | próximamente |
| S2 · Coordinación | Sistema de Coordinación | [coordinacion/spec.md](coordinacion/spec.md) | próximamente |
| S1 · Operaciones | Sistema de Operaciones | [operaciones/spec.md](operaciones/spec.md) | próximamente |

Cada sub-sistema vive en [`modulo/<sistema>/`](../modulo/politica/index.html) — su `index.html` es la página de descripción del sistema: qué es, alcance, interfaces y estado, sin función alguna. Su implementación vivirá en esa misma carpeta.

## Formato de entrada

Toda entrada responde a las mismas cinco preguntas:

1. **Problema funcional** — qué problema debe resolver todo negocio viable en este nivel.
2. **Definición** — qué es el sistema que lo resuelve.
3. **Alcance** — qué cubre y qué explícitamente no cubre.
4. **Interfaces** — qué recibe y qué entrega a los demás sistemas.
5. **Estado** — dónde está hoy: entrada conceptual, en diseño, operativo.

## Referencias

- [Negoria — el plan](../README.md)
- [Autoregia — Personal Viable System Model](https://github.com/) — el concepto original para la agencia personal.
- Stafford Beer, *Brain of the Firm* — el Modelo de Sistema Viable (VSM).
