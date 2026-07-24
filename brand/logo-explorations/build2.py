"""
TruthPrints — finished masterpiece pass for the two chosen directions:
  V1  Illuminated Initial   (T in a manuscript initial frame, crowning flame)
  V2  Lampstand             (refined T, flame as the light it gives)

Refined Trajan-style glyph + graceful flame. Produces, per variant:
  gold-on-dark, gold-on-cream, single-colour FOIL test, favicon sizes,
  horizontal wordmark lockup (Cinzel), and a book-spine mockup.
Rasterised via headless Brave.
"""
from __future__ import annotations
import os, subprocess, pathlib

HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
BRAVE = r"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
CINZEL = (ROOT / "fonts" / "Cinzel-Regular.ttf").as_uri()

# --- Refined Trajan-style serif capital T (viewBox 0 0 200 200) --------------
def serif_T() -> str:
    crossbar = (
        "M32 40 L168 40 L168 60 L158 60 "
        "C155 56 153 54 149 53 L108 53 L92 53 L51 53 "
        "C47 54 45 56 42 60 L32 60 Z"
    )
    stem = (
        "M92.5 52 L107.5 52 L106.5 158 "
        "C108.5 165 112 169 120 171 L130 171 L130 175 "
        "L70 175 L70 171 L80 171 "
        "C88 169 91.5 165 93.5 158 L93.5 52 Z"
    )
    return f'<path d="{crossbar}"/><path d="{stem}"/>'

def flame_path(cx: float, base_y: float, h: float) -> str:
    s = h / 30.0
    return (
        f'M{cx} {base_y-h} '
        f'C{cx+5*s} {base_y-0.60*h} {cx+8.5*s} {base_y-0.30*h} {cx+3.6*s} {base_y-0.05*h} '
        f'C{cx+1.3*s} {base_y+0.03*h} {cx-1.3*s} {base_y+0.03*h} {cx-3.6*s} {base_y-0.05*h} '
        f'C{cx-8.5*s} {base_y-0.30*h} {cx-5*s} {base_y-0.60*h} {cx} {base_y-h} Z'
    )

def defs(flat: bool) -> str:
    if flat:
        return ""  # single-colour foil: no gradients
    return """
    <linearGradient id="g" x1="100" y1="6" x2="100" y2="195" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#F3DDA0"/><stop offset="0.5" stop-color="#C9A24E"/>
      <stop offset="1" stop-color="#977230"/>
    </linearGradient>
    <radialGradient id="glow" cx="100" cy="24" r="34" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#FFF6DD" stop-opacity="0.92"/>
      <stop offset="0.32" stop-color="#F1D38C" stop-opacity="0.34"/>
      <stop offset="1" stop-color="#F1D38C" stop-opacity="0"/>
    </radialGradient>"""

def mark(variant: str, flat: bool) -> str:
    fill = "#BE9A52" if flat else "url(#g)"
    glow = "" if flat else '<circle cx="100" cy="30" r="44" fill="url(#glow)"/>'
    if variant == "v1":
        frame = (
            f'<rect x="14" y="14" width="172" height="172" rx="20" fill="none" stroke="{fill}" stroke-width="3"/>'
            f'<rect x="23" y="23" width="154" height="154" rx="13" fill="none" stroke="{fill}" stroke-width="1.1" opacity="0.55"/>'
            + "".join(f'<path d="M{x} {y-5} L{x+5} {y} L{x} {y+5} L{x-5} {y} Z" fill="{fill}"/>'
                      for x, y in [(14,100),(186,100),(100,14),(100,186)])
        )
        fl = f'<path d="{flame_path(100, 42, 18)}" fill="{fill}"/>'
        inner = frame + (glow if not flat else "") + fl + f'<g fill="{fill}">{serif_T()}</g>'
    else:  # v2 lampstand
        fl = f'<path d="{flame_path(100, 38, 30)}" fill="{fill}"/>'
        core = "" if flat else '<ellipse cx="100" cy="21" rx="2.8" ry="6" fill="#FBEFCF" opacity="0.9"/>'
        inner = (glow if not flat else "") + fl + core + f'<g fill="{fill}">{serif_T()}</g>'
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="200" height="200" '
            f'role="img" aria-label="TruthPrints"><defs>{defs(flat)}</defs>{inner}</svg>')

# write standalone SVGs for the eventual real assets
for v in ("v1", "v2"):
    (HERE / f"{v}_final_dark.svg").write_text(mark(v, flat=False), encoding="utf-8")
    (HERE / f"{v}_final_foil.svg").write_text(mark(v, flat=True), encoding="utf-8")

