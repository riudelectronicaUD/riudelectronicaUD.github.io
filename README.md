# Reconocimientos Académicos

Aplicación web desarrollada para visualizar los mejores promedios académicos y los estudiantes que obtuvieron matrícula de honor, organizada por periodos académicos. Basado en la página realizada en sharepoint que muestra la misma información

---

## Descripción

Esta página permite consultar de forma clara y organizada:

- Top 10 estudiantes por semestre
- Estudiantes con matrícula de honor
- Información segmentada por periodos académicos


---

## Estructura del Proyecto

---

## Tecnologías utilizadas

- HTML5
- Bootstrap 5.1.3
- CSS3 (Grid y Flexbox)
- JavaScript (Vanilla JS)
- JSON como fuente de datos

---

## Estructura de datos
La base de datos que contiene a los mejores estudiantes se realizó en un archivo JSON 

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
