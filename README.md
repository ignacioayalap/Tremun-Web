# Informe de Arquitectura — Proyecto Tremun

## 1. Objetivo

Este informe describe la arquitectura de software propuesta para **Tremun**, un sitio web informativo de un centro terapéutico. El sitio no requiere modelado de datos ni inicio de sesión de usuarios; su función es presentar información institucional (servicios, equipo, contacto) con algunos elementos de interfaz dinámicos como menús desplegables y secciones expandibles.

## 2. Arquitectura elegida: sitio estático con Bootstrap

Dado que el proyecto no necesita backend ni base de datos, se optó por una **arquitectura estática** (variante simplificada de JAMstack), construida con HTML, CSS y JavaScript, y apoyada en el framework **Bootstrap 5** para la interfaz.

Las secciones "dinámicas" mencionadas (menú desplegable, acordeones de información) se resuelven íntegramente en el navegador del usuario mediante los componentes de Bootstrap, sin necesidad de un servidor de aplicaciones.

### Ventajas de esta elección

- **Simplicidad**: no hay lógica de servidor, ni base de datos, ni autenticación que mantener.
- **Velocidad de carga**: los archivos se sirven directamente, sin procesamiento en servidor.
- **Costo de hosting bajo o nulo**: compatible con servicios gratuitos como GitHub Pages, Netlify o Vercel.
- **Mantenimiento simple**: actualizar contenido es editar archivos HTML directamente.
- **Responsive por defecto**: el sistema de grillas de Bootstrap adapta el sitio a celulares, tablets y escritorio sin trabajo adicional.

## 3. Diagrama de arquitectura por capas

![Arquitectura del proyecto Tremun](diagrama_arquitectura.svg)

La arquitectura se organiza en tres capas, todas del lado del cliente:

1. **Capa de presentación**: componentes de Bootstrap (navbar con dropdown, accordion/collapse, cards y sistema de grillas) que se importan vía CDN.
2. **Capa de contenido estático**: las páginas HTML del sitio (`index`, `servicios`, `nosotros`, `contacto`).
3. **Capa de recursos propios**: hojas de estilo (`estilos.css`), scripts propios (`script.js`) e imágenes del centro.

## 4. Estructura de carpetas del proyecto

```
tremun/
├── index.html              → página de inicio
├── servicios.html          → servicios y tratamientos
├── nosotros.html           → equipo, historia del centro
├── contacto.html           → datos de contacto y formulario
├── /css
│   └── estilos.css         → estilos personalizados sobre Bootstrap
├── /js
│   └── script.js           → interactividad propia adicional
└── /img
    └── (logo, fotos del centro, íconos)
```

Bootstrap no ocupa una carpeta local: se enlaza por CDN en el `<head>` de cada página HTML (CSS y bundle de JS).

## 5. Flujo de despliegue y dominio

![Flujo de despliegue de Tremun](diagrama_despliegue.svg)

El flujo de publicación propuesto es:

1. El código se desarrolla localmente y se sube a un **repositorio Git** (GitHub).
2. El repositorio se conecta a un servicio de **hosting estático** (GitHub Pages, Netlify o Vercel), que despliega automáticamente el sitio en cada actualización (CI/CD).
3. Se registra el **dominio** `tremun.com.ar` en NIC Argentina y se configuran sus DNS (registros A/CNAME) apuntando al hosting elegido.
4. El visitante final accede al sitio publicado a través del dominio propio, vía navegador.

## 6. Conclusión

Para un sitio informativo sin necesidad de gestión de datos ni usuarios, una arquitectura estática con Bootstrap ofrece la mejor relación entre simplicidad, velocidad de desarrollo y costo. Permite lograr toda la interactividad requerida (menús, secciones desplegables) sin la complejidad de un backend, y es totalmente compatible con hosting gratuito y un dominio propio (`tremun.com.ar`).
