# Informe final — Correcciones SEO (`SPEC-seo-gena.md`)

**Rama:** `seo/v1-fixes` · **Fecha:** 2026-10-09 · **Estado del sitio en vivo:** sin desplegar (todas las verificaciones "antes" se hicieron contra `https://gena.monkeymindtech.com`, cuyo HTML es del 2026-07-08; las de "después" contra `npm run build` → `dist/`).

## 1. Tareas

| Tarea | Estado | Evidencia de verificación (comando → salida) | Commit |
|---|---|---|---|
| **T1** Contadores "0%" | **HECHO** | Antes: `curl -s …/ \| grep -o 'data-counter="[0-9]*"[^>]*>[^<]*'` → `>0%`, `>0%`, `>−0%`. Después: `dist/index.html` contiene `>70%<`, `>100%<`, `>−65%<` (U+2212); `grep -cE '>[−-]?0%<'` → `0`. Sin animación con `prefers-reduced-motion`. Línea de fuente: hueco `metricsSource` vacío + TODO (no se muestra un "TODO" público) | `47bcd13`, `d2086b2` |
| **T2** `/nosotros/` | **PARCIAL** (faltan datos del dueño) | Antes: H1 = "Beneficios del autoagendamiento clínico para tu institución". Después: título "Nosotros \| El equipo detrás de GEN.AI en Medellín" (49 car.), H1 "Quiénes somos: el equipo detrás de GEN.AI"; el bloque "Nuestros plus" está en `/` y `/solucion/` y ya no en `/nosotros/`. Contenido solo con datos ya publicados (razón social, Medellín, rol de encargado según la Ley 1581, implementación, soporte). Equipo, NIT, historia y relación con Monkey Mind: TODO en el código | `3337122` |
| **T3** JSON-LD | **HECHO** (Rich Results Test pendiente del deploy) | Antes: `price "0"`, `areaServed [CO,MX,PE,CL,EC,AR]`, `operatingSystem "Web, iOS, Android"`, `sameAs linkedin.com/company/genai`, GeoCircle sin `geoRadius`, "líder" en la descripción, `inLanguage es` y `es-CO`, sin `@id`. Después: `@graph` con `#organization`, `#website` y `#software` solo en `/` y `/producto/`; el resto solo con `BreadcrumbList` (+FAQPage en `/faq/`); los `item` de los breadcrumbs llevan barra final; `grep -c '"price"'` → 0 en todo `dist/`. validator.schema.org (POST del bloque del home) → 0 errores | `47bcd13`, `2589cf5` |
| **T4** Marca y perfiles | **PARCIAL** | Antes: `href="https://linkedin.com"`, `href="https://twitter.com"`, `twitter:site "@genai"`. Después: `grep -oE 'href="https://(www\.)?(linkedin\|twitter\|x\|instagram)\.com[^"]*"\|twitter:site\|@genai' dist/index.html` → solo Instagram. Nombre de marca único: pendiente de confirmar (TODO) | `32cbf29` |
| **T5** Afirmaciones sin respaldo | **HECHO** con TODO | "líder" como afirmación: 0 en `dist/` (quedan "Líderes de call center" y "líderes y agentes", que nombran roles y no son una afirmación). Meta description = la de la spec. ISO 27001 retirado del FAQ y del FAQPage. `20.000+` con TODO de periodo; lista de HIS con TODO. Los TODO usan `{/* */}`: `grep -rl TODO dist` → 0 | `47bcd13`, `fce2d26`, `f9f59d9` |
| **T6** Seguridad y `www` | **PARCIAL** (requiere deploy) | Antes: `curl -sI …/` → solo `content-security-policy: upgrade-insecure-requests`; `curl -sI https://www.…/` → `200`. Después: `public/.htaccess` con HSTS, nosniff, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` y `www` → 301. No verificable hasta subirlo | `47bcd13`, `66cae86` |
| **T7** Contenido duplicado | **HECHO** en `/problema/`, `/solucion/` y `/faq/`; **PARCIAL** en `/producto/` | Párrafos de más de 30 palabras repetidos entre `/` y cada página: `/problema/` 0, `/solucion/` 0, `/faq/` 2 → 0, `/producto/` 3 (son los mensajes de la maqueta de chat de WhatsApp, una demo de interfaz y no prosa). Texto compartido con el home: `/problema/` 58 % → 39 %, `/solucion/` 70 % → 47 %. `/problema/` cita DYNA 89(220), 2022 (DOI visible); llamadas perdidas: TODO (no se encontró fuente oficial) | `c1c55f3` |
| **T8** | **NO APLICA** | La spec menciona T8 (páginas nuevas, `/precios/`, caso Genezen) pero no la define | — |
| **T9** Textos y títulos | **HECHO** | `grep -rn asiganadas src/` → nada. 12/12 títulos ≤60 (el máximo es 60, `/problema/`). H1 del home = "Software de agendamiento médico con IA para IPS y clínicas". H3 de "Nuestros plus": "Reducir costos operativos", "Disminuir ausentismos", etc. El título de `/solucion/` que propone la spec tenía 73 caracteres → "Cómo funciona GEN.AI: recordatorios e integración con HIS" (57) | `47bcd13`, `fce2d26` |
| **T10** Imágenes | **HECHO** (200 en vivo pendiente del deploy) | `og:image` y `twitter:image` → `/og-image.png` (1200×630, 27 KB). Logo `logo-96.png` (14 KB) en lugar del `.ico` (71 KB); `Organization.logo` → `logo.png` 256 px. `alt` del logo: vacío, porque va junto al texto "GEN.AI" y el enlace ya tiene `aria-label`. Con `alt="GEN.AI"` Lighthouse marcaba `image-redundant-alt` | `47bcd13`, `df51573`, `a7cd20d` |
| **T11** Rendimiento | **HECHO** | `grep -c fonts.googleapis dist/index.html` → 0. CSS inline. ClientRouter eliminado (15,6 KB de JS). La barra de métricas y el pulso de integración animan `transform`. Cifras en §2 | `352abc9` |
| **T12** Barra final y sitemap | **HECHO** (301 frente a 200 en vivo, pendiente del deploy) | `grep -rhoE 'href="/[a-z][^"]*[^/"]"' dist \| grep -v extensión` → 0 (en vivo: 11 por página). `trailingSlash: 'always'`. Sitemap del Anexo C: 12 URLs, sin `changefreq`, `priority` ni namespace `image` | `47bcd13`, `a71f19c` |
| **T13** llms.txt, hreflang, 404, IndexNow | **HECHO** (en vivo, pendiente del deploy) | Antes: `/llms.txt` 404; el 404 era "This Page Does Not Exist" (Hostinger, en inglés); 4 hreflang. Después: `dist/llms.txt`, `dist/404.html` ("Página no encontrada \| GEN.AI", noindex) + `ErrorDocument`, hreflang `es-CO` + `x-default`, clave IndexNow en `public/<clave>.txt` y comando en el README | `eae8b4c` |
| **T14** Accesibilidad táctil | **HECHO** | Puppeteer a 390 px: enlaces del footer y "Conoce…" de 20 → 44 px (`::after` invisible). Botón de WhatsApp sobre "24/7" o "Autoagendamiento": se reproducía con alturas de 740, 780 y 812 px; después, 0 solapamientos (en móvil se oculta mientras las estadísticas del hero están en pantalla) | `3d66101` |

Commits previos de la rama: `47bcd13` (arreglos v1), `6bf0d8f` (cambio de dominio que estaba sin commitear en `master`), `95f3c2f` (informe v1 y esta spec).

## 2. Lighthouse móvil — antes y después (T11)

Mismas condiciones: build local servido con `npx serve` (gzip), Lighthouse 12, Chrome, perfil móvil por defecto, **mediana de 3 ejecuciones**. "Antes" = build de `master` (`2c18130`); "después" = build final de la rama.

| Métrica | Antes | Después | Meta de la spec |
|---|---|---|---|
| Rendimiento | 87 | **97** | — |
| LCP | 2,93 s | **2,34 s** | ≤ 2,5 s ✅ |
| FCP | 2,86 s | 1,36 s | — |
| CLS | 0 | 0 | ≤ 0,1 ✅ |
| TBT | 0 ms | 133 ms | ≤ 300 ms ✅ |
| Peticiones a fonts.googleapis.com | 4 | 0 | 0 ✅ |
| Accesibilidad / Buenas prácticas / SEO | 97 / 100 / 100 | 97 / 100 / 100 | — |

Hay que repetir la medición en producción tras el deploy, con PageSpeed Insights (necesita una clave de API: la cuota sin clave está agotada).

## 3. Información pendiente del dueño (§5 de la spec)

- [ ] NIT, dirección física y año de fundación de GEN.AI SAS (el JSON-LD decía `foundingDate: 2024`; lo he retirado hasta confirmarlo)
- [ ] Relación entre GEN.AI SAS, Monkey Mind Tech y Monkey Mind Software, y qué dominio de correo es el oficial (hoy `info@monkeymindsoftware.com`)
- [ ] Firma de marca única para el footer, el JSON-LD y `/nosotros/`
- [ ] Fundadores y equipo: nombre, cargo, LinkedIn
- [ ] Misión e historia
- [ ] URLs reales de LinkedIn, X/Twitter, YouTube y otras redes (LinkedIn y X están ocultos hasta entonces)
- [ ] Respaldo de las métricas 70 %, 100 % y −65 % (número de clínicas, periodo), que irá en `metricsSource` de `Solution.astro`
- [ ] Periodo de "20.000+ citas"
- [ ] ISO 27001: quién tiene el certificado (¿el hosting?) y enlace, para volver a publicarlo
- [ ] Lista de HIS / historias clínicas integradas
- [ ] Datos de llamadas perdidas (cifras propias de clientes con permiso, o una fuente oficial)
- [ ] Teléfono visible en el sitio, si se quiere `telephone` en el JSON-LD (hoy solo aparece dentro del enlace `wa.me`)
- [ ] Modelo de precios para `/precios/` (T8)
- [ ] Métricas, contacto y permiso de Clínica Genezen para el caso de éxito (T8)
- [x] Logo en PNG: se extrajo el PNG de 256 px que contenía `favicon.ico`. Si existe un original vectorial o de mayor resolución, conviene usarlo
- [ ] Acceso a Hostinger hPanel o `.htaccess` actual de `public_html` para fusionarlo antes de subir el nuevo
- [ ] Credenciales de Search Console y clave de la API de PageSpeed (línea base y validación)

## 4. Hallazgos nuevos (fuera del alcance; sin corregir salvo donde se indica)

1. **`font-family` inválido en `og-image.svg`**: `Source Sans 3` sin comillas es CSS inválido y el SVG se renderizaba en serif. *Corregido* en `df51573` porque bloqueaba T10.
2. **Anexo A frente a la regla 2:** el Anexo A traía valores que no aparecen en ningún texto visible del sitio ("Latinoamérica", "turnos", "laboratorios"), además de `telephone` y `foundingDate`. Los ajusté a lo visible; la regla 2 tiene prioridad.
3. **Anexo B:** la regla `RewriteCond %{HTTPS} off` puede causar un bucle de redirecciones detrás del CDN de Hostinger, y `includeSubDomains` afectaría a `app.gena.monkeymindtech.com`, que hoy no responde por HTTPS. Las dos quedan fuera del `.htaccess`. La caché usa `FilesMatch` sobre archivos con hash, en lugar de `<If>`, por compatibilidad con LiteSpeed.
4. **El nav legal no marcaba la página activa en producción** (`pathname` con barra final frente a `href` sin ella). *Corregido* de paso en T12.
5. **`aria-hidden-focus`** (Lighthouse, accesibilidad 97): hay elementos enfocables dentro de contenedores con `aria-hidden`. Sin corregir.
6. **Animaciones no compuestas restantes:** `solution-node-flash` (`border-color`/`color`, infinita) y el acordeón del FAQ (`grid-template-rows`, solo al hacer clic). Pasarlas a `opacity`/`transform` cambiaría el diseño. Sin corregir.
7. **`/producto/` y el home comparten la maqueta del chat de WhatsApp** (3 bloques de más de 30 palabras). Es una demo de interfaz; si se quiere cumplir T7 al pie de la letra, usar conversaciones de ejemplo distintas en cada página.
8. **La maqueta del hero muestra `app.gena.monkeymindsoftware.com`** en el código de `master` previo al cambio de dominio; con el commit de dominio (`6bf0d8f`) pasa a `monkeymindtech.com`, pero ese subdominio no responde.
9. **README:** sigue siendo el de la plantilla de Astro; solo añadí la sección de IndexNow.
10. **Resultado de búsqueda engañoso:** el "Instituto de Previsión Social" (ausentismo del 25 % → 7–10 %) que salía en las búsquedas es de Paraguay, no de Colombia. No se usó.
