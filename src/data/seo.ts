import { faqs } from './faqs';

export const SITE = {
  name: 'GEN.AI',
  legalName: 'GEN.AI SAS',
  url: 'https://genai.co',
  email: 'info@monkeymindsoftware.com',
  locale: 'es_CO',
  language: 'es',
  country: 'Colombia',
  region: 'Latinoamérica',
  foundingDate: '2024',
  sameAs: [
    'https://linkedin.com/company/genai',
    'https://www.instagram.com/monkeymind_software/',
  ],
} as const;

export const SEO = {
  title:
    'GEN.AI — Software de IA para Agendamiento Médico | IPS, Clínicas y Hospitales',
  description:
    'Plataforma de inteligencia artificial líder para IPS y clínicas en Colombia y Latinoamérica. Agendamiento con IA, informes gerenciales, turnos, interoperabilidad con HIS, autoagendamiento del paciente 24/7 .',
  keywords: [
    'software IA salud Colombia',
    'inteligencia artificial IPS',
    'agendamiento médico inteligente',
    'autoagendamiento',
    'tecnología salud Latinoamérica',
    'software agendamiento clínico',
    'agenda médica online',
    'citas médicas WhatsApp',
    'chatbot salud',
    'informes gerenciales salud',
    'interoperabilidad historia clínica',
    'integración HIS',
    'gestión de turnos médicos',
    'software IPS Colombia',
    'software clínicas Colombia',
    'reducir ausentismo citas',
    'confirmación automática citas',
    'recordatorios pacientes WhatsApp',
    'plataforma salud digital',
    'GEN.AI',
  ].join(', '),
  ogImageAlt:
    'GEN.AI — Plataforma de IA para agendamiento médico, informes gerenciales e interoperabilidad con HIS, autoagendamiento del paciente 24/7 ',
  themeColor: '#163ba3',
  twitterHandle: '@genai',
} as const;

export function buildCanonicalUrl(pathname: string, site = SITE.url) {
  return new URL(pathname, site).href;
}

export function buildSoftwareSchema(description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SITE.name,
    applicationCategory: 'HealthApplication',
    applicationSubCategory: 'Medical Scheduling Software',
    operatingSystem: 'Web, iOS, Android',
    url: SITE.url,
    description,
    inLanguage: 'es',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'COP',
      description: 'Demo personalizada sin costo',
      availability: 'https://schema.org/InStock',
      areaServed: ['CO', 'MX', 'PE', 'CL', 'EC', 'AR'],
    },
    featureList: [
      'Agendamiento médico con inteligencia artificial',
      'Autoagendamiento 24/7 por WhatsApp',
      'Autoagendamiento 24/7 de pacientes',
      'Informes gerenciales de ocupación y demanda',
      'Gestión de turnos y profesionales',
      'Interoperabilidad con software de historia clínica (HIS)',
      'Confirmaciones y recordatorios automáticos',
      'Dashboard administrativo multiusuario',
      'Portal web de agendamiento para pacientes',
    ],
    audience: {
      '@type': 'Audience',
      audienceType: 'IPS, clínicas, hospitales, laboratorios y centros de diagnóstico',
      geographicArea: {
        '@type': 'GeoCircle',
        geoMidpoint: {
          '@type': 'GeoCoordinates',
          latitude: 6.248,
          longitude: -75.574,
        },
        description: 'Colombia y Latinoamérica',
      },
    },
  };
}

export function buildOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.url,
    email: SITE.email,
    foundingDate: SITE.foundingDate,
    areaServed: SITE.region,
    sameAs: SITE.sameAs,
    logo: `${SITE.url}/favicon.ico`,
    description: SEO.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'CO',
      addressLocality: 'Medellín',
    },
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: SITE.url,
    inLanguage: 'es-CO',
    description: SEO.description,
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function buildFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
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
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildStructuredData(description: string, options?: { includeFaq?: boolean }) {
  const includeFaq = options?.includeFaq ?? true;
  const schemas = [
    buildSoftwareSchema(description),
    buildOrganizationSchema(),
    buildWebSiteSchema(),
  ];
  if (includeFaq) schemas.push(buildFAQSchema());
  return schemas;
}
