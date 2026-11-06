(function () {
  var CLAVE = 'accesibilidad';
  var raiz = document.documentElement;
  var MIN = 80;
  var MAX = 200;
  var PASO = 10;

  var estado = {
    texto: 100,
    contraste: 'normal',
    vision: 'normal'
  };

  function cargar() {
    try {
      var guardado = JSON.parse(localStorage.getItem(CLAVE) || 'null');
      if (!guardado) return;
      if (typeof guardado.texto === 'number' && isFinite(guardado.texto)) {
        estado.texto = Math.min(MAX, Math.max(MIN, Math.round(guardado.texto / PASO) * PASO));
      }
      if (guardado.contraste === 'alto') estado.contraste = 'alto';
      if (['protanopia', 'deuteranopia', 'tritanopia'].indexOf(guardado.vision) > -1) {
        estado.vision = guardado.vision;
      }
    } catch (e) {}
  }

  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(estado)); } catch (e) {}
  }

  function aplicar() {
    raiz.style.fontSize = estado.texto + '%';
    raiz.setAttribute('data-texto', String(estado.texto));
    raiz.setAttribute('data-contraste', estado.contraste);
    raiz.setAttribute('data-vision', estado.vision);
  }

  cargar();
  aplicar();

  var sintesis = window.speechSynthesis;
  var vozSoportada = !!sintesis && typeof window.SpeechSynthesisUtterance === 'function';
  var leyendo = false;
  var pausado = false;
  var sesion = 0;

  function inyectarSkip() {
    if (document.querySelector('.saltar-contenido')) return;
    var main = document.querySelector('main');
    if (!main) return;
    if (!main.id) main.id = 'contenido-principal';
    main.setAttribute('tabindex', '-1');

    var enlace = document.createElement('a');
    enlace.className = 'saltar-contenido';
    enlace.href = '#' + main.id;
    enlace.textContent = 'Saltar al contenido principal';
    enlace.addEventListener('click', function () {
      setTimeout(function () { main.focus(); }, 0);
    });
    document.body.insertBefore(enlace, document.body.firstChild);
  }

  function crearMenu() {
    var boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'a11y-flotante';
    boton.id = 'a11yBoton';
    boton.setAttribute('aria-label', 'Abrir menú de accesibilidad');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-controls', 'a11yPanel');
    boton.title = 'Opciones de accesibilidad';
    boton.innerHTML =
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      '<circle cx="12" cy="12" r="10"/>' +
      '<circle cx="12" cy="6.8" r="1.6" fill="currentColor" stroke="none"/>' +
      '<path d="M5.8 10.3c2.2.9 3.9 1.2 6.2 1.2s4-.3 6.2-1.2"/>' +
      '<path d="M12 11.5v3.2"/>' +
      '<path d="M8.6 21l3.4-6.3 3.4 6.3"/>' +
      '</svg>';

    var panel = document.createElement('div');
    panel.className = 'a11y-panel';
    panel.id = 'a11yPanel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Opciones de accesibilidad');
    panel.innerHTML =
      '<div class="a11y-panel__cabecera">' +
      '<h2>Accesibilidad</h2>' +
      '<button type="button" class="a11y-panel__cerrar" id="a11yCerrar" aria-label="Cerrar menú de accesibilidad">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg>' +
      '</button>' +
      '</div>' +

      '<section class="a11y-seccion">' +
      '<h3>Tamaño del texto</h3>' +
      '<div class="a11y-fila">' +
      '<button type="button" class="a11y-opcion a11y-opcion--texto" id="a11yTextoMenos" aria-label="Reducir tamaño del texto">A−</button>' +
      '<span class="a11y-valor" id="a11yTextoValor" aria-live="polite">100%</span>' +
      '<button type="button" class="a11y-opcion a11y-opcion--texto" id="a11yTextoMas" aria-label="Aumentar tamaño del texto">A+</button>' +
      '</div>' +
      '<button type="button" class="a11y-enlace" id="a11yTextoReset">Restablecer tamaño</button>' +
      '</section>' +

      '<section class="a11y-seccion">' +
      '<h3>Contraste</h3>' +
      '<div class="a11y-fila a11y-fila--opciones">' +
      '<button type="button" class="a11y-opcion" id="a11yContrasteNormal" aria-pressed="true">Normal</button>' +
      '<button type="button" class="a11y-opcion" id="a11yContrasteAlto" aria-pressed="false">Alto contraste</button>' +
      '</div>' +
      '</section>' +

      '<section class="a11y-seccion">' +
      '<h3><label for="a11yVision">Visión del color</label></h3>' +
      '<select class="a11y-select" id="a11yVision">' +
      '<option value="normal">Colores estándar</option>' +
      '<option value="protanopia">Protanopia</option>' +
      '<option value="deuteranopia">Deuteranopia</option>' +
      '<option value="tritanopia">Tritanopia</option>' +
      '</select>' +
      '</section>' +

      '<section class="a11y-seccion">' +
      '<h3>Lectura por voz</h3>' +
      '<p class="a11y-nota">Escuchá el contenido principal de la página.</p>' +
      '<div class="a11y-fila a11y-fila--opciones">' +
      '<button type="button" class="a11y-opcion" id="a11yLeer">Leer página</button>' +
      '<button type="button" class="a11y-opcion" id="a11yPausar" hidden>Pausar</button>' +
      '<button type="button" class="a11y-opcion" id="a11yDetener" hidden>Detener</button>' +
      '</div>' +
      '<p class="a11y-estado" id="a11yEstadoVoz" role="status" aria-live="polite"></p>' +
      '</section>';

    document.body.appendChild(boton);
    document.body.appendChild(panel);

    var cerrar = panel.querySelector('#a11yCerrar');
    var textoMenos = panel.querySelector('#a11yTextoMenos');
    var textoMas = panel.querySelector('#a11yTextoMas');
    var textoReset = panel.querySelector('#a11yTextoReset');
    var textoValor = panel.querySelector('#a11yTextoValor');
    var contrasteNormal = panel.querySelector('#a11yContrasteNormal');
    var contrasteAlto = panel.querySelector('#a11yContrasteAlto');
    var vision = panel.querySelector('#a11yVision');
    var leer = panel.querySelector('#a11yLeer');
    var pausar = panel.querySelector('#a11yPausar');
    var detener = panel.querySelector('#a11yDetener');
    var estadoVoz = panel.querySelector('#a11yEstadoVoz');

    if (!vozSoportada) {
      leer.disabled = true;
      panel.querySelector('.a11y-nota').textContent = 'La lectura por voz no está disponible en este navegador.';
    }

    function actualizarUI() {
      textoValor.textContent = estado.texto + '%';
      textoMenos.disabled = estado.texto <= MIN;
      textoMas.disabled = estado.texto >= MAX;
      contrasteNormal.setAttribute('aria-pressed', String(estado.contraste === 'normal'));
      contrasteAlto.setAttribute('aria-pressed', String(estado.contraste === 'alto'));
      vision.value = estado.vision;
    }

    function actualizarVoz() {
      leer.hidden = leyendo;
      pausar.hidden = !leyendo;
      detener.hidden = !leyendo;
      pausar.textContent = pausado ? 'Reanudar' : 'Pausar';
    }

    function anunciar(texto) {
      estadoVoz.textContent = texto;
    }

    function abrir() {
      panel.classList.add('abierto');
      boton.setAttribute('aria-expanded', 'true');
      actualizarUI();
      cerrar.focus();
    }

    function cerrarPanel() {
      panel.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
      boton.focus();
    }

    function cambiarTexto(delta) {
      estado.texto = Math.min(MAX, Math.max(MIN, estado.texto + delta));
      aplicar();
      guardar();
      actualizarUI();
    }

    boton.addEventListener('click', function () {
      if (panel.classList.contains('abierto')) cerrarPanel();
      else abrir();
    });

    cerrar.addEventListener('click', cerrarPanel);

    textoMenos.addEventListener('click', function () { cambiarTexto(-PASO); });
    textoMas.addEventListener('click', function () { cambiarTexto(PASO); });
    textoReset.addEventListener('click', function () { estado.texto = 100; aplicar(); guardar(); actualizarUI(); });

    contrasteNormal.addEventListener('click', function () {
      estado.contraste = 'normal'; aplicar(); guardar(); actualizarUI();
    });
    contrasteAlto.addEventListener('click', function () {
      estado.contraste = 'alto'; aplicar(); guardar(); actualizarUI();
    });

    vision.addEventListener('change', function () {
      estado.vision = vision.value; aplicar(); guardar(); actualizarUI();
    });

    function textoPrincipal() {
      var main = document.querySelector('main');
      if (!main) return '';
      return (main.innerText || main.textContent || '').replace(/\s+/g, ' ').trim();
    }

    function dividirTexto(texto) {
      var partes = [];
      var actual = '';
      var frases = texto.split(/(?<=[.!?])\s+/);
      frases.forEach(function (frase) {
        if ((actual + ' ' + frase).trim().length > 220 && actual) {
          partes.push(actual.trim());
          actual = frase;
        } else {
          actual = (actual + ' ' + frase).trim();
        }
      });
      if (actual) partes.push(actual.trim());
      return partes;
    }

    function detenerLectura(anunciarCambio) {
      sesion++;
      if (vozSoportada) sintesis.cancel();
      leyendo = false;
      pausado = false;
      actualizarVoz();
      if (anunciarCambio) anunciar('Lectura detenida.');
    }

    function leerPagina() {
      if (!vozSoportada) {
        anunciar('Tu navegador no admite lectura por voz.');
        return;
      }
      detenerLectura(false);
      var texto = textoPrincipal();
      if (!texto) {
        anunciar('No se encontró contenido para leer.');
        return;
      }
      var miSesion = ++sesion;
      var partes = dividirTexto(texto);
      partes.forEach(function (parte, indice) {
        var utterance = new SpeechSynthesisUtterance(parte);
        utterance.lang = 'es-AR';
        utterance.rate = 0.95;
        utterance.onend = function () {
          if (miSesion !== sesion) return;
          if (indice === partes.length - 1) {
            leyendo = false;
            pausado = false;
            actualizarVoz();
            anunciar('Lectura finalizada.');
          }
        };
        utterance.onerror = function () {
          if (miSesion !== sesion) return;
          leyendo = false;
          pausado = false;
          actualizarVoz();
          anunciar('No se pudo completar la lectura.');
        };
        sintesis.speak(utterance);
      });
      leyendo = true;
      pausado = false;
      actualizarVoz();
      anunciar('Leyendo el contenido de la página.');
    }

    function pausarReanudar() {
      if (!leyendo || !vozSoportada) return;
      if (pausado) {
        sintesis.resume();
        pausado = false;
        anunciar('Lectura reanudada.');
      } else {
        sintesis.pause();
        pausado = true;
        anunciar('Lectura en pausa.');
      }
      actualizarVoz();
    }

    leer.addEventListener('click', leerPagina);
    pausar.addEventListener('click', pausarReanudar);
    detener.addEventListener('click', function () { detenerLectura(true); });

    document.addEventListener('keydown', function (ev) {
      if (ev.key === 'Escape' && panel.classList.contains('abierto')) {
        cerrarPanel();
      }
    });

    document.addEventListener('click', function (ev) {
      if (!panel.classList.contains('abierto')) return;
      if (panel.contains(ev.target) || boton.contains(ev.target)) return;
      panel.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
    });

    actualizarUI();
    actualizarVoz();
  }

  document.addEventListener('DOMContentLoaded', function () {
    inyectarSkip();
    crearMenu();
  });
})();
