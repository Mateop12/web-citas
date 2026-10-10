import { faqs, type FAQItem } from './faqs';

export const SITE = {
  name: 'GEN.AI',
  legalName: 'GEN.AI SAS',
  url: 'https://gena.monkeymindtech.com',
  hostname: 'gena.monkeymindtech.com',
  appHostname: 'app.gena.monkeymindtech.com',
  email: 'info@monkeymindsoftware.com',
  locale: 'es_CO',
  language: 'es',
  country: 'Colombia',
  region: 'Latinoamérica',
  foundingDate: '2024',
  sameAs: [
    'https://www.instagram.com/monkeymind_software/',
  ],
} as const;

export const SEO = {
  title:
    'Software de agendamiento de citas médicas con IA | GEN.AI',
  description:
    'Software de agendamiento clínico para IPS y clínicas en Colombia: agendamiento web, bot de WhatsApp y recordatorios de citas. Implementación en 48 h.',
  ogImageAlt:
    'GEN.AI — Plataforma de IA para agendamiento médico, informes gerenciales e interoperabilidad con HIS, autoagendamiento del paciente 24/7 ',
} as const;

export function buildCanonicalUrl(pathname: string, site = SITE.url) {
  return new URL(pathname, site).href;
}

const ID = {
  organization: `${SITE.url}/#organization`,
  website: `${SITE.url}/#website`,
  software: `${SITE.url}/#software`,
};

// Cada valor debe verse en el sitio. Sin Offer/precio, aggregateRating ni Review hasta que existan visibles.
// TODO(dueño): confirmar foundingDate (SITE.foundingDate) antes de agregarlo; teléfono visible antes de agregar telephone.
export function buildSiteGraph() {
  const url = `${SITE.url}/`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': ID.organization,
        name: SITE.name,
        legalName: SITE.legalName,
        url,
        logo: `${SITE.url}/logo.png`,
        description:
          'Software de inteligencia artificial para agendamiento médico en IPS y clínicas de Colombia: autoagendamiento 24/7, confirmaciones automáticas, informes gerenciales e interoperabilidad con HIS.',
        email: SITE.email,
        areaServed: { '@type': 'Country', name: 'Colombia' },
        address: { '@type': 'PostalAddress', addressLocality: 'Medellín', addressCountry: 'CO' },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: SITE.email,
          availableLanguage: 'es',
        },
        sameAs: SITE.sameAs,
      },
      {
        '@type': 'WebSite',
        '@id': ID.website,
        name: SITE.name,
        url,
        inLanguage: 'es-CO',
        publisher: { '@id': ID.organization },
      },
      {
        '@type': 'SoftwareApplication',
        '@id': ID.software,
        name: SITE.name,
        url,
        applicationCategory: 'HealthApplication',
        applicationSubCategory: 'Medical Scheduling Software',
        operatingSystem: 'Web',
        inLanguage: 'es-CO',
        description:
          'Agendamiento médico con inteligencia artificial por WhatsApp, web y call center, con confirmaciones automáticas, informes gerenciales e interoperabilidad con HIS.',
        featureList: [
          'Autoagendamiento 24/7 por WhatsApp y portal web',
          'Confirmaciones y recordatorios automáticos por WhatsApp, correo y SMS',
          'Lista de espera y reasignación de cupos liberados',
          'Informes gerenciales de ocupación y demanda',
          'Panel con calendario, profesionales y reportes de ocupación',
          'Interoperabilidad con software de historia clínica (HIS) vía API',
        ],
        audience: {
          '@type': 'Audience',
          audienceType: 'IPS, clínicas, hospitales y centros de diagnóstico',
        },
        provider: { '@id': ID.organization },
      },
    ],
  };
}

export type WebPageType = 'WebPage' | 'AboutPage' | 'ContactPage';

export function buildWebPageSchema(page: {
  url: string;
  name: string;
  description: string;
  type?: WebPageType;
  breadcrumbId?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': page.type ?? 'WebPage',
    '@id': `${page.url}#webpage`,
    url: page.url,
    name: page.name,
    description: page.description,
    inLanguage: 'es-CO',
    isPartOf: { '@id': ID.website },
    about: { '@id': ID.software },
    ...(page.breadcrumbId ? { breadcrumb: { '@id': page.breadcrumbId } } : {}),
  };
}

export function buildFAQSchema(items: FAQItem[] = faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${items[items.length - 1].url}#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
