# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

## SEO: avisar a buscadores después de cada deploy (IndexNow)

La clave pública está en `public/b53d6e0d1a631bc7bfc9bc5e3ac9fc36.txt` (se publica en `https://gena.monkeymindtech.com/b53d6e0d1a631bc7bfc9bc5e3ac9fc36.txt`).
Después de subir `dist/`, envía las URLs que cambiaron (Bing, Yandex, Seznam, Naver; Google no usa IndexNow):

```sh
curl -X POST https://api.indexnow.org/indexnow   -H 'Content-Type: application/json; charset=utf-8'   -d '{"host":"gena.monkeymindtech.com","key":"b53d6e0d1a631bc7bfc9bc5e3ac9fc36","keyLocation":"https://gena.monkeymindtech.com/b53d6e0d1a631bc7bfc9bc5e3ac9fc36.txt","urlList":["https://gena.monkeymindtech.com/","https://gena.monkeymindtech.com/problema/","https://gena.monkeymindtech.com/solucion/","https://gena.monkeymindtech.com/nosotros/","https://gena.monkeymindtech.com/producto/","https://gena.monkeymindtech.com/faq/","https://gena.monkeymindtech.com/panel/","https://gena.monkeymindtech.com/contacto/"]}'
```

Respuesta esperada: `200` o `202`. Para Google, envía el sitemap desde Search Console.
