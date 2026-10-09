# SPEC: Correcciones SEO para gena.monkeymindtech.com

> Para: un agente de IA con acceso al repositorio del sitio (Astro) y, si es posible, al hosting (Hostinger hPanel).
> Origen: auditoría SEO del 2026-10-09. Puntaje inicial: **62/100**.
> Objetivo: verificar cada hallazgo contra el código y el sitio en vivo, corregir lo que se pueda sin inventar datos, y dejar la lista de lo que necesita información del dueño.

---

## 0. Reglas obligatorias

1. **Verifica antes de corregir.** Cada tarea trae un paso "Verificar". Si el hallazgo no se reproduce, marca la tarea `NO APLICA` con la evidencia y sigue con la siguiente. No corrijas a ciegas.
2. **Nunca inventes datos.** NIT, fundadores, dirección, URL de LinkedIn, precios, métricas de clientes, certificados y testimonios **solo** se usan si existen en el repo o el dueño los entrega. Si faltan, deja `TODO(dueño): <qué falta>` y agrégalo a la lista de la sección 5. Esta regla aplica sobre todo a los datos estructurados (JSON-LD): cada valor del marcado debe verse en la página.
3. **No toques** el diseño visual ni los textos legales salvo lo indicado. Haz cambios pequeños y en un commit por tarea (`seo: T1 contadores en HTML`).
4. **El sitio está en español (es-CO).** Todo texto nuevo va en español con ortografía correcta (tildes, `20.000` con punto de miles).
5. **No uses HowTo schema** ni agregues FAQPage nuevo pensando en Google (los resultados enriquecidos de FAQ se retiraron el 7 de mayo de 2026). El FAQPage que ya existe se mantiene.
6. Al terminar, entrega el **informe final** de la sección 6.

## 1. Contexto técnico

- Framework: **Astro v7**, salida estática. Hosting: **Hostinger** (CDN `hcdn`). Usa `ClientRouter` (View Transitions).
- 12 URLs en el sitemap: `/`, `/problema/`, `/solucion/`, `/nosotros/`, `/producto/`, `/faq/`, `/panel/`, `/contacto/`, `/legal/politica-de-privacidad/`, `/legal/terminos-de-servicio/`, `/legal/proteccion-de-datos/`, `/legal/cookies/`.
- Los canonicals y el sitemap usan barra final (`/problema/`); los enlaces internos no (`/problema`). Hoy cada clic interno pasa por un 301.
- Para verificar en vivo usa `curl -s https://gena.monkeymindtech.com/<ruta>`. Para verificar el build local usa `npm run build` y revisa `dist/`.

## 2. Orden de ejecución

Las tareas que **no dependen del dueño** van primero: T1, T3, T6, T9, T10, T11, T12, T13, T14. Después vienen las que necesitan datos, con `TODO(dueño)` donde falte algo: T2, T4, T5, T7, T8.

---

## 3. Tareas de prioridad alta

### T1. Contadores de impacto muestran "0%" en el HTML
- **Hallazgo:** en el home, `<span data-counter="70" data-suffix="%">0%</span>` (y también `100` y `−65`). Google y las IA leen "0% Menos llamadas", "0% Confirmaciones automáticas" y "−0% Tiempo de agendamiento".
- **Verificar:** `curl -s https://gena.monkeymindtech.com/ | grep -o 'data-counter="[0-9]*"[^>]*>[^<]*'`
- **Corregir:**
  - Renderiza el valor final en el HTML (`70%`, `100%`, `−65%`).
  - Que el JavaScript anime desde 0 solo al entrar en el viewport, y que no anime si está activo `prefers-reduced-motion`.
  - Agrega debajo una línea de fuente visible: `TODO(dueño): "Promedio en N clínicas, periodo X"`.
- **Aceptación:** el HTML del build (`dist/index.html`) contiene `>70%<`, `>100%<` y `>−65%<`, y no hay ningún `>0%<` ni `>−0%<`.

