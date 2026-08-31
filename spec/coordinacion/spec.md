# Sistema de Coordinación (S2)

> **Nivel VSM: Sistema 2 — Coordinación.**

## Problema funcional

Todo negocio viable debe mantener sus partes sincronizadas:

> **¿Cómo se aseguran las áreas de una empresa de no chocar entre sí — agendas, recursos compartidos, compromisos — y de que cada compromiso con el tiempo se dispare a quien le corresponde, a tiempo?**

Sin coordinación, las unidades operativas optimizan por separado y el conjunto colisiona: doble compromiso de recursos, fechas que se pisan, recordatorios que nadie recibió.

## Definición

Un sistema de coordinación es la función anti-choque y de disparo del negocio:

- **Calendario unificado** — el tiempo compartido de la empresa, con visibilidad de carga por área.
- **Detección de conflictos** — dobles reservas, sobrecargas, dependencias que se vencen.
- **Notificaciones** — disparadores externos oportunos: recordatorios, vencimientos, eventos.
- **Reglas de armonización** — políticas operativas compartidas que resuelven conflictos sin escalar a Control.

## Alcance

**Dentro:**

- El calendario como objeto del sistema, sus conflictos y resoluciones.
- El motor de notificaciones y sus suscripciones.
- La sincronización con calendarios externos (bidireccional).

**Fuera:**

- Decidir qué trabajo se programa (Control, S3 — lo entrega ya decidido).
- Ejecutar lo disparado (Operaciones, S1).

## Interfaces

| Dirección | Sistema | Qué fluye |
| --- | --- | --- |
| Recibe | Control (S3) | Trabajo comprometido con el tiempo |
| Entrega | Operaciones (S1) | Disparadores a tiempo: recordatorios, vencimientos |
| Entrega | Control (S3) | Conflictos detectados que exigen replanificar |

## Estado

**Entrada conceptual · próximamente.** Sin implementación. Candidato de materialización: calendario unificado con detección de conflictos y sincronización bidireccional con Google Calendar (el patrón del AOOS de Autoregia, a escala de negocio).
