"""SPEC-SEO-001 v1 — auditoría determinística, solo lectura (GET/HEAD), stdlib.

Uso:  python -I audit.py [https://gena.monkeymindtech.com]  -> checks.json + raw/*.html
Re-ejecutar tras desplegar cambios y comparar checks.json (Paso 8).
"""
import json, re, sys, ssl, urllib.request, urllib.error
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse
from xml.etree import ElementTree

BASE = (sys.argv[1] if len(sys.argv) > 1 else "https://gena.monkeymindtech.com").rstrip("/")
HOST = urlparse(BASE).netloc
OUT = Path(__file__).parent
UA = "GENAI-SEO-Audit/1.0 (+read-only)"
MAX_PAGES = 100  # alcance configurado


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *a, **k):
        return None


opener = urllib.request.build_opener(NoRedirect)


def get(url, method="GET"):
    """Una petición sin seguir redirecciones -> (status, headers(lower), body)."""
    req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
    try:
        r = opener.open(req, timeout=20)
        return r.status, {k.lower(): v for k, v in r.headers.items()}, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, {k.lower(): v for k, v in e.headers.items()}, e.read().decode("utf-8", "replace")
    except Exception as e:  # red/DNS/TLS
        return 0, {}, str(e)


def chain(url, hops=5):
    out = []
    for _ in range(hops):
        s, h, b = get(url)
        out.append((url, s))
        if s in (301, 302, 303, 307, 308) and "location" in h:
            url = urljoin(url, h["location"])
        else:
            return out, s, h, b
    return out, s, h, b


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title, self.meta, self.links, self.heads, self.imgs, self.ld = "", {}, [], [], [], []
        self.canon, self.lang, self.hreflang, self.text = None, None, [], []
        self._stack, self._buf, self._in = [], [], None

    def handle_starttag(self, t, a):
        a = dict(a)
        if t == "html":
            self.lang = a.get("lang")
        elif t == "meta":
            k = a.get("name") or a.get("property")
            if k:
                self.meta[k.lower()] = a.get("content", "")
        elif t == "link" and a.get("rel") == "canonical":
            self.canon = a.get("href")
        elif t == "link" and a.get("rel") == "alternate" and a.get("hreflang"):
            self.hreflang.append(a["hreflang"])
        elif t == "a" and a.get("href"):
            self.links.append(a["href"])
        elif t == "img":
            self.imgs.append(a)
        if t in ("title", "h1", "h2", "h3", "script", "style"):
            self._in, self._buf = (t, a.get("type")), []

    def handle_endtag(self, t):
        if self._in and t == self._in[0]:
            txt = "".join(self._buf).strip()
            if t == "title":
                self.title = txt
            elif t in ("h1", "h2", "h3"):
                self.heads.append((t, re.sub(r"\s+", " ", txt)))
            elif t == "script" and self._in[1] == "application/ld+json":
                self.ld.append(txt)
            self._in = None

    def handle_data(self, d):
        if self._in:
            self._buf.append(d)
        if not self._in or self._in[0] in ("h1", "h2", "h3"):
            self.text.append(d)


def ld_types(blocks):
    types, errors, nodes = [], [], []
    for b in blocks:
        try:
            data = json.loads(b)
        except ValueError as e:
            errors.append(str(e))
            continue
        stack = [data]
        while stack:
            n = stack.pop()
            if isinstance(n, list):
                stack += n
            elif isinstance(n, dict):
                if "@type" in n:
                    types.append(n["@type"] if isinstance(n["@type"], str) else "/".join(n["@type"]))
                    nodes.append(n)
                stack += [v for v in n.values() if isinstance(v, (dict, list))]
    return types, errors, nodes


