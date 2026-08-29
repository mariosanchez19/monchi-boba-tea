# Monchi Boba Tea — sitio web

Sitio de una sola página construido a partir del archivo
`maqueta de como debe ser.jpeg`. HTML, CSS y JavaScript puros: no necesita
compilarse ni instalar nada.

## Estructura

```
index.html          Estructura de la página
descargar.html      Descarga del punto de venta (uso interno de sucursales)
css/styles.css      Estilos, paleta y comportamiento responsive
js/main.js          Datos editables (menú, cafés, sucursales) + interacciones
js/descargar.js     Busca la última versión publicada del punto de venta
img/                Imágenes optimizadas en WebP  <- esto es lo que se publica
img-original/       Los mismos archivos en PNG sin comprimir (solo archivo)
robots.txt          Le dice a Google que no indexe descargar.html
sitemap.xml         Mapa del sitio
```

Los archivos originales (`BANNER SUPERIOR MONCHIS.png`, `imagen 1.png`, etc.)
se conservan tal cual en la raíz. La carpeta `img/` contiene las versiones
optimizadas que usa el sitio.

**Para publicar basta con subir:** `index.html`, `descargar.html`, `css/`,
`js/`, `img/`, `robots.txt` y `sitemap.xml`.
`img-original/` y los PNG de la raíz son material de trabajo y no hace falta
subirlos.

## Peso

| | |
|---|---|
| Código (HTML + CSS + JS) | 41 KB |
| Carga inicial | ~250 KB |
| Todas las imágenes juntas | 1.7 MB |

Las imágenes se convirtieron a **WebP** y se redimensionaron al tamaño en que
realmente se muestran: pasaron de 24.4 MB a 1.7 MB (un 93 % menos) sin pérdida
visible. Todo lo que está por debajo de la primera pantalla se carga en
diferido, así que abrir la página cuesta unos 250 KB.

WebP funciona en todos los navegadores actuales (Chrome, Firefox, Edge y
Safari 14 en adelante). Si alguna vez necesitas volver a PNG, los originales
están en `img-original/`.

## Cómo verlo

Abre `index.html` con doble clic, o levanta un servidor local:

```
python -m http.server 8000
```

y entra a <http://localhost:8000>.

## Cómo editar el contenido

Todo el contenido variable está en la parte de arriba de `js/main.js`:

- `FAVORITOS` — las 6 bebidas: número, imagen, descripción, precio y tamaño.
- `CAFES` — los 4 cafés: nombre, imagen y precio.
- `SUCURSALES` — nombre, foto, dirección y enlace a Google Maps.

Cambiar un precio o un nombre es editar una línea; la página se actualiza sola.

### Pendiente: nombres reales de las bebidas

Las descripciones de las 6 bebidas están marcadas con `// REVISAR` porque en la
maqueta original ese texto era demasiado pequeño para leerse. Sustitúyelas por
las descripciones reales del menú.

### Pendiente: fotos de producto en alta resolución

Las imágenes `img/bebida-*.webp` e `img/cafe-*.webp` se recortaron de la
maqueta, así que tienen poca resolución. Para reemplazarlas basta con guardar
las fotos reales con esos mismos nombres (fondo blanco, unos 600 px de alto).
No hay que tocar el código.

Si las guardas en PNG o JPG en vez de WebP, cambia también la extensión en
`js/main.js` y, si la foto cambia de proporción, el par `width`/`height` de
`MEDIDAS` en ese mismo archivo.

## Datos de contacto usados

- WhatsApp: 229 145 5808
- Instagram: `@monchibobatea`
- Facebook: `MonchiBobaTea`

Los enlaces de Uber Eats, Rappi, DiDi Food, Facebook e Instagram apuntan a
búsquedas o perfiles genéricos; cámbialos por las URL definitivas en
`index.html` cuando las tengas.

## Notas de diseño

- Tipografías: **Anton** (títulos) y **Poppins** (texto), desde Google Fonts.
- Azul institucional `#01499B`, rojo de botón `#FF041B`.
- La sección "Llévame a tu fiesta" usa el banner panorámico en escritorio.
  En pantallas menores a 720 px el banner se sustituye por la misma
  información compuesta con texto real, porque a ese ancho el banner
  resultaba ilegible.

## Accesibilidad y rendimiento

- Todas las imágenes llevan `width` y `height`, así que la página no "salta"
  mientras cargan.
- Con el menú móvil cerrado, sus enlaces quedan fuera del orden de tabulación
  (atributo `inert`), para que nadie navegando con teclado caiga en enlaces
  invisibles. `Esc` cierra el menú y devuelve el foco al botón.
- Enlace "Saltar al contenido", textos alternativos en todas las imágenes y
  foco visible en todos los elementos interactivos.
- Las animaciones se desactivan solas si el sistema tiene activado
  "reducir movimiento".


## La página de descarga del punto de venta

`descargar.html` es de uso interno: la usa un encargado cuando hay que instalar
el punto de venta en una computadora nueva. Se llega por un enlace discreto al
pie del sitio, y lleva `noindex` para que no aparezca en Google.

**No hay que actualizarla nunca.** No tiene la versión escrita adentro: cada vez
que alguien la abre le pregunta a GitHub cuál es la última publicación de
`mariosanchez19/monchi-erp-releases` y arma el botón con ese archivo. La cadena
completa es:

```
(en cafeterias-erp)  npm run publicar
        ↓  compila, sube el instalador y crea el release en GitHub
GitHub Releases: v0.4.0
        ↓  la página lo ve en la siguiente visita
descargar.html muestra "Versión 0.4.0" y baja ese .exe
```

Si GitHub no contesta —sin internet, o se pasó el límite de consultas de la API,
que son 60 por hora y por conexión— el botón no se rompe: lleva a la lista de
publicaciones, donde el instalador se baja a mano.

El instalador **no se guarda en este repositorio**: pesa 104 MB, más de lo que
GitHub acepta por archivo. Vive en Releases, que es también de donde las cajas
se actualizan solas.

## Publicado en

<https://mariosanchez19.github.io/monchi-boba-tea/>

GitHub Pages sirve lo que esté en la rama `main`. Para actualizar el sitio basta
con `git push`: en un minuto está arriba.

Si más adelante compran un dominio (`monchibobatea.com`), se conecta desde
**Settings → Pages → Custom domain** del repositorio, y hay que cambiar la URL
en `robots.txt`, `sitemap.xml` y las etiquetas `canonical` / `og:url` de
`index.html` y `descargar.html`.
