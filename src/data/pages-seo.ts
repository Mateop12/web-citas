import { SITE } from './seo';

export type PageKey =
  | 'problema'
  | 'solucion'
  | 'nuestrosPlus'
  | 'whatsapp'
  | 'panel'
  | 'faq'
  | 'contacto';

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
    relatedSlugs: ['/solucion/', '/nosotros/', '/contacto/'],
    homeAnchor: '#problema',
    verMasLabel: 'Conoce los desafíos del agendamiento clínico',
  },
  solucion: {
    key: 'solucion',
    slug: '/solucion/',
    title: 'Cómo funciona GEN.AI: recordatorios e integración con HIS',
    description:
      'Automatiza citas médicas con inteligencia artificial. WhatsApp, web y call center integrados. Confirmaciones automáticas e interoperabilidad con HIS para IPS en Colombia.',
    h1: 'Software de agendamiento clínico con inteligencia artificial',
    intro:
      'GEN.AI centraliza WhatsApp, portal web y call center en una sola plataforma. Tu equipo deja de repetir tareas manuales mientras los pacientes agendan, confirman y reprograman las 24 horas.',
    breadcrumbLabel: 'Solución',
    relatedSlugs: ['/producto/', '/panel/', '/nosotros/'],
    homeAnchor: '#solucion',
    verMasLabel: 'Ver el software de agendamiento con IA',
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
    title: 'Portal de autoagendamiento y campañas para IPS | GEN.AI',
    description:
      'Portal web y móvil 24/7, WhatsApp con IA, SMS y correo. Campañas de demanda inducida y demanda insatisfecha para captar pacientes en IPS y clínicas de Colombia.',
    h1: 'Plataforma completa de agendamiento, campañas y contacto al paciente',
    intro:
      'GEN.AI concentra en un solo producto lo que hoy está disperso: portal de autoagendamiento web y móvil, WhatsApp con IA, SMS, correo, campañas de demanda inducida y recuperación de demanda insatisfecha. Más pacientes agendados, menos carga en recepción y trazabilidad en tu panel administrativo.',
    breadcrumbLabel: 'Producto',
    relatedSlugs: ['/solucion/', '/panel/', '/nosotros/'],
    homeAnchor: '#whatsapp',
    verMasLabel: 'Conoce el producto GEN.AI',
  },
  panel: {
    key: 'panel',
    slug: '/panel/',
    title: 'Panel administrativo de agendamiento clínico | GEN.AI',
    description:
      'Dashboard para equipos de salud: calendario, profesionales, reportes de ocupación y ausentismo. Panel web multiusuario para IPS y clínicas en Colombia.',
    h1: 'Panel administrativo para gestionar tu agenda clínica',
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
