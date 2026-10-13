  (function () {
      var $ = function (s) { return document.querySelector(s); };

      // Buscador del hero: filtra los "lo más buscado" y avisa al usuario.
      var form = $('#formBuscar');
      var input = $('#inputBuscar');
      var etiquetas = document.querySelectorAll('.mas-buscado a[data-tag]');

      form.addEventListener('submit', function (ev) {
        ev.preventDefault();
        var valor = (input.value || '').trim().toLowerCase();
        if (!valor) return;
        var p = $('.mas-buscado');
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

      // Botón lupa: vuelve al buscador y le da foco.
      $('#btnLupa').addEventListener('click', function () {
        document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
        input.focus();
      });

      // Resaltado del ítem activo en la navegación.
      var enlaces = document.querySelectorAll('.nav__menu a');
      enlaces.forEach(function (a) {
        a.addEventListener('click', function () {
          enlaces.forEach(function (x) { x.classList.remove('activo'); });
          a.classList.add('activo');
        });
      });

      // Chat de ayuda flotante.
      var btnAyuda = $('#btnAyuda');
      var panel = $('#panelChat');

      function abrirChat() {
        panel.classList.add('abierto');
        var m = document.createElement('div');
        m.className = 'mensaje mensaje--usuario';
        m.textContent = 'Hola, quiero ayuda para usar Ciudadano Digital.';
        $('#cuerpoChat').appendChild(m);
      }

      btnAyuda.addEventListener('click', function () {
        panel.classList.toggle('abierto');
      });
      $('#btnAbrirChat').addEventListener('click', function (ev) {
        ev.preventDefault();
        abrirChat();
      });
      $('#footerChat').addEventListener('click', function (ev) {
        ev.preventDefault();
        abrirChat();
      });

      // "INGRESAR": placeholder que en la versión real conecta con identificación.
      $('#btnIngresar').addEventListener('click', function (ev) {
        ev.preventDefault();
        alert('MVP: aquí se redirige a la cuenta CiDi del usuario.\n¡Bienvenido a la capacitación!');
      });
      $('#footerIngresar').addEventListener('click', function (ev) { ev.preventDefault(); });
    })();