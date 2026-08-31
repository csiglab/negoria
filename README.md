# Negoria

> Negoria es un sistema de gestión empresarial — un **Modelo de Sistema Viable Empresarial (BVSM)**, por sus siglas en inglés *Business Viable System Model*.

> Gestionar una empresa es la praxis de construir y sostener una jerarquía regulatoria —percepción, ideación, formación de objetivos, acción y reflexión— para que los procesos operativos evolucionen de rutinas implícitas y sin examinar a estructuras explícitas, inteligibles y dirigibles sistemáticamente.

> Un sistema de gestión empresarial es una arquitectura regulatoria recursiva mediante la cual una empresa monitorea, organiza y dirige sus procesos operativos, cognitivos y de mercado, convirtiendo rutinas implícitas en operaciones explícitas y adaptativamente controladas.

Negoria descompone la gestión empresarial en un conjunto de sistemas cooperantes, cada uno mapeado a un nivel del **Modelo de Sistema Viable (VSM)** de Stafford Beer. En esta etapa el proyecto es **solo plan**: cada sistema tiene una entrada conceptual en [`spec/`](spec/README.md); las implementaciones llegarán después. El único sistema ya materializado es el [Mercado Observatorio](modulo/market-monitor/index.html).

> **Empieza aquí:** [`index.html`](index.html) — la página de entrada del proyecto.

---

## Premisa

Toda empresa viable puede entenderse como un **sistema de control adaptativo** operando dentro de un entorno cambiante (mercados, competidores, regulación, proveedores).

En lugar de diseñar herramientas de gestión desde la intuición o la convención, el BVSM parte de identificar la arquitectura funcional fundamental que toda empresa debe implementar para permanecer viable en el tiempo.

La metodología consta de tres etapas:

1. **Modelar el ciclo de control empresarial** con independencia de cualquier implementación particular.
2. **Formalizar los componentes funcionales** que hacen viable una empresa: percepción de mercado, decisión, coordinación, ejecución, regulación, aprendizaje e identidad.
3. **Mapear sistemas concretos** —observatorios de mercado, sistemas contables, planificadores, tableros de KPIs, CRMs, documentación— a esas funciones, para analizar, ingeniar y mejorar continuamente la viabilidad del negocio.

El modelo formal sirve como **arquitectura de referencia**: no prescribe herramientas ni flujos específicos, sino que ofrece un marco de principios para evaluar si cada función de control esencial está presente, identificar deficiencias y mejorar sistemáticamente el conjunto.

---

## Formulación

| **Parte** | **Descripción** | **Nivel (VSM)** | **Sistema** | **Estado** |
| --- | --- | --- | --- | --- |
| **Política** | Define dirección de largo plazo, identidad, misión, principios, restricciones y compromisos del negocio. | **Sistema 5 – Política** | Sistema de Política Empresarial | [Entrada](spec/politica/spec.md) · próximamente |
| **Inteligencia** | Observa lo adelantado y lo actual: la base productiva —bienes, servicios y modelos de interacción entidad → cliente— cuyo movimiento luego reverbera en el mercado, y el intercambio mismo. | **Sistema 4 – Inteligencia** | Observatorio de Producción | [Entrada](spec/observatorio-produccion/spec.md) · próximamente |
| **Inteligencia** | Escanea el intercambio: precios, plazas, competidores — el estado presente del mercado. | **Sistema 4 – Inteligencia** | **Mercado Observatorio** ([market-monitor](modulo/market-monitor/index.html)) | **Operativo** |
| **Conocimiento** | Almacena conocimiento explícito, procesos, referencias y registros de decisión; memoria externa de la empresa. | **Sistema 4 – Inteligencia** | Sistema de Conocimiento | [Entrada](spec/conocimiento/spec.md) · próximamente |
| **Control** | Fija prioridades, programa, gestiona la carga y dirige el día a día del negocio. | **Sistema 3 – Control** | Sistema de Control | [Entrada](spec/control/spec.md) · próximamente |
| **Recursos** | Registra el uso de recursos (dinero, tiempo, inventario, personas) y monitorea restricciones. | **Sistema 3 – Contabilidad** | Sistema de Recursos | [Entrada](spec/recursos/spec.md) · próximamente |
| **Auditoría** | Ejecuta verificaciones diagnósticas, detecta desviaciones, evalúa desempeño y asegura cumplimiento. | **Sistema 3 – Auditoría** | Sistema de Auditoría | [Entrada](spec/auditoria/spec.md) · próximamente |
| **Coordinación** | Resuelve conflictos, armoniza calendarios, sincroniza áreas y garantiza disparadores oportunos (recordatorios, eventos). | **Sistema 2 – Coordinación** | Sistema de Coordinación | [Entrada](spec/coordinacion/spec.md) · próximamente |
| **Operaciones** | Produce el valor: ventas, producción, servicio — los procesos que justifican la existencia del negocio. | **Sistema 1 – Operaciones** | Sistema de Operaciones | [Entrada](spec/operaciones/spec.md) · próximamente |

---

## Layout del repositorio

```
negoria/
├── README.md               # este documento (el plan)
├── index.html              # página de entrada / índice del proyecto
├── modulo/            # una carpeta por sub-sistema: su index.html es la
│   │                       #   página de descripción; aquí vivirá su implementación
│   ├── market-monitor/           # Mercado Observatorio · Bremontix (operativo)
│   ├── politica/                 # S5 — Sistema de Política Empresarial
│   ├── observatorio-produccion/  # S4 — Observatorio de Producción
│   ├── mercado-observatorio/     # S4 — página de descripción del MO
│   ├── conocimiento/             # S4 — Sistema de Conocimiento
│   ├── control/                  # S3 — Sistema de Control
│   ├── recursos/                 # S3 — Sistema de Recursos
│   ├── auditoria/                # S3 — Sistema de Auditoría
│   ├── coordinacion/             # S2 — Sistema de Coordinación
│   └── operaciones/              # S1 — Sistema de Operaciones
└── spec/                   # entradas conceptuales de cada sistema (sin implementación)
    ├── README.md           # índice de entradas + metodología
    ├── politica/spec.md
    ├── observatorio-produccion/spec.md
    ├── mercado-observatorio/spec.md
    ├── conocimiento/spec.md
    ├── control/spec.md
    ├── recursos/spec.md
    ├── auditoria/spec.md
    ├── coordinacion/spec.md
    └── operaciones/spec.md
```

---

## Sistema materializado

- **[Mercado Observatorio](modulo/market-monitor/index.html)** — el componente de **Inteligencia** (VSM Sistema 4): instrumento de observación, representación y comparación de mercados agrícolas. Transforma observaciones dispersas de precios en representaciones de estado, dinámicas y artefactos epistémicos derivados. Ver su [especificación conceptual](modulo/market-monitor/spec.md) y su [especificación de diseño](modulo/market-monitor/design.md).

---

## Referencias

- [Autoregia — Personal Viable System Model](https://github.com/) — el concepto original para la agencia personal, del cual Negoria replica el enfoque para la empresa.
- Stafford Beer, *Brain of the Firm* — el Modelo de Sistema Viable (VSM).
- [Mercado Observatorio · spec conceptual](modulo/market-monitor/spec.md)
