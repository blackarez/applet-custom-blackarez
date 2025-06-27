# Versión en español
## Applet de Referencia para Cinnamon


Este proyecto es una **guía práctica** para quienes están creando su primer applet para el escritorio **Cinnamon (Linux Mint y derivados)**. El código está documentado y enfocado en enseñar buenas prácticas con ejemplos simples, funcionales y visuales.


> ⚠️ **Este applet no está pensado para uso productivo o comercial**, sino como referencia educativa.

### Linux mint 22.1 xia y cinnamon 6.4
No lo he provado en otras versiones o distribuciones.

## Recomendaciones para crear su applet o miniaplicación.

Para comenzar a programar recomiendo comenzar con:

1. Comenzar con crear un applet "Miniaplicación" que llame a una notificacion.
2. Que llame a un panel y un boton.
3. Despues agregar más botones a su gusto.
4. En este proyecto encontrará: botones normales y botones con icono y texto, botones con estado activo y desactivado.

Este consejo es para evitar que se les **bloque** su **linux mint** por problema de un applet complejo y no compatible.

## importante

1. Al realizar un cambio en el applet. Presiona `Alt + F2`, escribe `r` y presiona Enter para **recargar Cinnamon**.

2. Si tienes una advertencia y no carga el applet. Presiona `Alt + F2`, escribe `lg` y presiona Enter para abirir **Looking Glass** que permite ver los errores que hay en el applet.

3. Recomiendo utilizar este applet como ejemplo y modificar funcionalidad de warp para no es necesario utilizar paquetes externos lo que implicara **No toca instalar paquetes** y se enfoca en el uso de scripts o comandos que usted puede utilizar desde la linea de comando o terminal.

4. Si desea utilizar este proyecto en su totalidad instale Cloudflare (https://one.one.one.one/)

## 🧩 ¿Qué hace este applet?

- Muestra un icono en la barra de panel de Cinnamon.
- Al hacer clic:
  - Ejecuta un comando del sistema.
  - Muestra una notificación.
- Incluye un botón tipo "toggle" para conectarse/desconectarse de Warp (`warp-cli`).
- Estilizado con CSS personalizado.
- Usa funciones seguras (no bloqueantes) con GJS.


## 📁 Estructura del proyecto

mi_applet/

├── applet.js # Lógica principal del applet

├── metadata.json # Información para Cinnamon

├── stylesheet.css # Estilos visuales del applet

├── README.md # Esta guía


## 🛠️ Cómo instalar el applet (modo desarrollo)

1. Copia la carpeta del applet a:
~/.local/share/cinnamon/applets/

2. Presiona `Alt + F2`, escribe `r` y presiona Enter para **recargar Cinnamon**.

3. Haz clic derecho en el panel → **Agregar applets al panel** → busca el tuyo y agrégalo.


---

## 🧪 Tecnologías utilizadas

- **GJS** (JavaScript para GNOME)
- **St** (Shell Toolkit)
- **GLib**, **Gio** y **Main** (módulos de GNOME)
- **CSS** para estilos



## 📜 Licencia

LICENCIA DE REFERENCIA EDUCATIVA (NO COMERCIAL)

Este proyecto está disponible como recurso de referencia para estudiantes, desarrolladores y personas interesadas en aprender a crear applets para el entorno de escritorio Cinnamon.

Al utilizar este código, aceptas los siguientes términos:

1. USO PERMITIDO

✔️ Puedes estudiar, modificar y reutilizar fragmentos de este código en proyectos personales o educativos.

✔️ Puedes compartir el código modificado siempre y cuando se mantenga el mismo espíritu educativo, no comercial y con atribución al autor original.

2. USO RESTRINGIDO

❌ No se permite el uso comercial de este código o cualquier derivado.

❌ No se permite redistribuir este applet como producto completo (empaquetado) en sitios públicos, tiendas de software, repositorios de extensiones o distribuciones sin autorización.

❌ No se permite publicar este código como si fuera un proyecto propio sin mencionar claramente al autor original.

3. SOLICITUD DE PERMISOS

Si deseas utilizar este código o fragmentos del mismo en proyectos comerciales, aplicaciones distribuidas públicamente, u otros fines distintos a los aquí permitidos, **debes solicitar permiso explícito al autor** mediante un _pull request_, comentario en el repositorio, o contacto directo por GitHub.

4. ATRIBUCIÓN

Este proyecto fue creado por **blackarez** con fines educativos y de referencia.

---

Esta licencia no es una licencia de software libre según la definición de la Open Source Initiative, pero permite un uso amplio con fines no comerciales.

Fecha de publicación: **2025**

---

## 💡 Autor

Creado por **blackarez** como una contribución abierta a la comunidad de desarrolladores de Cinnamon.
