/* TP_TTS — eine Stimme fuer Reader und Bloom.
 *
 * Warum das Vorlesen bis 25.08.2026 blechern klang, waren drei Fehler, und alle
 * drei standen doppelt im Code (einmal im Reader, einmal in Bloom):
 *
 * 1. `speechSynthesis.getVoices()` gibt beim ERSTEN Aufruf fast immer eine leere
 *    Liste zurueck — die Stimmen laden asynchron. Es wurde also gar keine Stimme
 *    gesetzt, und der Browser nahm seine aelteste Standardstimme. Das allein ist
 *    der groesste Teil des Roboterklangs.
 * 2. Genommen wurde die ERSTE Stimme der Sprache. Die erste ist auf fast jedem
 *    System die aelteste und schlechteste (eSpeak, "Microsoft David", die
 *    "Compact"-Stimmen auf iOS). Die guten heissen "Natural", "Neural", "Google",
 *    "Siri", "Enhanced", "Premium" — und stehen weiter hinten.
 * 3. Der ganze Abschnitt ging als EIN Stueck hinein. Das klingt monoton, weil die
 *    Betonung ueber hunderte Woerter verflacht, und Chrome bricht lange Stuecke
 *    nach etwa 15 Sekunden einfach ab.
 *
 * Hier steht die Loesung ein einziges Mal: auf die Stimmen warten, die beste
 * waehlen, satzweise sprechen. Kosten: keine. Kein Dienst, kein Schluessel,
 * nichts verlaesst das Geraet.
 */
