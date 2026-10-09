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
    faqs: [
      { q: '¿El paciente tiene que instalar una aplicación?', a: 'No. El portal funciona en cualquier navegador moderno, en celular, tablet o computador.' },
      { q: '¿Qué pasa si no hay cupos disponibles?', a: 'El paciente puede unirse a la lista de espera. Cuando se libera un espacio, GEN.AI le avisa por WhatsApp, SMS o correo.' },
      { q: '¿Puedo restringir qué ve cada paciente?', a: 'El paciente filtra por EPS, especialidad, tipo de consulta, sede y médico, y solo ve las opciones válidas para su caso.' },
      { q: '¿Hay algún portal en producción que pueda ver?', a: 'Sí. En la página de producto enlazamos un portal de agendamiento web que hoy usa una clínica.' },
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
    faqs: [
      { q: '¿Por qué canales se envían los recordatorios?', a: 'Por WhatsApp, SMS y correo electrónico. Cada institución elige cómo combinarlos según sus pacientes.' },
      { q: '¿Qué pasa si el paciente responde que no puede asistir?', a: 'Puede reprogramar o cancelar desde el mismo mensaje. El cupo queda libre y se ofrece a los pacientes en lista de espera.' },
      { q: '¿Necesito llamar a los pacientes para confirmar?', a: 'No. La confirmación es automática y la respuesta queda registrada en la agenda.' },
      { q: '¿Puedo medir si baja la inasistencia?', a: 'Sí. El panel administrativo muestra reportes de ocupación y ausentismo para comparar periodos de tu operación.' },
    ],
  },
};
