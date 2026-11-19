(function () {
  var script = document.currentScript;
  if (!script) {
    var scripts = document.getElementsByTagName('script');
    script = scripts[scripts.length - 1] || { src: '' };
  }

  var base = String(script.src || '').replace(/[^/]*$/, '');
  var raiz = base.replace(/chatbot\/$/, '');

  var RESPALDO = {
    bienvenida: '¡Hola! Soy el asistente de la capacitación CiDi. Escribí una pregunta sobre la plataforma.',
    sinResultado: 'No pude cargar las respuestas en este momento. Intentá actualizar la página.',
    sugerencias: [],
    enlacePorDefecto: null,
    respuestas: []
  };

  var datos = window.ChatbotCidi || RESPALDO;
  var boton;
  var panel;
  var cuerpo;
  var campo;
  var ultimaApertura = 0;

  var VACIAS = [
    'de', 'del', 'la', 'las', 'los', 'un', 'una', 'unos', 'unas', 'y', 'o', 'a', 'al', 'el',
    'que', 'como', 'para', 'por', 'con', 'en', 'mi', 'mis', 'tu', 'tus', 'su', 'sus', 'es',
    'son', 'se', 'me', 'yo', 'necesito', 'quiero', 'saber', 'dame', 'info', 'informacion',
    'porque', 'cuando', 'cual', 'cuales', 'hay', 'puedo', 'tengo', 'esta', 'veo', 'hago',
    'hacer', 'ser', 'favor', 'gracias', 'hola'
  ];

  function normalizar(texto) {
    var mapa = {
      'á': 'a', 'à': 'a', 'ä': 'a', 'é': 'e', 'è': 'e', 'ë': 'e',
      'í': 'i', 'ì': 'i', 'ï': 'i', 'ó': 'o', 'ò': 'o', 'ö': 'o',
      'ú': 'u', 'ù': 'u', 'ü': 'u', 'ñ': 'n', 'ç': 'c'
    };

    return String(texto || '')
      .toLowerCase()
      .replace(/[áàäéèëíìïóòöúùüñç]/g, function (caracter) {
        return mapa[caracter] || caracter;
      })
      .replace(/[^a-z0-9\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function limpio(texto) {
    var normalizado = normalizar(texto);
    if (!normalizado) return '';
    return normalizado.split(' ').filter(function (palabra) {
      return VACIAS.indexOf(palabra) === -1;
    }).join(' ');
  }

  function raizPalabra(palabra) {
    return palabra.length >= 4 ? palabra.slice(0, 4) : palabra;
  }

  function puntuar(entrada, consulta, tokens) {
    var puntos = 0;

    (entrada.preguntas || []).forEach(function (pregunta) {
      var normalizada = limpio(pregunta);
      if (!normalizada) return;
      if (normalizada === consulta) puntos += 14;
      else if (consulta.indexOf(normalizada) > -1) puntos += 9;
    });

    (entrada.palabras || []).forEach(function (palabra) {
      var normalizada = limpio(palabra);
      if (!normalizada) return;

      var partes = normalizada.split(' ');
      if (consulta.indexOf(normalizada) > -1) {
        puntos += 6 + Math.min(normalizada.length, 14) / 3;
        return;
      }

      partes.forEach(function (parte) {
        if (tokens.indexOf(parte) > -1) {
          puntos += 3 + Math.min(parte.length, 10) / 5;
          return;
        }
        if (parte.length >= 4) {
          for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].length >= 4 && raizPalabra(tokens[i]) === raizPalabra(parte)) {
              puntos += 1;
              return;
            }
          }
        }
      });
    });

    return puntos + (entrada.prioridad || 0);
  }

  function responder(pregunta) {
    var texto = String(pregunta || '').trim();
    if (!texto) return null;

    var consulta = limpio(texto);
    var tokens = consulta ? consulta.split(' ') : [];
    var mejor = null;
    var mejorPuntos = 0;

    (datos.respuestas || []).forEach(function (entrada) {
      var puntos = puntuar(entrada, consulta, tokens);
      if (puntos > mejorPuntos) {
        mejorPuntos = puntos;
        mejor = entrada;
      }
    });

    if (mejor && mejorPuntos >= 5) {
      return {
        texto: mejor.respuesta,
        enlaces: mejor.enlaces || [],
        categoria: mejor.categoria || ''
      };
    }

    return {
      texto: datos.sinResultado,
      enlaces: datos.enlacePorDefecto ? [datos.enlacePorDefecto] : [],
      categoria: '',
      sinResultado: true
    };
  }

  window.ChatbotCidiMotor = {
    normalizar: normalizar,
    limpio: limpio,
    puntuar: puntuar,
    responder: responder
  };

  function resolverUrl(url) {
    var destino = String(url || '');
    if (/^https?:\/\//i.test(destino)) return destino;
    if (typeof URL === 'function' && raiz) {
      try { return new URL(destino, raiz).href; } catch (e) {}
    }
    return destino;
  }

  function cargarEstilos() {
    if (document.querySelector('link[data-chatbot-estilos]')) return;
    var enlace = document.createElement('link');
    enlace.rel = 'stylesheet';
    enlace.href = base + 'chatbot.css';
    enlace.setAttribute('data-chatbot-estilos', '');
    document.head.appendChild(enlace);
  }

  function cargarConocimiento(listo) {
    if (window.ChatbotCidi) {
      listo(window.ChatbotCidi);
      return;
    }

    var existente = document.querySelector('script[data-chatbot-conocimiento]');
    if (existente) {
      existente.addEventListener('load', function () {
        listo(window.ChatbotCidi || RESPALDO);
      });
      return;
    }

    var fuente = document.createElement('script');
    fuente.src = base + 'conocimiento.js';
    fuente.setAttribute('data-chatbot-conocimiento', '');
    fuente.onload = function () { listo(window.ChatbotCidi || RESPALDO); };
    fuente.onerror = function () { listo(RESPALDO); };
    document.head.appendChild(fuente);
  }

  function crearBoton() {
    boton = document.createElement('button');
    boton.type = 'button';
    boton.id = 'chatbotBoton';
    boton.className = 'chatbot-boton';
    boton.setAttribute('aria-controls', 'chatbotPanel');
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir asistente de CiDi');
    boton.innerHTML =
      '<svg class="chatbot-icono" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
      '<path d="M21 11.5a8.5 8.5 0 0 1-12.2 7.7L3 21l1.8-5.8A8.5 8.5 0 1 1 21 11.5z"/>' +
      '</svg>' +
      '<span class="chatbot-boton__texto">Preguntá sobre CiDi</span>';

    boton.addEventListener('click', alternar);
    document.body.appendChild(boton);
  }

  function crearPanel() {
    panel = document.createElement('div');
    panel.id = 'chatbotPanel';
    panel.className = 'chatbot-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-labelledby', 'chatbotTitulo');
    panel.hidden = true;
    panel.innerHTML =
      '<div class="chatbot-panel__cabecera">' +
        '<div class="chatbot-panel__identidad">' +
          '<span class="chatbot-avatar" aria-hidden="true">' +
            '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" focusable="false">' +
            '<path d="M12 3a7 7 0 0 0-7 7c0 2.4 1.2 4.5 3 5.8V19h8v-3.2A7 7 0 0 0 19 10a7 7 0 0 0-7-7z"/>' +
            '<path d="M9.5 21h5"/>' +
            '</svg>' +
          '</span>' +
          '<span class="chatbot-panel__titulos">' +
            '<strong id="chatbotTitulo">Asistente CiDi</strong>' +
            '<small>Preguntas sobre la capacitación</small>' +
          '</span>' +
        '</div>' +
        '<button type="button" class="chatbot-cerrar" aria-label="Cerrar asistente">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true" focusable="false">' +
          '<path d="M6 6l12 12M18 6L6 18"/>' +
          '</svg>' +
        '</button>' +
      '</div>' +
      '<div class="chatbot-mensajes" id="chatbotMensajes" role="log" aria-live="polite" aria-label="Conversación con el asistente"></div>' +
      '<div class="chatbot-sugerencias" id="chatbotSugerencias" role="group" aria-label="Preguntas sugeridas"></div>' +
      '<form class="chatbot-formulario" id="chatbotFormulario">' +
        '<label class="chatbot-sr-only" for="chatbotInput">Escribí tu pregunta sobre CiDi</label>' +
        '<input id="chatbotInput" type="text" autocomplete="off" maxlength="240" placeholder="Escribí tu pregunta…">' +
        '<button type="submit" aria-label="Enviar pregunta">' +
          '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' +
          '<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>' +
          '</svg>' +
        '</button>' +
      '</form>';

    cuerpo = panel.querySelector('#chatbotMensajes');
    campo = panel.querySelector('#chatbotInput');

    panel.querySelector('.chatbot-cerrar').addEventListener('click', cerrar);
    panel.querySelector('#chatbotFormulario').addEventListener('submit', function (evento) {
      evento.preventDefault();
      var valor = campo.value.trim();
      if (!valor) return;
      campo.value = '';
      enviar(valor);
    });

    document.body.appendChild(panel);
  }

  function crearEnlaces(enlaces, contenedor) {
    (enlaces || []).forEach(function (enlace) {
      if (!enlace || !enlace.url) return;
      var ancla = document.createElement('a');
      ancla.className = 'chatbot-enlace';
      ancla.textContent = enlace.texto || 'Ver más';
      ancla.href = resolverUrl(enlace.url);
      if (/^https?:\/\//i.test(String(enlace.url))) {
        ancla.target = '_blank';
        ancla.rel = 'noopener noreferrer';
      }
      contenedor.appendChild(ancla);
    });
  }

  function agregarMensaje(texto, tipo, enlaces) {
    var fila = document.createElement('div');
    fila.className = 'chatbot-mensaje chatbot-mensaje--' + tipo;

    var burbuja = document.createElement('div');
    burbuja.className = 'chatbot-mensaje__burbuja';

    var parrafo = document.createElement('p');
    parrafo.textContent = texto;
    burbuja.appendChild(parrafo);

    if (enlaces && enlaces.length) {
      var grupo = document.createElement('div');
      grupo.className = 'chatbot-mensaje__enlaces';
      crearEnlaces(enlaces, grupo);
      burbuja.appendChild(grupo);
    }

    fila.appendChild(burbuja);
    cuerpo.appendChild(fila);
    cuerpo.scrollTop = cuerpo.scrollHeight;
  }

  function crearSugerencias() {
    var contenedor = panel.querySelector('#chatbotSugerencias');
    (datos.sugerencias || []).forEach(function (texto) {
      var botonSugerencia = document.createElement('button');
      botonSugerencia.type = 'button';
      botonSugerencia.className = 'chatbot-sugerencia';
      botonSugerencia.textContent = texto;
      botonSugerencia.addEventListener('click', function () { enviar(texto); });
      contenedor.appendChild(botonSugerencia);
    });
  }

  function abrir() {
    if (!panel || !boton) return;
    ultimaApertura = Date.now();
    panel.hidden = false;
    boton.setAttribute('aria-expanded', 'true');
    boton.setAttribute('aria-label', 'Cerrar asistente de CiDi');
    boton.classList.add('chatbot-boton--abierto');
    campo.focus();
  }

  function cerrar() {
    if (!panel || !boton) return;
    panel.hidden = true;
    boton.setAttribute('aria-expanded', 'false');
    boton.setAttribute('aria-label', 'Abrir asistente de CiDi');
    boton.classList.remove('chatbot-boton--abierto');
    boton.focus();
  }

  function alternar() {
    if (panel.hidden) abrir();
    else cerrar();
  }

  function enviar(pregunta) {
    var texto = String(pregunta || '').trim();
    if (!texto) return;
    agregarMensaje(texto, 'usuario');
    var respuesta = responder(texto);
    if (respuesta) agregarMensaje(respuesta.texto, 'bot', respuesta.enlaces);
  }

  function iniciar(info) {
    datos = info || RESPALDO;
    if (document.getElementById('chatbotBoton')) return;

    crearBoton();
    crearPanel();
    crearSugerencias();
    agregarMensaje(datos.bienvenida, 'bot');

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape' && !panel.hidden) cerrar();
    });

    document.addEventListener('click', function (evento) {
      if (panel.hidden) return;
      if (Date.now() - ultimaApertura < 200) return;
      if (!panel.contains(evento.target) && !boton.contains(evento.target)) cerrar();
    });

    window.addEventListener('chatbot:abrir', abrir);
    window.addEventListener('chatbot:preguntar', function (evento) {
      abrir();
      if (evento && evento.detail) enviar(evento.detail);
    });

    window.ChatbotCidiWidget = {
      abrir: abrir,
      cerrar: cerrar,
      enviar: enviar,
      responder: responder
    };
  }

  cargarEstilos();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      cargarConocimiento(iniciar);
    });
  } else {
    cargarConocimiento(iniciar);
  }
})();