(function () {
  "use strict";

  var GUT = [/natural/i, /neural/i, /google/i, /siri/i, /enhanced/i, /premium/i,
             /wavenet/i, /journey/i, /studio/i];
  var SCHLECHT = [/compact/i, /espeak/i, /\bdavid\b/i, /\bzira\b/i, /\bhazel\b/i,
                  /novelty/i, /eloquence/i];

  /* _lauf ist eine Laufnummer, kein Schalter — und das ist der Punkt.
     Mit einem blossen true/false-Schalter lebte eine abgebrochene Lesung weiter:
     speechSynthesis.cancel() loest bei den abgebrochenen Stuecken noch ein onend
     aus. Kam der Abbruch daher, dass die NAECHSTE Passage zu lesen begann, hatte
     die den Schalter schon wieder auf true gestellt — die alte Kette sah "laeuft"
     und sprach munter weiter. Zwei Lesungen gleichzeitig, und Stopp erwischte nur
     eine. (Lia, 25.08.2026: "wenn ich weiter scrolle liest es immer noch das
     Weiter vor und stoppt nicht.")
     Jede Lesung bekommt jetzt ihre eigene Nummer. Wer nicht mehr die aktuelle
     Nummer hat, ist tot — egal was der Schalter sagt. */
  var _stimmen = null, _warten = null, _lauf = 0, _ticker = null;

  function da() {
    return typeof speechSynthesis !== "undefined" &&
           typeof SpeechSynthesisUtterance !== "undefined";
  }

  /* Auf die Stimmenliste warten. `voiceschanged` feuert nicht ueberall zuverlaessig,
     darum zusaetzlich pollen — und nach 3 s aufgeben statt ewig zu haengen. */
  function bereit() {
    if (!da()) return Promise.resolve([]);
    if (_stimmen && _stimmen.length) return Promise.resolve(_stimmen);
    if (_warten) return _warten;
    _warten = new Promise(function (fertig) {
      var versuche = 0;
      function pruefen() {
        var vs = [];
        try { vs = speechSynthesis.getVoices() || []; } catch (e) {}
        if (vs.length) { _stimmen = vs; fertig(vs); return true; }
        return false;
      }
      if (pruefen()) return;
      try { speechSynthesis.addEventListener("voiceschanged", pruefen); } catch (e) {}
      var t = setInterval(function () {
        if (pruefen() || ++versuche > 30) { clearInterval(t); fertig(_stimmen || []); }
      }, 100);
    });
    return _warten;
  }

  /* ⚠️ Die Sprache allein reicht nicht — sie war sogar ein Rueckschritt.
     "en" trifft auch en-NG, en-ZA, en-IN, en-PH. Zusammen mit dem Bonus fuer
     "Natural"/"Online" gewann so eine regionale Netzstimme gegen die gewohnte
     US-Stimme, und das Ergebnis klang fuer Lia falsch akzentuiert
     (25.08.2026: "englisch war davor voll gut, hoert sich jetzt an wie …").
     Darum entscheidet die GEGEND jetzt vor allem anderen: fuer Englisch US vor
     GB, fuer Deutsch Deutschland vor Oesterreich/Schweiz — alles andere faellt
     deutlich zurueck. Bei der Schrift zaehlt die vertraute Stimme mehr als die
     technisch neueste. */
  var GEGEND = {
    en: { "en-us": 20, "en-gb": 16, "en-au": 4, "en-ca": 4 },
    de: { "de-de": 20, "de-at": 14, "de-ch": 10 },
  };

  /* ── Die Wunschliste: eine feste Rangfolge mit Namen ─────────────────────────
     Punkte allein reichten nicht — auf Lias Geraet gewann "English (Nigeria)".
     Darum steht hier jetzt ausdruecklich, WELCHE Stimme genommen werden soll,
     in dieser Reihenfolge; die Punkte greifen nur noch, wenn keine davon da ist.
     Die Liste deckt die grossen Systeme ab, weil jedes andere Stimmen mitbringt:
     Windows/Edge die "Online (Natural)"-Reihe, Chrome die Google-Stimmen,
     Apple Samantha/Anna, Android die Google-Sprachausgabe.

     ⚠️ Ehrlich zur Grenze: "auf jedem Geraet dieselbe Stimme" ist mit der
     Browser-Sprachausgabe nicht erzwingbar — es laesst sich nur nehmen, was das
     Geraet mitbringt. Diese Liste holt das Beste heraus, das jeweils da ist.
     Wirklich ueberall identisch wird es erst mit vorgerenderten Audiodateien
     (Piper) — das ist ein eigenes Vorhaben. */
  var WUNSCH = {
    en: [
      /^Microsoft Aria Online/i,          /* Edge, sehr natuerlich, US */
      /^Microsoft Jenny Online/i,
      /^Microsoft Emma Online/i,
      /^Microsoft Andrew Online/i,
      /^Microsoft Guy Online/i,
      /^Google US English/i,              /* Chrome/Android */
      /^Samantha/i,                       /* macOS/iOS */
      /^Ava/i,
      /^Allison/i,
      /^Microsoft Zira/i,                 /* aeltere Windows-Stimme, aber US */
      /^Google UK English Female/i,
    ],
    de: [
      /^Microsoft Katja Online/i,         /* Edge, sehr natuerlich, Deutschland */
      /^Microsoft Seraphina Online/i,
      /^Microsoft Conrad Online/i,
      /^Microsoft Amala Online/i,
      /^Google Deutsch/i,                 /* Chrome/Android */
      /^Anna/i,                           /* macOS/iOS */
      /^Petra/i,
      /^Helena/i,
      /^Markus/i,
      /^Microsoft Hedda/i,
      /^Microsoft Katja/i,
    ],
  };

  function wunschRang(v, sprache) {
    var liste = WUNSCH[sprache] || [];
    for (var i = 0; i < liste.length; i++) {
      if (liste[i].test(v.name || "")) return i;      /* kleiner = besser */
    }
    return -1;
  }

  function punkte(v, sprache) {
    var lang = (v.lang || "").toLowerCase().replace("_", "-");
    if (lang.indexOf(sprache) !== 0) return -1;
    var p = 0, name = v.name || "";
    var tabelle = GEGEND[sprache] || {};
    p += (tabelle[lang] !== undefined) ? tabelle[lang] : -12;   /* fremde Gegend: klar zurueck */
    GUT.forEach(function (r) { if (r.test(name)) p += 10; });
    SCHLECHT.forEach(function (r) { if (r.test(name)) p -= 8; });
    if (v.localService === false) p += 3;   /* Netzstimmen sind meist die neueren */
    if (v.default) p += 1;
    return p;
  }

  /* Einmal eine Frau, einmal ein Mann — und niemand hatte etwas geaendert.
     Zwei Ursachen, beide hier behoben (Lia, 25.08.2026):
     1. Die Stimmenliste laedt nach und nach. Wer sie einmal merkt, hat mal 12 und
        mal 40 Stimmen zur Auswahl — und damit ein anderes Ergebnis.
     2. Bei Punktgleichstand gewann einfach die zuerst gefundene. Die Reihenfolge
        der Liste ist aber nirgends garantiert und aendert sich zwischen Aufrufen.
     Darum: Liste jedes Mal frisch lesen, bei Gleichstand nach Namen entscheiden
     (immer dieselbe Wahl), und die getroffene Wahl merken. Ab dem zweiten Mal
     spricht dieselbe Stimme wie beim ersten Mal — Wiedererkennung ist bei einer
     vorgelesenen Schrift wichtiger als die letzte Nuance Qualitaet. */
  /* Die Nummer im Schluessel steigt, wenn sich die Auswahlregeln aendern —
     sonst haelt eine einmal gemerkte, inzwischen schlechte Stimme ewig durch. */
  /* v3: seit der Wunschliste wird nicht mehr automatisch gemerkt — hier steht nur
     noch, was jemand ausdruecklich festgelegt hat. Eine automatisch gemerkte
     Fehlwahl (Lias Geraet hatte "English (Nigeria)" gespeichert) kann sich damit
     nicht mehr festsetzen. */
  function _merkschluessel(sprache) { return "tp_stimme3_" + sprache; }

  function stimme(sprache) {
    var vs = [];
    try { vs = speechSynthesis.getVoices() || _stimmen || []; } catch (e) { vs = _stimmen || []; }
    if (!vs.length) vs = _stimmen || [];
    var passend = vs.filter(function (v) { return punkte(v, sprache) >= 0; });
    if (!passend.length) return null;

    /* Von Hand festgelegt? Das schlaegt alles. (TP_TTS.setze) */
    var fest = null;
    try { fest = localStorage.getItem(_merkschluessel(sprache)); } catch (e) {}
    if (fest) {
      var treffer = passend.filter(function (v) { return v.name === fest; })[0];
      if (treffer) return treffer;
    }

    /* 1. Steht eine Wunschstimme zur Verfuegung? Dann die, und zwar die oberste. */
    var wunsch = passend.filter(function (v) { return wunschRang(v, sprache) >= 0; });
    if (wunsch.length) {
      wunsch.sort(function (a, b) {
        var d = wunschRang(a, sprache) - wunschRang(b, sprache);
        if (d) return d;
        return punkte(b, sprache) - punkte(a, sprache);
      });
      return wunsch[0];
    }

    /* 2. Sonst nach Punkten — Gegend zuerst, dann Bauart. */
    passend.sort(function (a, b) {
      var d = punkte(b, sprache) - punkte(a, sprache);
      if (d) return d;
      return a.name < b.name ? -1 : (a.name > b.name ? 1 : 0);   /* Gleichstand: immer dieselbe */
    });
    return passend[0];
  }

  /* Eine Stimme dauerhaft festlegen: TP_TTS.setze('en','Microsoft Aria Online …') */
  function setze(sprache, name) {
    try { localStorage.setItem(_merkschluessel(sprache === "de" ? "de" : "en"), name); } catch (e) {}
  }

  /* ⚠️ Der Fall, den wir am 25.08.2026 in Brave gesehen haben: englischer Text,
     aber deutsche Aussprache und extrem blechern. Ursache ist nicht die Auswahl,
     sondern dass GAR KEINE englische Stimme angeboten wird — Brave raeumt die
     Stimmenliste als Schutz vor Wiedererkennung aus. Ist keine Stimme der
     Sprache da, setzen wir keine, und der Browser nimmt seine Systemstimme:
     die deutsche, die dann englischen Text buchstabiert.
     Das laesst sich von unserer Seite nicht reparieren — aber man kann es
     erkennen und sagen, statt den Nutzer raten zu lassen. */
  function fehlt(sprache) {
    sprache = (sprache === "de") ? "de" : "en";
    var vs = [];
    try { vs = speechSynthesis.getVoices() || _stimmen || []; } catch (e) { vs = _stimmen || []; }
    return !vs.some(function (v) { return punkte(v, sprache) >= 0; });
  }

  /* Falls die gemerkte Stimme doch nicht gefaellt: TP_TTS.vergiss() in der Konsole. */
  function vergiss() {
    try {
      ["de", "en"].forEach(function (s) {
        localStorage.removeItem(_merkschluessel(s));
        localStorage.removeItem("tp_stimme_" + s);    /* und die alten Fassungen */
        localStorage.removeItem("tp_stimme2_" + s);
      });
    } catch (e) {}
  }

  /* Was steht ueberhaupt zur Wahl? TP_TTS.liste('en') in der Konsole zeigt die
     Rangfolge mit Punkten — damit laesst sich streiten statt raten. */
  function liste(sprache) {
    sprache = (sprache === "de") ? "de" : "en";
    var vs = [];
    try { vs = speechSynthesis.getVoices() || []; } catch (e) {}
    return vs.map(function (v) { return { name: v.name, lang: v.lang, punkte: punkte(v, sprache) }; })
             .filter(function (x) { return x.punkte >= 0; })
             .sort(function (a, b) { return b.punkte - a.punkte; });
  }

  /* In Saetze zerlegen. Bibeltext hat lange Perioden — an Satzzeichen trennen,
     aber sehr kurze Stuecke wieder anhaengen, sonst wird es gehackt. */
  function saetze(text) {
    var roh = String(text || "").replace(/\s+/g, " ").trim();
    if (!roh) return [];
    var teile = roh.match(/[^.!?;:]+[.!?;:]*\s*/g) || [roh];
    var aus = [], puffer = "";
    teile.forEach(function (t) {
      puffer += t;
      if (puffer.trim().length >= 90) { aus.push(puffer.trim()); puffer = ""; }
    });
    if (puffer.trim()) aus.push(puffer.trim());
    return aus;
  }

  function stopp() {
    _lauf++;                    /* alles Laufende verliert damit seine Nummer */
    if (_ticker) { clearInterval(_ticker); _ticker = null; }
    try { speechSynthesis.cancel(); } catch (e) {}
  }

  /* Chrome haelt nach ~15 s von selbst an, wenn nichts nachstupst. */
  function tickerAn(meiner) {
    if (_ticker) clearInterval(_ticker);
    _ticker = setInterval(function () {
      if (meiner !== _lauf) { clearInterval(_ticker); _ticker = null; return; }
      try { if (speechSynthesis.speaking) { speechSynthesis.pause(); speechSynthesis.resume(); } } catch (e) {}
    }, 9000);
  }

  /* sprich(text, {sprache:'de'|'en', tempo, onEnde, onFehler})
     onEnde feuert erst nach dem LETZTEN Satz — nicht nach jedem. */
  function sprich(text, opt) {
    opt = opt || {};
    if (!da()) { if (opt.onFehler) opt.onFehler(); return; }
    var sprache = (opt.sprache === "de") ? "de" : "en";
    var stuecke = saetze(text);
    if (!stuecke.length) { if (opt.onEnde) opt.onEnde(); return; }

    bereit().then(function () {
      stopp();                       /* erhoeht _lauf — alles Alte ist damit tot */
      var meiner = _lauf;            /* ab hier gehoert die Stimme dieser Lesung */
      tickerAn(meiner);
      var v = stimme(sprache);
      var i = 0;

      function naechster() {
        if (meiner !== _lauf) return;          /* eine neuere Lesung hat uebernommen */
        if (i >= stuecke.length) { if (opt.onEnde) opt.onEnde(); return; }
        var u = new SpeechSynthesisUtterance(stuecke[i++]);
        u.lang = sprache === "de" ? "de-DE" : "en-US";
        if (v) u.voice = v;
        u.rate = opt.tempo || 0.94;
        u.pitch = 1;
        u.onend = naechster;
        u.onerror = function () {
          /* Ein abgebrochener Satz darf nicht die ganze Lesung toeten —
             ein ABGELOESTER Lauf aber auch nicht weiterreden. */
          if (meiner === _lauf) naechster();
        };
        try { speechSynthesis.speak(u); }
        catch (e) { if (opt.onFehler) opt.onFehler(); }
      }
      naechster();
    });
  }

  /* Welche Stimme haben wir tatsaechlich erwischt — fuer die Fehlersuche. */
  function welche(sprache) {
    var v = stimme(sprache === "de" ? "de" : "en");
    return v ? (v.name + " (" + v.lang + ")") : "keine";
  }

  window.TP_TTS = { da: da, bereit: bereit, sprich: sprich, stopp: stopp,
                    welche: welche, vergiss: vergiss, liste: liste, setze: setze,
                    fehlt: fehlt };
  if (da()) bereit();   /* frueh anstossen, damit beim ersten Klick alles da ist */
})();
