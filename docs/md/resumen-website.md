# Resumen general del website — Sistema de Capacitación CIDI

## 1. Descripción

Sitio web **estático** para el curso de capacitación **Ciudadano Digital (CiDi)** del Gobierno de Córdoba. Es una experiencia de aprendizaje de 5 módulos que cubre desde la creación de la cuenta hasta la firma digital y una evaluación final.

- **URL pública:** https://abarahona.github.io/comunicacion_multimedial/
- **Repositorio:** `abarahona/comunicacion_multimedial` (ramas `dev`, `main`, `aldana`)
- **Idioma:** español (`es` / `es-ar`)
- **Enfoque:** contenidos multimedia, interactividad y accesibilidad.

## 2. Arquitectura y tecnologías

| Item | Detalle |
|---|---|
| Tipo | Multipágina (MPA) estática, sin backend |
| Frontend | HTML5, CSS3 y JavaScript vanilla (IIFEs + scripts inline) |
| Frameworks / librerías | Ninguno (sin React, jQuery, Bootstrap ni Tailwind) |
| Gestor de paquetes | No existe `package.json` |
| Persistencia | `localStorage` (tema y preferencias de accesibilidad) |
| APIs externas | Ninguna; solo Web APIs del navegador y enlaces salientes |
| Deploy | GitHub Pages mediante GitHub Actions |

Todo el estado se comparte entre páginas únicamente por `localStorage` y eventos globales de `window`. Cada HTML enlaza `styles.css` y los scripts comunes con rutas relativas (`../` desde `modulos/`).

## 3. Estructura de archivos

```
/
├── index.html                  # Inicio y catálogo de módulos
├── dashboard.html              # Reporte de respuestas de los quizzes
├── preguntas-frecuentes.html   # FAQ (17 entradas)
├── qr.html                     # Código QR de acceso al sitio
├── styles.css                  # Estilos globales
├── script.js                   # Navegación, buscador y puente al chatbot
├── reporte-quizzes.js          # Persistencia de intentos de quizzes
├── dashboard.js                # Render del reporte de respuestas
├── tema.js                     # Modo claro/oscuro
├── accesibilidad.js            # Panel de accesibilidad
├── .github/workflows/static.yml# Deploy a GitHub Pages
├── chatbot/
│   ├── chatbot.js              # Motor y widget del chatbot
│   ├── conocimiento.js         # Base de conocimiento (19 respuestas)
│   └── chatbot.css             # Estilos del chatbot
├── modulos/
│   ├── modulo1-Intro.html
│   ├── modulo2-Nivel2.html
│   ├── modulo3-Tramites.html
│   ├── modulo4-Firma.html
│   ├── modulo5-Final.html
│   ├── videos/                 # MP4, SVG y subtítulos VTT
│   └── podcast/                # Audio de Firma CiDi (MP4)
├── img/modulo_3/               # 14 capturas del carrusel
└── docs/
    ├── guia-cidi-nivel2.pdf    # Guía descargable
    ├── guia-cidi-nivel2.html   # Versión HTML imprimible
    └── md/                     # Esta documentación
```

## 4. Páginas y contenidos

### 4.1 Inicio (`index.html`)

- Header con logo CiDi, botón de tema, lupa de búsqueda y CTA de ingreso.
- Navegación anclada con secciones: `#inicio`, `#modulos`, `#material`, `#ayuda`, `#nivel2`.
- Catálogo de los 5 módulos con tarjetas.
- Material de apoyo: guía PDF descargable y playlist de YouTube.
- Sección de identidad digital.
- Footer de 4 columnas con enlaces institucionales y botón para abrir el chatbot.
- Modal de buscador de material.

### 4.2 Módulos

| Módulo | Tema | Recursos | Interactividad |
|---|---|---|---|
| 1 — Intro | ¿Qué es CiDi? | Video `modulo1.mp4` | Quiz de 3 preguntas |
| 2 — Nivel 2 | Cómo alcanzar el Nivel 2 | 2 infografías SVG | Quiz de 5 preguntas (incluye seguridad/phishing) |
| 3 — Trámites | Gestión de trámites | Carrusel de 14 capturas, video con subtítulos VTT | Quiz de 4 preguntas, carrusel y lightbox |
| 4 — Firma | Firma CiDi | Guía de 9 pasos y podcast MP4 | Quiz de 5 preguntas |
| 5 — Final | Evaluación final | Formulario de evaluación | Mensaje de cierre (sin corrección) |

Cada módulo tiene enlaces de navegación: volver al inicio, volver a los módulos y siguiente módulo.

### 4.3 Preguntas frecuentes (`preguntas-frecuentes.html`)

