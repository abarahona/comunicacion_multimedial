(function () {
  var CLAVE = 'reporteQuizzes';
  var LIMITE = 100;

  function leer() {
    try {
      var datos = JSON.parse(localStorage.getItem(CLAVE) || '{}');
      if (!datos || !Array.isArray(datos.intentos)) return [];
      return datos.intentos;
    } catch (e) {
      return [];
    }
  }

  function escribir(intentos) {
    try {
      localStorage.setItem(CLAVE, JSON.stringify({ version: 1, intentos: intentos }));
      return true;
    } catch (e) {
      return false;
    }
  }

  function guardar(intentos) {
    var registro = {
      id: Date.now() + '-' + Math.random().toString(36).slice(2, 8),
      fecha: new Date().toISOString(),
      modulo: intentos.modulo,
      titulo: intentos.titulo,
      correctas: intentos.correctas,
      total: intentos.total,
      respuestas: Array.isArray(intentos.respuestas) ? intentos.respuestas : []
    };
    var anteriores = leer();
    anteriores.push(registro);
    if (anteriores.length > LIMITE) anteriores = anteriores.slice(anteriores.length - LIMITE);
    return escribir(anteriores);
  }

  function obtener() {
    return leer();
  }

  function limpiar() {
    try {
      localStorage.removeItem(CLAVE);
      return true;
    } catch (e) {
      return false;
    }
  }

  window.ReporteQuizzes = {
    guardar: guardar,
    obtener: obtener,
    limpiar: limpiar
  };
})();
