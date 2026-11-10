# 🎓 Ingeniería Electrónica - Sitio web para la comunidad académica

Portal interactivo del programa de Ingeniería Electrónica de la Universidad Distrital Francisco José de Caldas. Su página principal permite consultar y visualizar los mejores promedios académicos y las matrículas de honor por período, reconociendo a los estudiantes destacados del programa.

Adicionalmente, el sitio cuenta con dos botones que redirigen a páginas independientes con información sobre prácticas empresariales y trámites y procedimientos académicos.

Finalmente, el dominio contiene una ruta denominada `pagina_desercion`, que alberga una página web con información relacionada con la deserción estudiantil. Es importante aclarar que no existe un botón desde las demás páginas que redirija directamente a esta sección.

---

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Instalación](#-instalación)
- [Uso](#-uso)
- [Datos](#-datos)
- [Componentes](#-componentes)
- [Personalización](#-personalización)
- [Flujo de Actualización](#-flujo-de-actualización)
- [Responsividad](#-responsividad)
- [Recursos Utilizados](#-recursos-utilizados)
- [Contribuir](#-contribuir)

---

## ✨ Características

✅ **Carrusel dinámico:** navegación visual entre las secciones principales del sitio.

✅ **Mejores promedios académicos:** visualización de los estudiantes destacados por período académico.

✅ **Acordeones interactivos:** organización de la información académica mediante secciones desplegables.

✅ **Matrículas de Honor:** dos tablas independientes que presentan los estudiantes reconocidos en los períodos correspondientes.

✅ **Integración con Excel:** lectura automática de los datos desde un archivo `.xlsx`, sin necesidad de modificar manualmente el código JavaScript para actualizar los registros existentes.

✅ **Diseño responsivo:** compatible con computadores, tabletas y dispositivos móviles.

✅ **Estilos modernos:** identidad visual institucional basada en el color vinotinto, sombras, bordes redondeados y transiciones.

✅ **Múltiples secciones:** acceso a información de prácticas empresariales y trámites académicos.

✅ **Página de deserción estudiantil:** sección independiente disponible mediante su propia dirección URL.

---

## 🛠 Tecnologías

| Tecnología | Uso |
|---|---|
| **HTML5** | Estructura de las páginas web |
| **CSS3** | Diseño visual, estilos y responsividad |
| **JavaScript (Vanilla)** | Lógica e interactividad del sitio |
| **Excel (.xlsx)** | Almacenamiento y actualización de los datos académicos |
| **SheetJS (XLSX.js)** | Lectura y procesamiento de archivos Excel desde JavaScript |
| **Bootstrap 5.1.3** | Componentes y sistema de cuadrícula |
| **GitHub Pages** | Publicación y alojamiento del sitio web |
| **Unsplash** | Imágenes utilizadas en el carrusel |

---

## 📁 Estructura del Proyecto

```text
riudelectronicaUD.github.io/
│
├── index.html                         # Página principal
├── styles.css                         # Estilos de la página principal
├── script.js                          # Lectura del Excel y lógica principal
├── Mejores estudiantes.xlsx            # Base de datos académica
│
├── logo.png                           # Logo institucional
├── logo.webp                          # Logo en formato WebP
├── 1.jpg                              # Imagen local
├── 2.jpg                              # Imagen local
│
├── pagina_practicas/
│   ├── practicas.html                 # Página de prácticas empresariales
│   ├── style.css                      # Estilos de prácticas
│   └── [logos de empresas]            # IBM, Huawei, Nokia, etc.
│
├── pagina_desercion/
│   ├── index.html                     # Página de deserción estudiantil
│   └── style.css                      # Estilos de la página
│
├── Tramitesyprocedimientos/
│   └── index.html                     # Página de trámites académicos
│
└── README.md                          # Documentación del proyecto
```

---

## 🚀 Instalación

### Opción 1: Clonar el repositorio

```bash
git clone https://github.com/riudelectronicaUD/riudelectronicaUD.github.io.git

cd riudelectronicaUD.github.io
```

### Opción 2: Descargar ZIP

1. Ingresar al repositorio de GitHub.
2. Hacer clic en `Code`.
3. Seleccionar `Download ZIP`.
4. Extraer el contenido en el equipo.

---

## 💻 Uso

El sitio web es una aplicación estática publicada mediante GitHub Pages. No requiere un servidor backend para presentar la información.

La página principal utiliza JavaScript para leer el archivo Excel y construir dinámicamente las tablas de promedios y matrículas de honor.

### Servidor local (Recomendado para desarrollo)

Para probar los cambios antes de publicarlos, se recomienda utilizar un servidor local.

**Con Python 3:**

```bash
python -m http.server 8000
```

Luego ingresar a:

```text
http://localhost:8000
```

Es importante ejecutar el servidor desde la carpeta donde se encuentran `index.html` y `Mejores estudiantes.xlsx`.

---

## 📊 Datos

### Archivo principal: `Mejores estudiantes.xlsx`

La página principal obtiene los datos académicos desde un archivo Excel ubicado en el repositorio.

El archivo es leído mediante la biblioteca SheetJS, que permite procesar las hojas de cálculo directamente desde JavaScript.

La carga se realiza mediante:

```javascript
fetch('Mejores estudiantes.xlsx')
    .then(res => res.arrayBuffer())
    .then(buffer => {
        const workbook = XLSX.read(buffer, {
            type: 'array'
        });
    });
```

### 1. Mejores Promedios Académicos

Los estudiantes se organizan en hojas independientes por período académico.

Para cada período, el sistema:

- Lee los registros de la hoja correspondiente.
- Filtra los estudiantes cuyo estado sea `ACTIVO`.
- Ordena los registros de mayor a menor según el promedio.
- Selecciona los diez estudiantes con mejores resultados.
- Construye las tablas dinámicamente en la página principal.

**Columnas utilizadas:**

| Columna | Función |
|---|---|
| `ESTADO` | Identificación de estudiantes activos |
| `PROMEDIO` | Cálculo y ordenamiento de los resultados |
| `COD. ESTUDIANTE` | Código del estudiante |
| `NOMBRE` | Nombre del estudiante |

Actualmente, el bloque de promedios configurado en la página principal contiene los siguientes períodos:

- 2025-1
- 2025-3
- 2026-1

### 2. Matrículas de Honor

El archivo Excel cuenta con dos hojas independientes para almacenar la información de los estudiantes reconocidos con matrícula de honor.

| Hoja de Excel | Sección de la página |
|---|---|
| `Matriculas de honor 2025-3` | Matrículas de Honor 2022-1 al 2025-1 |
| `Matriculas de honor 2026-1` | Matrículas de Honor 2023-1 al 2026-1 |

Cada hoja utiliza los siguientes encabezados:

| Columna | Información |
|---|---|
| `Periodo de ingreso` | Nombre del estudiante |
| `Codigo` | Código del estudiante |
| `Nombre` | Período de ingreso |

**Nota:** los nombres de las columnas corresponden a la estructura actualmente utilizada por el archivo Excel y su lectura en `script.js`.

El JavaScript identifica cada hoja y carga sus registros en la tabla HTML correspondiente, sin mezclar la información de ambas pestañas.

### Cómo actualizar los datos

Para actualizar la información académica:

1. Abrir el archivo `Mejores estudiantes.xlsx`.
2. Actualizar los registros de las hojas correspondientes.
3. Conservar los nombres de las pestañas y los encabezados utilizados por el sistema.
4. Guardar el archivo Excel.
5. Subir la versión actualizada al repositorio de GitHub, reemplazando el archivo anterior.
6. Verificar que GitHub Pages haya publicado los cambios.
7. Recargar la página para consultar la información actualizada.

**Importante:** para que los cambios sean visibles en el sitio publicado, el archivo Excel actualizado debe estar disponible en la ubicación desde la que se carga `index.html`.

---

## 🧩 Componentes

### 1. Página Principal (`index.html`)

Es la página de entrada del sitio web y contiene:

- Barra de navegación con el logo institucional.
- Carrusel con dos diapositivas principales.
- Sección de Mejores Promedios Académicos.
- Sección independiente de Matrículas de Honor.
- Acordeones para desplegar las tablas de información.
- Accesos a las páginas de prácticas empresariales y trámites académicos.

### 2. Script Principal (`script.js`)

Contiene la lógica de funcionamiento de la página principal.

**Funcionalidades:**

- Carga el archivo Excel mediante `fetch()`.
- Procesa las hojas de cálculo con SheetJS.
- Identifica las hojas de períodos académicos.
- Filtra estudiantes activos.
- Ordena los promedios académicos.
- Selecciona los diez mejores resultados por período.
- Identifica las dos hojas de Matrículas de Honor.
- Renderiza las tablas dinámicamente.
- Gestiona la apertura y cierre de los acordeones.

### 3. Estilos Globales (`styles.css`)

Define la apariencia visual de la página principal.

**Características:**

- Paleta de colores institucional: vinotinto (`#8C1919`).
- Recuadros independientes para las secciones principales.
- Botones desplegables con transiciones.
- Tablas con encabezados destacados.
- Sombras y bordes redondeados.
- Diseño adaptable a diferentes tamaños de pantalla.

### 4. Prácticas Empresariales (`pagina_practicas/`)

Página dedicada a la información de prácticas empresariales.

Contiene:

- Información y beneficios de las prácticas.
- Enlaces a portales de empleo.
- Dashboard de Power BI.
- Logos de empresas aliadas.
- Información de organizaciones del sector tecnológico e industrial.

### 5. Deserción Estudiantil (`pagina_desercion/`)

Página independiente que contiene información relacionada con la deserción estudiantil.

Contiene:

- Estrategias de apoyo y retención estudiantil.
- Dashboard de Power BI.
- Información para el seguimiento de indicadores de deserción.

Esta página se encuentra disponible mediante su propia ruta dentro del dominio y no cuenta con un botón de acceso desde la página principal.

### 6. Trámites Académicos (`Tramitesyprocedimientos/`)

Página destinada a orientar a los estudiantes sobre los diferentes procedimientos académicos.

Contiene:

- Índice interactivo de trámites.
- Guías de procesos académicos.
- Enlaces directos a formularios.
- Información sobre requisitos y procedimientos.

---

## 🎨 Personalización

### Cambiar colores corporativos

La página utiliza principalmente el color vinotinto:

```css
:root {
    --vinotinto: #8C1919;
}
```

Para cambiar el color principal, se puede modificar esta variable en `styles.css`.

### Agregar nuevos períodos académicos

Para incorporar nuevos períodos de mejores promedios, es necesario:

1. Crear una nueva hoja en el archivo Excel con el nombre del período.
2. Mantener los encabezados utilizados por las hojas de promedios.
3. Agregar el período al objeto `bloques` en `script.js`.
4. Crear el contenedor correspondiente en `index.html`.

Ejemplo:

```javascript
const bloques = {
    bloque4: ["2025-1", "2025-3", "2026-1"],
    bloque5: ["2026-2", "2027-1", "2027-3"]
};
```

En `index.html` se debe agregar el contenedor:

```html
<button class="accordion">
    Mejores Promedios 2026-2 al 2027-3
</button>

<div class="panel">
    <div class="grid" id="bloque5"></div>
</div>
```

### Actualizar Matrículas de Honor

Para actualizar las matrículas de honor:

1. Abrir la hoja correspondiente en Excel.
2. Agregar o modificar los registros.
3. Conservar los encabezados y el nombre de la pestaña.
4. Guardar y publicar el archivo actualizado en GitHub.

Si se requiere agregar una tercera tabla, será necesario crear una nueva hoja de Excel, un nuevo identificador HTML y su respectiva conexión en `script.js`.

### Cambiar el logo

1. Reemplazar el archivo `logo.png` o `logo.webp`.
2. Conservar el nombre utilizado en el HTML.
3. Verificar que la nueva imagen tenga dimensiones apropiadas.

---

## 🔄 Flujo de Actualización

El funcionamiento general de la página principal es el siguiente:

```text
1. Actualizar el archivo Excel
              ↓
2. Guardar y subir el archivo a GitHub
              ↓
3. GitHub Pages publica los cambios
              ↓
4. El usuario ingresa a la página web
              ↓
5. JavaScript solicita el archivo Excel
              ↓
6. SheetJS procesa las hojas de cálculo
              ↓
7. Se organizan los datos por período
              ↓
8. Se generan las tablas dinámicamente
              ↓
9. CSS aplica los estilos visuales
```

---

## 📱 Responsividad

La página se adapta a diferentes dispositivos:

| Tamaño | Comportamiento |
|---|---|
| **Desktop (>1024px)** | Tres columnas en las tablas de promedios |
| **Tablet (768-1024px)** | Dos columnas en las tablas de promedios |
| **Móvil (<600px)** | Una columna y contenido reorganizado |

---

## 🔗 Recursos Utilizados

- [Bootstrap 5.1.3](https://getbootstrap.com/)
- [SheetJS](https://sheetjs.com/)
- [Unsplash Images](https://unsplash.com/)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome Icons](https://fontawesome.com/)
- Claude Anthropic (apoyo en estructura y estilos).
- Google Gemini (apoyo en estructura y estilos).
- ChatGPT (apoyo en estructura, estilos y desarrollo).

---

## 📝 Contribuir

### Pasos para contribuir

1. Realizar un Fork del repositorio.
2. Crear una rama para la nueva funcionalidad:

```bash
git checkout -b feature/nueva-caracteristica
```

3. Realizar los cambios y crear un commit:

```bash
git commit -m "Agrega nueva característica"
```

4. Subir los cambios:

```bash
git push origin feature/nueva-caracteristica
```

5. Abrir un Pull Request.

### Reglas de contribución

- Mantener la estructura del proyecto.
- Conservar los nombres de las hojas y encabezados de Excel utilizados por JavaScript.
- Verificar el funcionamiento de las tablas antes de publicar.
- Probar los cambios en dispositivos móviles.
- Documentar las modificaciones importantes.
- Evitar publicar información personal de estudiantes sin la autorización correspondiente.

---

## 🐛 Reportar Problemas

Si se encuentra un error:

1. Abrir un [Issue](../../issues).
2. Describir claramente el problema.
3. Adjuntar una captura de pantalla si es necesario.
4. Especificar el navegador y dispositivo utilizado.

**Ejemplo:**

```text
Título: La tabla de Matrículas de Honor no carga.

Descripción:
La página no muestra los registros de la segunda hoja de Excel.

Pasos:
1. Abrir la página principal.
2. Ingresar a Matrículas de Honor.
3. Abrir el segundo acordeón.
4. Verificar que la tabla aparece vacía.

Navegador: Google Chrome.
```

---

## 👥 Autores

**Monitor Nicolás Moreno de Ingeniería Electrónica - Universidad Distrital Francisco José de Caldas**

Desarrollado como herramienta de reconocimiento académico y apoyo a la comunidad estudiantil.

---

## 🔗 Link del Sitio

- 🌐 Web: [riudelectronicaUD.github.io](https://riudelectronicaUD.github.io)
- 💻 Repositorio: [GitHub - riudelectronicaUD.github.io](https://github.com/riudelectronicaUD/riudelectronicaUD.github.io)

---

<div align="center">

*Última actualización: Noviembre 2026*

</div>