17 entradas en acordeones `<details>`, agrupadas en 4 categorías: CiDi, LOM/legajo, gestiones laborales y otros trámites. Cada entry tiene un ancla (`#faq-…`) utilizada por el buscador. Incluye estilos propios inline y soporte de tema oscuro.

### 4.4 QR (`qr.html`)

Código QR embebido en base64 que apunta al deployment de GitHub Pages, con botón "Abrir la página". Accesible solo por URL directa (no enlazado en la navegación).

### 4.5 Guía de Nivel 2 (`docs/`)

- `guia-cidi-nivel2.pdf`: descargable desde el inicio (`download="Guia-CiDi-Nivel2.pdf"`).
- `guia-cidi-nivel2.html`: versión imprimible con `@media print` (actualmente huérfana, no enlazada).

## 5. Funcionalidades JavaScript

### 5.1 Modo claro/oscuro (`tema.js`)

- Clave `localStorage`: `tema` (`claro` / `oscuro`).
- Aplica `data-tema` en `<html>` antes de `DOMContentLoaded` para evitar flash.
- Si no hay preferencia guardada, usa `prefers-color-scheme` y reacciona a cambios.
- Crea dinámicamente el botón flotante de tema con iconos luna/sol y estados ARIA.

### 5.2 Panel de accesibilidad (`accesibilidad.js`)

- Clave `localStorage`: `accesibilidad` → `{ texto, contraste, vision }`.
- **Tamaño de texto:** 80–200 % en pasos del 10 % (default 100 %).
- **Contraste:** normal / alto.
- **Visión cromática:** normal, protanopia, deuteranopia, tritanopia (paletas alternativas con recolorado de logo).
- **Lectura por voz:** `speechSynthesis` en `es-AR`, velocidad 0.95; divide el texto de `<main>` en frases de hasta 220 caracteres; controles Leer / Pausar (Reanudar) / Detener con estados `aria-live`.
- Enlace "Saltar al contenido principal" y manejo de foco.
- Cierre del panel con Escape o clic fuera.

### 5.3 Buscador de material (`script.js`)

- Modal `#buscador-material` con apertura desde la lupa, cierre con overlay, ✕ o Escape; bloquea el scroll y restaura el foco.
- Índice local de **25 entradas**: 5 módulos, guía PDF, playlist, FAQ general y 17 FAQs específicas con anclas.
- Cada entrada tiene `titulo`, `descripcion`, `url`, `tipo`, `palabras` y opcionalmente `externo`.
- Normalización sin tildes (`NFD`) y búsqueda AND por términos sobre título, descripción, palabras y tipo.
- Renderiza resultados con enlaces seguros (`noopener noreferrer`).
- Solo se carga en `index.html`.
- También marca la navegación activa y conecta el footer con el chatbot (`window.ChatbotCidiWidget.abrir()` o evento `chatbot:abrir`).

### 5.4 Chatbot (`chatbot/`)

- **Carga dinámica:** infiere su ruta desde `document.currentScript`, inyecta su CSS y, si hace falta, `conocimiento.js`; incluye respuesta de respaldo.
- **Motor:** normaliza acentos/ñ y puntuación, ignora ~40 palabras vacías y aplica scoring:
  - coincidencia exacta de pregunta (+14), substring (+9), frase clave (+6 + longitud/3), token exacto (+3 + longitud/5), raíz de 4 letras (+1) y `prioridad` de la entrada.
  - Umbral mínimo de 5 puntos; si no se alcanza, respuesta genérica con enlace al portal oficial.
- **API pública:** `window.ChatbotCidiMotor` (`normalizar`, `limpio`, `puntuar`, `responder`) y `window.ChatbotCidiWidget` (`abrir`, `cerrar`, `enviar`, `responder`).
- **UI:** botón flotante "Preguntá sobre CiDi", panel `role="dialog"`, log con `aria-live`, burbujas de usuario/bot, chips de sugerencias, input de hasta 240 caracteres, cierre con Escape/clic fuera.
- **Base de conocimiento:** 19 respuestas en 7 categorías (CiDi, cuenta y acceso, niveles, trámites, firma, capacitación y ayuda).
- **Eventos globales:** `chatbot:abrir` y `chatbot:preguntar`.
- Las URLs relativas se resuelven contra la raíz del sitio; las absolutas se abren en pestaña nueva.

### 5.5 Quizzes (módulos 1–4)

- Formularios `novalidate` con preguntas de opción múltiple y validación local.
- Si faltan respuestas: mensaje `role="alert"`, resultados ocultos y foco en la primera pregunta sin responder.
- Al corregir: puntaje, feedback por opción y clases `quiz-item--ok` / `quiz-item--error`.
- Botón de reinicio que limpia respuestas y resultados.
- Los resultados **no se envían a ningún servidor**, pero se guardan en `localStorage` para el reporte del dashboard.

