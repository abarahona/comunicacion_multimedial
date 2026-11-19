window.ChatbotCidi = {
  bienvenida: '¡Hola! Soy el asistente de la capacitación CiDi. Puedo ayudarte con tu cuenta, los niveles, los trámites y la firma digital. Escribí tu pregunta o elegí una de las opciones de abajo.',
  sinResultado: 'No encontré una respuesta exacta en esta capacitación. Probá con otras palabras o elegí una de las preguntas sugeridas. Para consultas sobre tu cuenta, usá el portal oficial de CiDi.',
  enlacePorDefecto: {
    texto: 'Ir al portal oficial de CiDi',
    url: 'https://cidi.cba.gov.ar/portal-publico/'
  },
  sugerencias: [
    '¿Cómo creo mi cuenta en CiDi?',
    '¿Qué datos necesito para ingresar?',
    '¿Para qué sirve el Nivel 2?',
    '¿Dónde veo mis trámites?',
    '¿Cómo firmo un documento PDF?'
  ],
  respuestas: [
    {
      id: 'que-es-cidi',
      categoria: 'CiDi',
      prioridad: 1,
      preguntas: [
        '¿Qué es CiDi?',
        '¿Qué es Ciudadano Digital?',
        '¿Para qué sirve Ciudadano Digital?'
      ],
      palabras: [
        'que es cidi',
        'que es ciudadano digital',
        'plataforma ciudadano digital',
        'servicios digitales',
        'tramites digitales',
        'gobierno de cordoba'
      ],
      respuesta: 'Ciudadano Digital (CiDi) es la plataforma del Gobierno de la Provincia de Córdoba que permite acceder a servicios y trámites digitales de manera segura. En esta capacitación vas a recorrer 5 módulos: introducción, Nivel 2, trámites, firma y evaluación final.',
      enlaces: [
        { texto: 'Ver Módulo 1', url: 'modulos/modulo1-Intro.html' }
      ]
    },
    {
      id: 'crear-cuenta',
      categoria: 'Cuenta y acceso',
      prioridad: 2,
      preguntas: [
        '¿Cómo creo mi cuenta en CiDi?',
        '¿Cómo me registro en Ciudadano Digital?'
      ],
      palabras: [
        'crear cuenta',
        'crear mi cuenta',
        'registrarme',
        'registro',
        'nueva cuenta',
        'alta de cuenta',
        'dni'
      ],
      respuesta: 'Para registrarte en Ciudadano Digital necesitás tener tu DNI a mano. El Módulo 1 explica el registro y los primeros pasos dentro de la plataforma.',
      enlaces: [
        { texto: 'Ver Módulo 1', url: 'modulos/modulo1-Intro.html' }
      ]
    },
    {
      id: 'iniciar-sesion',
      categoria: 'Cuenta y acceso',
      prioridad: 2,
      preguntas: [
        '¿Qué datos necesito para ingresar?',
        '¿Cómo inicio sesión en CiDi?'
      ],
      palabras: [
        'iniciar sesion',
        'iniciar sesión',
        'hacer login',
        'ingresar a cidi',
        'entrar a cidi',
        'datos para ingresar',
        'entrar',
        'contraseña',
        'contrasena',
        'cuil'
      ],
      respuesta: 'Para iniciar sesión en CiDi necesitás tu CUIL y tu contraseña. Si todavía no tenés cuenta, primero registrate con tu DNI.',
      enlaces: [
        { texto: 'Ver Módulo 1', url: 'modulos/modulo1-Intro.html' }
      ]
    },
    {
      id: 'recuperar-contrasena',
      categoria: 'Cuenta y acceso',
      prioridad: 3,
      preguntas: [
        '¿Cómo recupero mi contraseña?',
        'Olvidé mi contraseña de CiDi'
      ],
      palabras: [
        'recuperar contraseña',
        'recuperar contrasena',
        'recuperar pin',
        'olvidé mi contraseña',
        'olvide mi contrasena',
        'cambiar contraseña',
        'resetear contraseña'
      ],
      respuesta: 'Para recuperar o cambiar tu contraseña te conviene usar el portal oficial de CiDi desde un dispositivo seguro. En esta capacitación no detallamos ese paso a paso, pero encontrás el acceso oficial abajo.',
      enlaces: [
        { texto: 'Ir al portal oficial de CiDi', url: 'https://cidi.cba.gov.ar/portal-publico/' }
      ]
    },
    {
      id: 'nivel-2-beneficios',
      categoria: 'Niveles',
      prioridad: 2,
      preguntas: [
        '¿Para qué sirve el Nivel 2?',
        '¿Qué beneficios tiene ser Nivel 2?'
      ],
      palabras: [
        'nivel 2',
        'nivel dos',
        'beneficios del nivel 2',
        'ser nivel 2',
        'obtener nivel 2',
        'constatar identidad',
        'verificar identidad'
      ],
      respuesta: 'El Nivel 2 se obtiene al constatar tu identidad y habilita funciones como realizar trámites y usar Firma CiDi. El Módulo 2 explica sus beneficios y el Módulo 4 muestra cómo firmar con ese nivel activo.',
      enlaces: [
        { texto: 'Ver Módulo 2', url: 'modulos/modulo2-Nivel2.html' },
        { texto: 'Ver Módulo 4', url: 'modulos/modulo4-Firma.html' }
      ]
    },
    {
      id: 'nivel-para-tramites',
      categoria: 'Trámites',
      prioridad: 2,
      preguntas: [
        '¿Qué necesito para hacer trámites?',
        '¿Qué nivel se requiere para e-trámite?'
      ],
      palabras: [
        'requisitos para tramites',
        'nivel para tramites',
        'nivel 2 tramites',
        'e tramite',
        'sesion iniciada',
        'sesión iniciada'
      ],
      respuesta: 'Para entrar a e-trámite necesitás tener la sesión iniciada y el Nivel 2 activo.',
      enlaces: [
        { texto: 'Ver Módulo 3', url: 'modulos/modulo3-Tramites.html' }
      ]
    },
    {
      id: 'ver-tramites',
      categoria: 'Trámites',
      prioridad: 2,
      preguntas: [
        '¿Dónde veo mis trámites?',
        '¿Cómo consulto mis trámites?'
      ],
      palabras: [
        'mis tramites',
        'donde veo mis tramites',
        'consultar tramites',
        'ver tramites',
        'listado de tramites',
        'ultimos 3 dias',
        'últimos 3 días'
      ],
      respuesta: 'En “Mis trámites” se muestran los trámites iniciados, incluso los de los últimos 3 días. Desde ahí podés buscar, seguir y ver el detalle de cada trámite.',
      enlaces: [
        { texto: 'Ver Módulo 3', url: 'modulos/modulo3-Tramites.html' }
      ]
    },
    {
      id: 'seguir-tramite',
      categoria: 'Trámites',
      prioridad: 2,
      preguntas: [
        '¿Cómo sigo un trámite?',
        '¿Dónde veo el estado de mi trámite?'
      ],
      palabras: [
        'seguir tramite',
        'seguimiento de tramite',
        'estado del tramite',
        'actualizaciones del tramite',
        'hoja de ruta',
        'como va mi tramite'
      ],
      respuesta: 'Con “Seguir trámite” recibís las actualizaciones en el correo registrado o dentro de CiDi. La opción “Ver” muestra la información del trámite, la documentación presentada y la hoja de ruta.',
      enlaces: [
        { texto: 'Ver Módulo 3', url: 'modulos/modulo3-Tramites.html' }
      ]
    },
    {
      id: 'pendientes',
      categoria: 'Trámites',
      prioridad: 2,
      preguntas: [
        '¿Qué son mis pendientes?',
        '¿Cómo veo lo que falta en un trámite?'
      ],
      palabras: [
        'mis pendientes',
        'tramites pendientes',
        'firma pendiente',
        'informacion extra',
        'información adicional',
        'documentacion pendiente'
      ],
      respuesta: '“Mis pendientes” reúne los trámites que piden información adicional o tu firma. Revisalos para completar lo que falta.',
      enlaces: [
        { texto: 'Ver Módulo 3', url: 'modulos/modulo3-Tramites.html' }
      ]
    },
    {
      id: 'solicitudes-vista',
      categoria: 'Trámites',
      prioridad: 2,
      preguntas: [
        '¿Cómo pido la vista de un expediente?',
        '¿Qué son las solicitudes de vista?'
      ],
      palabras: [
        'solicitudes de vista',
        'pedir vista de expediente',
        'numero de expediente',
        'número de expediente',
        'motivo de la solicitud'
      ],
      respuesta: 'En “Solicitudes de vista” podés crear una nueva solicitud indicando el número de expediente y el motivo.',
      enlaces: [
        { texto: 'Ver Módulo 3', url: 'modulos/modulo3-Tramites.html' }
      ]
    },
    {
      id: 'buscar-tramite',
      categoria: 'Trámites',
      prioridad: 2,
      preguntas: [
        '¿Cómo busco un trámite?',
        '¿Cómo hago una multinota?'
      ],
      palabras: [
        'buscar tramite',
        'multinota',
        'apellido nombre cuil',
        'relacionar tramite',
        'crear tramite',
        'cargar anexos'
      ],
      respuesta: 'Para buscar un trámite, por ejemplo “multinota”, completá apellido, nombre y CUIL. Podés relacionarlo con un trámite existente, cargar asunto, contenido y anexos desde tu archivo local o desde documentos ya presentados, y terminar en la confirmación.',
      enlaces: [
        { texto: 'Ver Módulo 3', url: 'modulos/modulo3-Tramites.html' }
      ]
    },
    {
      id: 'firma-requisitos',
      categoria: 'Firma CiDi',
      prioridad: 2,
      preguntas: [
        '¿Qué necesito para usar Firma CiDi?',
        '¿Qué es la firma digital de CiDi?'
      ],
      palabras: [
        'firma cidi',
        'firmar documentos',
        'firma digital',
        'requisitos para firmar',
        'nivel para firmar',
        'documento en pdf',
        'formato pdf'
      ],
      respuesta: 'Para usar Firma CiDi necesitás el Nivel 2 activo y el documento en formato PDF. Podés firmar documentos, consultar solicitudes de firma y validarlas.',
      enlaces: [
        { texto: 'Ver Módulo 4', url: 'modulos/modulo4-Firma.html' }
      ]
    },
    {
      id: 'firmar-pdf',
      categoria: 'Firma CiDi',
      prioridad: 4,
      preguntas: [
        '¿Cómo firmo un documento PDF?',
        '¿Qué hago después de presionar Firmar?'
      ],
      palabras: [
        'como firmo',
        'firmar pdf',
        'firmar documento',
        'boton firmar',
        'presionar firmar',
        'me pide el pin',
        'ventana emergente',
        'pin de seguridad'
      ],
      respuesta: 'Abrí el PDF que querés firmar y presioná “Firmar”. La ventana emergente te va a pedir el PIN de seguridad de CiDi; cuando lo ingreses, la firma queda aplicada al documento.',
      enlaces: [
        { texto: 'Ver Módulo 4', url: 'modulos/modulo4-Firma.html' }
      ]
    },
    {
      id: 'donde-pin',
      categoria: 'Firma CiDi',
      prioridad: 3,
      preguntas: [
        '¿Dónde obtengo mi PIN de CiDi?',
        '¿Dónde está el PIN de seguridad?'
      ],
      palabras: [
        'donde esta el pin',
        'donde obtengo el pin',
        'obtener pin',
        'credenciales',
        'app cidi',
        'documentos credenciales',
        'pin cidi'
      ],
      respuesta: 'Tu PIN de seguridad de CiDi se obtiene desde la App CiDi, en Documentos → Credenciales. Lo vas a necesitar al firmar documentos.',
      enlaces: [
        { texto: 'Ver Módulo 4', url: 'modulos/modulo4-Firma.html' }
      ]
    },
    {
      id: 'agregar-firmante',
      categoria: 'Firma CiDi',
      prioridad: 3,
      preguntas: [
        '¿Cómo agrego otra persona para que firme?',
        '¿Qué dato necesito para otro firmante?'
      ],
      palabras: [
        'agregar firmante',
        'otra persona firme',
        'mas firmantes',
        'firmantes adicionales',
        'cuil o cuit',
        'cuit de otra persona'
      ],
      respuesta: 'Si querés que otra persona también firme el documento, ingresá su CUIL o CUIT.',
      enlaces: [
        { texto: 'Ver Módulo 4', url: 'modulos/modulo4-Firma.html' }
      ]
    },
    {
      id: 'solicitudes-firma',
      categoria: 'Firma CiDi',
      prioridad: 2,
      preguntas: [
        '¿Cómo consulto solicitudes de firma?',
        '¿Dónde escucho el podcast de Firma CiDi?'
      ],
      palabras: [
        'consultar solicitudes de firma',
        'solicitudes de firma',
        'validar firmas',
        'ver solicitudes de firma',
        'podcast firma',
        'podcast de firma'
      ],
      respuesta: 'Podés consultar y validar las solicitudes de firma desde el Módulo 4. En esa sección también encontrás el podcast “Firma Digital” para escuchar la explicación.',
      enlaces: [
        { texto: 'Ver Módulo 4', url: 'modulos/modulo4-Firma.html' }
      ]
    },
    {
      id: 'certificados',
      categoria: 'Capacitación',
      prioridad: 2,
      preguntas: [
        '¿Cómo obtengo el certificado?',
        '¿Qué hay en la evaluación final?'
      ],
      palabras: [
        'certificado',
        'certificados',
        'finalizar capacitacion',
        'terminar el curso',
        'evaluacion final',
        'modulo 5'
      ],
      respuesta: 'El Módulo 5 cierra la capacitación con la evaluación final. Si no obtenés el resultado esperado, podés volver a intentarla; al completarla se habilita el certificado.',
      enlaces: [
        { texto: 'Ver Módulo 5', url: 'modulos/modulo5-Final.html' }
      ]
    },
    {
      id: 'material-apoyo',
      categoria: 'Capacitación',
      prioridad: 1,
      preguntas: [
        '¿Dónde está el material de apoyo?',
        '¿Hay guías y tutoriales?'
      ],
      palabras: [
        'material de apoyo',
        'guias',
        'guías',
        'videotutoriales',
        'preguntas frecuentes',
        'glosario'
      ],
      respuesta: 'En la página de inicio hay una sección de material de apoyo con guías, videotutoriales y preguntas frecuentes. Algunos recursos todavía están en preparación en esta versión MVP.',
      enlaces: [
        { texto: 'Ir al material de apoyo', url: 'index.html#material' }
      ]
    },
    {
      id: 'contacto',
      categoria: 'Ayuda',
      prioridad: 1,
      preguntas: [
        '¿Cómo contacto con CiDi?',
        '¿Dónde está el soporte oficial?'
      ],
      palabras: [
        'contacto',
        'centros de contacto',
        'telefonos',
        'teléfonos',
        'ayuda oficial',
        'soporte',
        'consultar a cidi'
      ],
      respuesta: 'Para consultas sobre tu cuenta o trámites específicos, usá los canales oficiales publicados en el portal de Ciudadano Digital. Dentro de esta capacitación también podés volver a cualquier módulo desde el inicio.',
      enlaces: [
        { texto: 'Ir al portal oficial de CiDi', url: 'https://cidi.cba.gov.ar/portal-publico/' },
        { texto: 'Volver al inicio', url: 'index.html' }
      ]
    }
  ]
};
