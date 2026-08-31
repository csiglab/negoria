# Sistema de Conocimiento (SC)

> **Nivel VSM: Sistema 4 — Inteligencia (memoria).**

## Problema funcional

Todo negocio viable debe recordar lo que ya sabe:

> **¿Cómo garantiza una empresa que sus procesos, decisiones y aprendizajes sobrevivan a las personas que los produjeron, y que quien los necesite pueda encontrarlos en el momento en que los necesita?**

Sin memoria externa, la empresa re-aprende lo mismo cada ciclo, repite errores resueltos y depende del conocimiento tácito de individuos irremplazables.

## Definición

Un sistema de conocimiento es la **memoria externa** de la empresa: el lugar único donde vive el conocimiento explícito, escrito, estructurado y recuperable.

- **Procesos** — cómo se hace cada cosa, paso a paso.
- **Registros de decisión** — qué se decidió, cuándo, por qué y con qué evidencia.
- **Referencias** — documentos, contratos, plantillas, normativa.
- **Aprendizajes** — post-mortems, lecciones, adaptaciones (alimentado por Auditoría).

## Alcance

**Dentro:**

- Corpus único de conocimiento con estructura, versionado y búsqueda a texto completo.
- Ciclo de vida del documento: borrador → vigente → archivado.
- Registros de decisión como objeto de primera clase.

**Fuera:**

- Los datos operativos del negocio (eso es Recursos, S3).
- Las observaciones del mercado (eso es Inteligencia/Mercado Observatorio, S4).
- La política misma (eso es Política, S5 — aunque se archive y versione aquí).

## Interfaces

| Dirección | Sistema | Qué fluye |
| --- | --- | --- |
| Recibe | Política (S5) | Documentos de política a archivar y versionar |
| Recibe | Auditoría (S3) | Desviaciones y aprendizajes a registrar |
| Entrega | Control (S3) | Procesos vigentes que el día a día ejecuta |
| Entrega | Operaciones (S1) | Instructivos y referencias para trabajar |
| Entrega | Todos | Búsqueda y recuperación para cualquier sistema |

## Estado

**Entrada conceptual · próximamente.** Sin implementación. Candidatos de materialización: corpus versionado con búsqueda (Notion/Obsidian), o un sistema propio alineado con el resto de Negoria.
