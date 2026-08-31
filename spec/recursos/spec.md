# Sistema de Recursos (SR)

> **Nivel VSM: Sistema 3 — Contabilidad.**

## Problema funcional

Todo negocio viable debe saber qué tiene y qué consume:

> **¿Cómo conoce una empresa, en todo momento, el estado de sus recursos — dinero, tiempo, inventario, personas — y detecta a tiempo cuándo una restricción amenaza la viabilidad?**

Sin contabilidad, la empresa vuela a ciegas: el efectivo se agota sin aviso, el inventario se descompensa, la capacidad real nunca coincide con la supuesta.

## Definición

Un sistema de recursos es el registro estructurado de los recursos del negocio y de su uso en el tiempo:

- **Financiero** — flujo de caja, cuentas por cobrar/pagar, márgenes.
- **Inventario** — materias primas, producto terminado, activos.
- **Tiempo y personas** — capacidad, horas, carga por área.
- **Compromisos** — obligaciones futuras que hoy restringen la libertad del negocio.

## Alcance

**Dentro:**

- Registro transaccional de entrada/salida de recursos.
- Estado consolidado por tipo de recurso, con series en el tiempo.
- Visibilidad de restricciones: qué se agota, cuándo, con qué margen.

**Fuera:**

- La decisión de asignación (Control, S3 — aunque consume estos registros).
- La verificación de desempeño contra metas (Auditoría, S3).
- La observación de precios externos para valorizar (Mercado Observatorio, S4).

## Interfaces

| Dirección | Sistema | Qué fluye |
| --- | --- | --- |
| Recibe | Operaciones (S1) | Transacciones: ventas, compras, consumos |
| Entrega | Control (S3) | Capacidad y disponibilidad real para planificar |
| Entrega | Auditoría (S3) | Series y estados para verificar desviaciones |
| Entrega | Política (S5) | Salud financiera como insumo estratégico |

## Estado

**Entrada conceptual · próximamente.** Sin implementación. Candidato de materialización: registro unificado con esquema compartido de eventos (análogo al PRS de Autoregia — el registro contable como objeto técnico persistente).
