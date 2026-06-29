import { SITE } from './seo';

export const LEGAL = {
  lastUpdated: '26 de junio de 2026',
  company: SITE.legalName,
  brand: SITE.name,
  email: SITE.email,
  country: SITE.country,
} as const;

export const LEGAL_NAV = [
  { label: 'Política de privacidad', href: '/legal/politica-de-privacidad' },
  { label: 'Términos de servicio', href: '/legal/terminos-de-servicio' },
  { label: 'Protección de datos clínicos', href: '/legal/proteccion-de-datos' },
  { label: 'Política de cookies', href: '/legal/cookies' },
] as const;
