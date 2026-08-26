/* =========================================================
   MONCHI BOBA TEA — lógica del sitio
   ---------------------------------------------------------
   TODO EL CONTENIDO EDITABLE ESTÁ EN ESTE BLOQUE DE DATOS.
   Cambia precios, nombres, fotos o sucursales aquí y la
   página se actualiza sola. No hace falta tocar el HTML.
   ========================================================= */

/* ---------- 1. BEBIDAS FAVORITAS ---------- */
/* nota: los textos marcados con «REVISAR» no se alcanzaban a leer
   en la maqueta original; sustitúyelos por los nombres reales. */
const FAVORITOS = [
  {
    num: '#10',
    img: 'img/bebida-10.webp',
    desc: 'Frappé de fresa con yogurt y perlas explosivas',   // REVISAR
    precio: 105,
    tam: '24 oz'
  },
  {
    num: '#14',
    img: 'img/bebida-14.webp',
    desc: 'Taro cremoso con leche, perlas de tapioca y flan',   // REVISAR
    precio: 105,
    tam: '24 oz'
  },
  {
    num: '#17',
    img: 'img/bebida-17.webp',
    desc: 'Chocolate con leche, crema batida y galleta oreo',   // REVISAR
    precio: 95,
    tam: '24 oz'
  },
  {
    num: '#20',
    img: 'img/bebida-20.webp',
    desc: 'Matcha latte con perlas de tapioca y jelly',         // REVISAR
    precio: 105,
    tam: '24 oz'
  },
  {
    num: '#22',
    img: 'img/bebida-22.webp',
    desc: 'Yogurt con fresa natural y perlas explosivas',       // REVISAR
    precio: 95,
    tam: '24 oz'
  },
  {
    num: '#31',
    img: 'img/bebida-31.webp',
    desc: 'Choco fresa con crema batida y perlas de tapioca',   // REVISAR
    precio: 95,
    tam: '24 oz'
  }
];

/* ---------- 2. CAFÉ ---------- */
const CAFES = [
  { nombre: 'Café<br>Americano', img: 'img/cafe-americano.webp',       precio: 30 },
  { nombre: 'Chocolate<br>Latte', img: 'img/cafe-chocolate-latte.webp', precio: 69 },
  { nombre: 'Capuchino',          img: 'img/cafe-capuchino.webp',       precio: 50 },
  { nombre: 'Lechero',            img: 'img/cafe-lechero.webp',         precio: 50 }
];

/* ---------- 3. SUCURSALES ---------- */
/* Cambia `direccion` y `mapa` por los datos reales de cada tienda. */
const SUCURSALES = [
  {
    nombre: 'Plaza Américas',
    img: 'img/sucursal-1.webp',
    direccion: 'Boca del Río, Veracruz',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Plaza+Am%C3%A9ricas+Veracruz'
  },
  {
    nombre: 'Soriana Boca del Río',
    img: 'img/sucursal-2.webp',
    direccion: 'Boca del Río, Veracruz',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Soriana+Boca+del+R%C3%ADo+Veracruz'
  },
  {
    nombre: 'Plaza Las Brisas',
    img: 'img/sucursal-3.webp',
    direccion: 'Veracruz, Veracruz',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Plaza+Las+Brisas+Veracruz'
  },
  {
    nombre: 'Plaza Mocambo',
    img: 'img/sucursal-4.webp',
    direccion: 'Boca del Río, Veracruz',
    mapa: 'https://www.google.com/maps/search/?api=1&query=Plaza+Mocambo+Boca+del+R%C3%ADo'
  }
];


/* =========================================================
   RENDER
   ========================================================= */
const $  = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function precioHTML(valor) {
  return `<p class="card__price"><sup>$</sup>${valor}</p>`;
}

/* Dimensiones reales de los archivos. Se declaran en el HTML para que el
   navegador reserve el espacio y la página no salte al cargar. */
const MEDIDAS = { bebida: [300, 428], cafe: [300, 495], sucursal: [640, 545] };

function renderFavoritos() {
  const cont = $('#cardsFavoritos');
  if (!cont) return;
  const [w, h] = MEDIDAS.bebida;
  cont.innerHTML = FAVORITOS.map(p => `
    <article class="card reveal">
      <div class="card__img">
        <img src="${p.img}" alt="Bebida Monchi ${p.num}" width="${w}" height="${h}" loading="lazy">
      </div>
      <div class="card__body">
        <p class="card__desc">${p.desc}</p>
        ${precioHTML(p.precio)}
        <p class="card__note">${p.tam}</p>
      </div>
    </article>
  `).join('');
}