### T2. `/nosotros/` no es una página sobre la empresa
- **Hallazgo:** su H1 es "Beneficios del autoagendamiento clínico" y repite el bloque "Nuestros plus" del home. En todo el sitio no aparece equipo, NIT, dirección ni historia.
- **Verificar:** `curl -s https://gena.monkeymindtech.com/nosotros/ | grep -o '<h1[^>]*>.*</h1>'`
- **Corregir:**
  - Mueve el bloque de beneficios a `/solucion/`.
  - Reescribe `/nosotros/` con:
    - Título: `Nosotros | El equipo detrás de GEN.AI en Medellín`
    - H1: `Quiénes somos: el equipo detrás de GEN.AI`
    - Párrafo de identidad: `GEN.AI es un software de agendamiento clínico con IA desarrollado por GEN.AI SAS (Medellín, Colombia)`, más la relación con Monkey Mind Tech (`TODO(dueño)`).
    - Fundadores y equipo con cargo y LinkedIn: `TODO(dueño)`.
    - NIT, dirección y año de fundación: `TODO(dueño)`. El JSON-LD actual dice `foundingDate: 2024`; confírmalo.
    - Misión e historia: `TODO(dueño)`.
- **Aceptación:** el H1 y el título hablan de la empresa, el bloque de beneficios ya no está duplicado, y cada dato faltante está marcado como TODO (nada inventado).

### T3. Datos estructurados (JSON-LD) que contradicen la página
- **Hallazgos** (los bloques SoftwareApplication, Organization y WebSite se repiten en las 8 páginas):
  - Un `Offer` con `price: "0"` COP e `InStock`. El sitio no muestra precio y es software B2B de pago. **Eliminar.**
  - `Offer.areaServed` incluye MX, PE, CL, EC y AR, y México no aparece en el texto visible. Se va junto con el Offer.
  - `operatingSystem: "Web, iOS, Android"`, pero el sitio dice "100% web" y "Sin apps". Cambiar a `"Web"`.
  - `sameAs` incluye `https://linkedin.com/company/genai`, que no se ha verificado. **Eliminar** hasta tener la URL real.
  - `audience.geographicArea` usa un GeoCircle sin `geoRadius`. **Eliminar.**
  - `description` dice "líder", palabra que no está en el texto visible. **Quitarla.**
  - `inLanguage` es `es` en un bloque y `es-CO` en otro. Usar `es-CO` en ambos.
  - No hay `@id`, y WebSite incluye un Organization duplicado. Pasar todo a un `@graph` con `@id`.
- **Verificar:** extrae los bloques con `curl -s https://gena.monkeymindtech.com/ | grep -o '<script type="application/ld+json">.*</script>'` y confirma cada punto.
- **Corregir:**
  - En el home, reemplaza los bloques SoftwareApplication, Organization y WebSite por el bloque del **Anexo A**. Mantén el FAQPage.
  - En `/producto/`, deja el mismo `@graph`.
  - En las demás páginas internas, deja solo el `BreadcrumbList` (más el FAQPage en `/faq/`).
  - Los `item` del BreadcrumbList deben usar barra final para coincidir con el canonical.
  - **No agregues** `aggregateRating`, `Review` ni `Offer` hasta que existan reseñas o precios visibles.
