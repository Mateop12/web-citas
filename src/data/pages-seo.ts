import { SITE } from './seo';

export type PageKey =
  | 'problema'
  | 'solucion'
  | 'nuestrosPlus'
  | 'whatsapp'
  | 'panel'
  | 'faq'
  | 'contacto'
  | 'softwareIps'
  | 'agendamientoWeb'
  | 'botWhatsapp'
  | 'recordatorios';

export interface ProductPageSeo {
  key: PageKey;
  slug: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  breadcrumbLabel: string;
  relatedSlugs: string[];
  homeAnchor: string;
  verMasLabel: string;
}

export const PRODUCT_PAGES: Record<PageKey, ProductPageSeo> = {
  problema: {
    key: 'problema',
    slug: '/problema/',
    title: 'Desafíos del agendamiento clínico en IPS y clínicas | GEN.AI',
    description:
      'Llamadas perdidas, ausentismo y agendas saturadas afectan la rentabilidad de tu clínica. Conoce los retos del agendamiento manual y cómo resolverlos con IA.',
    h1: 'Desafíos del agendamiento clínico que frenan tu operación',
    intro:
      'Las IPS, clínicas y hospitales en Colombia pierden ingresos cada día por procesos manuales de citas. Desde llamadas no contestadas hasta cancelaciones sin aviso, estos problemas tienen solución con automatización inteligente.',
    breadcrumbLabel: 'Problema',
    relatedSlugs: ['/recordatorios-citas-medicas/', '/solucion/', '/contacto/'],
    homeAnchor: '#problema',
    verMasLabel: 'Conoce los desafíos del agendamiento clínico',
  },
  solucion: {
    key: 'solucion',
    slug: '/solucion/',
    title: 'Agendamiento automático de citas médicas | GEN.AI',
    description:
      'Así funciona el agendamiento automático de citas en GEN.AI: del mensaje de WhatsApp a la cita confirmada en tu HIS, con reprogramación y lista de espera.',
    h1: 'Cómo funciona el agendamiento automático con GEN.AI',
    intro:
      'GEN.AI centraliza WhatsApp, portal web y call center en una sola plataforma. Tu equipo deja de repetir tareas manuales mientras los pacientes agendan, confirman y reprograman las 24 horas.',
    breadcrumbLabel: 'Solución',
    relatedSlugs: ['/bot-whatsapp-citas/', '/agendamiento-web/', '/panel/'],
    homeAnchor: '#solucion',
    verMasLabel: 'Ver cómo funciona el agendamiento automático',
  },
  nuestrosPlus: {
    key: 'nuestrosPlus',
    slug: '/nosotros/',
    title: 'Nosotros | El equipo detrás de GEN.AI en Medellín',
    description:
      'Conoce a GEN.AI SAS, la empresa de Medellín que desarrolla GEN.AI, software de agendamiento clínico con IA para IPS y clínicas en Colombia.',
    h1: 'Quiénes somos: el equipo detrás de GEN.AI',
    intro:
      'GEN.AI es un software de agendamiento clínico con IA desarrollado por GEN.AI SAS (Medellín, Colombia).',
    breadcrumbLabel: 'Nosotros',
    relatedSlugs: ['/problema/', '/solucion/', '/contacto/'],
    homeAnchor: '#nuestros-plus',
    verMasLabel: 'Conoce quiénes somos',
  },
  whatsapp: {
    key: 'whatsapp',
    slug: '/producto/',
    title: 'Software de gestión de citas médicas y pacientes | GEN.AI',
    description:
      'Software de gestión de citas médicas: portal web y móvil 24/7, WhatsApp con IA, SMS, correo y campañas de demanda inducida para IPS y clínicas de Colombia.',
    h1: 'Software de gestión de citas médicas, campañas y contacto al paciente',
    intro:
      'GEN.AI concentra en un solo producto lo que hoy está disperso: portal de autoagendamiento web y móvil, WhatsApp con IA, SMS, correo, campañas de demanda inducida y recuperación de demanda insatisfecha. Más pacientes agendados, menos carga en recepción y trazabilidad en tu panel administrativo.',
    breadcrumbLabel: 'Producto',
    relatedSlugs: ['/agendamiento-web/', '/bot-whatsapp-citas/', '/recordatorios-citas-medicas/'],
    homeAnchor: '#whatsapp',
    verMasLabel: 'Conoce el software de gestión de citas',
  },
  panel: {
    key: 'panel',
    slug: '/panel/',
    title: 'Panel administrativo de agendamiento clínico | GEN.AI',
    description:
      'Dashboard para equipos de salud: calendario, profesionales, reportes de ocupación y ausentismo. Panel web multiusuario para IPS y clínicas en Colombia.',
    h1: 'Panel administrativo para gestionar tu agenda médica',
    intro:
      'Líderes de call center, agentes y personal administrativo operan desde un panel intuitivo. Controla disponibilidad, visualiza métricas y toma decisiones con datos reales de ocupación.',
    breadcrumbLabel: 'Panel',
    relatedSlugs: ['/solucion/', '/producto/', '/nosotros/'],
    homeAnchor: '#aplicacion',
    verMasLabel: 'Conoce el panel administrativo',
  },
  faq: {
    key: 'faq',
    slug: '/faq/',
    title: 'Preguntas frecuentes sobre GEN.AI | Agendamiento clínico',
    description:
      'Respuestas sobre implementación, integración con HIS, seguridad de datos clínicos, WhatsApp y autoagendamiento. FAQ de GEN.AI para IPS y clínicas.',
    h1: 'Preguntas frecuentes sobre agendamiento clínico con GEN.AI',
    intro:
      'Resolvemos las dudas más comunes de directores, gerentes y equipos de salud antes de contratar o implementar la plataforma. Si no encuentras tu respuesta, solicita una demo personalizada.',
    breadcrumbLabel: 'FAQ',
    relatedSlugs: ['/solucion/', '/contacto/', '/nosotros/'],
    homeAnchor: '#faq',
    verMasLabel: 'Ver todas las preguntas frecuentes',
  },
  contacto: {
    key: 'contacto',
    slug: '/contacto/',
    title: 'Solicitar demo de GEN.AI | Contacto',
    description:
      'Agenda una demo personalizada de GEN.AI para tu IPS o clínica. Autoagendamiento con IA por WhatsApp, web y call center. Respuesta en menos de 24 horas.',
    h1: 'Solicita una demo de GEN.AI para tu clínica',
    intro:
      'Cuéntanos sobre tu institución y te mostramos cómo GEN.AI puede automatizar el agendamiento, reducir ausentismo y mejorar la ocupación de tu agenda. Demo sin costo para IPS y clínicas en Colombia.',
    breadcrumbLabel: 'Contacto',
    relatedSlugs: ['/faq/', '/solucion/', '/producto/'],
    homeAnchor: '#demo',
    verMasLabel: 'Solicitar demo',
  },
  softwareIps: {
    key: 'softwareIps',
    slug: '/software-para-ips/',
    title: 'Software para IPS y clínicas: agendamiento de citas | GEN.AI',
    description:
      'Software para IPS, clínicas y hospitales en Colombia: agendamiento web, bot de WhatsApp, recordatorios, demanda inducida e integración con tu HIS.',
    h1: 'Software de agendamiento para IPS y clínicas en Colombia',
    intro:
      'Una sola plataforma para la operación de citas de tu IPS, clínica u hospital: el paciente agenda por web o WhatsApp, tu call center trabaja sobre la misma agenda y la información llega a tu historia clínica.',
    breadcrumbLabel: 'Software para IPS',
    relatedSlugs: ['/agendamiento-web/', '/bot-whatsapp-citas/', '/recordatorios-citas-medicas/'],
    homeAnchor: '',
    verMasLabel: 'Ver el software para IPS y clínicas',
  },
  agendamientoWeb: {
    key: 'agendamientoWeb',
    slug: '/agendamiento-web/',
    title: 'Agendar citas médicas en línea: portal web 24/7 | GEN.AI',
    description:
      'Plataforma para que tus pacientes agenden citas médicas en línea, 24/7, filtrando por EPS, especialidad, sede y médico. Sin descargar apps.',
    h1: 'Agendamiento web de citas médicas para tu IPS o clínica',
    intro:
      'Un portal de citas en línea con la imagen de tu institución. El paciente entra desde el navegador del celular o del computador, busca cupo y confirma su cita sin llamar.',
    breadcrumbLabel: 'Agendamiento web',
    relatedSlugs: ['/bot-whatsapp-citas/', '/recordatorios-citas-medicas/', '/software-para-ips/'],
    homeAnchor: '',
    verMasLabel: 'Ver el agendamiento de citas en línea',
  },
  botWhatsapp: {
    key: 'botWhatsapp',
    slug: '/bot-whatsapp-citas/',
    title: 'Bot de WhatsApp para agendar citas médicas | GEN.AI',
    description:
      'Chatbot con IA en la API oficial de WhatsApp Business para agendar, cancelar y reprogramar citas médicas las 24 horas, conectado a tu agenda y a tu HIS.',
    h1: 'Bot de WhatsApp para agendar citas médicas',
    intro:
      'Un asistente con inteligencia artificial que atiende a tus pacientes por WhatsApp a cualquier hora: entiende lo que escriben, consulta la agenda y deja la cita confirmada.',
    breadcrumbLabel: 'Bot de WhatsApp',
    relatedSlugs: ['/agendamiento-web/', '/recordatorios-citas-medicas/', '/software-para-ips/'],
    homeAnchor: '',
    verMasLabel: 'Ver el bot de WhatsApp',
  },
  recordatorios: {
    key: 'recordatorios',
    slug: '/recordatorios-citas-medicas/',
    title: 'Recordatorios de citas médicas por WhatsApp y SMS | GEN.AI',
    description:
      'Recordatorios y confirmación automática de citas médicas por WhatsApp, SMS y correo. El paciente confirma, reprograma o cancela y el cupo vuelve a tu agenda.',
    h1: 'Recordatorios de citas médicas por WhatsApp, SMS y correo',
    intro:
      'Cada cita confirmada recibe su recordatorio automático. Si el paciente no puede asistir, lo dice en el mismo mensaje y el cupo queda libre para otra persona.',
    breadcrumbLabel: 'Recordatorios de citas',
    relatedSlugs: ['/bot-whatsapp-citas/', '/problema/', '/software-para-ips/'],
    homeAnchor: '',
    verMasLabel: 'Ver los recordatorios de citas',
  },
};

export function getPageSeo(key: PageKey): ProductPageSeo {
  return PRODUCT_PAGES[key];
}

export function getPageBySlug(slug: string): ProductPageSeo | undefined {
  return Object.values(PRODUCT_PAGES).find((page) => page.slug === slug);
}

export function getRelatedPages(slugs: string[]): ProductPageSeo[] {
  return slugs
    .map((slug) => getPageBySlug(slug))
    .filter((page): page is ProductPageSeo => page !== undefined);
}

export function buildPageTitle(page: ProductPageSeo): string {
  return page.title.includes(SITE.name) ? page.title : `${page.title} | ${SITE.name}`;
}