def audit_page(url):
    hops, status, h, body = chain(url)
    p = Page()
    p.feed(body)
    raw = OUT / "raw"
    raw.mkdir(exist_ok=True)
    (raw / (urlparse(url).path.strip("/").replace("/", "_") or "home")).with_suffix(".html").write_text(body, encoding="utf-8")
    types, ld_err, nodes = ld_types(p.ld)
    internal = sorted({urljoin(url, l).split("#")[0] for l in p.links if urlparse(urljoin(url, l)).netloc == HOST})
    text = re.sub(r"\s+", " ", " ".join(p.text))
    return {
        "url": url, "status": hops[0][1], "final_status": status, "hops": hops, "headers": {k: h.get(k) for k in (
            "strict-transport-security", "x-content-type-options", "x-frame-options",
            "referrer-policy", "permissions-policy", "content-security-policy", "content-type", "cache-control")},
        "lang": p.lang, "title": p.title, "title_len": len(p.title),
        "description": p.meta.get("description"), "description_len": len(p.meta.get("description") or ""),
        "robots": p.meta.get("robots"), "canonical": p.canon, "canonical_self": p.canon == url,
        "og_image": p.meta.get("og:image"), "hreflang": p.hreflang,
        "h1": [t for k, t in p.heads if k == "h1"], "h2": [t for k, t in p.heads if k == "h2"],
        "h3_count": sum(k == "h3" for k, _ in p.heads),
        "imgs": len(p.imgs), "imgs_no_alt": [i.get("src") for i in p.imgs if "alt" not in i],
        "img_srcs": sorted({i.get("src") for i in p.imgs}),
        "internal_links": internal,
        "internal_links_no_slash": sorted({l for l in internal if not urlparse(l).path.endswith("/") and "." not in urlparse(l).path.rsplit("/", 1)[-1]}),
        "jsonld_types": types, "jsonld_errors": ld_err,
        "sameAs": sorted({s for n in nodes for s in (n.get("sameAs") or [])} if nodes else []),
        "operatingSystem": [n.get("operatingSystem") for n in nodes if "operatingSystem" in n],
        "words": len(text.split()), "text": text,
    }


def main():
    site = {}
    for path in ("/robots.txt", "/sitemap.xml", "/llms.txt", "/no-existe-404-check/"):
        s, h, b = get(BASE + path)
        site[path] = {"status": s, "content-type": h.get("content-type"), "body": b if path != "/no-existe-404-check/" else None}
    site["http_to_https"] = chain("http://" + HOST + "/")[0]
    site["www"] = chain("https://www." + HOST + "/")[0]
    site["no_trailing_slash"] = chain(BASE + "/faq")[0]

    try:
        sm = [e.text.strip() for e in ElementTree.fromstring(site["/sitemap.xml"]["body"]).iter() if e.tag.endswith("loc")]
    except ElementTree.ParseError:
        sm = []
    site["sitemap_urls"] = sm

    # Descubrimiento: BFS desde la home + URLs del sitemap
    queue, seen, pages = [BASE + "/"] + sm, set(), {}
    while queue and len(pages) < MAX_PAGES:
        u = queue.pop(0)
        if u in seen or re.search(r"\.(png|jpe?g|svg|webp|ico|pdf|xml|txt)$", u):
            continue
        seen.add(u)
        pg = audit_page(u)
        pages[u] = pg
        queue += [l for l in pg["internal_links"] if l not in seen]
    canon_pages = {u: p for u, p in pages.items() if p["status"] == 200}
    site["discovered"] = sorted(pages)
    site["not_in_sitemap"] = sorted(set(canon_pages) - set(sm))
    site["sitemap_not_200"] = [u for u in sm if pages.get(u, {}).get("status") != 200]

    # Duplicados exactos de título/descr.
    for key in ("title", "description"):
        vals = [p[key] for p in canon_pages.values()]
        site[f"dup_{key}"] = sorted({v for v in vals if vals.count(v) > 1})

    (OUT / "checks.json").write_text(json.dumps({"base": BASE, "site": site, "pages": pages}, ensure_ascii=False, indent=1), encoding="utf-8")
    print(f"{len(pages)} URLs auditadas, {len(canon_pages)} con 200 -> checks.json")


if __name__ == "__main__":
    main()
