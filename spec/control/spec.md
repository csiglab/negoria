# Sistema de Control (S3)

> **Nivel VSM: Sistema 3 — Control.**

## Problema funcional

Todo negocio viable debe convertir la dirección en trabajo ejecutado:

> **¿Cómo decide una empresa qué hacer ahora, qué hacer después y qué no hacer — con la capacidad que realmente tiene — y garantiza que lo decidido ocurra en el tiempo prometido?**

Sin control, la política queda en intención: la carga real excede la capacidad, lo urgente desplaza a lo importante y los compromisos se incumplen silenciosamente.

## Definición

Un sistema de control es el instrumento de dirección del día a día: mantiene el inventario de trabajo del negocio (iniciativas, proyectos, rutinas), lo prioriza contra los objetivos de la política, lo calendariza contra la capacidad real y dirige la ejecución.

- **Inventario de trabajo** — todo lo comprometido, en un solo lugar.
- **Priorización** — el orden explícito derivado de la política (S5).
- **Calendarización** — el compromiso de trabajo con el tiempo, con detección de conflictos y sobrecarga.
- **Seguimiento** — qué avanzó, qué se estancó, qué se canceló.

## Alcance

**Dentro:**

- Planes del período (semana, mes, trimestre) y su cumplimiento.
- Asignación de trabajo contra capacidad.
- Detección de conflictos de agenda y sobrecarga.

**Fuera:**

- La ejecución misma del trabajo (Operaciones, S1).
- El registro de recursos consumidos (Recursos, S3).
- Los disparadores automáticos de tiempo (Coordinación, S2).
- La evaluación de resultados (Auditoría, S3).

## Interfaces

| Dirección | Sistema | Qué fluye |
| --- | --- | --- |
| Recibe | Política (S5) | Objetivos, prioridades y restricciones del período |
| Recibe | Recursos (S3) | Capacidad y disponibilidad real |
| Recibe | Auditoría (S3) | Desviaciones que exigen replanificar |
| Entrega | Operaciones (S1) | El trabajo comprometido, ordenado en el tiempo |
| Entrega | Coordinación (S2) | Eventos y plazos a disparar |

## Estado

**Entrada conceptual · próximamente.** Sin implementación. Candidato de materialización: planificador con grafo de dependencias y calendarización (análogo al AOOS de Autoregia).