def sheet_html(v: str, title: str) -> str:
    dark = mark(v, flat=False)
    foil = mark(v, flat=True)
    return f"""<!doctype html><meta charset="utf-8">
<style>
  @font-face {{ font-family:'Cinzel'; src:url('{CINZEL}'); }}
  body{{margin:0;background:#efe9db;font-family:Georgia,serif;padding:30px}}
  h1{{font-family:'Cinzel',serif;color:#3a2f1d;font-weight:normal;letter-spacing:6px;text-align:center;margin:0 0 26px;font-size:24px}}
  .grid{{display:flex;gap:22px;align-items:stretch;justify-content:center}}
  .card{{border-radius:10px;padding:26px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px}}
  .cap{{font-size:11px;letter-spacing:3px;text-transform:uppercase;color:#8a774a}}
  .dark{{background:#0d0b08}} .cream{{background:#f7f2e7}}
  .dark .cap{{color:#9c885a}}
  .big svg{{width:190px;height:190px}}
  /* lockup */
  .lock{{display:flex;flex-direction:column;align-items:center;gap:14px}}
  .lock svg{{width:130px;height:130px}}
  .wm{{font-family:'Cinzel',serif;letter-spacing:9px;font-size:30px;color:#1b150d}}
  .dark .wm{{color:#e7d5a6}}
  .tag{{font-size:10px;letter-spacing:5px;text-transform:uppercase;color:#9a8a5e;border-top:1px solid #cbb98a;padding-top:8px}}
  /* spine */
  .spine{{width:84px;height:470px;background:linear-gradient(90deg,#15110b,#241c12 50%,#15110b);
          border-radius:5px;display:flex;flex-direction:column;align-items:center;padding:16px 0;
          box-shadow:0 8px 30px rgba(0,0,0,.4)}}
  .spine svg{{width:48px;height:48px}}
  .spine .v{{writing-mode:vertical-rl;transform:rotate(180deg);font-family:'Cinzel',serif;
             letter-spacing:7px;color:#d9c693;font-size:19px;margin-top:24px}}
  .spine .bk{{writing-mode:vertical-rl;transform:rotate(180deg);font-family:'Cinzel',serif;
             letter-spacing:4px;color:#bfae84;font-size:13px;margin-top:30px;opacity:.85}}
  .small{{display:flex;gap:14px;align-items:center}}
  .chip{{background:#0d0b08;border-radius:8px;padding:10px;display:flex;align-items:center;justify-content:center}}
  .chip.c{{background:#f7f2e7}}
  .s48 svg{{width:48px;height:48px}} .s28 svg{{width:28px;height:28px}} .s18 svg{{width:18px;height:18px}}
  .col{{display:flex;flex-direction:column;gap:18px;align-items:center}}
  .label{{text-align:center;font-size:11px;letter-spacing:2px;color:#7a6a45;margin-top:6px}}
</style>
<h1>{title}</h1>
<div class="grid">
  <div class="col">
    <div class="card dark big">{dark}<div class="cap">Gold on black</div></div>
    <div class="card cream big">{dark}<div class="cap">Gold on cream</div></div>
  </div>
  <div class="col">
    <div class="card dark big">{foil}<div class="cap">Single-colour foil</div></div>
    <div class="card cream lock">{mark(v, flat=False)}<div class="wm">TRUTHPRINTS</div>
        <div class="tag">Illustrated Scripture</div></div>
  </div>
  <div class="col">
    <div class="spine">{mark(v, flat=False)}<div class="v">TRUTHPRINTS</div><div class="bk">MATTHEW</div></div>
    <div class="label">Spine</div>
  </div>
  <div class="col">
    <div class="card dark" style="gap:18px">
      <div class="small"><div class="chip s48">{dark}</div><div class="chip c s48">{dark}</div></div>
      <div class="small"><div class="chip s28">{dark}</div><div class="chip s18">{dark}</div></div>
      <div class="cap">Favicon / app-icon test</div>
    </div>
  </div>
</div>"""

jobs = [("v1", "THE ILLUMINATED INITIAL"), ("v2", "THE LAMPSTAND")]
for v, title in jobs:
    html = HERE / f"sheet_{v}.html"
    html.write_text(sheet_html(v, title), encoding="utf-8")
    out = HERE / f"sheet_{v}.png"
    if out.exists():
        out.unlink()
    subprocess.run([
        BRAVE, "--headless", "--disable-gpu", "--hide-scrollbars",
        "--force-device-scale-factor=2", "--window-size=1340,720",
        f"--screenshot={out}", html.as_uri(),
    ], check=False, capture_output=True, timeout=90)
    print("rendered:", out, "exists:", out.exists())
