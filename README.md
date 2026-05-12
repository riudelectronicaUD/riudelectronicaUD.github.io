# 🎓 Ingeniería Electrónica - Sitio web para la comunidad académica

Portal interactivo en el que la página principal muestra promedios académicos y matrículas de honor por período reconociendo y destacando a los mejores estudiantes del programa. Adicionalmente, existen dos botones dentro de la página principal que redirijen a dos páginas que contienen información de práctica empresarial y trámites y procedimientos. Finalmente se agregó un endpoint que no tiene botón de redirección que contiene información de deserción de estudiantes.

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
- [Contribuir](#-contribuir)

---

## ✨ Características

✅ **Carrusel dinámico** - Navegación visual entre secciones principales  
✅ **Acordeones interactivos** - Organización de promedios por períodos (2020-2025)  
✅ **Tabla de Matrículas de Honor** - Información de estudiantes destacados  
✅ **Diseño responsivo** - Compatible con desktop, tablet y móvil  
✅ **Estilos modernos** - Gradientes, sombras y transiciones suaves  
✅ **Datos JSON** - Estructura flexible para actualizar información  
✅ **Múltiples secciones** - Prácticas empresariales y trámites académicos  

---

## 🛠 Tecnologías

| Tecnología | Uso |
|-----------|-----|
| **HTML5** | Estructura semántica |
| **CSS3** | Diseño responsivo y efectos visuales |
| **Vanilla JavaScript** | Lógica interactiva (sin frameworks) |
| **JSON** | Almacenamiento de datos de estudiantes |
| **Bootstrap 5.1.3** | Componentes base y grid system |
| **Unsplash** | Imágenes de stock optimizadas |

---

## 📁 Estructura del Proyecto

```
riudelectronicaUD.github.io/
│
├── 📄 index.html                    # Página principal
├── 🎨 styles.css                    # Estilos globales
├── 🔧 script.js                     # Lógica de la página principal
├── 📊 data.json                     # Datos de estudiantes y matrículas
│
├── 📷 Assets
│   ├── logo.png                     # Logo institucional
│   ├── logo.webp                    # Logo en formato WebP
│   ├── 1.jpg                        # Imagen sección matrículas
│   └── 2.jpg                        # Imagen carousel
│
├── 📚 pagina_practicas/
│   ├── practicas.html               # Página de prácticas empresariales
│   ├── style.css                    # Estilos de prácticas
│   └── 📷 [logos de empresas]       # IBM, Huawei, Nokia, etc.
│
├── 📋 pagina_desercion/
│   ├── index.html                   # Página de trámites (reutilizada)
│   └── style.css                    # Estilos compartidos
│
├── 📝 Tramitesyprocedimientos/
│   └── index.html                   # Página de trámites académicos
│
└── 📖 README.md                     # Este archivo

```

---

## 🚀 Instalación

### Opción 1: Clonar el repositorio

```bash
git clone https://github.com/riudelectronicaUD/riudelectronicaUD.github.io.git
cd riudelectronicaUD.github.io
```

### Opción 2: Descargar ZIP

1. Haz clic en `Code` → `Download ZIP`
2. Extrae la carpeta

---

## 💻 Uso

El sitio es **estático** y no requiere servidor backend. Simplemente abre el archivo `index.html` en tu navegador.

### Servidor local (Recomendado)

Para una mejor experiencia durante desarrollo, usa un servidor local:

**Con Python 3:**
```bash
python -m http.server 8000
```

**Con Node.js (http-server):**
```bash
npx http-server
```

Luego accede a `http://localhost:8000`

---

## 📊 Datos

### Estructura del `data.json`

El archivo contiene dos arrays principales:

#### **Estudiantes (Mejores Promedios)**

```json
{
  "estudiantes": [
    {
      "semestre": "20231",
      "codigo": "20231005111"
    },
    ...
  ]
}
```

**Campos:**
- `semestre` - Formato YYYYT (ej: 20231 = 2023-1)
- `codigo` - Código de estudiante (sin nombre, por privacidad)

#### **Matrículas de Honor**

```json
{
  "matriculas": [
    {
      "semestre": "20231",
      "codigo": "20231005046"
    },
    ...
  ]
}
```

### Cómo Actualizar Datos

1. Edita `data.json`
2. Mantén la estructura JSON válida
3. Los cambios se reflejan automáticamente al recargar la página

---

## 🧩 Componentes

### 1. **Página Principal (`index.html`)**

**Secciones:**
- Navbar con logo institucional
- Carrusel con 2 diapositivas (Promedios y Matrículas)
- Botones de navegación a subsecciones
- Acordeones con 4 bloques de períodos
- Tabla de matrículas de honor
- Footer

### 2. **Script Principal (`script.js`)**

**Funcionalidades:**
- Carga y parsea `data.json`
- Agrupa estudiantes por semestre
- Renderiza tablas dinámicamente
- Gestiona acordeones (expand/collapse)
- Abre por defecto la sección de matrículas

### 3. **Estilos Globales (`styles.css`)**

**Características de diseño:**
- Paleta de colores: Rojo corporativo (#8C1919)
- Gradientes en secciones destacadas
- Grid responsivo (3 cols → 2 cols → 1 col)
- Transiciones suaves en botones
- Sombras modernas

### 4. **Prácticas Empresariales (`pagina_practicas/`)**

Muestra:
- Beneficios de prácticas
- Logos de empresas aliadas
- Links a portales de empleo
- Testimonios de estudiantes

### 5. **Trámites Académicos (`Tramitesyprocedimientos/`)**

Contiene:
- Guía de procesos académicos
- Enlaces directos a formularios
- Índice interactivo de trámites
- Información de requisitos

---

## 🎨 Personalización

### Cambiar Colores Corporativos

En `styles.css`, busca `#8C1919` y reemplázalo con tu color:

```css
/* Antes */
background: #8C1919;

/* Después */
background: #TU_COLOR;
```

### Agregar Nuevos Períodos

En `script.js`, actualiza la sección de bloques:

```javascript
const bloques = {
    bloque1: ["20201", "20202", "20211"],
    bloque2: ["20212", "20221", "20222"],
    bloque3: ["20231", "20232", "20241"],
    bloque4: ["20242", "20251", "20252"],
    bloque5: ["20261", "20262"] // Nuevo bloque
};
```

Luego agrega en `index.html`:

```html
<button class="accordion">Mejores Promedios 2026-1 al 2026-2</button>
<div class="panel">
    <div class="grid" id="bloque5"></div>
</div>
```

### Cambiar Logo

1. Reemplaza `logo.png` y `logo.webp`
2. Verifica que tengan el mismo nombre

---

## 🔄 Flujo de Desarrollo

```
1. Editar data.json → Actualizar estudiantes
                    ↓
2. Recargar navegador → Script carga JSON
                    ↓
3. JavaScript agrupa por semestre
                    ↓
4. Renderiza tablas dinámicamente
                    ↓
5. CSS aplica estilos responsivos
```

---

## 📱 Responsividad

| Tamaño | Comportamiento |
|--------|----------------|
| **Desktop (>1024px)** | 3 columnas en grid |
| **Tablet (768-1024px)** | 2 columnas en grid |
| **Móvil (<768px)** | 1 columna, layout apilado |

---

## 🔗 Recursos Utilizados

- [Bootstrap 5.1.3](https://getbootstrap.com/)
- [Unsplash Images](https://unsplash.com/)
- [Google Fonts](https://fonts.google.com/)
- [Font Awesome Icons](https://fontawesome.com/) (referencia)

---

## 📝 Contribuir

### Pasos para Contribuir

1. **Fork** este repositorio
2. **Crea una rama** para tu feature
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```
3. **Realiza tus cambios** y **commit**
   ```bash
   git commit -m "Agrega nueva característica"
   ```
4. **Push a tu rama**
   ```bash
   git push origin feature/nueva-caracteristica
   ```
5. **Abre un Pull Request**

### Reglas de Contribución

- Mantén la estructura JSON válida
- Prueba en dispositivos móviles
- Documenta cambios significativos
- Sigue los estilos existentes

---

## 🐛 Reportar Problemas

Si encuentras un bug:

1. Abre un [Issue](../../issues) con descripción clara
2. Incluye pasos para reproducir
3. Adjunta screenshot si es visual
4. Especifica navegador y dispositivo

**Ejemplo:**
```
Título: Acordeón no se abre en móvil

Descripción:
El acordeón de matrículas no se expande en dispositivos iOS.

Pasos:
1. Abrir en iPhone Safari
2. Hacer clic en botón "Matrículas de Honor"
3. Nada ocurre

Navegador: Safari 15.0
Dispositivo: iPhone 13
```

---

## 📄 Licencia

Este proyecto está bajo licencia **MIT**. Ver archivo `LICENSE` para más detalles.

---

## 👥 Autores

**Ingeniería Electrónica - Universidad Distrital Francisco José de Caldas**

Desarrollado como herramienta de reconocimiento académico.

---

## 📞 Contacto

Para preguntas o sugerencias:
- 📧 Email: [contacto@ing-electronica.edu.co](mailto:contacto@ing-electronica.edu.co)
- 🌐 Web: [riudelectronicaUD.github.io](https://riudelectronicaUD.github.io)

---

## 🗺 Roadmap Futuro

- [ ] Integración con base de datos
- [ ] Filtros avanzados de búsqueda
- [ ] Exportar datos a PDF/Excel
- [ ] Dashboard administrativo
- [ ] Autenticación de usuarios
- [ ] Multilingual (EN/ES)

---

<div align="center">

**⭐ Si te gustó este proyecto, no olvides darle una estrella en GitHub ⭐**

*Última actualización: Mayo 2026*

</div>
