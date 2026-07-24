"""Mobil/Desktop-Test einer Seite: Overflow-Check + Screenshots.

Aufruf: python website/_partials/viewport_test.py index.html [shop.html ...]
Startet einen lokalen Server auf :8899, prüft 390px + 1440px:
  - scrollWidth == clientWidth (kein horizontaler Überlauf)
  - keine kaputten Bilder (naturalWidth == 0)
Screenshots landen in website/_partials/shots/.
"""
import sys
import threading
import functools
import http.server
from pathlib import Path

from playwright.sync_api import sync_playwright

WEB = Path(__file__).resolve().parent.parent
SHOTS = WEB / "_partials" / "shots"
SHOTS.mkdir(exist_ok=True)
PORT = 8899

VIEWPORTS = [("mobil", 390, 844), ("desktop", 1440, 900)]


def serve():
    handler = functools.partial(http.server.SimpleHTTPRequestHandler, directory=str(WEB))
    httpd = http.server.ThreadingHTTPServer(("127.0.0.1", PORT), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def main(pages):
    httpd = serve()
    failed = False
    with sync_playwright() as pw:
        browser = pw.chromium.launch()
        for page_path in pages:
            for name, w, h in VIEWPORTS:
                pg = browser.new_page(viewport={"width": w, "height": h})
                pg.goto(f"http://127.0.0.1:{PORT}/{page_path}", wait_until="networkidle")
                pg.wait_for_timeout(600)
                # Durchscrollen, damit IntersectionObserver-Reveals feuern
                pg.evaluate(
                    """async () => {
                        const step = window.innerHeight * 0.8;
                        for (let y = 0; y < document.body.scrollHeight; y += step) {
                            window.scrollTo({top: y, behavior: 'instant'});
                            await new Promise(r => setTimeout(r, 150));
                        }
                        window.scrollTo({top: 0, behavior: 'instant'});
                    }"""
                )
                pg.wait_for_timeout(900)
                over = pg.evaluate(
                    "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
                )
                broken = pg.evaluate(
                    "() => [...document.images].filter(i => i.complete && i.naturalWidth === 0 && i.getAttribute('src')).map(i => i.src)"
                )
                slug = page_path.replace("/", "_").replace(".html", "") or "index"
                shot = SHOTS / f"{slug}_{name}.png"
                pg.screenshot(path=str(shot), full_page=True)
                status = "OK" if over <= 0 and not broken else "FEHLER"
                if over > 0:
                    status += f" — {over}px Überlauf"
                    failed = True
                if broken:
                    status += f" — kaputte Bilder: {broken}"
                    failed = True
                print(f"{page_path} @ {name} ({w}px): {status}  -> {shot.name}")
                pg.close()
        browser.close()
    httpd.shutdown()
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:] or ["index.html"]))
