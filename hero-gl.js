/* TruthPrints — WebGL hero: volumetric god-rays, drifting dust, mouse parallax.
   Raw WebGL1, no dependencies. Degrades silently to the CSS panorama. */
(function(){
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('heroGL');
  if (!canvas) return;
  var gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'high-performance' });
  if (!gl) return;

  var VERT = [
    'attribute vec2 p;',
    'varying vec2 vUv;',
    'void main(){ vUv = p * .5 + .5; gl_Position = vec4(p, 0., 1.); }'
  ].join('\n');

  var FRAG = [
    'precision mediump float;',
    'varying vec2 vUv;',
    'uniform sampler2D uTex;',
    'uniform float uTime;',
    'uniform vec2 uMouse;',
    'uniform vec2 uRes;',
    'uniform vec2 uTexScale;',
    'uniform float uBoot;',

    'float hash(vec2 q){ return fract(sin(dot(q, vec2(127.1, 311.7))) * 43758.5453); }',
    'float noise(vec2 q){',
    '  vec2 i = floor(q), f = fract(q);',
    '  f = f * f * (3. - 2. * f);',
    '  return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),',
    '             mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);',
    '}',
    'float fbm(vec2 q){',
    '  float v = 0., a = .5;',
    '  for (int k = 0; k < 4; k++){ v += a * noise(q); q *= 2.04; a *= .5; }',
    '  return v;',
    '}',

    /* one drifting dust layer; scale picks the depth plane */
    'float dust(vec2 uv, float scale, float speed, float t){',
    '  vec2 q = uv * scale;',
    '  q.y -= t * speed;',
    '  q.x += sin(t * .21 + scale) * .35;',
    '  vec2 cell = floor(q), f = fract(q);',
    '  float rnd = hash(cell);',
    '  vec2 c = vec2(hash(cell + 7.), hash(cell + 13.)) * .7 + .15;',
    '  float d = length(f - c);',
    '  float r = .018 + rnd * .03;',
    '  float tw = .55 + .45 * sin(t * (1.2 + rnd * 2.6) + rnd * 6.28);',
    '  return smoothstep(r, 0., d) * step(.72, rnd) * tw;',
    '}',

    'void main(){',
    '  vec2 uv = vUv;',
    '  float t = uTime;',

    /* mouse parallax — the painting breathes toward the pointer */
    '  vec2 par = (uMouse - .5) * .022;',
    '  vec2 tuv = (uv - .5) * uTexScale + .5 + par;',
    '  vec3 col = texture2D(uTex, tuv).rgb;',

    /* grade: deepen shadows, gild highlights */
    '  col *= vec3(.94, .90, .84);',
    '  col = pow(col, vec3(1.13));',
    '  float lum = dot(col, vec3(.299, .587, .114));',
    '  col += vec3(.40, .29, .10) * pow(lum, 2.2) * .55;',

    /* volumetric god-rays from the heavens (upper centre, mouse-tugged) */
    '  vec2 src = vec2(.5 + (uMouse.x - .5) * .12, 1.12);',
    '  vec2 dir = uv - src;',
    '  float dl = length(dir);',
    '  float ang = atan(dir.x, dir.y);',
    '  float rays = 0.;',
    '  rays += fbm(vec2(ang * 7.5, dl * 2. - t * .05)) * .6;',
    '  rays += fbm(vec2(ang * 16., dl * 3. + t * .03)) * .4;',
    '  rays = pow(max(rays - .18, 0.), 1.6);',
    '  float fall = smoothstep(1.35, .15, dl);',
    '  float beam = rays * fall * smoothstep(-.15, .55, uv.y);',
    '  col += vec3(.98, .82, .45) * beam * .42;',

    /* three depth planes of rising dust caught in the light */
    '  float dst = dust(uv, 26., .013, t) * .35',
    '            + dust(uv, 14., .020, t) * .5',
    '            + dust(uv, 7.,  .031, t) * .8;',
    '  col += vec3(1., .87, .55) * dst * (.30 + beam * 2.4);',

    /* breathing candle-glow at the heart of the frame */
    '  float heart = 1. - smoothstep(.0, .55, distance(uv, vec2(.5, .74)));',
    '  col += vec3(.55, .42, .18) * heart * (.16 + .05 * sin(t * 1.7) + .03 * sin(t * 4.3));',

    /* filmic vignette + living grain */
    '  float vig = smoothstep(1.25, .35, length((uv - .5) * vec2(1.25, 1.)));',
    '  col *= .32 + .68 * vig;',
    '  col += (hash(uv * uRes + fract(t) * 7.) - .5) * .045;',

    /* boot fade-in */
    '  col *= uBoot;',
    '  gl_FragColor = vec4(col, 1.);',
    '}'
  ].join('\n');

  function compile(type, src){
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) return null;
    return s;
  }
  var vs = compile(gl.VERTEX_SHADER, VERT);
  var fs = compile(gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;
  var prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  var U = {};
  ['uTex','uTime','uMouse','uRes','uTexScale','uBoot'].forEach(function(n){ U[n] = gl.getUniformLocation(prog, n); });

  /* texture */
  var tex = gl.createTexture(), texW = 1, texH = 1, ready = false;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, new Uint8Array([8,6,4]));
  var img = new Image();
  img.onload = function(){
    texW = img.width; texH = img.height;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    ready = true;
    canvas.classList.add('gl-on');
  };
  img.src = 'assets/hero-christ.jpg';

  /* state */
  var mx = .5, my = .5, smx = .5, smy = .5;
  addEventListener('mousemove', function(e){
    mx = e.clientX / innerWidth; my = 1 - e.clientY / innerHeight;
  }, { passive: true });
  var scrollFade = 1;
  addEventListener('scroll', function(){
    scrollFade = Math.max(0, 1 - scrollY / innerHeight);
  }, { passive: true });

  function resize(){
    var dpr = Math.min(devicePixelRatio || 1, 1.75);
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    if (canvas.width !== (w * dpr | 0) || canvas.height !== (h * dpr | 0)){
      canvas.width = w * dpr | 0; canvas.height = h * dpr | 0;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
  }
  addEventListener('resize', resize);

  var t0 = performance.now(), boot = 0;
  function frame(now){
    /* skip work when hero is off-screen */
    if (scrollFade <= 0.001){ requestAnimationFrame(frame); return; }
    resize();
    var t = (now - t0) / 1000;
    smx += (mx - smx) * .045; smy += (my - smy) * .045;
    boot += (1 - boot) * .035;

    /* cover-fit the texture */
    var ca = canvas.width / canvas.height, ta = texW / texH;
    var sx = 1, sy = 1;
    if (ca > ta) sy = ta / ca; else sx = ca / ta;

    gl.uniform1i(U.uTex, 0);
    gl.uniform1f(U.uTime, t);
    gl.uniform2f(U.uMouse, smx, smy);
    gl.uniform2f(U.uRes, canvas.width, canvas.height);
    gl.uniform2f(U.uTexScale, sx * .92, sy * .92);
    gl.uniform1f(U.uBoot, (ready ? boot : 0) * (0.25 + 0.75 * scrollFade));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