- **Aceptación:**
  - El [Rich Results Test](https://search.google.com/test/rich-results) y el [Schema Validator](https://validator.schema.org/) no muestran errores.
  - `grep -c '"price"' dist/index.html` devuelve 0.
  - Cada valor del JSON-LD aparece en texto visible del sitio.

### T4. Marca y perfiles inconsistentes
- **Hallazgos:**
  - Los enlaces del footer van a `https://linkedin.com` y `https://twitter.com` genéricos.
  - `twitter:site` es `@genai`, cuenta de otra persona.
  - El correo es `info@monkeymindsoftware.com`, el dominio es `monkeymindtech.com` y el Instagram es `monkeymind_software`.
- **Verificar:** `curl -s https://gena.monkeymindtech.com/ | grep -oE 'href="https://(www\.)?(linkedin|twitter|x|instagram)\.com[^"]*"|twitter:site[^>]*'`
- **Corregir:**
  - Elimina los enlaces genéricos y la meta `twitter:site`. Reponlos solo con las URLs reales (`TODO(dueño)`).
  - Define un nombre de marca único y úsalo igual en el footer, el JSON-LD (`name`, `legalName`) y `/nosotros/`: `GEN.AI — software de GEN.AI SAS (Monkey Mind Tech)`, pendiente de que el dueño confirme la relación.
- **Aceptación:** no queda ningún enlace social sin ruta de perfil, y `@genai` ya no aparece en el HTML.

### T5. Afirmaciones sin respaldo
- **Hallazgos:**
  - "líder" en la meta description, el OG y el Twitter.
  - "20000+ citas agendadas" sin periodo (en el home y en contacto).
  - "servidores con certificación ISO 27001" sin certificado ni proveedor.
  - "se integra con los principales sistemas de HC" sin nombrar ninguno.
- **Verificar:** `grep -rniE "líder|20000|20\.000|ISO 27001|principales sistemas" src/`
- **Corregir:**
  - Quita "líder" en todos lados. Meta description sugerida: `Autoagendamiento por WhatsApp y web, recordatorios y reportes para IPS y clínicas en Colombia. Implementación en 48 h. Solicita una demo.`
  - Cambia `20000+` por `20.000+` y agrega el periodo: `TODO(dueño)`.
  - ISO 27001: si el certificado es del proveedor de hosting, redacta `alojado en <proveedor> con certificación ISO 27001`: `TODO(dueño): proveedor y enlace al certificado`. Si no se puede respaldar, elimínalo, incluido el FAQPage.
  - Pide la lista de HIS integrados: `TODO(dueño)`.
- **Aceptación:** "líder" ya no aparece en `dist/`, y cada afirmación numérica o de certificación tiene una fuente visible o un TODO.

### T6. Encabezados de seguridad y redirección de www
- **Hallazgos:**
  - Solo se envía `content-security-policy: upgrade-insecure-requests`.
  - `https://www.gena.monkeymindtech.com/` responde 200 (su canonical apunta al dominio principal, así que el riesgo es medio).
- **Verificar:** `curl -sI https://gena.monkeymindtech.com/` y `curl -sI https://www.gena.monkeymindtech.com/`
- **Corregir:** crea o edita `public/.htaccess` (Astro lo copia a `dist/`) con el **Anexo B**. Si el CDN de Hostinger no respeta `.htaccess`, configúralo en hPanel; si no tienes acceso, marca `TODO(dueño)` con las instrucciones.
- **Aceptación:**
  - Después del deploy, `curl -sI` muestra `strict-transport-security`, `x-content-type-options`, `x-frame-options`, `referrer-policy` y `permissions-policy`.
  - La versión www responde `301` hacia `https://gena.monkeymindtech.com/`.

---

## 4. Tareas de prioridad media y baja

### T7. Contenido duplicado entre páginas (media)
- **Hallazgo:**
  - La sección de los 5 problemas es idéntica en `/` y `/problema/`.
  - Los 4 bloques de solución son idénticos en `/` y `/solucion/`.
  - Todas las páginas secundarias, salvo `/producto/`, tienen menos de 300 palabras.
- **Corregir:**
  - `/problema/`: agrega contexto de ausentismo y llamadas perdidas en Colombia, solo con fuentes citables (Minsalud, Supersalud u otras, con año). Si no encuentras una fuente verificable, deja `TODO`.
  - `/solucion/`: describe el flujo paso a paso (WhatsApp → confirmación → recordatorio → reprogramación → lista de espera), con el bloque de beneficios movido desde `/nosotros/`.
- **Aceptación:** ningún párrafo de más de 30 palabras se repite literal entre `/` y las páginas secundarias.

### T9. Textos y títulos (media)
- H1 del home: `Software Agendamiento clínico con IA.` → `Software de agendamiento médico con IA para IPS y clínicas`
- Título del home (~75 caracteres): `GEN.AI | Software de agendamiento médico con IA para IPS`
- Título de `/solucion/` (hoy compite con el home): `Cómo funciona GEN.AI: confirmaciones, recordatorios e integración con HIS`
- H3 de una sola palabra en "Nuestros plus" ("Reducir", "Disminuir", "Disponibilidad"…): conviértelos en frases descriptivas, por ejemplo "Disminuye las llamadas perdidas". No pongas cifras sin fuente.
- `/contacto/`: corrige `asiganadas` → `asignadas` y `20000` → `20.000`.
- **Aceptación:** `grep -rn "asiganadas" src/` no devuelve resultados, y los títulos tienen 60 caracteres o menos.

### T10. Imágenes (media)
- **Hallazgos:**
  - `og:image` y `twitter:image` son `/og-image.svg`, que WhatsApp, LinkedIn, Facebook y X no muestran.
  - El logo es `/favicon.ico` con `alt=""` (3 veces).
- **Corregir:**
  - Exporta `public/og-image.png` de 1200×630 y menos de 300 KB a partir del SVG (por ejemplo con `npx sharp-cli` o `resvg`) y actualiza las metas.
  - El logo del header lleva `alt="GEN.AI"`; las repeticiones decorativas pueden mantener `alt=""` si van junto al texto "GEN.AI".
  - Si existe un logo en PNG o SVG, úsalo en lugar del `.ico`, y también en `Organization.logo` (mínimo 112×112).
- **Aceptación:** `og:image` termina en `.png` y la imagen responde 200 con `content-type: image/png`.

### T11. Rendimiento (media)
- Aloja las fuentes en el propio sitio: IBM Plex Mono 400/500 y Source Sans 3 400/500/600/700. Usa `@fontsource` o los woff2 en `public/fonts/` con `font-display: swap`, más `<link rel="preload" as="font" crossorigin>` para la fuente del cuerpo. Quita el `<link>` a fonts.googleapis.com.
- Configura `build: { inlineStylesheets: 'always' }` en `astro.config`.
- Revisa si `ClientRouter` es necesario; si no, elimínalo.
- Haz que las animaciones usen solo `transform` y `opacity`, arranquen con `IntersectionObserver` y respeten `prefers-reduced-motion`.
- En `.htaccess` (Anexo B): caché larga para `/_astro/*` y caché en el CDN para el HTML.
- **Aceptación:**
  - No queda ninguna petición a `fonts.googleapis.com`.
  - Lighthouse móvil en el home: LCP ≤ 2,5 s, CLS ≤ 0,1, TBT ≤ 300 ms (como sustituto del INP).
  - Reporta las cifras antes y después.

### T12. Barra final y sitemap (baja)
- En `astro.config`, configura `trailingSlash: 'always'` y actualiza **todos** los `href` internos (nav, footer, breadcrumbs, "Páginas relacionadas") a la forma con barra.
- Sitemap: encuentra el generador (`@astrojs/sitemap` o un archivo en `public/`). Quita `changefreq` y `priority`, quita el namespace `image` que no se usa, y usa como `lastmod` la fecha real de modificación del contenido. Si es un archivo estático, usa el **Anexo C**.
- **Aceptación:** `grep -oE 'href="/[a-z][^"]*[^/"]"' dist/**/*.html` no devuelve rutas internas sin barra (los archivos con extensión no cuentan), y `curl -sI` a cada enlace del nav responde 200, no 301.

### T13. llms.txt, hreflang, 404 e IndexNow (baja)
- Crea `public/llms.txt` con el **Anexo D**. Verifica cada dato contra el sitio antes de publicarlo.
- hreflang: deja solo `es-CO` y `x-default` apuntando a sí mismos, o elimínalos (hay un solo idioma).
- Crea `src/pages/404.astro` en español. Hoy se sirve la página por defecto de Hostinger, con título en inglés; configura `ErrorDocument 404 /404.html` en `.htaccess`.
- IndexNow:
  - Genera una clave y publícala en `public/<clave>.txt`.
  - Documenta en el README el comando de envío posterior al deploy: `curl -X POST https://api.indexnow.org/indexnow -H 'Content-Type: application/json' -d '{"host":"gena.monkeymindtech.com","key":"<clave>","urlList":[...]}'`.
- **Aceptación:** `/llms.txt` responde 200, y una URL inexistente responde 404 con una página en español.

### T14. Accesibilidad táctil (baja)
- Los enlaces de texto del footer y los "Conoce…" miden 20 px de alto en móvil. Dales un área táctil de al menos 44 px (padding vertical) sin cambiar su aspecto.
- El botón flotante de WhatsApp tapa la etiqueta de la estadística "24/7" en un viewport de 390 px. Ajusta el margen inferior.

---

## 5. Información que debe dar el dueño

El agente debe consolidar aquí todos los `TODO(dueño)` que encuentre o deje:

- [ ] NIT, dirección física y año de fundación de GEN.AI SAS
- [ ] Relación entre GEN.AI SAS, Monkey Mind Tech y Monkey Mind Software (y qué dominio de correo es el oficial)
- [ ] Fundadores y equipo: nombre, cargo, LinkedIn
- [ ] URLs reales de LinkedIn, X/Twitter, YouTube y otras redes de la empresa
- [ ] Respaldo de las métricas de 70%, 100% y −65% (número de clínicas, periodo)
- [ ] Periodo de "20.000+ citas"
- [ ] ISO 27001: ¿quién tiene el certificado? Proveedor de hosting y enlace
- [ ] Lista de HIS / historias clínicas integradas
- [ ] Modelo de precios para `/precios/`
- [ ] Métricas, persona de contacto y permiso de Clínica Genezen para el caso de éxito
- [ ] Logo en PNG o SVG
- [ ] Acceso a Hostinger hPanel, si `.htaccess` no basta

## 6. Informe final que debe entregar el agente

Una tabla con estas columnas:

| Tarea | Estado (`HECHO` / `PARCIAL` / `NO APLICA` / `BLOQUEADO`) | Evidencia de verificación (comando + salida) | Commit |
|---|---|---|---|

Además:
- Las métricas de Lighthouse antes y después (T11).
- La lista consolidada de la sección 5 con lo que sigue pendiente.
- Una lista de cualquier hallazgo nuevo encontrado durante el trabajo, sin corregirlo si está fuera del alcance de esta spec.

---

## Anexo A — JSON-LD del home (`@graph`)

Antes de publicarlo, confirma `legalName`, `foundingDate`, `email` y `telephone` contra el sitio. Agrega `logo` y más `sameAs` solo cuando existan.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://gena.monkeymindtech.com/#organization",
      "name": "GEN.AI",
      "legalName": "GEN.AI SAS",
      "url": "https://gena.monkeymindtech.com/",
      "description": "Software de inteligencia artificial para agendamiento médico en IPS y clínicas de Colombia y Latinoamérica: autoagendamiento 24/7, informes gerenciales, turnos e interoperabilidad con HIS.",
      "foundingDate": "2024",
      "email": "info@monkeymindsoftware.com",
      "areaServed": ["CO", "Latinoamérica"],
      "address": { "@type": "PostalAddress", "addressLocality": "Medellín", "addressCountry": "CO" },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "sales",
        "telephone": "+57-300-323-8106",
        "email": "info@monkeymindsoftware.com",
        "availableLanguage": "es"
      },
      "sameAs": ["https://www.instagram.com/monkeymind_software/"]
    },
    {
      "@type": "WebSite",
      "@id": "https://gena.monkeymindtech.com/#website",
      "name": "GEN.AI",
      "url": "https://gena.monkeymindtech.com/",
      "inLanguage": "es-CO",
      "publisher": { "@id": "https://gena.monkeymindtech.com/#organization" }
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://gena.monkeymindtech.com/#software",
      "name": "GEN.AI",
      "url": "https://gena.monkeymindtech.com/",
      "applicationCategory": "HealthApplication",
      "applicationSubCategory": "Medical Scheduling Software",
      "operatingSystem": "Web",
      "inLanguage": "es-CO",
      "description": "Agendamiento médico con inteligencia artificial por WhatsApp, web y call center, con confirmaciones automáticas, informes gerenciales e interoperabilidad con HIS.",
      "featureList": [
        "Autoagendamiento 24/7 por WhatsApp y portal web",
        "Confirmaciones y recordatorios automáticos por WhatsApp, correo y SMS",
        "Lista de espera y reasignación de cupos liberados",
        "Informes gerenciales de ocupación y demanda",
        "Gestión de turnos y profesionales",
        "Interoperabilidad con software de historia clínica (HIS) vía API"
      ],
      "audience": { "@type": "Audience", "audienceType": "IPS, clínicas, hospitales, laboratorios y centros de diagnóstico" },
      "provider": { "@id": "https://gena.monkeymindtech.com/#organization" }
    }
  ]
}
</script>
```

## Anexo B — `public/.htaccess`

```apache
# Redirigir www y http al dominio canónico
RewriteEngine On
RewriteCond %{HTTP_HOST} ^www\.gena\.monkeymindtech\.com$ [NC,OR]
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://gena.monkeymindtech.com/$1 [R=301,L]