| Módulo | ID del formulario | Preguntas |
|---|---|---|
| 1 | `quiz-form` | 3 |
| 2 | `quiz-form-modulo2` | 5 |
| 3 | `quiz-form-modulo3` | 4 |
| 4 | `quiz-form-modulo4` | 5 |

### 5.6 Carrusel y lightbox (módulo 3)

- Carrusel con botones prev/next, dots generados dinámicamente (`role="tab"`), contador "1 / 14", transición `translateX` y navegación con flechas de teclado.
- Las imágenes son enfocables y activan un lightbox `aria-modal` con contador, cierre, flechas, Escape y clic en el overlay; bloquea el scroll, restaura el foco y hace wrap circular.

### 5.7 Evaluación final (módulo 5)

- Formulario con dos grupos de radios `required`, checkboxes y una textarea.
- Al enviar: `reportValidity()`, oculta el formulario y muestra mensaje final con scroll suave.
- Actualmente es una plantilla: no corrige respuestas ni calcula puntaje.

### 5.8 Reporte de respuestas (`dashboard.html`)

- Cada envío válido de los quizzes 1–4 registra un intento en `localStorage` (`reporteQuizzes`), con fecha, módulo, puntaje y el detalle de cada pregunta: texto elegido, si fue correcta y la respuesta correcta.
- Se conservan como máximo los 100 intentos más recientes.
- El dashboard muestra: resumen general (intentos, aciertos, precisión global y mejor resultado), avance por módulo (mejor puntaje y promedio con barra visual) e historial desplegable por intento.
- Incluye filtro por módulo y opción de borrar el historial con confirmación.
- Es accesible desde la navegación del inicio y desde el encabezado de los módulos; hereda tema, accesibilidad y chatbot.

## 6. Recursos multimedia

| Recurso | Uso |
|---|---|
| `modulos/videos/modulo1.mp4` (~6 MB) | Video del módulo 1 |
| `modulos/videos/modulo_3.mp4` (~14 MB) | Video del módulo 3 |
| `modulos/videos/modulo_3_subtitulos.vtt` | 30 cues, `srclang="es"`, `default` |
| `modulos/videos/nivel2_tuto.svg` y `nivelesCidi.svg` | Infografías del módulo 2 |
| `modulos/podcast/modulo4-Firma.mp4` (~1,7 MB) | Podcast del módulo 4 |
| `img/modulo_3/1.jpeg` … `14.jpeg` | Capturas del carrusel (`loading="lazy"`) |

## 7. Estilos

`styles.css` define variables de marca (verde `#36CA70`, verde oscuro `#23A05A`, amarillo `#F6BD2B`, tinta `#374050`), tipografía del sistema, componentes de header/nav/botones/tarjetas, rejillas responsivas (breakpoints 900 y 640 px), estilos de módulos, quiz, carrusel y lightbox, modal de buscador, modo oscuro, alto contraste y paletas para daltonismo. Los scripts de accesibilidad y chatbot inyectan sus propios estilos. Además hay CSS inline en la FAQ, QR, módulo 5 y la guía HTML.

## 8. Accesibilidad

- `lang`, títulos y metadescripciones en español.
- Enlace de salto al contenido, `:focus-visible` reforzado, `.sr-only`.
- ARIA en modales, acordeones, carrusel, quizzes, botones de tema y estados de lectura.
- Soporte de `prefers-color-scheme`, alto contraste y 3 tipos de daltonismo en caliente.
- Videos con controles, subtítulos por defecto en el módulo 3, podcast con controles, imágenes con `alt`.

## 9. Deploy

`.github/workflows/static.yml` publica a GitHub Pages con `actions/checkout@v4`, `configure-pages@v5`, `upload-pages-artifact@v3` (`path: '.'`) y `deploy-pages@v5`. Se dispara con `push` a `dev` y manualmente (`workflow_dispatch`). No hay tests ni lint en CI.

## 10. Estado actual y pendientes

- El módulo 5 está sin completar (textos de plantilla, enlace inválido y sin corrección).
- La guía HTML y `qr.html` no están enlazadas desde la navegación.
- El buscador solo existe en el inicio; los IDs `#btnIngresar` y `#footerIngresar` no tienen lógica.
- Faltan destinos para "Centros de Contacto" y "Teléfonos" (`href="#"`).
- Hay HTML menor inválido en módulos 1 y 2 y artefactos sobrantes (`modulos/videos/subtitles/*.txt`).
- No hay `package.json`, tests, lint ni documentación de instalación más allá del README mínimo.
- El peso total de videos y audio es de aproximadamente 20 MB.
