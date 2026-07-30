"""Stampt Nav/Footer-Partials in alle Seiten mit TP-Markern.

Aufruf:  python website/_partials/stamp.py
Marker in den Seiten:
    <!-- TP:NAV --> ... <!-- /TP:NAV -->
    <!-- TP:FOOTER --> ... <!-- /TP:FOOTER -->
{{ROOT}} im Partial wird je nach Seitentiefe zu "" bzw. "../".
Seiten bleiben komplett statisch — kein JS-Include, kein SEO-Nachteil.
"""
import re
import sys
from pathlib import Path

WEB = Path(__file__).resolve().parent.parent
PARTIALS = {
    "NAV": (WEB / "_partials" / "nav.html").read_text(encoding="utf-8"),
    "FOOTER": (WEB / "_partials" / "footer.html").read_text(encoding="utf-8"),
}

def stamp(page: Path) -> bool:
    html = page.read_text(encoding="utf-8")
    depth = len(page.relative_to(WEB).parts) - 1
    root = "../" * depth
    changed = False
    for name, partial in PARTIALS.items():
        pat = re.compile(rf"(<!-- TP:{name} -->).*?(<!-- /TP:{name} -->)", re.S)
        if pat.search(html):
            body = partial.replace("{{ROOT}}", root).strip()
            html = pat.sub(lambda m: f"{m.group(1)}\n{body}\n{m.group(2)}", html)
            changed = True
    if changed:
        page.write_text(html, encoding="utf-8")
    return changed

def main():
    done = []
    for page in WEB.rglob("*.html"):
        if "_partials" in page.parts or "v1" in page.parts:
            continue
        if stamp(page):
            done.append(page.relative_to(WEB).as_posix())
    print(f"{len(done)} Seiten gestempelt: {', '.join(done) if done else '—'}")

if __name__ == "__main__":
    sys.exit(main())