# Encabezados de seguridad
<IfModule mod_headers.c>
  Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains"
  Header always set X-Content-Type-Options "nosniff"
  Header always set X-Frame-Options "SAMEORIGIN"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

  # Caché: assets con hash = inmutables; HTML = caché en el CDN
  <FilesMatch "\.(js|css|woff2|png|svg|webp|avif)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\.html$">
    Header set Cache-Control "public, max-age=0, s-maxage=3600"
  </FilesMatch>
</IfModule>

ErrorDocument 404 /404.html
```

> Ojo: la regla `immutable` solo es segura para archivos con hash (`/_astro/`). Si `og-image.png` o el logo se reemplazan sin cambiar de nombre, exclúyelos o renómbralos al actualizarlos.

## Anexo C — `sitemap.xml` (si es un archivo estático)

Usa como `lastmod` la fecha real de cada página. Agrega las páginas nuevas de T8 cuando existan.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://gena.monkeymindtech.com/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/problema/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/solucion/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/nosotros/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/producto/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/faq/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/panel/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/contacto/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/legal/politica-de-privacidad/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/legal/terminos-de-servicio/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/legal/proteccion-de-datos/</loc><lastmod>2026-07-08</lastmod></url>
  <url><loc>https://gena.monkeymindtech.com/legal/cookies/</loc><lastmod>2026-07-08</lastmod></url>
</urlset>
```

