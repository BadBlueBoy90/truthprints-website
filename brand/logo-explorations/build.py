"""
TruthPrints logo explorations — the "illuminated T".
Generates refined vector SVGs (foil/spine-ready, single-colour capable) and a
contact sheet, rasterised via headless Brave. Built carefully, no half work.

Concept: a Trajan-style serif capital T whose light/flame ties three things into
one mark — the name (T), the meaning (truth = light), and the product (the
*illuminated* Bible / illuminated initial of a manuscript).
"""
from __future__ import annotations
import os, subprocess, pathlib

HERE = pathlib.Path(__file__).resolve().parent
BRAVE = r"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"

# --- Refined Trajan-style serif capital T -----------------------------------
# viewBox 0 0 200 200. High-contrast roman capital with bracketed serifs.
def serif_T() -> str:
    crossbar = (
        "M24 41 L176 41 L176 67 L162 67 "
        "C160 61 159 57 154 56 L46 56 "
        "C41 57 40 61 38 67 L24 67 Z"
    )
    stem = (
        "M92 56 L108 56 L107 150 "
        "C109 156 112 160 120 162 L132 162 L132 170 "
        "L68 170 L68 162 L80 162 "
        "C88 160 91 156 93 150 L93 56 Z"
    )
    return f'<path d="{crossbar}"/><path d="{stem}"/>'

# graceful candle flame (teardrop with a slight living lean), centred at cx
def flame(cx: float, base_y: float, h: float) -> str:
    s = h / 30.0
    tip   = (cx, base_y - h)
    return (
        f'M{tip[0]} {tip[1]} '
        f'C{cx+6*s} {base_y-20*s} {cx+12*s} {base_y-11*s} {cx+5*s} {base_y-3*s} '
        f'C{cx+2*s} {base_y+1*s} {cx-2*s} {base_y+1*s} {cx-5*s} {base_y-3*s} '
        f'C{cx-12*s} {base_y-11*s} {cx-6*s} {base_y-20*s} {tip[0]} {tip[1]} Z'
    )

GOLD = "url(#g)"
DEFS = """
<defs>
  <linearGradient id="g" x1="100" y1="6" x2="100" y2="194" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#F3DDA0"/>
    <stop offset="0.5" stop-color="#C9A24E"/>
    <stop offset="1" stop-color="#9A7430"/>
  </linearGradient>
  <radialGradient id="glow" cx="100" cy="30" r="46" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="#F6E4B0" stop-opacity="0.55"/>
    <stop offset="1" stop-color="#F6E4B0" stop-opacity="0"/>
  </radialGradient>
</defs>
"""

def svg_wrap(inner: str) -> str:
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" '
            f'width="200" height="200" role="img" aria-label="TruthPrints">{DEFS}{inner}</svg>')

# --- V1: Illuminated Initial — T in a manuscript initial frame, flame above ---
def v1() -> str:
    frame = (
        '<rect x="14" y="14" width="172" height="172" rx="18" '
        'fill="none" stroke="url(#g)" stroke-width="3"/>'
        '<rect x="22" y="22" width="156" height="156" rx="12" '
        'fill="none" stroke="url(#g)" stroke-width="1.1" opacity="0.6"/>'
        # corner diamonds (illuminated-manuscript feel)
        + "".join(
            f'<path d="M{x} {y-5} L{x+5} {y} L{x} {y+5} L{x-5} {y} Z" fill="url(#g)"/>'
            for x, y in [(14,100),(186,100),(100,14),(100,186)]
        )
    )
    glow = '<circle cx="100" cy="34" r="40" fill="url(#glow)"/>'
    fl = f'<path d="{flame(100, 40, 26)}" fill="url(#g)"/>'
    return svg_wrap(frame + glow + fl + f'<g fill="{GOLD}">{serif_T()}</g>')

# --- V2: Lampstand T — letter gives light, flame crowning the stem, soft glow -
def v2() -> str:
    glow = '<circle cx="100" cy="30" r="44" fill="url(#glow)"/>'
    fl = f'<path d="{flame(100, 38, 30)}" fill="url(#g)"/>'
    # tiny light core
    core = '<ellipse cx="100" cy="22" rx="3" ry="6" fill="#FBEFCF" opacity="0.9"/>'
    return svg_wrap(glow + fl + core + f'<g fill="{GOLD}">{serif_T()}</g>')

# --- V3: Negative-space light — flame cut INTO the crossbar, light through letter
def v3() -> str:
    # solid T, then a flame punched out at the crossbar-stem junction via mask
    mask = (
        '<mask id="cut">'
        '<rect x="0" y="0" width="200" height="200" fill="white"/>'
        f'<path d="{flame(100, 70, 22)}" fill="black"/>'
        '</mask>'
    )
    glow = '<circle cx="100" cy="58" r="34" fill="url(#glow)"/>'
    return svg_wrap(mask + glow + f'<g fill="{GOLD}" mask="url(#cut)">{serif_T()}</g>')

VARIANTS = {"v1_illuminated_initial": v1(), "v2_lampstand": v2(), "v3_negative_space": v3()}

for name, svg in VARIANTS.items():
    (HERE / f"{name}.svg").write_text(svg, encoding="utf-8")

# --- Contact sheet: each variant on dark + cream, large + favicon size --------
cells = []
for name, svg in VARIANTS.items():
    label = name.split("_", 1)[1].replace("_", " ").title()
    cells.append(f"""
    <div class="col">
      <div class="lbl">{label}</div>
      <div class="dark big">{svg}</div>
      <div class="cream big">{svg}</div>
      <div class="row">
        <div class="dark sm">{svg}</div>
        <div class="cream sm">{svg}</div>
        <div class="dark xs">{svg}</div>
      </div>
    </div>""")

html = f"""<!doctype html><meta charset="utf-8">
<style>
  body{{margin:0;background:#f4f0e6;font-family:Georgia,serif;padding:28px}}
  h1{{color:#3a2f1d;font-weight:normal;letter-spacing:2px;text-align:center;margin:0 0 22px}}
  .sheet{{display:flex;gap:26px;justify-content:center}}
  .col{{flex:1;max-width:380px}}
  .lbl{{text-align:center;color:#6b5a36;letter-spacing:3px;text-transform:uppercase;font-size:13px;margin-bottom:10px}}
  .dark{{background:#0d0b08}} .cream{{background:#f7f2e7}}
  .big{{border-radius:8px;padding:24px;margin-bottom:12px;display:flex;justify-content:center}}
  .big svg{{width:200px;height:200px}}
  .row{{display:flex;gap:10px;align-items:center}}
  .row > div{{border-radius:6px;padding:10px;display:flex;justify-content:center;align-items:center;flex:1}}
  .sm svg{{width:64px;height:64px}} .xs svg{{width:28px;height:28px}}
</style>
<h1>TRUTHPRINTS &middot; THE ILLUMINATED T</h1>
<div class="sheet">{''.join(cells)}</div>"""

sheet = HERE / "contact_sheet.html"
sheet.write_text(html, encoding="utf-8")

out = HERE / "contact_sheet.png"
if out.exists():
    out.unlink()
subprocess.run([
    BRAVE, "--headless", "--disable-gpu", "--hide-scrollbars",
    "--force-device-scale-factor=2", "--window-size=1300,760",
    f"--screenshot={out}", sheet.as_uri(),
], check=False, capture_output=True, timeout=90)
print("rendered:", out, "exists:", out.exists())
