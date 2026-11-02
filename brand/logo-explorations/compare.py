"""Clean head-to-head: ① Illuminated Initial vs ② Lampstand, no clutter."""
import subprocess, pathlib
HERE = pathlib.Path(__file__).resolve().parent
ROOT = HERE.parents[2]
BRAVE = r"C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe"
CINZEL = (ROOT / "fonts" / "Cinzel-Regular.ttf").as_uri()

v1 = (HERE / "v1_final_dark.svg").read_text(encoding="utf-8")
v2 = (HERE / "v2_final_dark.svg").read_text(encoding="utf-8")

def col(svg, name):
    return f"""
    <div class="col">
      <div class="name">{name}</div>
      <div class="card dark">{svg}</div>
      <div class="card cream">{svg}</div>
      <div class="spine">{svg}<div class="v">TRUTHPRINTS</div></div>
    </div>"""

html = f"""<!doctype html><meta charset="utf-8">
<style>
  @font-face {{ font-family:'Cinzel'; src:url('{CINZEL}'); }}
  body{{margin:0;background:#e9e3d4;font-family:'Cinzel',Georgia,serif;padding:34px}}
  h1{{color:#3a2f1d;font-weight:normal;letter-spacing:6px;text-align:center;margin:0 0 28px;font-size:22px}}
  .grid{{display:flex;gap:80px;justify-content:center}}
  .col{{display:flex;flex-direction:column;align-items:center;gap:20px}}
  .name{{letter-spacing:4px;color:#6b5a36;font-size:15px}}
  .card{{width:300px;height:300px;border-radius:12px;display:flex;align-items:center;justify-content:center}}
  .card svg{{width:240px;height:240px}}
  .dark{{background:#0d0b08}} .cream{{background:#f7f2e7}}
  .spine{{width:96px;height:360px;background:linear-gradient(90deg,#15110b,#241c12 50%,#15110b);
          border-radius:6px;display:flex;flex-direction:column;align-items:center;padding:18px 0;
          box-shadow:0 8px 30px rgba(0,0,0,.4)}}
  .spine svg{{width:58px;height:58px}}
  .spine .v{{writing-mode:vertical-rl;transform:rotate(180deg);letter-spacing:8px;color:#d9c693;font-size:22px;margin-top:26px}}
</style>
<h1>TRUTHPRINTS &mdash; HEAD TO HEAD</h1>
<div class="grid">{col(v1,'①  ILLUMINATED INITIAL')}{col(v2,'②  LAMPSTAND')}</div>"""

p = HERE / "compare.html"; p.write_text(html, encoding="utf-8")
out = HERE / "compare.png"
if out.exists(): out.unlink()
subprocess.run([BRAVE,"--headless","--disable-gpu","--hide-scrollbars",
  "--force-device-scale-factor=2","--window-size=1080,720",
  f"--screenshot={out}", p.as_uri()], check=False, capture_output=True, timeout=90)
print("exists:", out.exists())
