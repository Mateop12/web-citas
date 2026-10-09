# Palabras clave y mapa de URLs — GEN.AI

**Fecha:** 2026-10-09 · **Mercado:** Colombia (es-CO)
**Fuente:** autocompletado de Google (`suggestqueries.google.com`, `hl=es`, `gl=co`). Son búsquedas reales, **sin volumen**: para priorizar con cifras hay que contrastarlas en Search Console o en Keyword Planner.

## 1. Lo que dicen las sugerencias

| Semilla | Sugerencias relevantes | Lectura |
|---|---|---|
| software agendamiento | software agendamiento de citas, de citas médicas, de agendamiento médico, *gratis* | **Comprador.** Principal objetivo del home |
| programa para agendar citas | programa para agendar citas médicas, de pacientes, *gratis*, online gratis | Comprador (pyme/consultorio). Variante del home |
| bot para agendar citas | **bot de whatsapp para agendar citas**, cómo crear un bot para agendar citas | Comprador / investigación |
| chatbot citas medicas | **chatbot para agendar citas médicas** | Comprador |
| agendamiento por whatsapp | agendamiento de citas médicas por whatsapp, agendamiento por whatsapp ips | Comprador |
| bot agenda | bot agenda whatsapp, *discord, telegram, visas* | Ambiguo: solo sirve "bot agenda whatsapp" |
| recordatorio de citas | recordatorio de citas médicas, **por whatsapp**, por whatsapp business, por sms gratis | Comprador |
| software para ips | software para ips colombia, para ips de salud ocupacional | **Comprador B2B** |
| agendamiento web / agenda web | agendamiento web nueva eps, cruz verde, savia salud, las américas; agenda web sura | **Paciente buscando el portal de su EPS.** No es comprador |
| autoagendamiento / citas médicas en línea | autoagendamiento sura, las américas, colsubsidio; citas médicas en línea nueva eps | Paciente, navegacional. No es comprador |

**Conclusión:** "agendamiento web" y "autoagendamiento" a secas no traen compradores: son pacientes buscando su EPS y no compiten con un proveedor de software. Se atacan con modificadores B2B ("agendamiento web de citas médicas **para IPS**", "portal de autoagendamiento **para clínicas**"). Las búsquedas con intención de compra son *software de agendamiento*, *bot/chatbot de WhatsApp para citas*, *recordatorios de citas* y *software para IPS*.

## 2. Mapa: una intención por URL (sin canibalización)

| URL | Keyword principal | Variantes | Estado |
|---|---|---|---|
| `/` | software de agendamiento de citas médicas | software de agendamiento médico, software agendamiento clínico, programa para agendar citas médicas | Título y description actualizados |
| `/software-para-ips/` | software para IPS Colombia | software de agendamiento para IPS | **Nueva** |
| `/agendamiento-web/` | agendamiento web de citas médicas (para IPS) | portal de autoagendamiento, citas médicas en línea, programa para agendar citas de pacientes | **Nueva** |
| `/bot-whatsapp-citas/` | bot de WhatsApp para agendar citas | chatbot para agendar citas médicas, agendamiento de citas médicas por WhatsApp, bot agenda WhatsApp | **Nueva** |
| `/recordatorios-citas-medicas/` | recordatorio de citas médicas | por WhatsApp, por SMS, confirmación de citas | **Nueva** |
| `/producto/` | plataforma de agendamiento (página general) | demanda inducida, demanda insatisfecha | Título reorientado; enlaza a las 4 nuevas |
| `/solucion/` | cómo funciona el agendamiento automático | — | Sin cambios |
| `/problema/` | inasistencia a citas médicas (informativa) | ausentismo en IPS | Enlaza a recordatorios |

Las variantes *gratis* no se atacan: GEN.AI no tiene plan gratuito publicado, y una página para ellas atraería tráfico que no convierte.

## 3. Enlazado interno

- Navegación: desplegable **Soluciones** con las 4 páginas (en móvil, en el menú).
- Footer: columna **Soluciones**.
- Home: las tarjetas de WhatsApp, portal y recordatorios enlazan a su página; la columna "IPS" enlaza a `/software-para-ips/`; enlace directo al bot en la sección de WhatsApp.
- `/producto/`, `/problema/` y `/solucion/`: las páginas relacionadas apuntan a las nuevas.
- `sitemap.xml` y `llms.txt` incluyen las 4 URLs.

## 4. Reglas que se mantuvieron

- Contenido propio de cada página (~600 palabras): ningún párrafo de más de 30 palabras se repite entre ningún par de páginas.
- Solo funciones que el sitio ya publica. Nada de precios, clientes ni cifras nuevas.
- Preguntas frecuentes visibles en cada página, **sin FAQPage nuevo** (regla 5 de la spec).
- Títulos de 60 caracteres o menos, descriptions de 160 o menos, un H1 por página y sin duplicados.

## 5. Siguiente paso para medir

1. Desplegar y enviar el sitemap en Search Console.
2. Ejecutar IndexNow con las 4 URLs nuevas (comando en el README).
3. A las 4 y a las 8 semanas: impresiones y posición media por URL para las keywords de la tabla 2. Si alguna URL recibe consultas de otra, ajustar títulos y enlaces internos.
4. Contrastar volúmenes en Keyword Planner antes de crear más páginas, por ejemplo una de integración con HIS o artículos sobre inasistencia.
