/* =========================================================
   PÁGINA DE DESCARGA — busca la última versión publicada
   ---------------------------------------------------------
   Los instaladores viven en GitHub Releases (es de donde también
   se actualizan solas las cajas). Como el nombre del archivo lleva
   la versión dentro, no existe un enlace fijo al último; se
   pregunta por él y se arma el botón.

   Si la consulta falla —sin internet, GitHub caído, límite de
   peticiones— el botón se queda como está en el HTML: apuntando a
   la página de releases, que siempre funciona.
   ========================================================= */

const REPO = 'mariosanchez19/monchi-erp-releases';
const API  = `https://api.github.com/repos/${REPO}/releases/latest`;

/* El instalador es el .exe que dice «Instalador». Los otros archivos de la
   publicación (.blockmap y latest.yml) los usa el actualizador automático,
   no una persona. */
const ES_INSTALADOR = /^Monchi-ERP-Instalador-.*\.exe$/i;

function pesoLegible(bytes) {
  return `${Math.round(bytes / 1024 / 1024)} MB`;
}

function fechaLegible(iso) {
  return new Date(iso).toLocaleDateString('es-MX', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}

async function cargarVersion() {
  const version = document.getElementById('version');
  const detalle = document.getElementById('detalle');
  const boton   = document.getElementById('btnDescargar');
  if (!version || !detalle || !boton) return;

  try {
    const res = await fetch(API, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) throw new Error(`GitHub respondió ${res.status}`);

    const release = await res.json();
    const exe = (release.assets || []).find(a => ES_INSTALADOR.test(a.name));
    if (!exe) throw new Error('La publicación no trae instalador');

    version.textContent = `Versión ${release.tag_name.replace(/^v/, '')}`;
    detalle.textContent =
      `Windows 10 u 11 · 64 bits · ${pesoLegible(exe.size)} · ${fechaLegible(release.published_at)}`;

    boton.href = exe.browser_download_url;
    boton.setAttribute('download', '');
  } catch (e) {
    /* Sin datos, pero con salida: el enlace del HTML lleva a la página de
       releases, donde el instalador se baja a mano. */
    version.textContent = 'Última versión';
    detalle.textContent = 'Windows 10 u 11 · 64 bits';
    document.getElementById('tarjeta')?.classList.add('descarga__card--manual');
    console.warn('No se pudo consultar la última versión:', e.message);
  }
}

function initAnio() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  cargarVersion();
  initAnio();
});
