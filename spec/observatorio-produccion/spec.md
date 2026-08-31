# Observatorio de Producción (OP)

> **Nivel VSM: Sistema 4 — Inteligencia.**

## Problema funcional

Todo negocio viable debe observar lo que ocurre **antes** del intercambio:

> **¿Cómo observa una empresa la base productiva — de bienes y de servicios — y su propia forma de operar con el cliente, cuya dinámica aún no se manifiesta en el mercado pero luego reverbera en él?**

El mercado solo muestra el resultado. Cuando el precio ya se movió, la causa lleva meses en marcha: una siembra, una capacidad instalada, un canal que dejó de responder. Quien solo observa el mercado observa el pasado.

## Definición

El **Observatorio de Producción** es un solo sistema con **tres objetivos**:

1. **Producción de bienes** — quién produce qué, cuánto, cuándo: productores, áreas, ciclos, cosechas, volúmenes proyectados, inventarios futuros, importaciones.
2. **Producción de servicios** — ofertantes de servicios, capacidades, disponibilidad, tiempos de entrega, cuellos de botella.
3. **Modelos de interacción entidad → cliente** — la forma de operar en el mercado: canales, puntos de contacto, transacciones e interacciones, preferencias, respuesta a ofertas. Es parte de la operación (S1), pero por su relevancia se **eleva a este nivel**: la relación con el cliente es un objeto de inteligencia, no solo una rutina.

En conjunto, el observatorio es el **indicador adelantado**: su movimiento anticipa lo que después se manifestará en precios y disponibilidad — la superficie que el [Mercado Observatorio](../mercado-observatorio/spec.md) observa en el presente.

## Alcance

**Dentro:**

- Registro de la base productiva: productores de bienes y de servicios, capacidades, ciclos, volúmenes proyectados.
- Eventos que afectan la producción: clima, sanidad, regulación, logística, importaciones.
- Registro de la interacción entidad → cliente: clientes, canales, puntos de contacto, historial de interacciones y respuesta.
- Series adelantadas por dominio: qué viene, en qué volumen, cuándo.

**Fuera:**

- El intercambio y sus precios (Mercado Observatorio, S4).
- La transacción misma y la ejecución de la venta (Operaciones, S1).
- Las decisiones sobre lo observado (Política, S5; Control, S3).

## Interfaces

| Dirección | Sistema | Qué fluye |
| --- | --- | --- |
| Recibe | Entorno productivo | Observaciones: producción, capacidades, eventos |
| Recibe | Operaciones (S1) | Interacciones entidad → cliente registradas |
| Entrega | Política (S5) | Lecturas adelantadas para la estrategia |
| Entrega | Control (S3) | Proyecciones de oferta y demanda para planificar |
| Entrega | Mercado Observatorio (S4) | Contexto de anticipación para interpretar el intercambio |
| Entrega | Operaciones (S1) | Modelos de interacción que funcionan — y que no |

## Estado

**Entrada conceptual · próximamente.** Sin implementación. Es el análogo empresarial del PEOS de Autoregia — el órgano sensorial del mundo productivo y de la relación propia con el cliente.