## Anexo D — `public/llms.txt`

```markdown
# GEN.AI

> GEN.AI es una plataforma de autoagendamiento clínico con inteligencia artificial para IPS, clínicas y centros de diagnóstico en Colombia. Automatiza la asignación de citas por WhatsApp, portal web y call center, con confirmaciones automáticas e interoperabilidad con sistemas de historia clínica (HIS). Desarrollada por GEN.AI SAS (Medellín, Colombia). No confundir con "IA generativa" ni con otros productos llamados Gen AI.

## Producto
- [Inicio](https://gena.monkeymindtech.com/): Resumen de GEN.AI: atención 24/7, recordatorios, agenda optimizada
- [Producto](https://gena.monkeymindtech.com/producto/): Funcionalidades de la plataforma
- [Solución](https://gena.monkeymindtech.com/solucion/): Cómo resuelve el agendamiento clínico
- [Problema](https://gena.monkeymindtech.com/problema/): Llamadas perdidas, citas olvidadas, agendas saturadas
- [Panel](https://gena.monkeymindtech.com/panel/): Calendario, profesionales y reportes para equipos de salud

## Preguntas frecuentes
- [FAQ](https://gena.monkeymindtech.com/faq/): Implementación en 24 a 48 horas hábiles, API para HIS, chatbot de WhatsApp Business, cifrado AES-256, soporte en español (lun-vie 8:00-18:00 hora de Colombia)

## Empresa y contacto
- [Nosotros](https://gena.monkeymindtech.com/nosotros/)
- [Contacto](https://gena.monkeymindtech.com/contacto/): info@monkeymindsoftware.com, WhatsApp +57 300 323 8106

## Legal
- [Política de privacidad](https://gena.monkeymindtech.com/legal/politica-de-privacidad/)
- [Protección de datos](https://gena.monkeymindtech.com/legal/proteccion-de-datos/)
- [Términos de servicio](https://gena.monkeymindtech.com/legal/terminos-de-servicio/)
```
