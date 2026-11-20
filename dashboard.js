(function () {
  var modulos = [
    { id: 1, titulo: 'Introducción a CiDi', total: 3, url: 'modulos/modulo1-Intro.html' },
    { id: 2, titulo: 'Nivel 2 en CiDi', total: 5, url: 'modulos/modulo2-Nivel2.html' },
    { id: 3, titulo: 'Gestión de trámites', total: 4, url: 'modulos/modulo3-Tramites.html' },
    { id: 4, titulo: 'Firma CiDi', total: 5, url: 'modulos/modulo4-Firma.html' }
  ];

  function obtenerModulo(id) {
    for (var i = 0; i < modulos.length; i++) {
      if (modulos[i].id === Number(id)) return modulos[i];
    }
    return null;
  }

  function porcentaje(correctas, total) {
    if (!total) return 0;
    return Math.round((correctas / total) * 100);
  }

  function fecha(iso) {
    try {
      return new Intl.DateTimeFormat('es-AR', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(iso));
    } catch (e) {
      return String(iso);
    }
  }

  function elemento(tag, clase, texto) {
    var nodo = document.createElement(tag);
    if (clase) nodo.className = clase;
    if (texto !== undefined) nodo.textContent = texto;
    return nodo;
  }

  function intentos() {
    if (!window.ReporteQuizzes) return [];
    return window.ReporteQuizzes.obtener();
  }

  function estado(mensaje) {
    var nodo = document.getElementById('dashboardEstado');
    if (nodo) nodo.textContent = mensaje;
  }

  function resumen(datos) {
    var contenedor = document.getElementById('resumenGeneral');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    var correctas = 0;
    var respuestas = 0;
    var mejor = 0;
    datos.forEach(function (intento) {
      correctas += Number(intento.correctas) || 0;
      respuestas += Number(intento.total) || 0;
      mejor = Math.max(mejor, porcentaje(Number(intento.correctas) || 0, Number(intento.total) || 0));
    });
    var tarjetas = [
      { valor: String(datos.length), etiqueta: 'Intentos registrados' },
      { valor: correctas + ' / ' + respuestas, etiqueta: 'Respuestas correctas' },
      { valor: porcentaje(correctas, respuestas) + '%', etiqueta: 'Precisión global' },
      { valor: mejor + '%', etiqueta: 'Mejor resultado' }
    ];
    tarjetas.forEach(function (tarjeta) {
      var articulo = elemento('article', 'dashboard-stat');
      articulo.appendChild(elemento('p', 'dashboard-stat__valor', tarjeta.valor));
      articulo.appendChild(elemento('p', 'dashboard-stat__etiqueta', tarjeta.etiqueta));
      contenedor.appendChild(articulo);
    });
  }

  function avance(datos) {
    var contenedor = document.getElementById('avanceModulos');
    if (!contenedor) return;
    contenedor.innerHTML = '';
    modulos.forEach(function (modulo) {
      var propios = datos.filter(function (intento) { return Number(intento.modulo) === modulo.id; });
      var mejor = 0;
      var suma = 0;
      propios.forEach(function (intento) {
        var valor = porcentaje(Number(intento.correctas) || 0, Number(intento.total) || modulo.total);
        mejor = Math.max(mejor, valor);
        suma += valor;
      });
      var promedio = propios.length ? Math.round(suma / propios.length) : 0;
      var articulo = elemento('article', 'dashboard-modulo');
      articulo.appendChild(elemento('h3', 'dashboard-modulo__titulo', 'Módulo ' + modulo.id + ' · ' + modulo.titulo));
      articulo.appendChild(elemento('p', 'dashboard-modulo__detalle', propios.length
        ? propios.length + (propios.length === 1 ? ' intento registrado' : ' intentos registrados')
        : 'Sin intentos registrados'));
      var barra = elemento('div', 'dashboard-barra');
      barra.setAttribute('role', 'img');
      barra.setAttribute('aria-label', 'Mejor resultado: ' + mejor + '%');
      var relleno = elemento('span');
      relleno.style.width = mejor + '%';
      barra.appendChild(relleno);
      articulo.appendChild(barra);
      articulo.appendChild(elemento('p', 'dashboard-modulo__detalle', propios.length
        ? 'Mejor: ' + mejor + '% · Promedio: ' + promedio + '%'
        : 'Completá el quiz para ver tu avance.'));
      var enlace = elemento('a', 'enlace', propios.length ? 'Volver a practicar →' : 'Ir al módulo →');
      enlace.href = modulo.url;
      articulo.appendChild(enlace);
      contenedor.appendChild(articulo);
    });
  }

  function historial(datos) {
    var contenedor = document.getElementById('historialRespuestas');
    if (!contenedor) return;
    var filtro = document.getElementById('filtroModulo');
    var seleccionado = filtro ? filtro.value : 'todos';
    var visibles = datos.filter(function (intento) {
      return seleccionado === 'todos' || String(intento.modulo) === seleccionado;
    }).slice().sort(function (a, b) {
      return new Date(b.fecha) - new Date(a.fecha);
    });
    contenedor.innerHTML = '';
    if (!visibles.length) {
      contenedor.appendChild(elemento('p', 'dashboard-vacio', 'Todavía no hay respuestas registradas para este filtro. Completá un quiz para verlo acá.'));
      return;
    }
    visibles.forEach(function (intento, indice) {
      var modulo = obtenerModulo(intento.modulo);
      var tituloModulo = modulo ? modulo.titulo : intento.titulo || 'Módulo ' + intento.modulo;
      var puntaje = porcentaje(Number(intento.correctas) || 0, Number(intento.total) || (modulo ? modulo.total : 0));
      var detalles = elemento('details', 'dashboard-intento');
      if (indice === 0) detalles.open = true;
      var resumen = elemento('summary');
      resumen.appendChild(elemento('span', 'dashboard-intento__titulo', 'Módulo ' + intento.modulo + ' · ' + tituloModulo));
      resumen.appendChild(elemento('span', 'dashboard-intento__fecha', fecha(intento.fecha)));
      resumen.appendChild(elemento('span', 'dashboard-intento__puntaje', intento.correctas + '/' + intento.total + ' · ' + puntaje + '%'));
      detalles.appendChild(resumen);
      var lista = elemento('ul', 'dashboard-respuestas');
      var respuestas = Array.isArray(intento.respuestas) ? intento.respuestas : [];
      respuestas.forEach(function (respuesta) {
        var item = elemento('li', 'quiz-item ' + (respuesta.correcta ? 'quiz-item--ok' : 'quiz-item--error'));
        item.appendChild(elemento('strong', '', respuesta.pregunta));
        item.appendChild(elemento('span', '', 'Tu respuesta: ' + respuesta.elegida));
        if (!respuesta.correcta) {
          item.appendChild(elemento('span', '', 'Respuesta correcta: ' + respuesta.respuestaCorrecta));
        }
        lista.appendChild(item);
      });
      detalles.appendChild(lista);
      contenedor.appendChild(detalles);
    });
  }

  function renderizar() {
    var datos = intentos();
    resumen(datos);
    avance(datos);
    historial(datos);
    estado(datos.length
      ? 'Mostrando ' + datos.length + (datos.length === 1 ? ' intento registrado.' : ' intentos registrados.')
      : 'Todavía no hay intentos registrados.');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var filtro = document.getElementById('filtroModulo');
    if (filtro) filtro.addEventListener('change', function () { historial(intentos()); });

    var borrar = document.getElementById('btnBorrar');
    if (borrar) {
      borrar.addEventListener('click', function () {
        if (!window.confirm('¿Borrar todo el historial de respuestas? Esta acción no se puede deshacer.')) return;
        window.ReporteQuizzes.limpiar();
        renderizar();
      });
    }

    renderizar();
  });
})();
