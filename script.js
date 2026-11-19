(function () {
  var $ = function (s) { return document.querySelector(s); };

  var form = $('#formBuscar');
  var input = $('#inputBuscar');

  if (form && input) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var valor = (input.value || '').trim().toLowerCase();
      if (!valor) return;

      var etiquetas = document.querySelectorAll('.mas-buscado a[data-tag]');
      var p = $('.mas-buscado');
      if (!p) return;

      var prev = p.querySelector('.sin-resultado');
      if (prev) prev.remove();

      var coincide = Array.from(etiquetas).find(function (a) {
        return a.textContent.toLowerCase().indexOf(valor) > -1;
      });

      if (coincide) coincide.scrollIntoView({ behavior: 'smooth', block: 'center' });
      else {
        var s = document.createElement('span');
        s.className = 'sin-resultado';
        s.style.color = '#606B7E';
        s.style.marginLeft = '8px';
        s.textContent = 'MVP: el contenido de trámites se completará en próximas iteraciones.';
        p.appendChild(s);
      }
    });
  }

  var lupa = $('#btnLupa');
  if (lupa && input) {
    lupa.addEventListener('click', function () {
      var inicio = document.getElementById('inicio');
      if (inicio) inicio.scrollIntoView({ behavior: 'smooth' });
      input.focus();
    });
  }

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

  var btnIngresar = $('#btnIngresar');
  if (btnIngresar) {
    btnIngresar.addEventListener('click', function (ev) {
      ev.preventDefault();
      alert('MVP: aquí se redirige a la cuenta CiDi del usuario.\n¡Bienvenido a la capacitación!');
    });
  }

  var footerIngresar = $('#footerIngresar');
  if (footerIngresar) {
    footerIngresar.addEventListener('click', function (ev) { ev.preventDefault(); });
  }
})();
