# Reconocimientos Académicos

Aplicación web desarrollada para visualizar los mejores promedios académicos y los estudiantes que obtuvieron matrícula de honor, organizada por periodos académicos.

---

## Descripción

Esta página permite consultar de forma clara y organizada:

- Top 10 estudiantes por semestre
- Estudiantes con matrícula de honor
- Información segmentada por periodos académicos

El diseño está inspirado en interfaces institucionales universitarias, priorizando claridad, accesibilidad y organización de la información.

---

## Estructura del Proyecto

---

## Tecnologías utilizadas

- HTML5
- CSS3 (Grid y Flexbox)
- JavaScript (Vanilla JS)
- JSON como fuente de datos

---

## Estructura de datos

El archivo `data.json` contiene dos conjuntos principales:

```json
{
  "estudiantes": [
    {
      "nombre": "Juan Pérez",
      "codigo": "20231005001",
      "semestre": "20231"
    }
  ],
  "matriculas": [
    {
      "nombre": "Ana Gómez",
      "codigo": "20241005002",
      "semestre": "20241"
    }
  ]
}
