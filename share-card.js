/* ============================================================
   TruthPrints — das teilbare Bild.

   Eine Karte im Querformat mit dem Museumsrahmen aus Bloom: das Gemaelde
   fuellt das Rahmenfenster, Referenz und Vers liegen darauf, nur mit Schatten.
   Die Masse sind so gewaehlt, dass das Fenster fast genau 1280x663 gross ist —
   die native Groesse der Web-Gemaelde. Es wird also nichts hochskaliert.

   Wird von zwei Seiten benutzt: dem Reader (bible.html) und Bloom.
   ============================================================ */
(function(){
  "use strict";

  var RAHMEN = "/assets/bloom/frame-ornate.jpg?v=3";
  var SL = {t:137, r:155, b:143, l:152};   /* Slice-Masse von frame-ornate.jpg */
  var K  = 0.526;                          /* Rahmen-Skalierung, Ornament unverzerrt */
  var UEB = 12;                            /* Ueberstand: der weisse Fotorand faellt raus */

  var framePromise = null;

  function ladeBild(src){
    return new Promise(function(res,rej){
      var im = new Image();
      im.onload = function(){res(im)};
      im.onerror = rej;
      im.src = src;
    });
  }

  /* Der Rahmen wird einmal geladen und behalten: iOS erlaubt den Teilen-Dialog
     nur unmittelbar nach dem Fingertipp — wartet der Klick erst auf einen
     Download, verfaellt die Erlaubnis und es passiert gar nichts. */
  function rahmen(){
    if(!framePromise) framePromise = ladeBild(RAHMEN).catch(function(){return null});
    return framePromise;
  }

  function zeilen(x, text, maxW, maxZeilen){
    var woerter = String(text).split(/\s+/), out = [], zeile = "";
    for(var i=0;i<woerter.length;i++){
      var probe = zeile ? zeile+" "+woerter[i] : woerter[i];
      if(x.measureText(probe).width > maxW && zeile){
        out.push(zeile); zeile = woerter[i];
        if(out.length >= maxZeilen) break;
      } else zeile = probe;
    }
    if(zeile && out.length < maxZeilen) out.push(zeile);
    return out;
  }

  /* Vers einpassen: erst kleiner setzen, erst zuletzt kuerzen — und dann am
     Satzende, nicht mitten im Wort. */
  function einpassen(x, text, maxW, hoehe, groessen){
    var nackt = function(t){return String(t).replace(/\s+/g,"")};
    function versuch(t, size){
      var lh = Math.round(size*1.42), max = Math.max(2, Math.floor(hoehe/lh));
      x.font = 'italic '+size+'px "Cormorant Garamond"';
      var ls = zeilen(x, t, maxW, max+1);
      return {lines:ls, size:size, lh:lh, cap:max, passt:ls.length<=max};
    }
    for(var i=0;i<groessen.length;i++){
      var r = versuch(text, groessen[i]);
      if(r.passt && nackt(r.lines.join("")).length >= nackt(text).length-1) return r;
    }
    var klein = groessen[groessen.length-1], t = text;
    for(var cut=text.length-10; cut>80; cut-=10){
      var kand = text.slice(0,cut);
      if(versuch(kand, klein).passt){
        var m = kand.match(/^[\s\S]*[.!?;:]/);
        t = (m && m[0].length > cut*0.5) ? m[0]+"”" : kand.slice(0,kand.lastIndexOf(" "))+"…";
        break;
      }
    }
    var r2 = versuch(t, klein);
    return {lines:r2.lines.slice(0,r2.cap), size:r2.size, lh:r2.lh};
  }

  /* 9-Slice: Ecken unverzerrt, Kanten in ganzen Kacheln wiederholt (wie
     border-image mit repeat:round). Die Mitte bleibt frei — dort liegt das Bild. */
  function rahmenZeichnen(x, f, W, H, b, ueb){
    if(ueb){
      x.save(); x.translate(-ueb,-ueb);
      rahmenZeichnen(x, f, W+2*ueb, H+2*ueb, b, 0);
      x.restore(); return;
    }
    var iw = f.naturalWidth||f.width, ih = f.naturalHeight||f.height;
    var sw = iw-SL.l-SL.r, sh = ih-SL.t-SL.b;
    var dw = W-b.l-b.r,    dh = H-b.t-b.b;
    x.drawImage(f, 0,0,SL.l,SL.t,                0,0,b.l,b.t);
    x.drawImage(f, iw-SL.r,0,SL.r,SL.t,          W-b.r,0,b.r,b.t);
    x.drawImage(f, 0,ih-SL.b,SL.l,SL.b,          0,H-b.b,b.l,b.b);
    x.drawImage(f, iw-SL.r,ih-SL.b,SL.r,SL.b,    W-b.r,H-b.b,b.r,b.b);
    var nH = Math.max(1, Math.round(dw/(sw*(b.t/SL.t))));
    for(var i=0;i<nH;i++){
      var px = b.l+dw*i/nH, pw = dw/nH;
      x.drawImage(f, SL.l,0,sw,SL.t,             px,0,pw,b.t);
      x.drawImage(f, SL.l,ih-SL.b,sw,SL.b,       px,H-b.b,pw,b.b);
    }
    var nV = Math.max(1, Math.round(dh/(sh*(b.l/SL.l))));
    for(var j=0;j<nV;j++){
      var py = b.t+dh*j/nV, ph = dh/nV;
      x.drawImage(f, 0,SL.t,SL.l,sh,             0,py,b.l,ph);
      x.drawImage(f, iw-SL.r,SL.t,SL.r,sh,       W-b.r,py,b.r,ph);
    }
  }

  /* o = {bild, ref, text, de} -> Promise<Blob|null> */
  async function bauen(o){
    var img = null;
    try{ img = await ladeBild(o.bild); }catch(_){}
    var f = await rahmen();
    try{
      await document.fonts.load('600 26px "Cormorant Garamond"');
      await document.fonts.load('italic 32px "Cormorant Garamond"');
      await document.fonts.ready;
    }catch(_){}

    var bl=Math.round(SL.l*K), br=Math.round(SL.r*K), bt=Math.round(SL.t*K), bb=Math.round(SL.b*K);
    var W=1440, H=810;
    var win  = {x:bl, y:bt, w:W-bl-br, h:H-bt-bb};
    var bild = {x:win.x-UEB, y:win.y-UEB, w:win.w+2*UEB, h:win.h+2*UEB};

    var c = document.createElement("canvas"); c.width=W; c.height=H;
    var x = c.getContext("2d");
    x.imageSmoothingEnabled = true; try{x.imageSmoothingQuality="high"}catch(_){}
    x.fillStyle = "#0a0806"; x.fillRect(0,0,W,H);

    if(img){
      var iw=img.naturalWidth||img.width, ih=img.naturalHeight||img.height;
      var s=Math.max(bild.w/iw, bild.h/ih), dw=iw*s, dh=ih*s;
      x.save(); x.beginPath(); x.rect(bild.x,bild.y,bild.w,bild.h); x.clip();
      x.drawImage(img, bild.x+(bild.w-dw)/2, bild.y+(bild.h-dh)/2, dw, dh);
      x.restore();
    }

    x.textAlign = "center";
    var cx = win.x+win.w/2, maxW = win.w-128, unten = win.y+win.h-30;
    var ex = String(o.text||"").replace(/\s+/g," ").trim();
    var fit = ex ? einpassen(x, (o.de?"„":"“")+ex+"”", maxW, win.h*0.5, [32,29,27,25,23,21]) : null;
    var yVers = unten-52-(fit?(fit.lines.length-1)*fit.lh:0);
    var yRef  = yVers-(fit?58:0);
    var oben  = Math.max(win.y, (fit?yRef:unten)-70);

    /* weicher Verlauf statt Balken, und er beginnt dort, wo der Text anfaengt —
       sonst liegen die oberen Zeilen auf hellem Himmel. */
    if(img){
      x.save(); x.beginPath(); x.rect(bild.x,bild.y,bild.w,bild.h); x.clip();
      var g = x.createLinearGradient(0, oben-60, 0, bild.y+bild.h);
      g.addColorStop(0,"rgba(8,5,3,0)"); g.addColorStop(.35,"rgba(8,5,3,.55)"); g.addColorStop(1,"rgba(8,5,3,.88)");
      x.fillStyle = g; x.fillRect(bild.x,bild.y,bild.w,bild.h);
      x.restore();
    }
    var schatten = function(fn){
      x.save(); x.shadowColor="rgba(0,0,0,.95)"; x.shadowBlur=16; fn(); x.shadowBlur=7; fn(); x.restore();
    };

    x.font = '500 21px "Cormorant Garamond",Georgia,serif';
    x.fillStyle = "rgba(240,214,153,.9)";
    try{x.letterSpacing="6px"}catch(_){}
    schatten(function(){ x.fillText("TRUTHPRINTS.DE", cx, unten) });
    try{x.letterSpacing="0px"}catch(_){}

    if(fit){
      x.font = 'italic '+fit.size+'px "Cormorant Garamond"';
      x.fillStyle = "#EAE1CC";
      fit.lines.forEach(function(ln,i){ schatten(function(){ x.fillText(ln, cx, yVers+i*fit.lh) }) });
    }

    x.font = '600 26px "Cormorant Garamond",Georgia,serif';
    x.fillStyle = "#F0D699";
    try{x.letterSpacing="7px"}catch(_){}
    schatten(function(){ x.fillText(String(o.ref||"").toUpperCase(), cx, fit?yRef:unten-52) });
    try{x.letterSpacing="0px"}catch(_){}

    if(f) rahmenZeichnen(x, f, W, H, {t:bt,r:br,b:bb,l:bl}, UEB);
    else { x.strokeStyle="rgba(201,168,76,.45)"; x.lineWidth=3; x.strokeRect(14,14,W-28,H-28); }

    return await new Promise(function(res){ c.toBlob(res, "image/png") });
  }

  /* o wie oben, dazu {link, datei, melden} */
  async function teilen(o){
    var blob = await bauen(o);
    if(!blob){ if(o.melden) o.melden(o.de?"Konnte Bild nicht erstellen":"Could not create image"); return; }
    var name = (o.datei||"truthprints")+"-truthprints.png";
    var file = window.File ? new File([blob], name, {type:"image/png"}) : null;
    /* Der Link steht NUR im url-Feld — zusaetzlich im Text zeigen ihn WhatsApp
       & Co. doppelt an. */
    if(file && navigator.canShare && navigator.canShare({files:[file]})){
      try{
        await navigator.share({files:[file], title:"TruthPrints", text:o.ref+" — TruthPrints", url:o.link});
        return;
      }catch(_){}
    }
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a"); a.href = url; a.download = name;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){URL.revokeObjectURL(url)}, 4000);
    try{
      await navigator.clipboard.writeText(o.link);
      if(o.melden) o.melden(o.de?"Bild gespeichert · Link kopiert":"Image saved · link copied");
    }catch(_){
      if(o.melden) o.melden(o.de?"Bild gespeichert":"Image saved");
    }
  }

  window.TP_CARD = {vorladen:rahmen, bauen:bauen, teilen:teilen};
})();
