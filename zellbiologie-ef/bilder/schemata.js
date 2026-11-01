/* Selbst gezeichnete Schemata (Inline-SVG) in der Palette des Unterrichtsmaterials.
   In fragen.js wird ein Schema über seinen Namen angesprochen, z. B. bild: "mitochondrium".
   Eigene Fotos legst du als Datei in den Ordner bilder/ und schreibst dann
   bild: "bilder/dateiname.jpg" – siehe LIESMICH.md. */

var SCHEMATA = (function () {
  'use strict';

  var C = {
    dark: '#1B3B1F', green: '#2E7D32', lime: '#D3E9A6', limebg: '#F1F7E6',
    yell: '#F7EBB5', gold: '#8A6D1A', edge: '#C9DDAC', grey: '#6B6B6B', ink: '#1A1A1A',
    plasma: '#FBF6DE', matrix: '#FBE3C9', orange: '#C2410C', braun: '#5B3410', stroma: '#E4F0D0', metall: '#E9EDE3'
  };

  function svg(breite, hoehe, inhalt) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + breite + ' ' + hoehe +
      '" role="img" focusable="false">' + inhalt + '</svg>';
  }

  /* ---------- Mitochondrium im Längsschnitt ---------- */
  function mitochondrium() {
    var cx = 200, cy = 120, ai = 160, bi = 68, t = '';
    function oben(x) { return cy - bi * Math.sqrt(1 - Math.pow((x - cx) / ai, 2)); }
    function unten(x) { return cy + bi * Math.sqrt(1 - Math.pow((x - cx) / ai, 2)); }
    t += '<ellipse cx="200" cy="120" rx="175" ry="82" fill="' + C.yell + '" stroke="' + C.braun + '" stroke-width="3.5"/>';
    t += '<ellipse cx="200" cy="120" rx="160" ry="68" fill="' + C.matrix + '" stroke="' + C.orange + '" stroke-width="3.2"/>';
    [95, 150, 205, 260, 315].forEach(function (x) {
      var y = oben(x);
      t += '<path d="M' + (x - 9) + ',' + (y - 6).toFixed(1) + ' V' + (y + 41).toFixed(1) +
        ' A9,9 0 0 0 ' + (x + 9) + ',' + (y + 41).toFixed(1) + ' V' + (y - 6).toFixed(1) +
        '" fill="' + C.yell + '" stroke="' + C.orange + '" stroke-width="3.2"/>';
    });
    [122, 177, 232, 287].forEach(function (x) {
      var y = unten(x);
      t += '<path d="M' + (x - 9) + ',' + (y + 6).toFixed(1) + ' V' + (y - 41).toFixed(1) +
        ' A9,9 0 0 1 ' + (x + 9) + ',' + (y - 41).toFixed(1) + ' V' + (y + 6).toFixed(1) +
        '" fill="' + C.yell + '" stroke="' + C.orange + '" stroke-width="3.2"/>';
    });
    t += '<path d="M332,108 c6,-10 18,-6 20,2 c3,9 -8,8 -6,15 c2,7 -12,9 -16,1 c-3,-6 -3,-11 2,-18z" fill="none" stroke="' + C.dark + '" stroke-width="2"/>';
    [[140, 100], [130, 145], [240, 124], [300, 118], [110, 118], [270, 138]].forEach(function (p) {
      t += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="' + C.dark + '"/>';
    });
    return svg(400, 250, t);
  }

  /* ---------- Chloroplast im Schnitt ---------- */
  function chloroplast() {
    var t = '';
    t += '<ellipse cx="200" cy="122" rx="175" ry="82" fill="' + C.yell + '" stroke="' + C.dark + '" stroke-width="3"/>';
    t += '<ellipse cx="200" cy="122" rx="166" ry="73" fill="' + C.stroma + '" stroke="' + C.green + '" stroke-width="3"/>';
    t += '<g stroke="' + C.green + '" stroke-width="4" stroke-linecap="round">' +
      '<line x1="118" y1="118" x2="142" y2="100"/><line x1="188" y1="100" x2="217" y2="135"/>' +
      '<line x1="263" y1="135" x2="282" y2="112"/></g>';
    function stapel(x, y) {
      var s = '';
      for (var i = 0; i < 5; i++) {
        s += '<rect x="' + (x - 23) + '" y="' + (y - 23 + i * 9.5).toFixed(1) +
          '" width="46" height="8" rx="4" fill="' + C.green + '" stroke="' + C.dark + '" stroke-width="1.5"/>';
      }
      return s;
    }
    t += stapel(95, 118) + stapel(165, 95) + stapel(240, 140) + stapel(305, 108);
    t += '<rect x="148" y="161" width="64" height="8" rx="4" fill="' + C.green + '" stroke="' + C.dark + '" stroke-width="1.5"/>';
    t += '<circle cx="330" cy="152" r="7" fill="none" stroke="' + C.dark + '" stroke-width="2"/>';
    [[130, 152], [205, 70], [275, 172], [60, 125], [118, 82]].forEach(function (p) {
      t += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="2.6" fill="' + C.dark + '"/>';
    });
    return svg(400, 250, t);
  }

  /* ---------- Bausteine für Pflanzen- und Tierzelle ---------- */
  function mito(x, y, w) {
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + (w || 0) + ')">' +
      '<ellipse rx="12" ry="6.5" fill="' + C.yell + '" stroke="' + C.gold + '" stroke-width="1.8"/>' +
      '<path d="M-6,-5 v6 M0,5 v-6 M6,-5 v6" stroke="' + C.gold + '" stroke-width="1.4" fill="none"/></g>';
  }
  function chloro(x, y, w) {
    return '<g transform="translate(' + x + ',' + y + ') rotate(' + (w || 0) + ')">' +
      '<ellipse rx="17" ry="9" fill="' + C.green + '" stroke="' + C.dark + '" stroke-width="1.5"/>' +
      '<path d="M-9,-3 h5 M-2,2 h5 M5,-3 h5" stroke="' + C.lime + '" stroke-width="2.4" fill="none"/></g>';
  }
  function kern(x, y, r) {
    return '<circle cx="' + x + '" cy="' + y + '" r="' + r + '" fill="' + C.lime + '" stroke="' + C.dark + '" stroke-width="2.5"/>' +
      '<circle cx="' + (x + 6) + '" cy="' + (y - 4) + '" r="' + (r * 0.29).toFixed(1) + '" fill="' + C.green + '"/>';
  }

  function pflanzenzelleInhalt() {
    var t = '';
    t += '<rect x="60" y="40" width="280" height="220" rx="10" fill="' + C.edge + '" stroke="' + C.dark + '" stroke-width="2.5"/>';
    t += '<rect x="72" y="52" width="256" height="196" rx="6" fill="' + C.plasma + '" stroke="' + C.green + '" stroke-width="2.5"/>';
    t += '<rect x="150" y="82" width="150" height="142" rx="30" fill="#FFFFFF" stroke="' + C.green + '" stroke-width="2.5"/>';
    t += kern(110, 150, 28);
    t += chloro(175, 66, 0) + chloro(252, 64, 4) + chloro(312, 118, 90) + chloro(205, 237, -4) +
      chloro(272, 236, 3) + chloro(98, 222, 20) + chloro(100, 78, -15);
    t += mito(130, 100, 20) + mito(315, 182, 80) + mito(142, 238, 0) + mito(88, 196, 70);
    return t;
  }

  function tierzelleInhalt() {
    var t = '';
    t += '<path d="M200,40 C262,36 318,72 322,132 C326,196 284,252 210,258 C140,264 82,226 78,160 C74,96 132,44 200,40 Z" fill="' + C.plasma + '" stroke="' + C.green + '" stroke-width="2.5"/>';
    t += kern(195, 150, 32);
    t += mito(125, 120, 30) + mito(270, 110, -40) + mito(150, 215, 10) + mito(275, 200, 60) + mito(205, 80, 0);
    t += '<g fill="' + C.dark + '"><rect x="236" y="148" width="18" height="7" rx="2"/><rect x="241" y="160" width="7" height="18" rx="2"/></g>';
    [[115, 170], [240, 232], [300, 150]].forEach(function (p) {
      t += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="8" fill="' + C.edge + '" stroke="' + C.dark + '" stroke-width="1.8"/>';
    });
    return t;
  }

  function pflanzenzelle() { return svg(400, 300, pflanzenzelleInhalt()); }

  function zellen() {
    var t = '<g transform="translate(-40,-12)">' + pflanzenzelleInhalt() + '</g>' +
      '<g transform="translate(250,-12)">' + tierzelleInhalt() + '</g>' +
      '<g font-family="system-ui, Arial, sans-serif" font-size="24" font-weight="600" fill="' + C.dark + '" text-anchor="middle">' +
      '<text x="160" y="282">Pflanzenzelle</text><text x="450" y="282">Tierzelle</text></g>';
    return svg(620, 295, t);
  }

  /* ---------- Lichtmikroskop, Seitenansicht ---------- */
  function lichtmikroskop() {
    var s = 'stroke="' + C.dark + '" stroke-width="2.2"', t = '';
    t += '<path d="M150,250 L150,392" stroke="' + C.yell + '" stroke-width="10" stroke-dasharray="6 6"/>';
    t += '<path d="M222,392 V162 C222,128 205,112 166,112 V140 C186,140 196,150 196,166 V392 Z" fill="' + C.metall + '" ' + s + '/>';
    t += '<rect x="58" y="390" width="244" height="32" rx="8" fill="' + C.edge + '" ' + s + '/>';
    t += '<ellipse cx="150" cy="389" rx="20" ry="8" fill="' + C.yell + '" stroke="' + C.gold + '" stroke-width="2.2"/>';
    t += '<rect x="134" y="70" width="32" height="112" fill="' + C.metall + '" ' + s + '/>';
    t += '<rect x="139" y="30" width="22" height="42" fill="' + C.edge + '" ' + s + '/>';
    t += '<rect x="133" y="24" width="34" height="10" rx="3" fill="' + C.dark + '"/>';
    t += '<path d="M118,180 H182 L172,200 H128 Z" fill="' + C.edge + '" ' + s + '/>';
    t += '<rect x="143" y="200" width="14" height="32" rx="2" fill="' + C.metall + '" ' + s + '/>';
    t += '<rect x="143" y="226" width="14" height="6" fill="' + C.dark + '"/>';
    t += '<rect x="120" y="196" width="11" height="24" rx="2" fill="' + C.metall + '" ' + s + ' transform="rotate(24 125 198)"/>';
    t += '<rect x="169" y="196" width="11" height="24" rx="2" fill="' + C.metall + '" ' + s + ' transform="rotate(-24 175 198)"/>';
    t += '<rect x="70" y="245" width="160" height="12" rx="2" fill="' + C.dark + '"/>';
    t += '<rect x="196" y="240" width="26" height="22" fill="' + C.metall + '" ' + s + '/>';
    t += '<rect x="112" y="240" width="76" height="5" fill="#FFFFFF" stroke="' + C.grey + '" stroke-width="1.2"/>';
    t += '<rect x="88" y="238" width="30" height="6" rx="2" fill="' + C.grey + '"/><rect x="182" y="238" width="30" height="6" rx="2" fill="' + C.grey + '"/>';
    t += '<rect x="136" y="257" width="28" height="25" fill="' + C.metall + '" ' + s + '/>';
    t += '<rect x="128" y="284" width="44" height="6" rx="2" fill="' + C.gold + '"/>';
    t += '<path d="M128,287 L108,291" stroke="' + C.gold + '" stroke-width="4" stroke-linecap="round"/>';
    t += '<circle cx="238" cy="300" r="21" fill="' + C.metall + '" ' + s + '/>';
    t += '<g stroke="' + C.grey + '" stroke-width="1.5"><line x1="238" y1="281" x2="238" y2="319"/><line x1="219" y1="300" x2="257" y2="300"/><line x1="225" y1="287" x2="251" y2="313"/><line x1="251" y1="287" x2="225" y2="313"/></g>';
    t += '<circle cx="238" cy="300" r="7" fill="' + C.edge + '" ' + s + '/>';
    t += '<circle cx="238" cy="342" r="12" fill="' + C.edge + '" ' + s + '/>';
    t += '<circle cx="238" cy="342" r="4" fill="' + C.dark + '"/>';
    return svg(360, 440, t);
  }

  /* ---------- Bakterium (prokaryotische Zelle) ---------- */
  function bakterium() {
    var t = '';
    t += '<rect x="50" y="55" width="300" height="130" rx="65" fill="' + C.edge + '" stroke="' + C.dark + '" stroke-width="2.5"/>';
    t += '<rect x="60" y="65" width="280" height="110" rx="55" fill="' + C.plasma + '" stroke="' + C.green + '" stroke-width="2.5"/>';
    t += '<path d="M150,105 C165,80 200,95 215,90 C245,82 255,110 240,122 C228,132 250,145 230,152 C205,160 190,140 170,150 C145,160 132,128 150,105 Z" fill="none" stroke="' + C.dark + '" stroke-width="2.5"/>';
    t += '<circle cx="292" cy="96" r="9" fill="none" stroke="' + C.dark + '" stroke-width="2.5"/>';
    t += '<circle cx="300" cy="140" r="9" fill="none" stroke="' + C.dark + '" stroke-width="2.5"/>';
    [[95, 98], [104, 146], [120, 120], [265, 115], [270, 160], [322, 120], [250, 76], [200, 166], [180, 82]].forEach(function (p) {
      t += '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="4.6" fill="' + C.dark + '"/>';
    });
    return svg(400, 240, t);
  }

  return {
    mitochondrium: {
      svg: mitochondrium(),
      alt: 'Schema eines Mitochondriums im Längsschnitt: eine äußere Hülle, darin eine zweite, nach innen gefaltete Membran; die Falten ragen von oben und unten in den Innenraum.'
    },
    chloroplast: {
      svg: chloroplast(),
      alt: 'Schema eines Chloroplasten im Schnitt: zwei Hüllmembranen, im Innenraum mehrere Stapel aus flachen grünen Scheiben und eine einzelne flache Scheibe.'
    },
    pflanzenzelle: {
      svg: pflanzenzelle(),
      alt: 'Schema einer Pflanzenzelle: rechteckige Zelle mit dicker äußerer Schicht, großem hellem Innenraum, Kern am linken Rand, grünen ovalen Körpern und kleinen gelben Körpern.'
    },
    zellen: {
      svg: zellen(),
      alt: 'Links das Schema einer Pflanzenzelle mit dicker äußerer Schicht, großem hellem Innenraum und grünen ovalen Körpern; rechts das Schema einer rundlichen Tierzelle mit Kern, kleinen gelben Körpern, zwei kleinen dunklen Zylindern und kleinen runden Bläschen.'
    },
    lichtmikroskop: {
      svg: lichtmikroskop(),
      alt: 'Schema eines Lichtmikroskops von der Seite, von oben nach unten: Einblick, Rohr, Drehscheibe mit drei Linsen, Tisch mit Halteklammern, darunter Linse und Blendenscheibe, unten eine Lampe im Standfuß; rechts ein gebogener Arm mit einem großen und einem kleinen Drehknopf.'
    },
    bakterium: {
      svg: bakterium(),
      alt: 'Schema einer Bakterienzelle: länglich-runde Zelle mit äußerer Schicht und innerer Linie, im Inneren eine große geschlossene Schleife, zwei kleine Ringe und viele Punkte.'
    }
  };
}());
