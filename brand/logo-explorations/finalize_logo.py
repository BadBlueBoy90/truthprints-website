"""Export the chosen Lampstand (v2) as the official TruthPrints production assets.
Writes clean SVGs + transparent PNGs (rasterised via headless Brave as a pure
SVG->PNG renderer, no CDP automation)."""
import subprocess, pathlib, shutil
HERE = pathlib.Path(__file__).resolve().parent
BRAND = HERE.parent                      # website/brand
BRAVE = r"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"

dark = (HERE / "v2_final_dark.svg").read_text(encoding="utf-8")   # gold gradient + glow (dark bg)
foil = (HERE / "v2_final_foil.svg").read_text(encoding="utf-8")   # flat gold (versatile / foil / favicon)

# --- back up the old quick-made mark, then write official SVGs ---
backup = HERE / "_old_mark_backup"
backup.mkdir(exist_ok=True)
for f in ("truthprints-mark.svg", "truthprints-mark.png", "truthprints-flame.svg", "truthprints-favicon.png"):
    src = BRAND / f
    if src.exists():
        shutil.copy2(src, backup / f)

(BRAND / "truthprints-mark.svg").write_text(dark, encoding="utf-8")
(BRAND / "truthprints-mark-foil.svg").write_text(foil, encoding="utf-8")

def rasterize(svg: str, out: pathlib.Path, px: int):
    html = HERE / "_tmp_raster.html"
    html.write_text(
        f"<!doctype html><meta charset=utf-8>"
        f"<style>html,body{{margin:0}}svg{{width:{px}px;height:{px}px;display:block}}</style>{svg}",
        encoding="utf-8")
    if out.exists():
        out.unlink()
    subprocess.run([
        BRAVE, "--headless", "--disable-gpu", "--hide-scrollbars",
        "--default-background-color=00000000", "--force-device-scale-factor=1",
        f"--window-size={px},{px}", f"--screenshot={out}", html.as_uri(),
    ], check=False, capture_output=True, timeout=90)

rasterize(dark, BRAND / "truthprints-mark.png", 1024)        # main mark, transparent
rasterize(foil, BRAND / "truthprints-favicon.png", 256)      # crisp flat mark for favicon
print("official assets written:",
      [p.name for p in BRAND.glob("truthprints-mark*")] + ["truthprints-favicon.png"])
