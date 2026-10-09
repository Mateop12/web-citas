# SPEC-SEO-001 · Informe de auditoría SEO v1 — GEN.AI

**Sitio:** https://gena.monkeymindtech.com/ · **Mercado:** Colombia (es-CO) · **Fecha:** 2026-10-09
**Modo:** solo lectura sobre producción. Las correcciones están preparadas en la rama `seo/v1-fixes` (commit `47bcd13`), sin desplegar.
**Línea base previa:** auditoría del 2026-07-16 (`../FULL-AUDIT-REPORT.md`, 55/100).

> Leyenda de evidencia: **[M]** medido en esta ejecución · **[E]** estimación de una herramienta · **[H]** hipótesis o recomendación del modelo (sin métricas de búsqueda).

---

## 1. Resumen ejecutivo

1. **No se ha desplegado nada desde julio.** El HTML en vivo tiene `last-modified: Wed, 08 Jul 2026` [M], y todos los defectos técnicos de la auditoría de julio siguen presentes en producción y en `master`.
2. **La base técnica de rastreo está bien.** Las 12 URLs del sitemap responden 200, tienen canonical propio, son indexables, tienen títulos y descripciones únicos, el contenido se renderiza en el servidor, el robots.txt es válido y Lighthouse SEO da 100 [M].
3. **Lo que resta es la calidad de las señales:** schema FAQPage en 4 páginas donde ese contenido no aparece, un 301 en cada enlace interno, ninguna cabecera de seguridad, el host `www` duplicado, cifras que se sirven como "0%" en el HTML y un `.ico` de 71 KB usado como logo, que además es el elemento LCP en móvil [M].
4. **El mayor freno de negocio es el contenido, no la técnica.** No hay ninguna página informativa, `/nosotros/` no habla de la empresa, y la home, `/solucion/` y `/problema/` compiten por la misma intención ("software de agendamiento clínico con IA") [M/H].
5. **Faltan datos para medir:** Search Console no tiene credenciales configuradas, la cuota sin clave de PageSpeed está agotada y no hay herramienta de volumen de keywords. Todas las métricas de búsqueda de este informe son **hipótesis** (§3).

**Recomendación:** revisar y desplegar `seo/v1-fixes` (Fase 1, unas 2 h de revisión), conectar GSC para fijar la línea base esta semana, y después abordar el contenido (Fases 2 y 3).

---

## 2. Inventario reproducible de verificaciones técnicas

Se reproduce con `python -I audit.py` (stdlib, solo GET), que genera `checks.json` y `raw/*.html`. Rendimiento: Lighthouse 12 local, 1 ejecución, Chrome 2026-10 (`lh_mobile.json`, `lh_desktop.json`).
Descubrimiento: 23 URLs alcanzadas (12 canónicas + 11 variantes sin barra que redirigen con 301). Páginas auditadas / descubiertas canónicas = **12/12 (100 %)**.

