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

### Fotos de producto: por qué se ven suaves en el celular

Las fotos de bebidas y cafés miden 300 px de ancho, pero **el detalle real que
contienen es de unos 100 px**: se recortaron de la maqueta, que mide 533 px de
ancho en total. Se comprobó reduciéndolas y volviéndolas a ampliar: la diferencia
es de 0.2-0.4 niveles de gris, contra 3.0-3.5 de `mascota.webp` o `sucursal-1.webp`,
que sí son fotos de verdad. Es decir, no hay nada que perder porque no hay nada.

Un celular pinta **3 píxeles reales por cada punto de pantalla**. Con la foto a
120 px de alto, el teléfono la estiraba a 360 px reales y quedaba a la vista toda
la ampliación. En un monitor el navegador la encoge a 120 px y eso la disimula:
por eso se veía mal sólo en el celular.

**Mitigación puesta en el CSS** (bloque `@media (max-width: 520px)`): la foto baja
a 78 px de alto, que el teléfono pinta en 234 px reales, y el espacio que suelta
se le da al texto de la tarjeta, que sí es nítido a cualquier tamaño.

Se descartaron dos caminos, por si a alguien se le ocurren después:

- **Borrar el número incrustado** para dibujarlo como texto HTML. El número se
  encima con el vaso entre 20 y 60 px, y reconstruir el borde del vaso detrás
  deja una franja clara que se nota más que el borrón.
- **Ampliar con super-resolución** (Real-ESRGAN y parecidos). Esas redes inventan
  el detalle que falta. Sobre el logo y el texto "MONCHI BOBA TEA" del vaso
  producirían letras nítidas pero inventadas — en la marca del cliente eso es
  peor que la foto borrosa.

Lo único que lo arregla de verdad son fotos nuevas. No hace falta fotógrafo:
cualquier celular actual toma 3000 px o más, doce veces lo necesario. Vaso
completo, vertical, fondo blanco, buena luz y sin flash. **Si vienen sin el número
encima, el número se puede poner como texto en la página** y queda nítido siempre.
Cuando lleguen, se borra la mitigación del CSS.

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

<https://monchibobatea.com>

El dominio está registrado en **Hostinger**, pero el sitio no vive ahí: los
servidores de nombres siguen siendo los de Hostinger y sus registros A apuntan a
**GitHub Pages**, que sirve lo que esté en la rama `main` de este repositorio.
Para actualizar el sitio basta con `git push`: en un minuto está arriba.

El archivo `CNAME` de la raíz es lo que le dice a GitHub qué dominio atiende.
**No hay que borrarlo**: sin él, `monchibobatea.com` deja de resolver al sitio.

### Los registros DNS, por si hay que rehacerlos

En Hostinger → *Dominios → monchibobatea.com → DNS / Nameservers*:

| Tipo | Nombre | Valor | TTL |
|---|---|---|---|
| A | `@` | `185.199.108.153` | 300 |
| A | `@` | `185.199.109.153` | 300 |
| A | `@` | `185.199.110.153` | 300 |
| A | `@` | `185.199.111.153` | 300 |
| CNAME | `www` | `mariosanchez19.github.io.` | 300 |

Los cuatro registros A son de GitHub y son los mismos para todo el mundo; se
ponen los cuatro para que el sitio siga en pie si uno se cae. GitHub redirige
solo de `www` al dominio sin www.

El certificado HTTPS lo emite GitHub gratis (Let's Encrypt) y se renueva solo,
siempre que **Enforce HTTPS** siga activo en *Settings → Pages*.