function renderCafes() {
  const cont = $('#cardsCafe');
  if (!cont) return;
  const [w, h] = MEDIDAS.cafe;
  cont.innerHTML = CAFES.map(c => `
    <article class="card reveal">
      <div class="card__img">
        <img src="${c.img}" alt="${c.nombre.replace(/<br>/g, ' ')}" width="${w}" height="${h}" loading="lazy">
      </div>
      <div class="card__body">
        <h3 class="card__name">${c.nombre}</h3>
        ${precioHTML(c.precio)}
      </div>
    </article>
  `).join('');
}

function renderSucursales() {
  const cont = $('#gridSucursales');
  if (!cont) return;
  const [w, h] = MEDIDAS.sucursal;
  cont.innerHTML = SUCURSALES.map(s => `
    <article class="sucursal reveal">
      <div class="sucursal__foto">
        <img src="${s.img}" alt="Sucursal Monchi Boba Tea ${s.nombre}" width="${w}" height="${h}" loading="lazy">
      </div>
      <h3 class="sucursal__nombre">${s.nombre}</h3>
      <p class="sucursal__dir">${s.direccion}</p>
      <a class="sucursal__mapa" href="${s.mapa}" target="_blank" rel="noopener">Cómo llegar</a>
    </article>
  `).join('');
}


/* =========================================================
   INTERACCIONES
   ========================================================= */

/* Menú móvil */
function initMenu() {
  const btn = $('#hamburger');
  const nav = $('#nav');
  if (!btn || !nav) return;

  /* Mismo punto de corte que el CSS: por debajo de 960px el menú es un panel
     desplegable; por encima es la barra de siempre. */
  const movil = window.matchMedia('(max-width: 960px)');

  /* `inert` saca los enlaces del orden de tabulación y del árbol de
     accesibilidad mientras el panel está cerrado. Sin esto, en móvil se
     podría tabular hasta enlaces que no se ven. */
  const sincronizar = () => {
    const abierto = nav.classList.contains('is-open');
    nav.inert = movil.matches && !abierto;
    btn.classList.toggle('is-open', abierto);
    btn.setAttribute('aria-expanded', String(abierto));
    btn.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
  };

  const cerrar = () => { nav.classList.remove('is-open'); sincronizar(); };

  btn.addEventListener('click', () => {
    nav.classList.toggle('is-open');
    sincronizar();
  });

  nav.addEventListener('click', e => {
    if (e.target.closest('a')) cerrar();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
      cerrar();
      btn.focus();
    }
  });

  movil.addEventListener('change', cerrar);
  sincronizar();
}

/* Sombra del header al hacer scroll */
function initHeaderScroll() {
  const header = $('#header');
  if (!header) return;
  const actualizar = () => header.classList.toggle('is-stuck', window.scrollY > 12);
  actualizar();
  window.addEventListener('scroll', actualizar, { passive: true });
}

/* Enlace activo según la sección visible */
function initScrollSpy() {
  const enlaces = $$('.nav__link');
  const secciones = enlaces
    .map(a => {
      const el = document.querySelector(a.getAttribute('href'));
      return el ? { a, el } : null;
    })
    .filter(Boolean);
  if (!secciones.length) return;

  const marcar = () => {
    const y = window.scrollY + window.innerHeight * 0.35;
    let actual = secciones[0];
    for (const s of secciones) {
      if (s.el.offsetTop <= y) actual = s;
    }
    enlaces.forEach(a => a.classList.remove('is-active'));
    actual.a.classList.add('is-active');
  };

  marcar();
  window.addEventListener('scroll', marcar, { passive: true });
}

/* Aparición progresiva de elementos */
function initReveal() {
  const elementos = $$('.reveal');
  if (!elementos.length) return;

  if (!('IntersectionObserver' in window)) {
    elementos.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver((entradas, obs) => {
    let orden = 0;   // escalona sólo los que entran de verdad en pantalla
    entradas.forEach(entrada => {
      if (!entrada.isIntersecting) return;
      const retraso = Math.min(orden++ * 70, 350);
      const el = entrada.target;
      el.style.transitionDelay = `${retraso}ms`;
      el.classList.add('is-visible');
      obs.unobserve(el);
      /* Se limpia el retraso al terminar: si se quedara puesto, también
         retrasaría el hover de las tarjetas y se sentiría lento. */
      setTimeout(() => { el.style.transitionDelay = ''; }, retraso + 800);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  elementos.forEach(el => io.observe(el));
}

/* Año del pie */
function initAnio() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}


/* ---------- Arranque ---------- */
document.addEventListener('DOMContentLoaded', () => {
  renderFavoritos();
  renderCafes();
  renderSucursales();
  initMenu();
  initHeaderScroll();
  initScrollSpy();
  initReveal();   // después de renderizar, para observar también las tarjetas
  initAnio();
});
