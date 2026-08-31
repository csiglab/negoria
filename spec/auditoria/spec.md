# Sistema de Auditoría (SA)

> **Nivel VSM: Sistema 3 — Auditoría.**

## Problema funcional

Todo negocio viable debe confrontar lo ocurrido contra lo planeado:

> **¿Cómo detecta una empresa, antes de que sea tarde, que se está desviando de sus objetivos, sus estándares o sus políticas — y convierte cada desviación en un aprendizaje que cambia el sistema?**

Sin auditoría, las desviaciones se descubren cuando ya son crisis: márgenes erosionados, clientes perdidos, procesos degradados.

## Definición

Un sistema de auditoría es la función diagnóstica que verifica el desempeño del negocio contra sus estándares y produce las desviaciones y aprendizajes que realimentan al resto del modelo:

- **KPIs** — las métricas vitales por área, con metas y umbrales.
- **Revisiones periódicas** — semanal, mensual, trimestral: qué se prometió, qué ocurrió, por qué.
- **Detección de desviaciones** — comparación sistemática contra plan, política y estándares.
- **Cierre del lazo** — cada desviación produce o un ajuste operativo (→ Control) o una adaptación de política (→ Política).

## Alcance

**Dentro:**

- Definición y cálculo de KPIs sobre los registros de Recursos (S3) y operativos.
- El ritual de revisión y su registro de hallazgos.
- La clasificación de desviaciones: ruido, problema operativo, problema de política.

**Fuera:**

- La corrección operativa (Control, S3).
- El cambio de dirección (Política, S5).
- El registro del aprendizaje (Conocimiento, S4 — aunque lo alimenta).

## Interfaces

| Dirección | Sistema | Qué fluye |
| --- | --- | --- |
| Recibe | Recursos (S3) | Series y estados de recursos |
| Recibe | Política (S5) | Estándares y metas contra los cuales auditar |
| Entrega | Control (S3) | Desviaciones que exigen replanificar |
| Entrega | Política (S5) | Evidencia de desempeño para adaptar la estrategia |
| Entrega | Conocimiento (S4) | Aprendizajes y registros de revisión |

## Estado

**Entrada conceptual · próximamente.** Sin implementación. Candidato de materialización: tablero de KPIs con revisiones periódicas versionadas; el Mercado Observatorio ya provee las series del entorno.
