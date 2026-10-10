import type { PageKey } from './pages-seo';

// Contenido de las páginas de solución. Solo funciones que el sitio ya publica
// (producto, solución, panel, FAQ). Las preguntas son visibles, sin FAQPage nuevo.
export interface Landing {
  eyebrow: string;
  steps: { title: string; text: string }[];
  stepsTitle: string;
  stepsTone: string;
  features: { title: string; text: string }[];
  featuresTitle: string;
  featuresTone: string;
  fit: { title: string; text: string };
  // Guía con preguntas como encabezado. `html` admite enlaces internos (contenido propio, no de usuarios).
  guide: { title: string; tone: string; blocks: { q: string; html: string[]; list?: string[] }[] };
  faqs: { q: string; a: string }[];
}

export const LANDINGS: Partial<Record<PageKey, Landing>> = {
  softwareIps: {
    eyebrow: 'Software de agendamiento para IPS',
    stepsTitle: 'Cómo se integra',
    stepsTone: 'a la operación de tu IPS.',
    steps: [
      { title: 'Configuramos tu agenda', text: 'Especialidades, profesionales y horarios, con capacitación al equipo administrativo. La implementación estándar toma entre 24 y 48 horas hábiles.' },
      { title: 'Abres los canales del paciente', text: 'Portal de agendamiento web con la imagen de tu institución y asistente en WhatsApp Business, ambos sobre la misma disponibilidad.' },
      { title: 'Tu call center trabaja en el panel', text: 'Agentes, líderes y personal administrativo ven la misma agenda desde el navegador, en la sede o en remoto.' },
      { title: 'La información llega a tu HIS', text: 'Con la integración vía API REST, cada cita se registra en tu software de historia clínica sin doble digitación.' },
    ],
    featuresTitle: 'Lo que necesita una IPS,',
    featuresTone: 'en una sola plataforma.',
    features: [
      { title: 'Filtros por EPS', text: 'El paciente elige aseguradora, especialidad, tipo de consulta, sede y médico, y solo ve opciones válidas para su caso.' },
      { title: 'Demanda inducida', text: 'Campañas segmentadas por EPS, edad, historial o especialidad que invitan a controles y tamizajes con enlace directo al portal.' },
      { title: 'Demanda insatisfecha', text: 'Quien no encontró cupo entra a lista de espera y recibe aviso por WhatsApp, SMS o correo cuando se libera un espacio.' },
      { title: 'Reportes para gerencia', text: 'Ocupación, demanda por especialidad, ausentismo y productividad para decidir con datos de tu propia operación.' },
      { title: 'Datos clínicos protegidos', text: 'Cifrado AES-256 en tránsito y en reposo. La IPS es responsable del tratamiento y GEN.AI SAS actúa como encargado, según la Ley 1581 de 2012.' },
      { title: 'Soporte en español', text: 'Equipo técnico de lunes a viernes de 8:00 a. m. a 6:00 p. m., hora de Colombia.' },
    ],
    fit: {
      title: 'Pensado para la realidad de las IPS colombianas',
      text: 'Pacientes de distintas EPS, varias sedes, alto volumen en el call center y pacientes que prefieren escribir antes que llamar. GEN.AI organiza la operación de citas alrededor de una sola agenda.',
    },
    guide: {
      title: 'Cómo elegir un software',
      tone: 'de agendamiento para IPS.',
      blocks: [
        {
          q: '¿Qué es un software de agendamiento para IPS?',
          html: [
            'Un software de agendamiento para IPS es la herramienta que organiza la asignación de citas de una Institución Prestadora de Servicios de Salud: la disponibilidad de cada profesional y sede, los canales por los que el paciente pide su cita y la comunicación posterior, como confirmaciones, recordatorios y reprogramaciones. No reemplaza la historia clínica: se integra con ella para que cada cita quede registrada una sola vez.',
            'En Colombia, además, tiene que manejar reglas propias del sistema de salud. El paciente llega con una EPS, necesita una especialidad y un tipo de consulta concretos, y a veces debe presentar una autorización. Un buen software muestra al paciente solo las combinaciones válidas para su caso y le indica qué llevar el día de la cita.',
          ],
        },
        {
          q: '¿Qué debe revisar una IPS antes de elegir uno?',
          html: [
            'Seis preguntas que conviene hacerle a cualquier proveedor antes de firmar:',
          ],
          list: [
            '<strong>Canales del paciente:</strong> ¿se puede agendar por web y por WhatsApp sobre la misma agenda, sin duplicar cupos?',
            '<strong>Reglas de EPS y sedes:</strong> ¿el paciente solo ve las combinaciones de EPS, especialidad, sede y médico válidas para su caso?',
            '<strong>Integración con el HIS:</strong> ¿cómo llega la cita a la historia clínica: por API, por archivo o por digitación manual?',
            '<strong>Ausentismo:</strong> ¿incluye recordatorios que el paciente pueda responder y una lista de espera para reutilizar los cupos liberados?',
            '<strong>Protección de datos:</strong> ¿quién es responsable y quién encargado del tratamiento según la Ley 1581 de 2012, y cómo se cifra la información?',
            '<strong>Implementación y soporte:</strong> ¿cuánto tarda la puesta en marcha y en qué horario hay soporte en español?',
          ],
        },
        {
          q: '¿Cómo responde GEN.AI a esos criterios?',
          html: [
            'GEN.AI ofrece un <a href="/agendamiento-web/" class="font-medium text-primary hover:underline">portal de agendamiento web</a> y un <a href="/bot-whatsapp-citas/" class="font-medium text-primary hover:underline">bot de WhatsApp para citas</a> que trabajan sobre la misma agenda, con filtros por EPS, especialidad, tipo de consulta, sede y médico. Las citas pasan a tu HIS mediante API REST, los <a href="/recordatorios-citas-medicas/" class="font-medium text-primary hover:underline">recordatorios de citas</a> permiten confirmar, reprogramar o cancelar, y los cupos liberados se ofrecen a la lista de espera.',
            'La información se cifra con AES-256 en tránsito y en reposo; la IPS es responsable del tratamiento y GEN.AI SAS actúa como encargado. La implementación estándar toma entre 24 y 48 horas hábiles y el soporte en español atiende de lunes a viernes. Puedes ver la plataforma completa en la página de <a href="/producto/" class="font-medium text-primary hover:underline">producto</a>.',
          ],
        },
      ],
    },
    faqs: [
      { q: '¿GEN.AI reemplaza mi software de historia clínica?', a: 'No. GEN.AI se encarga del agendamiento y de la comunicación con el paciente, y se integra con tu HIS mediante API REST para que la cita quede registrada sin doble digitación.' },
      { q: '¿Sirve para una IPS con varias sedes?', a: 'Sí. El paciente puede filtrar por sede al agendar y las campañas se programan por servicio, sede o población.' },
      { q: '¿Cuánto toma ponerlo en marcha?', a: 'La implementación estándar toma entre 24 y 48 horas hábiles, incluida la configuración de especialidades, profesionales y horarios, la integración con WhatsApp Business y la capacitación.' },
      { q: '¿Puedo verlo antes de contratar?', a: 'Sí. Hacemos una demo personalizada sin costo, con un entorno de prueba configurado con los datos de tu institución.' },
    ],
  },

  agendamientoWeb: {
    eyebrow: 'Portal de citas en línea',
    stepsTitle: 'Así agenda tu paciente',
    stepsTone: 'en cuatro pasos.',
    steps: [
      { title: 'Entra al portal de citas', text: 'Abre el enlace de agendamiento de tu institución desde el navegador del celular o del computador. No necesita descargar ninguna app.' },
      { title: 'Completa los filtros', text: 'Elige su EPS, la especialidad, el tipo de consulta, la sede y, si quiere, el médico de su preferencia.' },
      { title: 'Busca y elige horario', text: 'Con «Buscar disponibilidad» ve los cupos reales de la agenda y selecciona fecha y hora.' },
      { title: 'Confirma la reserva', text: 'Valida sus datos, acepta las recomendaciones de la consulta y la cita queda registrada al instante en tu agenda.' },
    ],
    featuresTitle: 'Un portal de agendamiento web',
    featuresTone: 'que trabaja por tu recepción.',
    features: [
      { title: 'Disponible 24/7', text: 'Los pacientes reservan fuera del horario de recepción, en fines de semana y festivos.' },
      { title: 'Con la imagen de tu clínica', text: 'El portal lleva el nombre y la identidad de tu institución.' },
      { title: 'Lista de espera automática', text: 'Si no hay cupo, el paciente se une a la lista de espera y recibe aviso cuando se libera un espacio.' },
      { title: 'Recomendaciones antes de la cita', text: 'Documentos, autorización de la EPS, hora de llegada: el paciente las acepta al reservar y llega preparado.' },
      { title: 'Confirmación por varios canales', text: 'La reserva se confirma por WhatsApp, SMS o correo, según cómo prefiera comunicarse el paciente.' },
      { title: 'Menos carga en el teléfono', text: 'Cada cita que se agenda en línea es una llamada menos para tu recepción y tu call center.' },
    ],
    fit: {
      title: 'Agendamiento web y WhatsApp sobre la misma agenda',
      text: 'El portal y el bot de WhatsApp trabajan sobre la misma agenda de tu institución, y tu equipo administra todas las citas desde el panel.',
    },
    guide: {
      title: 'Agendamiento web',
      tone: 'explicado.',
      blocks: [
        {
          q: '¿Qué es el agendamiento web de citas médicas?',
          html: [
            'El agendamiento web de citas médicas es un portal en línea donde el paciente busca disponibilidad y reserva su cita sin llamar ni hacer fila. Funciona desde el navegador del celular o del computador, sin instalar una aplicación, y muestra los cupos reales de la agenda de la institución.',
            'Para la IPS o clínica significa recibir citas fuera del horario de recepción, en fines de semana y festivos, y descongestionar el teléfono. Para el paciente significa elegir fecha, sede y profesional con calma, y llegar a la consulta sabiendo qué documentos y autorizaciones necesita.',
          ],
        },
        {
          q: '¿Portal web o WhatsApp: cuál conviene?',
          html: [
            'No son excluyentes. El portal web es cómodo cuando el paciente quiere comparar horarios, sedes y médicos en una sola pantalla. WhatsApp resulta más natural para quien prefiere escribir y resolver todo en una conversación, o para cambiar una cita que ya tiene. En GEN.AI ambos canales trabajan sobre la misma agenda, así que los cupos que ve el paciente en el portal son los mismos que ofrece el <a href="/bot-whatsapp-citas/" class="font-medium text-primary hover:underline">bot de WhatsApp para citas médicas</a>.',
          ],
        },
        {
          q: '¿Qué debe incluir un buen portal de citas?',
          html: [
            'Una lista de verificación para evaluar cualquier portal de agendamiento:',
          ],
          list: [
            'Filtros por EPS, especialidad, tipo de consulta, sede y médico.',
            'Disponibilidad real, tomada de la agenda en el momento de la búsqueda.',
            'Confirmación inmediata por WhatsApp, SMS o correo.',
            'Recomendaciones previas: documentos, autorización de la EPS y hora de llegada.',
            'Lista de espera cuando no hay cupo, con aviso al liberarse un espacio.',
            'La imagen de la institución, para que el paciente sepa dónde está reservando.',
          ],
        },
        {
          q: '¿Qué pasa con la cita después de reservarla?',
          html: [
            'La cita queda en la agenda que tu equipo administra desde el <a href="/panel/" class="font-medium text-primary hover:underline">panel administrativo</a>. Antes de la fecha, el paciente recibe <a href="/recordatorios-citas-medicas/" class="font-medium text-primary hover:underline">recordatorios de su cita</a> y puede confirmar, reprogramar o cancelar; si cancela, el cupo vuelve a la agenda. En la página de <a href="/producto/" class="font-medium text-primary hover:underline">producto</a> enlazamos el portal de agendamiento web de Clínica Genezen, que lleva más de 60.000 citas agendadas.',
          ],
        },
      ],
    },
    faqs: [
      { q: '¿El paciente tiene que instalar una aplicación?', a: 'No. El portal funciona en cualquier navegador moderno, en celular, tablet o computador.' },
      { q: '¿Qué pasa si no hay cupos disponibles?', a: 'El paciente puede unirse a la lista de espera. Cuando se libera un espacio, GEN.AI le avisa por WhatsApp, SMS o correo.' },
      { q: '¿Puedo restringir qué ve cada paciente?', a: 'El paciente filtra por EPS, especialidad, tipo de consulta, sede y médico, y solo ve las opciones válidas para su caso.' },
      { q: '¿Hay algún portal en producción que pueda ver?', a: 'Sí. Clínica Genezen usa GEN.AI desde hace 5 meses y ha agendado más de 60.000 citas. En la página de producto enlazamos su portal de citas.' },
    ],
  },

  botWhatsapp: {
    eyebrow: 'Chatbot de citas con IA',
    stepsTitle: 'Una conversación',
    stepsTone: 'que termina en cita.',
    steps: [
      { title: 'El paciente escribe', text: 'Pide su cita como le escribiría a una persona, a cualquier hora, en el WhatsApp de tu institución.' },
      { title: 'La IA consulta la agenda', text: 'Entiende el lenguaje natural, identifica la especialidad y muestra los horarios realmente disponibles.' },
      { title: 'El paciente elige y confirma', text: 'Escoge fecha y profesional, y recibe la confirmación con los datos de la cita en el mismo chat.' },
      { title: 'La cita queda registrada', text: 'Se guarda en tu agenda y, si tienes la integración, en tu software de historia clínica.' },
    ],
    featuresTitle: 'Un bot de agenda en WhatsApp',
    featuresTone: 'hecho para salud.',
    features: [
      { title: 'API oficial de WhatsApp Business', text: 'El asistente funciona sobre la API oficial de WhatsApp Business de tu institución.' },
      { title: 'Agendar, cancelar y reprogramar', text: 'El paciente gestiona sus citas sin llamar: reserva, cambia de fecha, cancela o consulta disponibilidad.' },
      { title: 'Recordatorios en el mismo chat', text: 'Antes de la cita llega el recordatorio, y el paciente puede confirmar o reprogramar respondiendo.' },
      { title: 'Cupos que no se pierden', text: 'Cuando alguien cancela, el espacio queda libre para la lista de espera o para otro paciente.' },
      { title: 'Conectado a tu agenda y tu HIS', text: 'Las citas quedan en tu agenda y pasan a tu software de historia clínica vía API.' },
      { title: 'Tu equipo ve todo', text: 'Las citas agendadas por WhatsApp aparecen en el panel administrativo con el resto de la agenda.' },
    ],
    fit: {
      title: 'El canal que tus pacientes ya usan',
      text: 'Sin apps ni formularios: tus pacientes ya tienen WhatsApp abierto. El bot atiende el volumen repetitivo y tu equipo se concentra en los casos que necesitan a una persona.',
    },
    guide: {
      title: 'Bot de WhatsApp para citas,',
      tone: 'paso a paso.',
      blocks: [
        {
          q: '¿Qué es un bot de WhatsApp para agendar citas médicas?',
          html: [
            'Un bot de WhatsApp para citas médicas es un asistente automático que atiende a los pacientes en el número de WhatsApp de la institución y les permite pedir, cambiar o cancelar una cita sin hablar con una persona. A diferencia de un formulario o de una línea telefónica, el paciente usa una aplicación que ya tiene abierta y escribe a cualquier hora.',
            'En GEN.AI, el asistente consulta la disponibilidad real de la agenda, propone horarios y deja la cita registrada en el mismo sistema que usa tu call center, sin transcripciones. El mismo chat sirve después para los <a href="/recordatorios-citas-medicas/" class="font-medium text-primary hover:underline">recordatorios de citas</a>, y la agenda es la misma que la del <a href="/agendamiento-web/" class="font-medium text-primary hover:underline">portal de agendamiento web</a>.',
          ],
        },
        {
          q: '¿En qué se diferencia un asistente con IA de un bot de menús?',
          html: [
            'Un bot de menús obliga al paciente a responder con números u opciones fijas, del tipo «escribe 1 para agendar». Funciona en flujos muy simples, pero se rompe cuando el paciente escribe como habla: «necesito cita con el ortopedista para mi mamá la otra semana».',
            'Un asistente con inteligencia artificial interpreta ese mensaje, identifica la especialidad y pregunta solo lo que falta. El paciente no tiene que aprender a usar el bot, y tu equipo recibe menos conversaciones que se quedaron a mitad de camino.',
          ],
        },
        {
          q: '¿Qué se necesita para usar WhatsApp Business en una clínica?',
          html: [
            'Para automatizar citas se usa la API oficial de WhatsApp Business (la plataforma empresarial de Meta), no la aplicación gratuita de WhatsApp Business del celular. La API permite conectar el número de la institución con un sistema como GEN.AI.',
            'Hay dos reglas de Meta que conviene conocer. Los mensajes que inicia la institución, como un recordatorio, se envían con plantillas aprobadas previamente. Y cuando el paciente escribe, se abre una ventana de 24 horas en la que se le puede responder libremente. GEN.AI configura la integración durante la implementación, que toma entre 24 y 48 horas hábiles.',
          ],
        },
        {
          q: '¿Cómo se protege la información del paciente en el chat?',
          html: [
            'Los datos de salud son datos sensibles según la Ley 1581 de 2012: su tratamiento exige autorización previa, expresa e informada del paciente y una finalidad clara. La IPS es la responsable del tratamiento y GEN.AI SAS actúa como encargado; la información se cifra con AES-256 en tránsito y en reposo. El detalle está en nuestra <a href="/legal/proteccion-de-datos/" class="font-medium text-primary hover:underline">política de protección de datos clínicos</a>.',
          ],
        },
      ],
    },
    faqs: [
      { q: '¿El bot entiende mensajes escritos de forma natural?', a: 'Sí. Usa inteligencia artificial que comprende lenguaje natural: el paciente escribe como lo haría con una persona y el bot guía la conversación.' },
      { q: '¿Necesito un número de WhatsApp Business?', a: 'GEN.AI funciona con la API oficial de WhatsApp Business. La integración se configura durante la implementación, que toma entre 24 y 48 horas hábiles.' },
      { q: '¿Qué puede hacer el paciente desde el chat?', a: 'Agendar, cancelar y reprogramar citas, y consultar la disponibilidad de la especialidad que necesita.' },
      { q: '¿Mi equipo ve las citas que agenda el bot?', a: 'Sí. Las citas quedan registradas en tu agenda y aparecen en el panel administrativo junto con las del portal y el call center.' },
    ],
  },

  recordatorios: {
    eyebrow: 'Confirmación automática de citas',
    stepsTitle: 'Del recordatorio',
    stepsTone: 'al cupo recuperado.',
    steps: [
      { title: 'Se agenda la cita', text: 'Por el portal web, por WhatsApp o desde el call center: todas las citas entran a la misma agenda.' },
      { title: 'Llega la confirmación', text: 'El paciente recibe los datos de su cita y las recomendaciones para asistir preparado.' },
      { title: 'Llega el recordatorio', text: 'Antes de la cita, GEN.AI envía el recordatorio por WhatsApp, SMS o correo.' },
      { title: 'El paciente responde', text: 'Confirma, reprograma o cancela desde el mismo mensaje. Si cancela, el cupo vuelve a la agenda y se ofrece a la lista de espera.' },
    ],
    featuresTitle: 'Recordatorios de citas',
    featuresTone: 'que liberan cupos a tiempo.',
    features: [
      { title: 'WhatsApp, SMS y correo', text: 'Cada canal con su papel: conversación en WhatsApp, alertas cortas por SMS e instrucciones completas por correo.' },
      { title: 'Confirmación automática', text: 'Sin llamadas de confirmación: el sistema envía y registra la respuesta de cada paciente.' },
      { title: 'Reprogramar sin llamar', text: 'Si el paciente no puede asistir, cambia la fecha desde el mismo canal en lugar de simplemente no llegar.' },
      { title: 'Lista de espera', text: 'Los cupos que se liberan se ofrecen a los pacientes que estaban esperando, por WhatsApp, SMS o correo.' },
      { title: 'Instrucciones previas', text: 'Documentos, autorizaciones y hora de llegada viajan con la confirmación para evitar reprocesos.' },
      { title: 'Ausentismo medible', text: 'El panel reporta ocupación y ausentismo para que veas el efecto en tu propia operación.' },
    ],
    fit: {
      title: 'Por qué no basta con recordar',
      text: 'Un estudio publicado en DYNA (2022) encontró que la hora de la llamada de recordatorio no es determinante en la asistencia. Con GEN.AI, además de recibir el recordatorio, el paciente puede responderlo: confirmar, cambiar o cancelar, y el cupo vuelve a la agenda.',
    },
    guide: {
      title: 'Recordatorios de citas,',
      tone: 'con datos.',
      blocks: [
        {
          q: '¿Qué tan grande es el problema de la inasistencia?',
          html: [
            'Según un estudio publicado en la revista DYNA (2022), en 2016 se agendaron 3.253.172 citas médicas en Bogotá y los pacientes no asistieron a 422.971, cerca del 13 %. Cada inasistencia es un cupo que otro paciente necesitaba y tiempo de un profesional que queda sin usar. <a href="https://doi.org/10.15446/dyna.v89n220.97160" class="font-medium text-primary hover:underline" rel="noopener" target="_blank">Fuente: Navarro Romero et al., DYNA 89(220)</a>.',
            'El recordatorio por sí solo no resuelve el problema: el paciente necesita una forma fácil de avisar que no podrá asistir, a tiempo para que el cupo se reasigne. Más contexto en <a href="/problema/" class="font-medium text-primary hover:underline">los desafíos del agendamiento clínico</a>.',
          ],
        },
        {
          q: '¿Qué es la confirmación automática de citas?',
          html: [
            'La confirmación automática de citas es el proceso en el que el sistema envía el recordatorio, recibe la respuesta del paciente y la registra en la agenda sin que nadie de la recepción tenga que llamar. Con GEN.AI el paciente confirma, reprograma o cancela desde el mismo mensaje; si cancela, el cupo vuelve a la agenda y se ofrece a la lista de espera. Así, una inasistencia se convierte en una cancelación anticipada que todavía se puede aprovechar.',
          ],
        },
        {
          q: '¿WhatsApp, SMS o correo: qué canal usar?',
          html: [
            'Cada canal cumple un papel distinto, y GEN.AI permite combinarlos según el perfil de tus pacientes:',
          ],
          list: [
            '<strong>WhatsApp:</strong> permite una conversación. El paciente responde, reprograma o agenda una nueva cita con el <a href="/bot-whatsapp-citas/" class="font-medium text-primary hover:underline">bot de WhatsApp</a> sin salir del chat.',
            '<strong>SMS:</strong> alerta corta, útil para pacientes que no usan WhatsApp.',
            '<strong>Correo:</strong> el mejor lugar para instrucciones largas, como preparación para exámenes, documentos y autorizaciones de la EPS.',
          ],
        },
        {
          q: '¿Cómo saber si los recordatorios están funcionando?',
          html: [
            'Compara periodos de tu propia operación: la tasa de ausentismo y la ocupación de la agenda antes y después de activar los recordatorios. El <a href="/panel/" class="font-medium text-primary hover:underline">panel administrativo</a> de GEN.AI reporta ambas métricas, para que veas el efecto con tus datos y no con promedios de otras instituciones.',
          ],
        },
      ],
    },
    faqs: [
      { q: '¿Por qué canales se envían los recordatorios?', a: 'Por WhatsApp, SMS y correo electrónico. Cada institución elige cómo combinarlos según sus pacientes.' },
      { q: '¿Qué pasa si el paciente responde que no puede asistir?', a: 'Puede reprogramar o cancelar desde el mismo mensaje. El cupo queda libre y se ofrece a los pacientes en lista de espera.' },
      { q: '¿Necesito llamar a los pacientes para confirmar?', a: 'No. La confirmación es automática y la respuesta queda registrada en la agenda.' },
      { q: '¿Puedo medir si baja la inasistencia?', a: 'Sí. El panel administrativo muestra reportes de ocupación y ausentismo para comparar periodos de tu operación.' },
    ],
  },
};
