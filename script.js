(function () {
  var $ = function (s) { return document.querySelector(s); };

  // Navegación activa
  var enlaces = document.querySelectorAll('.nav__menu a');
  Array.prototype.forEach.call(enlaces, function (a) {
    a.addEventListener('click', function () {
      Array.prototype.forEach.call(enlaces, function (x) { x.classList.remove('activo'); });
      a.classList.add('activo');
    });
  });

  var footerChat = $('#footerChat');
  if (footerChat) {
    footerChat.addEventListener('click', function (ev) {
      ev.preventDefault();
      if (window.ChatbotCidiWidget) window.ChatbotCidiWidget.abrir();
      else window.dispatchEvent(new Event('chatbot:abrir'));
    });
  }

  // Buscador de material
  var buscador = $('#buscador-material');
  var btnLupa = $('#btnLupa');
  var formBuscador = $('#formBuscador');
  var inputBuscador = $('#inputBuscador');
  var estadoBuscador = $('#buscadorEstado');
  var resultadosBuscador = $('#buscadorResultados');
  var btnCerrarBuscador = $('#cerrarBuscador');
  var overlayBuscador = buscador ? buscador.querySelector('[data-buscador-cerrar]') : null;
  var ultimoFoco = null;

  var materiales = [
    { titulo: 'Módulo 1 · Introducción a CiDi', descripcion: 'Qué es Ciudadano Digital, registro, inicio de sesión y conceptos básicos.', url: 'modulos/modulo1-Intro.html', tipo: 'Módulo', palabras: 'introduccion cidi que es registrarse crear cuenta iniciar sesion dni cuil contraseña modulo 1' },
    { titulo: 'Módulo 2 · Nivel 2 en CiDi', descripcion: 'Qué significa ser nivel 2, beneficios y cómo validar tu identidad.', url: 'modulos/modulo2-Nivel2.html', tipo: 'Módulo', palabras: 'nivel 2 identidad validada validacion verificacion beneficios tramite presencial app selfie pin modulo 2' },
    { titulo: 'Módulo 3 · Gestión de trámites', descripcion: 'Trámites disponibles en CiDi, e-trámite, seguimiento y pendientes.', url: 'modulos/modulo3-Tramites.html', tipo: 'Módulo', palabras: 'tramites e-tramite etramite seguir mis pendientes solicitudes expediente consulta modulo 3' },
    { titulo: 'Módulo 4 · Gestión de firma CiDi', descripcion: 'Cómo firmar documentos, PIN de seguridad y solicitudes de firma.', url: 'modulos/modulo4-Firma.html', tipo: 'Módulo', palabras: 'firma digital firmar documentos pdf pin app cidi validador solicitudes modulo 4' },
    { titulo: 'Módulo 5 · Finaliza tu capacitación', descripcion: 'Evaluación final y cierre de la capacitación.', url: 'modulos/modulo5-Final.html', tipo: 'Módulo', palabras: 'final evaluacion evaluacion final certificado capacitacion modulo 5' },
    { titulo: 'Guía paso a paso: Obtener CiDi Nivel 2 (PDF)', descripcion: 'Documento descargable con el paso a paso para obtener CiDi Nivel 2.', url: 'docs/guia-cidi-nivel2.pdf', tipo: 'Guía PDF', palabras: 'guia descargar pdf nivel 2 obtener cidi app selfie presencial dni pin verificacion identidad' },
    { titulo: 'Videotutoriales', descripcion: 'Lista de reproducción con videos sobre el uso de Ciudadano Digital.', url: 'https://www.youtube.com/playlist?list=PLH7e_G46qhLtZcez-lP0spXUto8PGCz1V', tipo: 'Video', externo: true, palabras: 'videos videotutoriales tutoriales youtube pantallas como hacer' },
    { titulo: 'Preguntas frecuentes', descripcion: 'Respuestas claras a dudas comunes sobre CiDi y trámites relacionados.', url: 'preguntas-frecuentes.html', tipo: 'FAQ', palabras: 'preguntas frecuentes ayuda dudas cidi legajo lom mab licencia carpeta medica jubilacion' },
    { titulo: 'FAQ: ¿Qué es el CiDi y cómo creo mi cuenta?', descripcion: 'Registro en CiDi y niveles de acceso.', url: 'preguntas-frecuentes.html#faq-cidi-cuenta', tipo: 'FAQ', palabras: 'que es cidi crear cuenta registrarse nivel 1 nivel 2' },
    { titulo: 'FAQ: Apertura de legajo, antecedentes y títulos', descripcion: 'Cómo gestionar legajo docente y actualizar antecedentes.', url: 'preguntas-frecuentes.html#faq-legajo', tipo: 'FAQ', palabras: 'legajo docente antecedentes titulos junta clasificacion secundaria lom' },
    { titulo: 'FAQ: ¿Qué es la LOM y para qué sirve?', descripcion: 'Lista de Orden de Mérito para titularidad, interinatos y suplencias.', url: 'preguntas-frecuentes.html#faq-lom', tipo: 'FAQ', palabras: 'lom lista orden merito puntaje titularidad interinato suplencia' },
    { titulo: 'FAQ: Consultar LOM', descripcion: 'Dónde ver la Lista de Orden de Mérito y cómo reclamar.', url: 'preguntas-frecuentes.html#faq-lom-consulta', tipo: 'FAQ', palabras: 'consultar lom orden merito recurso reconsideracion junta clasificacion' },
    { titulo: 'FAQ: Horas cátedra, vacantes y suplencias', descripcion: 'Cómo consultar vacantes e inscribirse.', url: 'preguntas-frecuentes.html#faq-vacantes', tipo: 'FAQ', palabras: 'horas catedra vacantes suplencias interinos titulares gestionar vacantes inscripcion' },
    { titulo: 'FAQ: Resultados de convocatoria', descripcion: 'Cómo conocer el resultado de una convocatoria.', url: 'preguntas-frecuentes.html#faq-convocatoria', tipo: 'FAQ', palabras: 'resultados convocatoria inscripcion puntaje centro educativo' },
    { titulo: 'FAQ: ¿Qué es un MAB?', descripcion: 'Movimiento de Altas y Bajas y su importancia para haberes.', url: 'preguntas-frecuentes.html#faq-mab', tipo: 'FAQ', palabras: 'mab movimiento altas bajas haberes liquidacion empleado digital seguimiento' },
    { titulo: 'FAQ: Apto Psicofísico', descripcion: 'Examen médico para ingresar a la Administración Pública Provincial.', url: 'preguntas-frecuentes.html#faq-apto-psicofisico', tipo: 'FAQ', palabras: 'apto psicofisico examen medico requisitos ingreso administracion publica' },
    { titulo: 'FAQ: Constancia de Servicios', descripcion: 'Cómo obtener la constancia que acredita tu vínculo laboral.', url: 'preguntas-frecuentes.html#faq-constancia-servicios', tipo: 'FAQ', palabras: 'constancia servicios vinculo laboral empleado digital tramite' },
    { titulo: 'FAQ: Escala salarial docente', descripcion: 'Dónde consultar la escala salarial vigente.', url: 'preguntas-frecuentes.html#faq-escala-salarial', tipo: 'FAQ', palabras: 'escala salarial docente sueldo haberes vigente' },
    { titulo: 'FAQ: Licencias y ausentismos', descripcion: 'Cómo solicitar licencias desde Empleado Digital.', url: 'preguntas-frecuentes.html#faq-licencias', tipo: 'FAQ', palabras: 'licencias ausentismos solicitud autogestion empleado digital' },
    { titulo: 'FAQ: Carpeta médica', descripcion: 'Cómo gestionar una carpeta médica por enfermedad.', url: 'preguntas-frecuentes.html#faq-carpeta-medica', tipo: 'FAQ', palabras: 'carpeta medica enfermedad corto largo tratamiento 0800 888 326' },
    { titulo: 'FAQ: Justificación de licencia por enfermedad', descripcion: 'Cuándo y cómo justificar una licencia por enfermedad.', url: 'preguntas-frecuentes.html#faq-justificacion-enfermedad', tipo: 'FAQ', palabras: 'justificacion licencia enfermedad medico control domiciliario mcd formulario 48 horas' },
    { titulo: 'FAQ: Junta Médica', descripcion: 'Cómo solicitar una junta médica.', url: 'preguntas-frecuentes.html#faq-junta-medica', tipo: 'FAQ', palabras: 'junta medica turno alta prorroga adecuacion tareas turnosjuntas' },
    { titulo: 'FAQ: Jubilación docente', descripcion: 'Requisitos e inicio del trámite de jubilación.', url: 'preguntas-frecuentes.html#faq-jubilacion', tipo: 'FAQ', palabras: 'jubilacion docente caja jubilaciones historia laboral requisitos tramite' },
    { titulo: 'FAQ: Boleto Educativo Gratuito (B.E.G.)', descripcion: 'Cómo tramitar el boleto educativo gratuito.', url: 'preguntas-frecuentes.html#faq-boleto-educativo', tipo: 'FAQ', palabras: 'boleto educativo gratuito beg transporte estudiantes docentes 0800 888 1234' },
    { titulo: 'FAQ: Vacunación contra Covid-19', descripcion: 'Información y turnos para vacunación.', url: 'preguntas-frecuentes.html#faq-vacunacion-covid', tipo: 'FAQ', palabras: 'vacunacion covid 19 turno vacuna inscripcion' }
  ];

  function normalizar(texto) {
    return (texto || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  function abrirBuscador() {
    if (!buscador) return;
    ultimoFoco = document.activeElement;
    buscador.hidden = false;
    buscador.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-abierto');
    if (inputBuscador) {
      inputBuscador.value = '';
      inputBuscador.focus();
    }
    mostrarResultados('');
  }

  function cerrarBuscador() {
    if (!buscador) return;
    buscador.hidden = true;
    buscador.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-abierto');
    if (ultimoFoco && typeof ultimoFoco.focus === 'function') ultimoFoco.focus();
  }

  function mostrarResultados(consulta) {
    if (!resultadosBuscador || !estadoBuscador) return;
    var q = normalizar(consulta.trim());
    resultadosBuscador.innerHTML = '';

    if (!q) {
      estadoBuscador.textContent = 'Escribí para buscar en los materiales de la capacitación.';
      return;
    }

    var terminos = q.split(/\s+/).filter(Boolean);
    var encontrados = materiales.filter(function (item) {
      var haystack = normalizar(item.titulo + ' ' + item.descripcion + ' ' + item.palabras + ' ' + item.tipo);
      return terminos.every(function (t) { return haystack.indexOf(t) !== -1; });
    });

    if (!encontrados.length) {
      estadoBuscador.textContent = 'No se encontraron resultados para "' + consulta.trim() + '". Probá con otras palabras.';
      return;
    }

    estadoBuscador.textContent = encontrados.length + (encontrados.length === 1 ? ' resultado encontrado.' : ' resultados encontrados.');
    encontrados.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'buscador-modal__item';
      var a = document.createElement('a');
      a.className = 'buscador-modal__enlace';
      a.href = item.url;
      if (item.externo) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      var meta = document.createElement('span');
      meta.className = 'buscador-modal__tipo';
      meta.textContent = item.tipo;
      var titulo = document.createElement('span');
      titulo.className = 'buscador-modal__titulo-item';
      titulo.textContent = item.titulo;
      var desc = document.createElement('span');
      desc.className = 'buscador-modal__desc';
      desc.textContent = item.descripcion;
      a.appendChild(meta);
      a.appendChild(titulo);
      a.appendChild(desc);
      a.addEventListener('click', function () { cerrarBuscador(); });
      li.appendChild(a);
      resultadosBuscador.appendChild(li);
    });
  }

  if (btnLupa) {
    btnLupa.addEventListener('click', function (ev) {
      ev.preventDefault();
      abrirBuscador();
    });
  }
  if (btnCerrarBuscador) btnCerrarBuscador.addEventListener('click', cerrarBuscador);
  if (overlayBuscador) overlayBuscador.addEventListener('click', cerrarBuscador);
  if (formBuscador) {
    formBuscador.addEventListener('submit', function (ev) { ev.preventDefault(); });
  }
  if (inputBuscador) {
    inputBuscador.addEventListener('input', function () {
      mostrarResultados(inputBuscador.value);
    });
  }
  document.addEventListener('keydown', function (ev) {
    if (!buscador || buscador.hidden) return;
    if (ev.key === 'Escape') cerrarBuscador();
  });
})();