| ID | Verificación | Estado | Evidencia [M] | En rama |
|---|---|---|---|---|
| T01 | URLs del sitemap responden 200 | **PASS** | 12/12 → 200 | — |
| T02 | robots.txt válido con `Sitemap:` | **PASS** | 200 `text/plain`, `Allow: /`, sitemap con el dominio correcto | — |
| T03 | sitemap.xml válido y completo | **PASS** | 12 `<loc>`; 0 huérfanas; 0 entradas que no sean 200. `changefreq=daily` en todo y `lastmod` en julio (señal débil) | — |
| T04 | HTTP→HTTPS en 1 salto | **PASS** | `http://…/` → 301 → `https://…/` 200 | — |
| T05 | `www` consolidado en el apex | **FAIL** | `https://www.gena.monkeymindtech.com/` → **200** con el mismo contenido | ✅ `.htaccess` |
| T06 | Enlaces internos sin redirección | **FAIL** | 11 enlaces por página sin barra final (`/faq` → 301 → `/faq/`) | ✅ |
| T07 | Página inexistente devuelve 404 | **PASS** | `/no-existe-404-check/` → 404 | — |
| T08 | Meta robots indexable | **PASS** | `index, follow, max-snippet:-1…` en 12/12 | — |
| T09 | Canonical propio | **PASS** | 12/12 | — |
| T10 | Títulos únicos y de longitud adecuada | **PARTIAL** | Únicos 12/12; home 77 car. y `/producto/` 78 car. (se truncan) | Propuesta §6 |
| T11 | Meta descripciones únicas y ≤160 | **PARTIAL** | Únicas 12/12; home 207 car., con "líder" sin respaldo | ✅ home |
| T12 | Un H1 por página | **PASS** | 1 H1 en 12/12 | — |
| T13 | H1 correcto y jerarquía | **PARTIAL** | H1 del home: "Software Agendamiento clínico con IA." (sin "de"), y el subtítulo "Para IPS…" marcado como H2 | ✅ |
| T14 | `alt` en imágenes | **PASS** | 0 imágenes sin `alt` | — |
| T15 | JSON-LD parseable | **PASS** | 0 errores de parseo | — |
| T16 | Schema coherente con el contenido visible | **FAIL** | `FAQPage` (7 preguntas del home) en las 4 páginas `/legal/*`, donde no aparece | ✅ |
| T17 | `Organization.logo` en formato admitido | **FAIL** | `favicon.ico` (`image/x-icon`) | ✅ `logo.png` 256 px |
| T18 | `sameAs` verificados | **PARTIAL** | `linkedin.com/company/genai` (en julio apuntaba a otra empresa; no verificable sin sesión). Además, el footer enlaza a `linkedin.com` y `twitter.com` genéricos | ✅ se quita LinkedIn del schema; footer pendiente (B11) |
| T19 | `SoftwareApplication` veraz | **FAIL** | `operatingSystem: "Web, iOS, Android"`; el sitio no menciona apps nativas | ✅ "Web" (lo debe confirmar Producto) |
| T20 | Imagen OG rasterizada | **FAIL** | `og-image.svg` (X y Facebook no renderizan SVG) | ❌ B08 |
| T21 | Cabeceras de seguridad | **FAIL** | Sin HSTS, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy` ni `Permissions-Policy`; la CSP solo tiene `upgrade-insecure-requests` | ✅ `.htaccess` |
| T22 | Caché | **FAIL** | HTML sin `cache-control`; Lighthouse marca 4 recursos con TTL corto | ✅ assets con hash |
| T23 | Contenido sin depender de JS | **PARTIAL** | Todo se renderiza en el servidor, salvo los contadores, que se sirven como `0%`, `0%` y `−0%` (home y `/solucion/`) | ✅ |
| T24 | Rendimiento móvil (laboratorio) | **PARTIAL** | Lighthouse 84; LCP **3,2 s** (elemento LCP = `<img src="/favicon.ico">`), FCP 3,1 s, CLS 0, TBT 0 ms; render-blocking ≈1,7 s [E] | ✅ logo; fuentes pendientes (B07) |
| T25 | Rendimiento escritorio (laboratorio) | **PASS** | Lighthouse 96; LCP 1,0 s; CLS 0,005 | — |
| T26 | Core Web Vitals de campo (CrUX) | **NO VERIFICADO** | La API de PageSpeed sin clave da 429 (cuota agotada); probablemente tampoco hay tráfico suficiente para CrUX | Permiso §8 |
| T27 | Indexación real en Google | **NO VERIFICADO** | GSC sin credenciales | Permiso §8 |
| T28 | hreflang | **PASS (info)** | `es`, `es-CO`, `es-419` y `x-default` apuntan a sí mismos; correcto en un sitio de un solo idioma | — |
| T29 | Accesibilidad básica | **PARTIAL** | Lighthouse 97; falla `aria-hidden-focus` | ❌ B12 |
| T30 | Duplicidad y canibalización de contenido | **FAIL** | `/nosotros/` = lista de beneficios del home; home, `/solucion/` y `/problema/` atacan la misma intención (§4) | ❌ B04–B05 |
| T31 | llms.txt | **INFO** | 404 (opcional) | ❌ B15 |

**Resumen:** 12 PASS · 7 PARTIAL · 9 FAIL · 2 sin verificar · 1 informativo. **12 de los 16 PARTIAL/FAIL** quedan resueltos total o parcialmente en la rama.

> Las cifras de rendimiento de julio (LCP 4,69 s) y las de hoy (3,2 s) vienen de entornos distintos (PSI frente a Lighthouse local) y **no son comparables** entre sí. Para la comparación antes/después hay que usar la misma herramienta (§9).

---

## 3. Matriz de palabras clave (hipótesis)

**Todas las filas son [H].** No se dispuso de volumen, dificultad ni tendencia. Las búsquedas de verificación (2026-10-09) se hicieron con un buscador **no localizado en Colombia**, así que la columna "SERP observada" es indicativa y hay que reconfirmarla con GSC o con una herramienta de keywords localizada en CO.

| # | Keyword candidata | Intención | Etapa | Relevancia comercial | SERP observada (indicativa) |
|---|---|---|---|---|---|
| K01 | software de agendamiento de citas médicas | Comercial | Evaluación | Alta | Medesk, AgendaPro, prensa sobre Coco Tecnologías |
| K02 | software de agendamiento clínico | Comercial | Evaluación | Alta | — |
| K03 | software para IPS Colombia | Comercial | Evaluación | Alta | Medesk `/soluciones/ips-colombia/`, AgendaPro `/co/` |
| K04 | agendamiento de citas por WhatsApp para clínicas | Comercial | Evaluación | Alta | Medesk (blog), Aurora Inbox, EZContact, Gurusup |
| K05 | chatbot de WhatsApp para citas médicas | Comercial | Evaluación | Alta | Gurusup, Aurora Inbox |
| K06 | portal de autoagendamiento de citas para pacientes | Comercial | Evaluación | Media-alta | — |
| K07 | software de recordatorios y confirmación de citas médicas | Comercial | Evaluación | Alta | Medesk, Carepatron |
| K08 | software de agendamiento para call center de salud | Comercial | Evaluación | Media-alta | — |
| K09 | integración de agenda con historia clínica (HIS) | Comercial | Evaluación técnica | Alta | Medesk (HCE, RIPS) |
| K10 | software de demanda inducida para IPS | Comercial | Evaluación | Media | Sin resultados específicos: **posible hueco de baja competencia** |
| K11 | demo de software de agendamiento médico | Transaccional | Decisión | Muy alta | — |
| K12 | precio de software de agendamiento de citas médicas | Transaccional | Decisión | Alta | AgendaPro publica planes |
| K13 | cómo reducir la inasistencia a citas médicas | Informativa | Problema | Media | Repositorios universitarios (Unicórdoba, EAFIT), Medesk |
| K14 | ausentismo de pacientes en IPS: causas y estrategias | Informativa | Problema | Media | Repositorios académicos |
| K15 | qué es la demanda inducida en salud | Informativa | Problema | Media | — |
| K16 | Resolución 1888 de 2025: interoperabilidad de la historia clínica (RDA) | Informativa | Problema / regulatorio | Media-alta | Medesk ya lo cubre |
| K17 | cómo automatizar el agendamiento de citas en una IPS | Informativa | Solución | Alta | EZContact (caso de éxito) |
| K18 | indicador de oportunidad en la asignación de citas | Informativa | Problema | Media | — *(confirmar la norma vigente antes de redactar)* |
| K19 | GEN.AI agendamiento | Navegacional | Marca | Alta | — |
| K20 | MonkeyMind Tech / MonkeyMind Software | Navegacional | Marca | Media | Tres variantes de marca dispersan la señal |

**Competidores orgánicos observados [M, no localizado]:** Medesk (blog extenso y página para IPS en Colombia), AgendaPro (landings `/co/` por vertical y planes publicados), Coco Tecnologías (cobertura de prensa en Portafolio y Valora Analitik, Premios Ingenio 2025), TodoIP (asistente WhatsApp/teléfono, información comercial en El País) y Aurora Inbox / EZContact / Gurusup (contenido sobre chatbots de WhatsApp).
**Diferenciación posible [H]:** ninguno de los resultados combina *demanda inducida + autoagendamiento + interoperabilidad con HIS* para IPS. Los textos legales y de cumplimiento de GEN.AI (Ley 1581, rol de responsable/encargado) son más precisos que los de la competencia, pero solo están en el footer.

---

## 4. Mapa de palabras clave por URL

| URL | Grupo principal | Keywords | Estado y acción |
|---|---|---|---|
| `/` | Software de agendamiento de citas médicas para IPS | K01, K02, K03, K19, K20 | Mantener. Es la página de marca y la del término principal |
| `/solucion/` | **Conflicto con `/`** (mismo H1 objetivo) | → reorientar a K17 + K07 | Hoy su H1 es "Software de agendamiento clínico con inteligencia artificial", igual que el home. Reorientar a "Cómo funciona la automatización de citas: confirmaciones, recordatorios y reprogramación" |
| `/problema/` | **Conflicto parcial con `/`** (duplica la sección del home) | → K13, K14 | Convertir en una guía de problema con datos y fuentes, o fusionarla con 301 en el artículo N3 |
| `/producto/` | Plataforma, portal y campañas | K06, K10, K12 | Añadir una sección de planes/precios (K12) y una de seguridad/cumplimiento |
| `/panel/` | Call center y gestión | K08 | Mantener; reforzar el ángulo de call center |
| `/faq/` | Dudas previas a la compra | variantes long-tail | Mantener; ampliar las respuestas a 120–160 palabras |
| `/contacto/` | Demo | K11 | Mantener |
| `/nosotros/` | **Página que no corresponde a su URL** | K20 | Reescribir como "Quiénes somos": empresa, equipo, NIT, clientes. Los beneficios ya están en el home |
| **Nueva** `/agendamiento-por-whatsapp/` | WhatsApp | K04, K05 | Justificación: la SERP muestra páginas dedicadas y `/producto/` mezcla 5 temas |
| **Nueva** `/integraciones/` | HIS y RIPS | K09, K16 | Justificación: hoy solo aparece en una respuesta de la FAQ, y es un criterio de compra técnico |
| **Nueva** `/recursos/` (hub) + artículos N1–N4 | Informativa | K13–K18 | Justificación: hoy no hay ningún contenido informativo, que es la vía hacia búsquedas sin marca y hacia citas en IA |

---

## 5. Backlog priorizado

Prioridad = impacto × relevancia comercial ÷ esfuerzo, ajustada por la confianza en la evidencia. Responsables sugeridos: **Dev** (desarrollo), **Ops** (hosting), **Mkt** (contenido/marketing), **Prod** (producto).

| ID | Prio. | Problema | URL | Cambio | Resp. | Criterio de aceptación | Estado |
|---|---|---|---|---|---|---|---|
| B01 | P0 | Schema FAQPage que no coincide con el contenido (T16) | 4 × `/legal/*` | BreadcrumbList en lugar de FAQPage | Dev | `audit.py`: ninguna página `/legal/*` con FAQPage; Rich Results Test sin avisos | ✅ rama |
| B02 | P0 | Logo `.ico` de 71 KB como elemento LCP en móvil (T17, T24) | todas | `logo-96.png` (14 KB) en la cabecera y `logo.png` en el schema | Dev | Lighthouse móvil: el LCP deja de ser el logo; peso de la home ≤110 KB | ✅ rama |
| B03 | P0 | Sin cabeceras de seguridad, `www` duplicado (T05, T21) | todas | `public/.htaccess` (**fusionarlo antes con el que haya en el servidor**) | Ops | `curl -sI` muestra las 5 cabeceras; `www` → 301 → apex | ✅ rama |
| B04 | P0 | Canibalización entre home, `/solucion/` y `/problema/` (T30) | 3 URLs | Reorientar según §4 | Mkt | H1 y título distintos y alineados con el mapa; en GSC, una sola URL por consulta principal (tras 8 semanas) | Pendiente |
| B05 | P1 | `/nosotros/` sin contenido sobre la empresa | `/nosotros/` | Página real de "Quiénes somos" + NIT, dirección y teléfono en texto visible | Mkt + Prod | Contiene historia, equipo y datos legales; similitud textual con el home <30 % | Pendiente |
| B06 | P1 | Un 301 en cada enlace interno (T06) | todas | Barra final en todos los `href` | Dev | `audit.py`: `internal_links_no_slash` vacío | ✅ rama |
| B07 | P1 | Google Fonts bloquea el renderizado (≈1,7 s [E]) | todas | Alojar las 2 familias en el propio sitio con `font-display: swap` | Dev | Lighthouse móvil sin `render-blocking-insight`; FCP < 2,5 s | Pendiente |
| B08 | P1 | Imagen OG en SVG (T20) | todas | PNG de 1200×630 | Mkt/diseño | Las vistas previas de Facebook y LinkedIn muestran la imagen | Pendiente |
| B09 | P1 | Cifras servidas como "0%" (T23) | `/`, `/solucion/` | Renderizar el valor final en el servidor | Dev | `curl` del HTML contiene "70%", "100%" y "−65%" | ✅ rama |
| B10 | P1 | H1 del home con error gramatical y subtítulo en H2 (T13) | `/` | Un solo H1 | Dev | H1 = "Software de agendamiento clínico con IA Para IPS y centros de salud" | ✅ rama |
| B11 | P1 | `sameAs` y redes sociales sin verificar o genéricos (T18) | todas | Poner las URLs reales de LinkedIn e Instagram en el schema y el footer; quitar twitter.com y `@genai` si no son vuestros | Mkt | Todas las URLs sociales apuntan a perfiles propios | Parcial (schema) |
| B12 | P2 | `aria-hidden-focus` (T29) | `/` | Quitar el foco de los elementos con `aria-hidden` | Dev | Accesibilidad en Lighthouse = 100 | Pendiente |
| B13 | P2 | `operatingSystem` incorrecto (T19) | todas | "Web" (confirmar con Prod si hay app nativa) | Prod | Valor confirmado por Producto | ✅ rama (validar) |
| B14 | P2 | Meta descripción del home de 207 car. y título de 77 | `/` | Ver §6 | Mkt | Título ≤60 y descripción ≤160 | Descripción ✅ / título pendiente |
| B15 | P2 | Errata "asiganadas" | `/`, `/contacto/` | Corregir | Dev | 0 apariciones | ✅ rama |
| B16 | P2 | Nuevas páginas: WhatsApp, integraciones y planes (§4) | nuevas | Brief + redacción con revisión humana | Mkt + Prod | Publicadas, enlazadas desde el home y el nav, y en el sitemap | Pendiente |
| B17 | P2 | Hub `/recursos/` + 4 artículos (N1 inasistencia, N2 demanda inducida, N3 automatizar el agendamiento en una IPS, N4 Resolución 1888/2025) | nuevas | Artículos de 1.200–1.800 palabras con fuentes citadas | Mkt | Indexados en GSC; impresiones > 0 en 8 semanas | Pendiente |
| B18 | P3 | Marca dispersa (monkeymindtech / monkeymindsoftware / GEN.AI) | global | Decidir un nombre canónico y enlaces recíprocos con el sitio matriz | Dirección | Un único nombre legal y de marca en el schema y el footer | Pendiente |
| B19 | P3 | sitemap con `changefreq=daily` y `lastmod` estático | `sitemap.xml` | Generarlo en el build (`@astrojs/sitemap`) o retirar `changefreq` | Dev | `lastmod` = fecha real del cambio | Pendiente |
| B20 | P3 | Sin llms.txt | `/llms.txt` | Añadirlo cuando estén B05 y B16 | Mkt | 200 con enlaces válidos | Pendiente |

---

## 6. Propuestas de metadatos (revisión humana: afectan a la conversión)

| URL | Título propuesto (≤60) | Descripción propuesta (≤160) |
|---|---|---|
| `/` | Software de agendamiento de citas médicas con IA \| GEN.AI | Software de agendamiento clínico con IA para IPS y clínicas en Colombia: autoagendamiento 24/7 por WhatsApp y web, recordatorios e integración con HIS. *(ya en la rama)* |
| `/solucion/` | Cómo automatizar las citas médicas en tu IPS \| GEN.AI | Confirmaciones, recordatorios y reprogramación automáticas por WhatsApp, web y call center. Así funciona el agendamiento automático de GEN.AI. |
| `/problema/` | Inasistencia y llamadas perdidas en IPS: causas \| GEN.AI | Por qué las IPS pierden citas y cupos: llamadas sin respuesta, ausentismo y agendas manuales. Datos, causas y cómo medirlo. |
| `/producto/` | Portal de autoagendamiento y campañas para IPS \| GEN.AI | Portal web y móvil 24/7, WhatsApp con IA, SMS y correo, con campañas de demanda inducida para llenar la agenda de tu IPS. |
| `/nosotros/` | Quiénes somos: el equipo detrás de GEN.AI | *(redactar cuando exista el contenido de B05)* |

---

## 7. Plan de implementación por fases

| Fase | Plazo | Contenido | Puerta de salida |
|---|---|---|---|
| 0 · Línea base | Semana 1 | Conectar GSC (§8); exportar 3 meses de consultas, páginas e indexación; volver a ejecutar `audit.py` y Lighthouse | Baseline guardado y con fecha |
| 1 · Técnica | Semana 1–2 | Revisar y desplegar `seo/v1-fixes` (B01–B03, B06, B09, B10, B13–B15) | `audit.py` sin FAIL de T05, T06, T16, T17, T21, T23; Lighthouse móvil ≥90 |
| 2 · Arquitectura y contenido | Semana 3–6 | B04, B05, B07, B08, B11, B12, metadatos de §6 | Mapa de §4 implementado; ningún conflicto de canibalización en GSC |
| 3 · Captación | Mes 2–3 | B16, B17, B19, B20 | 3 páginas nuevas y 4 artículos indexados |
| 4 · Validación | Semanas 8 y 12 tras la Fase 1 | §9 | Informe de validación |

---

## 8. Herramientas y permisos que faltan (criterio 9)

| Falta | Impide | Cómo habilitarlo |
|---|---|---|
| **Credenciales de Search Console** (marcado como disponible, pero sin configurar en esta máquina) | T26, T27, línea base de impresiones, clics y posición, detección real de canibalización | Crear una cuenta de servicio en Google Cloud, añadirla como usuario **restringido** (solo lectura) en la propiedad de GSC y guardar la ruta en `~/.config/claude-seo/google-api.json` (ver `claude-seo/scripts/google_auth.py --check`) |
| Clave de la API de PageSpeed | Datos de campo de CrUX y PSI reproducible | Clave gratuita en Google Cloud (misma configuración) |
| Herramienta de volumen de keywords (Keyword Planner, DataForSEO o Ahrefs) | Volumen, dificultad y tendencia de K01–K20 | Cualquiera, con ubicación CO e idioma es |
| GA4 | Sesiones orgánicas y demos atribuidas a orgánico | Opcional ahora; necesario para los KPI comerciales |
| `.htaccess` actual del servidor | Fusión segura de B03 | Descargarlo de `public_html` en Hostinger |

---

## 9. Plan de validación (Paso 8)

1. Tras el despliegue: `python -I audit.py` y comparar `checks.json` con el de esta carpeta. Los FAIL marcados como ✅ deben pasar a PASS.
2. Lighthouse móvil y escritorio con la **misma** herramienta y versión (3 ejecuciones, mediana).
3. `curl -sI https://gena.monkeymindtech.com/` → las 5 cabeceras presentes; `https://www.…/` → 301.
4. Rich Results Test en `/`, `/faq/` y `/legal/cookies/`.
5. Semanas 8 y 12: GSC (impresiones, clics y posición media por grupo de §3; páginas indexadas) frente a la línea base de la Fase 0. **No** contar el número de keywords propuestas como mejora.

---

## 10. Estado frente a los criterios de aceptación de la spec

| # | Criterio | Estado |
|---|---|---|
| 1 | Analiza la home y descubre las páginas dentro del alcance | **PASS**: 23 URLs, 12 canónicas, 100 % auditadas |
| 2 | Inventario reproducible de verificaciones | **PASS**: `audit.py` + `checks.json` + `raw/` + JSON de Lighthouse |
| 3 | ≥15 keywords agrupadas por intención, marcadas como hipótesis | **PASS**: 20 en 4 intenciones, todas [H] |
| 4 | Mapa de keywords a páginas existentes o nuevas, justificado | **PASS**: §4 |
| 5 | Hallazgos técnicos con evidencia verificable | **PASS**: §2 |
| 6 | Backlog priorizado | **PASS**: §5 |
| 7 | Sin modificaciones en producción | **PASS**: solo GET; cambios en la rama, sin desplegar |
| 8 | Distingue PASS, PARTIAL y FAIL | **PASS**: §2 |
| 9 | Informa de las herramientas y permisos que faltan | **PASS**: §8 |

**Fuentes de las SERP consultadas (2026-10-09):** [Valora Analitik](https://www.valoraanalitik.com/software-colombiano-agendamiento-citas-medicas-premio/), [Portafolio](https://www.portafolio.co/innovacion/software-que-agenda-mas-de-140-000-citas-medicas-al-mes-gana-el-premio-ingenio-2025-642704), [El País](https://www.elpais.com.co/informacion-comercial/el-gran-problema-del-agendamiento-de-citas-medicas-en-colombia.html), [AgendaPro](https://agendapro.com/co/agenda-medica), [Medesk IPS](https://www.medesk.net/es/soluciones/ips-colombia/), [Medesk WhatsApp](https://www.medesk.net/es/blog/software-citas-por-whatsapp-clinicas/), [EZContact](https://ezcontact.ai/es/blog/caso-exito-clinica-automatizo-citas-agente-ia/), [Gurusup](https://gurusup.com/es/blog/chatbot-whatsapp-citas), [Medesk HCE](https://www.medesk.net/es/blog/software-de-historias-clinicas-colombia/), [Unicórdoba](https://repositorio.unicordoba.edu.co/entities/publication/115d8fc6-5ef5-4673-8a0e-7432a7704af1/full).
