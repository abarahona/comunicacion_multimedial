(function () {
  var CLAVE = 'tema';
  var raiz = document.documentElement;

  function temaGuardado() {
    try { return localStorage.getItem(CLAVE); } catch (e) { return null; }
  }

  function actualizarBoton(tema) {
    var boton = document.getElementById('btnTema');
    if (!boton) return;
    var oscuro = tema === 'oscuro';
    var texto = oscuro ? 'Activar modo claro' : 'Activar modo oscuro';
    boton.setAttribute('aria-label', texto);
    boton.setAttribute('title', texto);
    boton.setAttribute('aria-pressed', String(oscuro));
  }

  function aplicar(tema) {
    raiz.setAttribute('data-tema', tema);
    try { localStorage.setItem(CLAVE, tema); } catch (e) {}
    actualizarBoton(tema);
  }

  function temaInicial() {
    var guardado = temaGuardado();
    if (guardado) return guardado;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'oscuro';
    }
    return 'claro';
  }

  var inicial = temaInicial();
  raiz.setAttribute('data-tema', inicial);

  document.addEventListener('DOMContentLoaded', function () {
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.id = 'btnTema';
    boton.className = 'icono-tema';
    boton.innerHTML =
      '<svg class="icono-tema__luna" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>' +
      '<svg class="icono-tema__sol" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';

    var acciones = document.querySelector('.header__acciones');
    var moduloHeader = document.querySelector('.modulo-header .contenedor');

    if (acciones) {
      acciones.insertBefore(boton, acciones.firstChild);
    } else if (moduloHeader) {
      moduloHeader.classList.add('modulo-header__inner');
      moduloHeader.appendChild(boton);
    } else {
      return;
    }

    actualizarBoton(raiz.getAttribute('data-tema'));

    boton.addEventListener('click', function () {
      var actual = raiz.getAttribute('data-tema') === 'oscuro' ? 'oscuro' : 'claro';
      aplicar(actual === 'oscuro' ? 'claro' : 'oscuro');
    });
  });

  if (window.matchMedia) {
    var consulta = window.matchMedia('(prefers-color-scheme: dark)');
    var alCambiar = function (ev) {
      if (temaGuardado()) return;
      var tema = ev.matches ? 'oscuro' : 'claro';
      raiz.setAttribute('data-tema', tema);
      actualizarBoton(tema);
    };
    if (consulta.addEventListener) consulta.addEventListener('change', alCambiar);
    else if (consulta.addListener) consulta.addListener(alCambiar);
  }
})();
