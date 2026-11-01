/* app.js – Logik, Darstellung und Ergebniscode der Übungs-App Zellbiologie EF.
   Die Inhalte stehen ausschließlich in fragen.js, die Schemata in bilder/schemata.js.
   Wer nur Aufgaben ergänzen will, muss diese Datei nicht anfassen. */

(function () {
  'use strict';

  var KAP = (typeof KAPITEL !== 'undefined' && Array.isArray(KAPITEL)) ? KAPITEL : [];
  var SCHEMA = (typeof SCHEMATA !== 'undefined' && SCHEMATA) ? SCHEMATA : {};
  var SPEICHER_NAME = 'zellbiologie-ef1-fortschritt';
  var MIX_ANZAHL = 20;
  var MIN_ZEICHEN_OFFEN = 20;

  var TYPNAMEN = {
    auswahl: 'Einfachauswahl', mehrfach: 'Mehrfachauswahl', zuordnen: 'Zuordnung',
    luecken: 'Lückentext', beschriften: 'Beschriften', reihenfolge: 'Reihenfolge',
    richtigfalsch: 'Richtig oder falsch', offen: 'Offene Aufgabe',
    korrigieren: 'Fehler korrigieren', mikroskop: 'Mikroskop einstellen'
  };

  var inhalt = document.getElementById('inhalt');
  var ansage = document.getElementById('ansage');
  var startKnopf = document.getElementById('zur-startseite');
  var kopf = document.getElementById('kopf');
  var standPunkte = document.getElementById('stand-punkte');
  var standFortschritt = document.getElementById('stand-fortschritt');
  var standLeiste = document.getElementById('stand-leiste');

  /* ------------------------------------------------------------------
     Hilfsfunktionen
     ------------------------------------------------------------------ */
  function el(tag, attrs) {
    var e = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        if (v === undefined || v === null || v === false) return;
        if (k === 'class') e.className = v;
        else if (k === 'text') e.textContent = v;
        else if (k.slice(0, 2) === 'on' && typeof v === 'function') e.addEventListener(k.slice(2), v);
        else e.setAttribute(k, v === true ? '' : String(v));
      });
    }
    for (var i = 2; i < arguments.length; i++) haenge(e, arguments[i]);
    return e;
  }
  function haenge(e, k) {
    if (k === null || k === undefined || k === false) return;
    if (Array.isArray(k)) { k.forEach(function (x) { haenge(e, x); }); return; }
    e.appendChild(typeof k === 'string' || typeof k === 'number' ? document.createTextNode(String(k)) : k);
  }
  function knopf(text, klasse, beiKlick, attrs) {
    var a = { type: 'button', class: klasse || 'knopf' };
    if (attrs) Object.keys(attrs).forEach(function (k) { a[k] = attrs[k]; });
    var b = el('button', a, text);
    if (beiKlick) b.addEventListener('click', beiKlick);
    return b;
  }
  function mischen(liste) {
    var a = liste.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function sagAn(text) {
    ansage.textContent = '';
    window.setTimeout(function () { ansage.textContent = text; }, 40);
  }
  function aufzaehlung(liste) {
    if (liste.length <= 1) return liste.join('');
    return liste.slice(0, -1).join(', ') + ' und ' + liste[liste.length - 1];
  }
  function anf(t) { return '„' + t + '“'; }
  function kurz(t, n) {
    t = String(t || '');
    return t.length > n ? t.slice(0, n - 1).replace(/\s+\S*$/, '') + ' …' : t;
  }
  function fundstelle(a, kap) {
    var s = a.seite || kap.seiten;
    return s ? 'Natura ' + s : '';
  }
  function neuerBildschirm() {
    inhalt.textContent = '';
    window.scrollTo(0, 0);
    aktualisiereKopf();
  }
  function bewegungErlaubt() {
    return !(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }
  /* Bringt ein Element sichtbar zwischen Kopfzeile und Aktionsleiste (wichtig am iPad). */
  function zeigeImBild(knoten) {
    try { knoten.scrollIntoView({ block: 'nearest', behavior: bewegungErlaubt() ? 'smooth' : 'auto' }); }
    catch (e) { knoten.scrollIntoView(false); }
  }
  /* Beim Ziehen am Rand mitscrollen; Kopfzeile und Aktionsleiste liegen über dem Inhalt. */
  function randScrollen(y) {
    var oben = kopf.offsetHeight + 40, unten = window.innerHeight - 110;
    if (y < oben) window.scrollBy(0, -16);
    else if (y > unten) window.scrollBy(0, 16);
  }
  function seitenText(kap) { return kap && kap.seiten ? 'Natura ' + kap.seiten : ''; }
  function fokus(knoten) {
    if (!knoten) return;
    if (!knoten.hasAttribute('tabindex')) knoten.setAttribute('tabindex', '-1');
    try { knoten.focus({ preventScroll: true }); } catch (e) { knoten.focus(); }
  }

  /* Vergleich von Eingaben in Lücken: Groß-/Kleinschreibung, Foto/Photo, ss/ß,
     Leerzeichen und Zahlenschreibweisen (1000, 1.000, 1 000, 0,025) werden toleriert. */
  function normText(s) {
    return String(s).toLowerCase().replace(/ß/g, 'ss').replace(/ph/g, 'f')
      .replace(/[\s  .\-–'’"„“]/g, '');
  }
  function alsZahl(s) {
    var t = String(s).replace(/[\s  ']/g, '').replace(/[^0-9.,]/g, '');
    if (!t) return NaN;
    if (t.indexOf(',') >= 0) t = t.replace(/\./g, '').replace(',', '.');
    else if (/^[1-9]\d{0,2}(\.\d{3})+$/.test(t)) t = t.replace(/\./g, '');
    return parseFloat(t);
  }
  function istZahlwort(w) { return /^[\d\s.,]+$/.test(String(w).trim()); }
  function passt(eingabe, erlaubt) {
    return erlaubt.some(function (w) {
      if (istZahlwort(w)) {
        var soll = alsZahl(w), ist = alsZahl(eingabe);
        return !isNaN(ist) && Math.abs(ist - soll) <= 1e-9 * Math.max(1, Math.abs(soll));
      }
      return normText(eingabe) === normText(w);
    });
  }

  /* ------------------------------------------------------------------
     Fortschritt (nur auf diesem Gerät, nur innerhalb der App)
     ------------------------------------------------------------------ */
  var speicher = { ergebnisse: {} };
  try {
    var roh = window.localStorage.getItem(SPEICHER_NAME);
    if (roh) {
      var gelesen = JSON.parse(roh);
      if (gelesen && typeof gelesen.ergebnisse === 'object') speicher = gelesen;
    }
  } catch (e) { /* ohne Speicher geht es auch */ }

  function sichern() {
    try { window.localStorage.setItem(SPEICHER_NAME, JSON.stringify(speicher)); } catch (e) { /* egal */ }
  }
  function loescheFortschritt() {
    speicher = { ergebnisse: {} };
    try { window.localStorage.removeItem(SPEICHER_NAME); } catch (e) { /* egal */ }
  }
  function hatFortschritt() { return Object.keys(speicher.ergebnisse).length > 0; }

  /* ------------------------------------------------------------------
     Aufgabenverzeichnis
     ------------------------------------------------------------------ */
  var ALLE = [];
  KAP.forEach(function (k, ki) {
    (k.aufgaben || []).forEach(function (a, ai) { ALLE.push({ kap: ki, nr: ai, a: a }); });
  });
  function eintraegeVon(ki) { return ALLE.filter(function (e) { return e.kap === ki; }); }

  function kapitelStand(ki) {
    var st = { richtig: 0, beantwortet: 0, offenBearbeitet: 0, offenGesamt: 0 };
    (KAP[ki].aufgaben || []).forEach(function (a) {
      var s = speicher.ergebnisse[a.id];
      if (a.typ === 'offen') {
        st.offenGesamt++;
        if (s === 'b') st.offenBearbeitet++;
      } else if (s === 'r' || s === 'f' || s === 'u') {
        st.beantwortet++;
        if (s === 'r') st.richtig++;
      }
    });
    return st;
  }

  /* Ergebniscode: EF1- + ein Zeichen je Kapitel + - + zwei Prüfzeichen.
     Zeichenwert v = 3·q + o (Basis 36). q = Anteil richtig in Zehnteln (0–10),
     q = 11 bedeutet: keine geschlossene Aufgabe bearbeitet. o = offene Aufgaben:
     0 keine, 1 teilweise, 2 alle bearbeitet. Prüfsumme: Summe (Position · Wert)
     modulo 1296, als zwei Zeichen zur Basis 36. Details in LIESMICH.md. */
  function ergebniscode() {
    var zeichen = '', summe = 0;
    KAP.forEach(function (k, i) {
      var st = kapitelStand(i);
      var q = st.beantwortet ? Math.round(st.richtig / st.beantwortet * 10) : 11;
      var o = st.offenBearbeitet === 0 ? 0 : (st.offenBearbeitet >= st.offenGesamt ? 2 : 1);
      var v = q * 3 + o;
      zeichen += v.toString(36);
      summe += (i + 1) * v;
    });
    var pruef = (summe % 1296).toString(36).toUpperCase();
    while (pruef.length < 2) pruef = '0' + pruef;
    return 'EF1-' + zeichen + '-' + pruef;
  }

  /* ------------------------------------------------------------------
     Durchgänge
     ------------------------------------------------------------------ */
  var lauf = null;

  function starte(art, liste) {
    lauf = { art: art, liste: liste, pos: 0, ergebnis: {} };
    try { if (location.hash !== '#uebung') history.pushState(null, '', '#uebung'); } catch (e) { /* egal */ }
    startKnopf.hidden = false;
    zeigeLaufAufgabe();
  }
  function startKapitel(ki) { starte('kapitel', eintraegeVon(ki)); }
  function startAlle() { starte('alle', ALLE.slice()); }
  function startMix() {
    var proKapitel = KAP.map(function (k, i) { return mischen(eintraegeVon(i)); });
    var ziel = Math.min(MIX_ANZAHL, ALLE.length), auswahl = [];
    while (auswahl.length < ziel) {
      mischen(KAP.map(function (k, i) { return i; })).forEach(function (i) {
        if (auswahl.length < ziel && proKapitel[i].length) auswahl.push(proKapitel[i].shift());
      });
    }
    starte('mix', mischen(auswahl));
  }

  function merke(id, status) {
    lauf.ergebnis[id] = status;
    speicher.ergebnisse[id] = status;
    sichern();
    aktualisiereKopf();
  }

  /* ------------------------------------------------------------------
     Kopfzeile: Fortschrittsbalken mit Punktzahl, immer sichtbar.
     Während eines Durchgangs zeigt sie diesen Durchgang, sonst den
     gespeicherten Gesamtstand auf diesem Gerät.
     ------------------------------------------------------------------ */
  function punkteText(n) { return n === 1 ? '1 Punkt' : n + ' Punkte'; }
  function aktualisiereKopf(aktuell) {
    var eintraege = lauf ? lauf.liste : ALLE;
    var quelle = lauf ? lauf.ergebnis : speicher.ergebnisse;
    if (typeof aktuell !== 'number') aktuell = -1;
    var punkte = 0, geschlossen = 0, bearbeitet = 0;
    standLeiste.textContent = '';
    eintraege.forEach(function (e, i) {
      var st = quelle[e.a.id];
      if (st) bearbeitet++;
      if (st === 'r' || st === 'f' || st === 'u') geschlossen++;
      if (st === 'r') punkte++;
      standLeiste.appendChild(el('span', { class: 'seg' + (st ? ' seg-' + st : '') + (i === aktuell && !st ? ' seg-aktuell' : '') }));
    });
    standPunkte.textContent = '';
    if (geschlossen) {
      standPunkte.appendChild(el('strong', { text: punkteText(punkte) }));
      standPunkte.appendChild(document.createTextNode(' von ' + geschlossen));
    } else {
      standPunkte.appendChild(el('strong', { text: '0 Punkte' }));

    }
    standFortschritt.textContent = bearbeitet + ' von ' + eintraege.length + ' bearbeitet';
    standFortschritt.title = lauf ? 'in diesem Durchgang' : 'insgesamt auf diesem Gerät';
    standLeiste.setAttribute('aria-label', (lauf ? 'Fortschritt in diesem Durchgang: ' : 'Gesamtfortschritt: ') +
      bearbeitet + ' von ' + eintraege.length + ' Aufgaben bearbeitet, ' + punkteText(punkte) + ' von ' + geschlossen + ' möglichen.');
    misseKopf();
  }
  function misseKopf() {
    document.documentElement.style.setProperty('--kopf-hoehe', kopf.offsetHeight + 'px');
  }

  function fortschritt() {
    var e = lauf.liste[lauf.pos];
    var kap = KAP[e.kap];
    var links, nr, gesamt;
    if (lauf.art === 'mix') {
      links = 'Gemischter Durchgang · Kapitel ' + kap.nr + ': ' + kap.titel;
      nr = lauf.pos + 1;
      gesamt = lauf.liste.length;
    } else {
      var gleiche = lauf.liste.filter(function (x) { return x.kap === e.kap; });
      nr = gleiche.indexOf(e) + 1;
      gesamt = gleiche.length;
      links = 'Kapitel ' + kap.nr + ' · ' + kap.titel;
    }
    return { links: links, seiten: seitenText(kap), rechts: 'Aufgabe ' + nr + ' von ' + gesamt, anteil: nr / gesamt };
  }

  function zeigeLaufAufgabe() {
    var e = lauf.liste[lauf.pos];
    zeigeAufgabe(e, {
      fortschritt: fortschritt(),
      wiederholung: false,
      weiterText: 'Weiter',
      beiWeiter: weiter,
      merke: function (status) { merke(e.a.id, status); }
    });
  }

  function weiter() {
    var akt = lauf.liste[lauf.pos];
    lauf.pos++;
    var naechst = lauf.liste[lauf.pos];
    if (lauf.art !== 'mix' && (!naechst || naechst.kap !== akt.kap)) { zeigeKapitelende(akt.kap); return; }
    if (!naechst) { zeigeGesamtende(); return; }
    zeigeLaufAufgabe();
  }

  /* ------------------------------------------------------------------
     Aufgabenbildschirm
     ------------------------------------------------------------------ */
  function istDatei(name) { return /[\/.]/.test(String(name)); }

  function bildKnoten(name, alt) {
    var flaeche = el('div', { class: 'abbildung-flaeche', 'data-bild': String(name) });
    if (istDatei(name)) {
      flaeche.appendChild(el('img', { src: name, alt: alt || '' }));
    } else if (SCHEMA[name]) {
      flaeche.innerHTML = SCHEMA[name].svg;
      var s = flaeche.querySelector('svg');
      if (s) s.setAttribute('aria-label', alt || SCHEMA[name].alt || '');
    }
    return { figur: el('figure', { class: 'abbildung' }, flaeche), flaeche: flaeche };
  }

  function tabelleKnoten(t) {
    var kopf = el('tr', null, t.kopf.map(function (k) { return el('th', { scope: 'col', text: k }); }));
    var koerper = el('tbody', null, t.zeilen.map(function (z) {
      return el('tr', null, z.map(function (c) { return el('td', { text: c }); }));
    }));
    return el('div', { class: 'tabelle-huelle' },
      el('table', { class: 'ergebnis' }, el('thead', null, kopf), koerper));
  }

  function zeigeAufgabe(eintrag, kontext) {
    var a = eintrag.a, kap = KAP[eintrag.kap];
    neuerBildschirm();
    var karte = el('section', { class: 'karte', 'aria-labelledby': 'auftrag' });

    if (kontext.fortschritt) {
      var f = kontext.fortschritt;
      karte.appendChild(el('div', { class: 'lauf-kopf' },
        el('div', { class: 'lauf-zeile' },
          el('span', null, f.links, f.seiten ? [' · ', el('span', { class: 'lauf-seiten', text: f.seiten })] : null),
          el('span', { text: f.rechts })),
        el('div', { class: 'leiste', 'aria-hidden': 'true' },
          el('div', { class: 'leiste-fuellung', style: 'width:' + Math.round(f.anteil * 100) + '%' }))));
    }
    if (kontext.wiederholung) {
      karte.appendChild(el('p', { class: 'wiederholung-hinweis', text: 'Wiederholung: Diese Bearbeitung zählt nicht für den Ergebniscode.' }));
    }

    var auftragText = a.auftrag || (a.typ === 'richtigfalsch' ? 'Beurteile, ob die Aussage richtig oder falsch ist.' : '');
    var titel = el('h2', { class: 'auftrag', id: 'auftrag', tabindex: '-1', text: auftragText });
    karte.appendChild(titel);

    if (a.tabelle) karte.appendChild(tabelleKnoten(a.tabelle));

    var bau;
    if (a.typ === 'offen') {
      bauOffen(a, kap, karte, kontext);
      inhalt.appendChild(karte);
      if (lauf && !kontext.wiederholung) aktualisiereKopf(lauf.pos);
      fokus(titel);
      return;
    }
    var bauer = TYPEN[a.typ];
    if (!bauer) {
      karte.appendChild(el('p', { text: 'Dieser Aufgabentyp ist unbekannt: ' + a.typ }));
      karte.appendChild(el('div', { class: 'aktionen' }, knopf(kontext.weiterText, 'knopf', kontext.beiWeiter)));
      inhalt.appendChild(karte);
      return;
    }
    bau = bauer(a);
    if (bau.hinweis) karte.appendChild(bau.hinweis);
    karte.appendChild(bau.knoten);

    var meldung = el('p', { class: 'meldung', 'aria-live': 'polite' });
    var rueckFeld = el('div');
    var versuche = 0;

    var pruefKnopf = knopf('Prüfen', 'knopf', pruefe);
    var nochmalKnopf = knopf('Noch einmal versuchen', 'knopf knopf-zweit', nochmal, { hidden: true });
    var weiterKnopf = knopf(kontext.weiterText, 'knopf', kontext.beiWeiter, { hidden: true });
    var skipKnopf = knopf(kontext.wiederholung ? kontext.weiterText : 'Überspringen', 'knopf-leise', ueberspringen);

    karte.appendChild(meldung);
    karte.appendChild(rueckFeld);
    karte.appendChild(el('div', { class: 'aktionen' }, pruefKnopf, nochmalKnopf, weiterKnopf, skipKnopf));
    inhalt.appendChild(karte);
    if (bau.nachEinfuegen) bau.nachEinfuegen();
    if (lauf && !kontext.wiederholung) aktualisiereKopf(lauf.pos);
    fokus(titel);

    function pruefe() {
      var erg = bau.pruefen();
      if (erg.fehlt) { meldung.textContent = erg.fehlt; return; }
      meldung.textContent = '';
      versuche++;
      if (versuche === 1 && !kontext.wiederholung) kontext.merke(erg.ok ? 'r' : 'f');
      bau.sperren();
      rueckFeld.textContent = '';
      var box = rueckmeldung(a, kap, erg, versuche === 1 && !kontext.wiederholung);
      rueckFeld.appendChild(box);
      pruefKnopf.hidden = true;
      skipKnopf.hidden = true;
      nochmalKnopf.hidden = erg.ok || versuche > 1;
      weiterKnopf.hidden = false;
      fokus(box);
      zeigeImBild(box);
    }
    function nochmal() {
      bau.wiederholen();
      rueckFeld.textContent = '';
      rueckFeld.appendChild(el('p', { class: 'wiederholung-hinweis', text: 'Zweiter Versuch: Er zählt für den Ergebniscode nicht mit.' }));
      nochmalKnopf.hidden = true;
      pruefKnopf.hidden = false;
      fokus(titel);
    }
    function ueberspringen() {
      if (!kontext.wiederholung && versuche === 0) kontext.merke('u');
      kontext.beiWeiter();
    }
  }

  function rueckmeldung(a, kap, erg, wiederholbar) {
    var box = el('div', { class: 'rueckmeldung ' + (erg.ok ? 'ok' : 'nein'), tabindex: '-1', role: 'status' });
    var rm = a.rueckmeldung || {};
    if (erg.ok) {
      box.appendChild(el('p', null, el('strong', { text: 'Richtig.' }), ' ' + (rm.richtig || '')));
      (erg.zusatz || []).forEach(function (z) { box.appendChild(z); });
    } else {
      box.appendChild(el('p', null, el('strong', { text: 'Nicht richtig.' }), ' ' + (rm.falsch || '')));
      (erg.details || []).forEach(function (d) { box.appendChild(d); });
      (erg.zusatz || []).forEach(function (z) { box.appendChild(z); });
      var fs = fundstelle(a, kap);
      if (fs) box.appendChild(el('p', { class: 'fundstelle', text: 'Fundstelle: ' + fs }));
      if (wiederholbar) {
        box.appendChild(el('p', { class: 'klein', text: 'Du kannst die Aufgabe einmal wiederholen. Der zweite Versuch zählt für den Ergebniscode nicht mehr mit.' }));
      }
    }
    return box;
  }

  /* ---------- Offene Aufgabe ---------- */
  function bauOffen(a, kap, karte, kontext) {
    karte.appendChild(el('p', { class: 'hinweis', text: 'Schreibe deine Antwort in das Feld. Danach kannst du sie mit der Musterlösung vergleichen.' }));
    var feld = el('textarea', { class: 'offen-feld', id: 'offen-feld', rows: '7', spellcheck: 'true' });
    karte.appendChild(el('label', { class: 'offen-label', for: 'offen-feld', text: 'Deine Antwort' }));
    karte.appendChild(feld);
    var loesung = el('div', { class: 'musterloesung', hidden: true, tabindex: '-1' },
      el('h3', { text: 'Musterlösung' }),
      el('p', { text: a.musterloesung || '' }),
      el('p', { class: 'leise klein', text: 'Vergleiche: Welche Punkte hast du genannt, welche fehlen dir noch?' }));
    var status = 'g';
    function bewerte() {
      if (feld.value.trim().length >= MIN_ZEICHEN_OFFEN) status = 'b';
    }
    var zeigen = knopf('Musterlösung anzeigen', 'knopf knopf-zweit', function () {
      bewerte();
      loesung.hidden = !loesung.hidden;
      zeigen.textContent = loesung.hidden ? 'Musterlösung anzeigen' : 'Musterlösung ausblenden';
      zeigen.setAttribute('aria-expanded', loesung.hidden ? 'false' : 'true');
      if (!loesung.hidden) { fokus(loesung); zeigeImBild(loesung); }
    }, { 'aria-expanded': 'false' });
    var weiterKnopf = knopf(kontext.weiterText, 'knopf', function () {
      bewerte();
      if (!kontext.wiederholung) kontext.merke(status);
      kontext.beiWeiter();
    });
    karte.appendChild(loesung);
    karte.appendChild(el('div', { class: 'aktionen' }, zeigen, weiterKnopf));
  }

  /* ---------- Einfach- und Mehrfachauswahl ---------- */
  function bauAuswahl(a, mehrfach) {
    var gewaehlt = {};
    var opts = mischen(a.optionen.map(function (o, i) { return { o: o, i: i }; }));
    var liste = el('div', { class: 'optionen ' + (mehrfach ? 'optionen-mehrfach' : 'optionen-einzel'), role: 'group', 'aria-labelledby': 'auftrag' });
    var teile = opts.map(function (x) {
      var marke = el('span', { class: 'option-marke', 'aria-hidden': 'true' });
      var status = el('span', { class: 'option-status' });
      var b = el('button', { type: 'button', class: 'option', 'aria-pressed': 'false' },
        marke, el('span', { class: 'option-text' }, x.o.text, status));
      b.addEventListener('click', function () {
        if (mehrfach) gewaehlt[x.i] = !gewaehlt[x.i];
        else { gewaehlt = {}; gewaehlt[x.i] = true; }
        zeichne();
      });
      liste.appendChild(b);
      return { b: b, x: x, marke: marke, status: status };
    });
    function zeichne() {
      teile.forEach(function (t) {
        var an = !!gewaehlt[t.x.i];
        t.b.setAttribute('aria-pressed', an ? 'true' : 'false');
        t.marke.textContent = an && mehrfach ? '✓' : '';
      });
    }
    function gewaehlte() { return Object.keys(gewaehlt).filter(function (k) { return gewaehlt[k]; }).map(Number); }
    function markiere(t, klasse, text) {
      t.b.classList.add(klasse);
      t.status.textContent = text;
    }
    return {
      hinweis: mehrfach ? el('p', { class: 'hinweis-stark', text: 'Mehrere Antworten sind richtig.' }) : null,
      knoten: liste,
      pruefen: function () {
        var g = gewaehlte();
        if (!g.length) return { fehlt: mehrfach ? 'Kreuze mindestens eine Antwort an.' : 'Wähle zuerst eine Antwort.' };
        var details = [];
        if (!mehrfach) {
          var o = a.optionen[g[0]];
          teile.forEach(function (t) {
            if (t.x.o.korrekt) markiere(t, 'ist-richtig', 'Richtige Antwort');
            else if (gewaehlt[t.x.i]) markiere(t, 'ist-falsch', 'Deine Wahl');
          });
          if (!o.korrekt && o.warum) details.push(el('p', null, 'Zu deiner Wahl: ' + o.warum));
          return { ok: !!o.korrekt, details: details };
        }
        var fehlten = [], zuViel = [];
        teile.forEach(function (t) {
          var an = !!gewaehlt[t.x.i];
          if (t.x.o.korrekt && an) markiere(t, 'ist-richtig', 'Richtig angekreuzt');
          else if (t.x.o.korrekt && !an) { markiere(t, 'ist-fehlend', 'Dieses Häkchen fehlte'); fehlten.push(t.x.o); }
          else if (!t.x.o.korrekt && an) { markiere(t, 'ist-falsch', 'Zu viel angekreuzt'); zuViel.push(t.x.o); }
        });
        if (fehlten.length) details.push(el('p', null, 'Gefehlt hat: ' + aufzaehlung(fehlten.map(function (o) { return anf(o.text); })) + '.'));
        if (zuViel.length) {
          details.push(el('p', { text: 'Zu viel angekreuzt:' }));
          details.push(el('ul', null, zuViel.map(function (o) {
            return el('li', null, anf(o.text) + (o.warum ? ' – ' + o.warum : ''));
          })));
        }
        return { ok: !fehlten.length && !zuViel.length, details: details };
      },
      sperren: function () { teile.forEach(function (t) { t.b.disabled = true; }); },
      wiederholen: function () {
        gewaehlt = {};
        teile.forEach(function (t) {
          t.b.disabled = false;
          t.b.classList.remove('ist-richtig', 'ist-falsch', 'ist-fehlend');
          t.status.textContent = '';
        });
        zeichne();
      }
    };
  }

  /* ---------- Richtig oder falsch ---------- */
  function bauRichtigFalsch(a) {
    var wahl = null;
    var aussage = el('blockquote', { class: 'aussage' }, a.aussage);
    var knoepfe = [['Richtig', true], ['Falsch', false]].map(function (p) {
      var status = el('span', { class: 'option-status' });
      var b = el('button', { type: 'button', class: 'option', 'aria-pressed': 'false' }, el('span', null, p[0], status));
      b.addEventListener('click', function () {
        wahl = p[1];
        knoepfe.forEach(function (k) { k.b.setAttribute('aria-pressed', k.wert === wahl ? 'true' : 'false'); });
      });
      return { b: b, wert: p[1], status: status };
    });
    var gruppe = el('div', { class: 'rf-knoepfe', role: 'group', 'aria-label': 'Die Aussage ist' }, knoepfe.map(function (k) { return k.b; }));
    return {
      knoten: el('div', null, aussage, gruppe),
      pruefen: function () {
        if (wahl === null) return { fehlt: 'Wähle „Richtig“ oder „Falsch“.' };
        var ok = wahl === !!a.korrekt;
        knoepfe.forEach(function (k) {
          if (k.wert === !!a.korrekt) { k.b.classList.add('ist-richtig'); k.status.textContent = ' – zutreffend'; }
          else if (k.wert === wahl) k.b.classList.add('ist-falsch');
        });
        return { ok: ok };
      },
      sperren: function () { knoepfe.forEach(function (k) { k.b.disabled = true; }); },
      wiederholen: function () {
        wahl = null;
        knoepfe.forEach(function (k) {
          k.b.disabled = false;
          k.b.setAttribute('aria-pressed', 'false');
          k.b.classList.remove('ist-richtig', 'ist-falsch');
          k.status.textContent = '';
        });
      }
    };
  }

  /* ---------- Lückentext ---------- */
  function bauLuecken(a) {
    var teile = String(a.text).split(/\[\[(.+?)\]\]/);
    var absatz = el('p', { class: 'lueckentext' });
    var luecken = [];
    teile.forEach(function (teil, i) {
      if (i % 2 === 0) { if (teil) absatz.appendChild(document.createTextNode(teil)); return; }
      var nr = luecken.length + 1, feld;
      if (teil.charAt(0) === '=') {
        var erlaubt = teil.slice(1).split('|');
        feld = el('input', {
          type: 'text', class: 'luecke-eingabe', 'aria-label': 'Lücke ' + nr,
          autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false',
          inputmode: erlaubt.every(istZahlwort) ? 'decimal' : null
        });
        luecken.push({ feld: feld, eingabe: true, erlaubt: erlaubt, loesung: erlaubt[0] });
      } else {
        var optionen = teil.split('|');
        feld = el('select', { class: 'luecke-auswahl', 'aria-label': 'Lücke ' + nr },
          el('option', { value: '', text: '–' }),
          mischen(optionen).map(function (o) { return el('option', { value: o, text: o }); }));
        luecken.push({ feld: feld, eingabe: false, erlaubt: [optionen[0]], loesung: optionen[0] });
      }
      absatz.appendChild(feld);
    });
    function richtig(l) { return l.eingabe ? passt(l.feld.value, l.erlaubt) : l.feld.value === l.loesung; }
    return {
      knoten: absatz,
      pruefen: function () {
        if (luecken.some(function (l) { return !l.feld.value.trim(); })) return { fehlt: 'Fülle zuerst alle Lücken aus.' };
        var falsche = [];
        luecken.forEach(function (l, i) {
          var ok = richtig(l);
          l.feld.classList.add(ok ? 'ist-richtig' : 'ist-falsch');
          if (!ok) falsche.push(i + 1);
        });
        var details = [];
        if (falsche.length) {
          details.push(el('p', null, (falsche.length === 1 ? 'Nicht richtig war Lücke ' : 'Nicht richtig waren die Lücken ') + aufzaehlung(falsche.map(String)) + '.'));
        }
        return { ok: !falsche.length, details: details };
      },
      sperren: function () { luecken.forEach(function (l) { l.feld.disabled = true; }); },
      wiederholen: function () {
        luecken.forEach(function (l) {
          l.feld.disabled = false;
          if (l.feld.classList.contains('ist-falsch')) l.feld.value = '';
          l.feld.classList.remove('ist-richtig', 'ist-falsch');
        });
      }
    };
  }

  /* ---------- Fehler korrigieren ---------- */
  function bauKorrigieren(a) {
    var woerter = [], fehler = null;
    String(a.text).split(/\[\[(.+?)\]\]/).forEach(function (teil, i) {
      if (i % 2 === 1) {
        var p = teil.split('>');
        fehler = { falsch: p[0], richtig: p[1], index: woerter.length };
        woerter.push(p[0]);
      } else {
        teil.split(/\s+/).forEach(function (w) { if (w) woerter.push(w); });
      }
    });
    var ersatz = (a.ersatz || []).slice();
    if (fehler && ersatz.indexOf(fehler.richtig) < 0) ersatz.push(fehler.richtig);
    var gewaehlt = -1;
    var knoepfe = woerter.map(function (w, i) {
      var b = el('button', { type: 'button', class: 'wort', 'aria-pressed': 'false', text: w });
      b.addEventListener('click', function () {
        gewaehlt = gewaehlt === i ? -1 : i;
        knoepfe.forEach(function (k, j) { k.setAttribute('aria-pressed', j === gewaehlt ? 'true' : 'false'); });
        auswahl.disabled = gewaehlt < 0;
        if (gewaehlt >= 0) sagAn(anf(w) + ' markiert. Wähle jetzt die Ersetzung.');
      });
      return b;
    });
    var auswahl = el('select', { id: 'ersatz', class: 'luecke-auswahl', disabled: true },
      el('option', { value: '', text: '–' }),
      mischen(ersatz).map(function (o) { return el('option', { value: o, text: o }); }));
    var knoten = el('div', null,
      el('div', { class: 'wortkette', role: 'group', 'aria-label': 'Satz, Wort für Wort' }, knoepfe),
      el('div', { class: 'ersatz-zeile' }, el('label', { for: 'ersatz', text: 'Ersetze das markierte Wort durch:' }), auswahl));
    return {
      hinweis: el('p', { class: 'hinweis', text: 'Tippe das falsche Wort an und wähle darunter die richtige Ersetzung.' }),
      knoten: knoten,
      pruefen: function () {
        if (gewaehlt < 0) return { fehlt: 'Tippe zuerst das falsche Wort an.' };
        if (!auswahl.value) return { fehlt: 'Wähle aus, wodurch das Wort ersetzt werden soll.' };
        var wortOk = gewaehlt === fehler.index;
        var ok = wortOk && auswahl.value === fehler.richtig;
        var details = [];
        if (ok) {
          knoepfe[fehler.index].textContent = fehler.richtig;
          knoepfe[fehler.index].classList.add('ist-richtig');
          knoepfe[fehler.index].setAttribute('aria-pressed', 'false');
        } else {
          knoepfe[fehler.index].classList.add('ist-fehlend');
          if (!wortOk) {
            knoepfe[gewaehlt].classList.add('ist-falsch');
            details.push(el('p', null, 'Falsch war das Wort ' + anf(fehler.falsch) + ', nicht ' + anf(woerter[gewaehlt]) + '.'));
          } else {
            details.push(el('p', null, 'Das falsche Wort hast du gefunden; richtig ist aber ' + anf(fehler.richtig) + ', nicht ' + anf(auswahl.value) + '.'));
          }
        }
        return { ok: ok, details: details };
      },
      sperren: function () { knoepfe.forEach(function (k) { k.disabled = true; }); auswahl.disabled = true; },
      wiederholen: function () {
        gewaehlt = -1;
        auswahl.value = '';
        auswahl.disabled = true;
        knoepfe.forEach(function (k, j) {
          k.disabled = false;
          k.textContent = woerter[j];
          k.setAttribute('aria-pressed', 'false');
          k.classList.remove('ist-richtig', 'ist-falsch', 'ist-fehlend');
        });
      }
    };
  }

  /* ---------- Zuordnung: ziehen oder antippen ---------- */
  function bauZuordnen(a) {
    var ziele = [], zielIndex = {};
    a.paare.forEach(function (p) {
      if (!(p.ziel in zielIndex)) { zielIndex[p.ziel] = ziele.length; ziele.push({ text: p.ziel, anzahl: 0 }); }
      ziele[zielIndex[p.ziel]].anzahl++;
    });
    var kategorien = ziele.some(function (z) { return z.anzahl > 1; });
    var chips = a.paare.map(function (p) { return { text: p.begriff, ziel: zielIndex[p.ziel] }; })
      .concat((a.ablenker || []).map(function (x) { return { text: x.begriff, ziel: null, warum: x.warum }; }));
    chips = mischen(chips);
    var ablenkerZahl = (a.ablenker || []).length;
    var gewaehlt = null, gesperrt = false, unterdruecke = false;

    var pool = el('div', { class: 'chips', role: 'group', 'aria-label': 'Noch nicht zugeordnete Begriffe' });
    var ablage = el('div', { class: 'ablage' }, el('p', { class: 'ablage-titel', 'aria-hidden': 'true', text: 'Begriffe' }), pool);
    var zielListe = el('div', { class: 'ziele' + (kategorien ? ' ziele-kategorien' : '') });

    ziele.forEach(function (z, i) {
      z.chips = el('div', { class: 'chips' });
      z.knopf = el('button', { type: 'button', class: 'ziel-knopf' }, z.text);
      z.knoten = el('div', { class: 'ziel', 'data-ziel': String(i) }, z.knopf, z.chips);
      z.knopf.addEventListener('click', function () { legeAb(i); });
      zielListe.appendChild(z.knoten);
    });

    chips.forEach(function (c) {
      c.ort = -1;
      c.fest = false;
      c.b = el('button', { type: 'button', class: 'chip', 'aria-pressed': 'false', text: c.text });
      c.b.addEventListener('click', function () {
        if (unterdruecke) { unterdruecke = false; return; }
        if (gesperrt || c.fest) return;
        if (c.ort >= 0) {
          c.ort = -1;
          gewaehlt = c;
          zeichne();
          c.b.focus();
          sagAn(c.text + ' zurückgenommen und ausgewählt. Wähle ein Feld.');
          return;
        }
        gewaehlt = gewaehlt === c ? null : c;
        zeichne();
        if (gewaehlt) sagAn(c.text + ' ausgewählt. Wähle jetzt ein Feld.');
      });
      ziehbar(c);
    });

    function legeAb(i) {
      if (gesperrt) return;
      if (!gewaehlt) { sagAn('Wähle zuerst einen Begriff.'); return; }
      var z = ziele[i];
      if (!kategorien) {
        var belegt = chips.filter(function (c) { return c.ort === i; });
        if (belegt.some(function (c) { return c.fest; })) { sagAn('Dieses Feld ist schon richtig belegt.'); return; }
        belegt.forEach(function (c) { c.ort = -1; });
      }
      var c = gewaehlt;
      c.ort = i;
      gewaehlt = null;
      zeichne();
      sagAn(c.text + ' abgelegt bei ' + z.text + '.');
    }

    function zeichne() {
      chips.forEach(function (c) {
        var ziel = c.ort >= 0 ? ziele[c.ort].chips : pool;
        if (c.b.parentNode !== ziel) ziel.appendChild(c.b);
        c.b.setAttribute('aria-pressed', gewaehlt === c ? 'true' : 'false');
        c.b.setAttribute('aria-label', c.ort >= 0 ? c.text + ', abgelegt bei ' + ziele[c.ort].text + '. Antippen nimmt den Begriff zurück.' : c.text);
      });
      ziele.forEach(function (z, i) {
        var drin = chips.filter(function (c) { return c.ort === i; }).map(function (c) { return c.text; });
        z.knopf.setAttribute('aria-label', 'Feld: ' + z.text + (drin.length ? '. Enthält: ' + drin.join(', ') : '. Leer'));
      });
    }

    function ziehbar(c) {
      var start = null, geist = null, markiert = null;
      function zielUnter(x, y) {
        var t = document.elementFromPoint(x, y);
        if (!t) return null;
        var z = t.closest('.ziel');
        if (z) return { art: 'ziel', i: Number(z.getAttribute('data-ziel')), knoten: z };
        if (t.closest('.ablage')) return { art: 'ablage' };
        return null;
      }
      function aufraeumen() {
        if (geist && geist.parentNode) geist.parentNode.removeChild(geist);
        if (markiert) markiert.classList.remove('zielt-hierher');
        c.b.classList.remove('wird-gezogen');
        geist = null; markiert = null; start = null;
      }
      c.b.addEventListener('pointerdown', function (ev) {
        if (gesperrt || c.fest || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
        start = { x: ev.clientX, y: ev.clientY, id: ev.pointerId };
        try { c.b.setPointerCapture(ev.pointerId); } catch (e) { /* egal */ }
      });
      c.b.addEventListener('pointermove', function (ev) {
        if (!start || ev.pointerId !== start.id) return;
        if (!geist) {
          if (Math.abs(ev.clientX - start.x) + Math.abs(ev.clientY - start.y) < 8) return;
          geist = el('div', { class: 'chip-geist' + (ev.pointerType === 'mouse' ? '' : ' per-finger'), 'aria-hidden': 'true', text: c.text });
          document.body.appendChild(geist);
          c.b.classList.add('wird-gezogen');
        }
        ev.preventDefault();
        geist.style.left = ev.clientX + 'px';
        geist.style.top = ev.clientY + 'px';
        var u = zielUnter(ev.clientX, ev.clientY);
        var neu = u && u.art === 'ziel' ? u.knoten : null;
        if (neu !== markiert) {
          if (markiert) markiert.classList.remove('zielt-hierher');
          if (neu) neu.classList.add('zielt-hierher');
          markiert = neu;
        }
        randScrollen(ev.clientY);
      });
      c.b.addEventListener('pointerup', function (ev) {
        if (!start) return;
        if (geist) {
          var u = zielUnter(ev.clientX, ev.clientY);
          unterdruecke = true;
          window.setTimeout(function () { unterdruecke = false; }, 0);
          if (u && u.art === 'ziel') { gewaehlt = c; legeAb(u.i); }
          else if (u && u.art === 'ablage' && c.ort >= 0) { c.ort = -1; gewaehlt = null; zeichne(); }
        }
        aufraeumen();
      });
      c.b.addEventListener('pointercancel', aufraeumen);
    }

    zeichne();
    var hinweisText = 'Tippe einen Begriff an und dann das passende Feld, oder ziehe ihn hinein. Einen abgelegten Begriff nimmst du durch Antippen zurück.';
    if (ablenkerZahl === 1) hinweisText += ' Ein Begriff bleibt übrig.';
    else if (ablenkerZahl > 1) hinweisText += ' ' + ablenkerZahl + ' Begriffe bleiben übrig.';
    var links = el('div', { class: 'spalte-fest' });
    if (a.bild) links.appendChild(bildKnoten(a.bild, a.alt).figur);
    links.appendChild(ablage);
    var knoten = el('div', { class: 'zweispaltig' }, links, zielListe);

    return {
      hinweis: el('p', { class: 'hinweis', text: hinweisText }),
      knoten: knoten,
      pruefen: function () {
        var offen = chips.filter(function (c) { return c.ort < 0; }).length;
        if (offen > ablenkerZahl) return { fehlt: 'Ordne zuerst alle Begriffe zu.' };
        var richtigZahl = 0, gesamt = a.paare.length, details = [], zusatz = [];
        chips.forEach(function (c) {
          if (c.ziel === null) {
            if (c.ort >= 0) { details.push(el('p', null, anf(c.text) + ' gehört in kein Feld. ' + (c.warum || ''))); c.ort = -1; }
            else if (c.warum) zusatz.push(el('p', null, anf(c.text) + ' bleibt übrig: ' + c.warum));
            return;
          }
          if (c.ort === c.ziel) { c.fest = true; c.b.classList.add('ist-richtig'); richtigZahl++; }
          else c.ort = -1;
        });
        var ok = richtigZahl === gesamt && !details.length;
        if (!ok) details.unshift(el('p', null, richtigZahl + ' von ' + gesamt + ' Zuordnungen stimmen. Die falsch zugeordneten Begriffe sind zurückgesprungen.'));
        gewaehlt = null;
        zeichne();
        return { ok: ok, details: details, zusatz: zusatz };
      },
      sperren: function () {
        gesperrt = true;
        chips.forEach(function (c) { c.b.disabled = true; });
        ziele.forEach(function (z) { z.knopf.disabled = true; });
      },
      wiederholen: function () {
        gesperrt = false;
        chips.forEach(function (c) { c.b.disabled = c.fest; });
        ziele.forEach(function (z) { z.knopf.disabled = false; });
        zeichne();
      }
    };
  }

  /* ---------- Reihenfolge ---------- */
  function bauReihenfolge(a) {
    var n = a.elemente.length;
    var ordnung = a.elemente.map(function (t, i) { return i; });
    var versuch = 0;
    do { ordnung = mischen(ordnung); versuch++; }
    while (n > 1 && versuch < 20 && ordnung.every(function (x, i) { return x === i; }));
    var gesperrt = false;
    var liste = el('ol', { class: 'reihe', 'aria-labelledby': 'auftrag' });
    var teile = a.elemente.map(function (text, i) {
      var pos = el('span', { class: 'reihe-pos', 'aria-hidden': 'true' });
      var griff = el('span', { class: 'griff', 'aria-hidden': 'true', text: '⋮⋮' });
      var hoch = el('button', { type: 'button', class: 'pfeil', 'aria-label': anf(text) + ' nach oben', text: '↑' });
      var runter = el('button', { type: 'button', class: 'pfeil', 'aria-label': anf(text) + ' nach unten', text: '↓' });
      var li = el('li', { class: 'reihe-element' }, griff, pos, el('span', { class: 'reihe-text', text: text }), el('span', { class: 'reihe-knoepfe' }, hoch, runter));
      var t = { i: i, text: text, li: li, pos: pos, hoch: hoch, runter: runter, griff: griff };
      hoch.addEventListener('click', function () { verschiebe(t, -1, hoch); });
      runter.addEventListener('click', function () { verschiebe(t, 1, runter); });
      ziehbar(t);
      return t;
    });
    function verschiebe(t, richtung, ausloeser) {
      if (gesperrt) return;
      var p = ordnung.indexOf(t.i), q = p + richtung;
      if (q < 0 || q >= n) return;
      ordnung[p] = ordnung[q]; ordnung[q] = t.i;
      zeichne();
      var ziel = ausloeser.disabled ? (ausloeser === t.hoch ? t.runter : t.hoch) : ausloeser;
      ziel.focus();
      sagAn(t.text + ' steht jetzt an Stelle ' + (q + 1) + '.');
    }
    function zeichne() {
      ordnung.forEach(function (i, p) {
        var t = teile[i];
        liste.appendChild(t.li);
        t.pos.textContent = (p + 1) + '.';
        t.hoch.disabled = gesperrt || p === 0;
        t.runter.disabled = gesperrt || p === n - 1;
      });
    }
    function ziehbar(t) {
      var aktiv = null;
      /* Die Listener hängen am Fenster, weil das gezogene Element beim Umsortieren
         im DOM verschoben wird und dabei eine Zeigererfassung verlieren würde. */
      function bewegen(ev) {
        if (aktiv !== ev.pointerId) return;
        ev.preventDefault();
        var p = ordnung.indexOf(t.i), y = ev.clientY, neu = p;
        ordnung.forEach(function (i, q) {
          if (q === p) return;
          var r = teile[i].li.getBoundingClientRect(), mitte = r.top + r.height / 2;
          if (q < p && y < mitte) neu = Math.min(neu, q);
          if (q > p && y > mitte) neu = Math.max(neu, q);
        });
        if (neu !== p) {
          ordnung.splice(p, 1);
          ordnung.splice(neu, 0, t.i);
          zeichne();
        }
        randScrollen(ev.clientY);
      }
      function ende(ev) {
        if (aktiv === null || (ev && ev.pointerId !== aktiv)) return;
        aktiv = null;
        window.removeEventListener('pointermove', bewegen);
        window.removeEventListener('pointerup', ende);
        window.removeEventListener('pointercancel', ende);
        t.li.classList.remove('wird-gezogen');
        sagAn(t.text + ' steht jetzt an Stelle ' + (ordnung.indexOf(t.i) + 1) + '.');
      }
      t.griff.addEventListener('pointerdown', function (ev) {
        if (gesperrt || aktiv !== null || (ev.pointerType === 'mouse' && ev.button !== 0)) return;
        aktiv = ev.pointerId;
        t.li.classList.add('wird-gezogen');
        ev.preventDefault();
        window.addEventListener('pointermove', bewegen, { passive: false });
        window.addEventListener('pointerup', ende);
        window.addEventListener('pointercancel', ende);
      });
    }
    zeichne();
    var knoten = el('div', null,
      a.anfang ? el('p', { class: 'leise klein', text: 'Oben: ' + a.anfang }) : null,
      liste,
      a.ende ? el('p', { class: 'leise klein', style: 'margin-top:.5rem', text: 'Unten: ' + a.ende }) : null);
    return {
      hinweis: el('p', { class: 'hinweis', text: 'Verschiebe die Einträge mit den Pfeilen oder ziehe sie am Griff links.' }),
      knoten: knoten,
      pruefen: function () {
        var stimmt = 0;
        ordnung.forEach(function (i, p) {
          var ok = i === p;
          teile[i].li.classList.add(ok ? 'ist-richtig' : 'ist-falsch');
          if (ok) stimmt++;
        });
        var ok = stimmt === n, details = [];
        if (!ok) details.push(el('p', null, 'An der richtigen Stelle: ' + stimmt + ' von ' + n + '.'));
        return { ok: ok, details: details };
      },
      sperren: function () { gesperrt = true; zeichne(); },
      wiederholen: function () {
        gesperrt = false;
        teile.forEach(function (t) { t.li.classList.remove('ist-richtig', 'ist-falsch'); });
        zeichne();
      }
    };
  }

  /* ---------- Beschriften ---------- */
  function bauBeschriften(a) {
    var bild = bildKnoten(a.bild, a.alt);
    var punkte = a.punkte.map(function (p, i) { return { p: p, nr: i + 1 }; });
    var namen = mischen(a.punkte.map(function (p) { return p.name; }).concat(a.weitere || []));
    var linien = '<svg class="leitlinien" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">';
    punkte.forEach(function (x) {
      var mx = x.p.mx !== undefined ? x.p.mx : x.p.x, my = x.p.my !== undefined ? x.p.my : x.p.y;
      linien += '<line x1="' + mx + '" y1="' + my + '" x2="' + x.p.x + '" y2="' + x.p.y +
        '" stroke="#1A1A1A" stroke-width="1.6" vector-effect="non-scaling-stroke"/>';
    });
    linien += '</svg>';
    bild.flaeche.insertAdjacentHTML('beforeend', linien);
    var liste = el('ol', { class: 'beschriftungen' });
    punkte.forEach(function (x) {
      var mx = x.p.mx !== undefined ? x.p.mx : x.p.x, my = x.p.my !== undefined ? x.p.my : x.p.y;
      bild.flaeche.appendChild(el('span', { class: 'zielpunkt', 'aria-hidden': 'true', style: 'left:' + x.p.x + '%;top:' + x.p.y + '%' }));
      x.marker = el('button', { type: 'button', class: 'marker', style: 'left:' + mx + '%;top:' + my + '%', 'aria-label': 'Punkt ' + x.nr + ': zur Auswahl springen', text: String(x.nr) });
      x.feld = el('select', { id: 'punkt-' + x.nr, class: 'luecke-auswahl' },
        el('option', { value: '', text: '– wählen –' }),
        namen.map(function (nm) { return el('option', { value: nm, text: nm }); }));
      x.marker.addEventListener('click', function () { x.feld.focus(); });
      x.feld.addEventListener('change', function () { x.marker.classList.toggle('hat-wert', !!x.feld.value); });
      bild.flaeche.appendChild(x.marker);
      liste.appendChild(el('li', { class: 'beschriftung' },
        el('span', { class: 'beschriftung-nr', 'aria-hidden': 'true', text: String(x.nr) }),
        el('label', { class: 'nur-sr', for: 'punkt-' + x.nr, text: 'Punkt ' + x.nr + (x.p.lage ? ', ' + x.p.lage : '') }),
        x.feld));
    });
    return {
      hinweis: el('p', { class: 'hinweis', text: 'Wähle für jeden nummerierten Punkt die passende Bezeichnung. Ein Tipp auf eine Nummer im Bild springt zur Auswahl.' }),
      knoten: el('div', { class: 'zweispaltig zweispaltig-breit' }, el('div', { class: 'spalte-fest' }, bild.figur), liste),
      pruefen: function () {
        if (punkte.some(function (x) { return !x.feld.value; })) return { fehlt: 'Wähle für jeden Punkt eine Bezeichnung.' };
        var falsche = [];
        punkte.forEach(function (x) {
          var ok = x.feld.value === x.p.name;
          x.feld.classList.add(ok ? 'ist-richtig' : 'ist-falsch');
          x.marker.classList.add(ok ? 'marker-richtig' : 'marker-falsch');
          if (!ok) falsche.push(x.nr);
        });
        var details = [];
        if (falsche.length) {
          details.push(el('p', null, (falsche.length === 1 ? 'Nicht richtig war Punkt ' : 'Nicht richtig waren die Punkte ') + aufzaehlung(falsche.map(String)) + '. Die Lösung:'));
          details.push(el('ol', null, punkte.map(function (x) { return el('li', { text: x.p.name }); })));
        }
        return { ok: !falsche.length, details: details };
      },
      sperren: function () { punkte.forEach(function (x) { x.feld.disabled = true; }); },
      wiederholen: function () {
        punkte.forEach(function (x) {
          x.feld.disabled = false;
          if (x.feld.classList.contains('ist-falsch')) { x.feld.value = ''; x.marker.classList.remove('hat-wert'); }
          x.feld.classList.remove('ist-richtig', 'ist-falsch');
          x.marker.classList.remove('marker-richtig', 'marker-falsch');
        });
      }
    };
  }

  /* ---------- Virtuelles Mikroskop ---------- */
  function zufallszahlen(saat) {
    return function () {
      saat = (saat + 0x6D2B79F5) | 0;
      var t = Math.imul(saat ^ (saat >>> 15), 1 | saat);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  var praeparatSpeicher = {};
  /* Präparate in Mikrometern. Hefezellen 5 bis 10 µm, Milchsäurebakterien etwa 1 µm lang. */
  function praeparat(name) {
    if (praeparatSpeicher[name]) return praeparatSpeicher[name];
    var r = zufallszahlen(name === 'hefe' ? 11 : 23), teile = [];
    function platziere(anzahl, radius, groesse) {
      var versuche = 0, gesetzt = 0;
      while (gesetzt < anzahl && versuche < anzahl * 60) {
        versuche++;
        var w = r() * Math.PI * 2, d = Math.sqrt(r()) * radius;
        var x = Math.cos(w) * d, y = Math.sin(w) * d, g = groesse();
        if (teile.some(function (t) { return Math.hypot(t.x - x, t.y - y) < (t.g + g) * 1.15; })) continue;
        teile.push({ x: x, y: y, g: g, w: r() * 180, k: r(), kw: r() * Math.PI * 2, f: 0.8 + r() * 0.15 });
        gesetzt++;
      }
    }
    if (name === 'hefe') {
      platziere(14, 22, function () { return 2.5 + r() * 2.5; });
      platziere(70, 220, function () { return 2.5 + r() * 2.5; });
    } else {
      platziere(70, 20, function () { return 0.55; });
      platziere(600, 220, function () { return 0.55; });
    }
    praeparatSpeicher[name] = teile;
    return teile;
  }
  function zeichneSicht(objekt, vergroesserung, zoom) {
    var feld = 18000 / vergroesserung / zoom, h = feld / 2, teile = praeparat(objekt), s = '';
    teile.forEach(function (t) {
      if (Math.abs(t.x) > h + 12 || Math.abs(t.y) > h + 12) return;
      if (objekt === 'hefe') {
        var rx = t.g, ry = t.g * t.f;
        s += '<g transform="translate(' + t.x.toFixed(2) + ' ' + t.y.toFixed(2) + ') rotate(' + t.w.toFixed(1) + ')">';
        if (t.k < 0.45) {
          var kr = rx * 0.45;
          s += '<ellipse cx="' + (Math.cos(t.kw) * (rx + kr * 0.7)).toFixed(2) + '" cy="' + (Math.sin(t.kw) * (ry + kr * 0.7)).toFixed(2) +
            '" rx="' + kr.toFixed(2) + '" ry="' + (kr * 0.85).toFixed(2) + '" fill="#E7DCB2" stroke="#8A6D1A" stroke-width="0.35"/>';
        }
        s += '<ellipse rx="' + rx.toFixed(2) + '" ry="' + ry.toFixed(2) + '" fill="#E7DCB2" stroke="#8A6D1A" stroke-width="0.4"/>';
        s += '<circle cx="' + (rx * 0.2).toFixed(2) + '" cy="' + (-ry * 0.1).toFixed(2) + '" r="' + (rx * 0.36).toFixed(2) + '" fill="#F7F3E2" stroke="#B59A55" stroke-width="0.25"/>';
        s += '</g>';
      } else {
        s += '<rect x="' + (t.x - 0.5).toFixed(2) + '" y="' + (t.y - 0.25).toFixed(2) + '" width="1" height="0.5" rx="0.25" fill="#6E6E5E" transform="rotate(' +
          t.w.toFixed(1) + ' ' + t.x.toFixed(2) + ' ' + t.y.toFixed(2) + ')"/>';
      }
    });
    var balken = [0.5, 1, 2, 5, 10, 20, 50, 100, 200].filter(function (b) { return b <= feld * 0.3; }).pop() || 0.5;
    var y = h * 0.62, dicke = feld * 0.014;
    var text = String(balken).replace('.', ',') + ' µm';
    return {
      svg: '<svg viewBox="' + (-h) + ' ' + (-h) + ' ' + feld + ' ' + feld + '" role="img" focusable="false">' +
        '<defs><filter id="optik" filterUnits="userSpaceOnUse" x="' + (-h) + '" y="' + (-h) + '" width="' + feld + '" height="' + feld + '">' +
        '<feGaussianBlur stdDeviation="0.35"/></filter></defs>' +
        '<rect x="' + (-h) + '" y="' + (-h) + '" width="' + feld + '" height="' + feld + '" fill="#F4F1E3"/>' +
        '<g filter="url(#optik)">' + s + '</g>' +
        '<rect x="' + (-balken / 2) + '" y="' + y + '" width="' + balken + '" height="' + dicke + '" fill="#1A1A1A"/>' +
        '<text x="0" y="' + (y + dicke + feld * 0.06) + '" text-anchor="middle" font-family="system-ui, Arial, sans-serif" font-size="' + (feld * 0.055) + '" fill="#1A1A1A">' + text + '</text>' +
        '</svg>',
      balken: text
    };
  }
  function bauMikroskop(a) {
    var okular = a.okular || 10;
    var objektive = a.objektive || [4, 10, 40];
    var objektiv = a.start || objektive[0];
    var zoom = 1, gesperrt = false;
    var namen = { hefe: 'Hefe in Wasser', joghurt: 'Joghurtdrink' };
    var sicht = el('div', { class: 'sichtfeld' });
    var massstab = el('p', { class: 'massstab-text' });
    var zoomText = el('span', { class: 'leise klein' });
    var knoepfe = objektive.map(function (o) {
      var b = el('button', { type: 'button', class: 'option', 'aria-pressed': 'false', 'aria-label': 'Objektiv ' + o + 'fach', text: o + '×' });
      b.addEventListener('click', function () {
        if (gesperrt) return;
        objektiv = o;
        zeichne();
        sagAn('Objektiv ' + o + 'fach eingedreht.');
      });
      return { b: b, o: o };
    });
    var zoomGruppe = null;
    if (a.bildschirmzoom) {
      var mehr = knopf('Bild vergrößern', 'knopf-leise', function () { if (zoom < 8) { zoom *= 2; zeichne(); sagAn('Bild am Bildschirm ' + zoom + 'fach vergrößert.'); } });
      var weniger = knopf('Bild verkleinern', 'knopf-leise', function () { if (zoom > 1) { zoom /= 2; zeichne(); sagAn('Bild am Bildschirm ' + zoom + 'fach vergrößert.'); } });
      zoomGruppe = el('div', { class: 'regler-gruppe' },
        el('p', { class: 'regler-titel', text: 'Bild am Bildschirm' }),
        el('div', { class: 'regler-knoepfe' }, mehr, weniger),
        el('p', { class: 'klein', style: 'margin:.35rem 0 0' }, zoomText));
    }
    function zeichne() {
      var bild = zeichneSicht(a.objekt, okular * objektiv, zoom);
      sicht.innerHTML = bild.svg;
      var s = sicht.querySelector('svg');
      if (s) s.setAttribute('aria-label', 'Blick durch das Mikroskop auf ' + (namen[a.objekt] || 'das Präparat') + ', Maßstabsbalken ' + bild.balken);
      massstab.textContent = 'Maßstabsbalken: ' + bild.balken;
      zoomText.textContent = 'Bildschirm-Zoom: ' + zoom + 'fach';
      knoepfe.forEach(function (k) { k.b.setAttribute('aria-pressed', k.o === objektiv ? 'true' : 'false'); });
    }
    zeichne();
    var steuerung = el('div', null,
      el('p', { class: 'leise klein', text: 'Präparat: ' + (namen[a.objekt] || a.objekt) }),
      el('div', { class: 'regler-gruppe' }, el('p', { class: 'regler-titel', text: 'Okular' }), el('span', { class: 'okular-anzeige', text: okular + '×' })),
      el('div', { class: 'regler-gruppe' }, el('p', { class: 'regler-titel', id: 'revolver', text: 'Objektivrevolver' }),
        el('div', { class: 'regler-knoepfe', role: 'group', 'aria-labelledby': 'revolver' }, knoepfe.map(function (k) { return k.b; }))),
      zoomGruppe);
    return {
      hinweis: el('p', { class: 'hinweis', text: 'Drehe den Objektivrevolver, indem du ein Objektiv antippst. Das Bild im Kreis zeigt, was du durch das Okular siehst.' }),
      knoten: el('div', { class: 'mikroskop' }, el('div', null, sicht, massstab), steuerung),
      pruefen: function () {
        var gesamt = okular * objektiv;
        var zusatz = [el('p', null, 'Eingestellt: ' + okular + ' × ' + objektiv + ' = ' + gesamt + 'fache Gesamtvergrößerung.')];
        return { ok: gesamt === a.ziel, zusatz: zusatz };
      },
      sperren: function () { gesperrt = true; knoepfe.forEach(function (k) { k.b.disabled = true; }); },
      wiederholen: function () { gesperrt = false; knoepfe.forEach(function (k) { k.b.disabled = false; }); }
    };
  }

  var TYPEN = {
    auswahl: function (a) { return bauAuswahl(a, false); },
    mehrfach: function (a) { return bauAuswahl(a, true); },
    richtigfalsch: bauRichtigFalsch,
    luecken: bauLuecken,
    korrigieren: bauKorrigieren,
    zuordnen: bauZuordnen,
    reihenfolge: bauReihenfolge,
    beschriften: bauBeschriften,
    mikroskop: bauMikroskop
  };

  /* ------------------------------------------------------------------
     Übersichten: Kapitelende, Gesamtende, Startseite
     ------------------------------------------------------------------ */
  var STATUSTEXT = { r: 'Richtig', f: 'Nicht richtig', u: 'Übersprungen', b: 'Bearbeitet', g: 'Nicht bearbeitet' };

  function uebersichtListe(eintraege, zurueck) {
    return el('ul', { class: 'uebersicht' }, eintraege.map(function (e, i) {
      var st = lauf && lauf.ergebnis[e.a.id];
      var text = st ? STATUSTEXT[st] : 'Nicht bearbeitet';
      var b = el('button', { type: 'button', class: 'uebersicht-knopf' },
        el('span', { class: 'status status-' + (st || 'g'), text: text }),
        el('span', { class: 'uebersicht-text', text: 'Aufgabe ' + (i + 1) + ': ' + kurz(e.a.auftrag || e.a.aussage, 90) }),
        el('span', { class: 'uebersicht-typ', text: TYPNAMEN[e.a.typ] || e.a.typ }));
      b.addEventListener('click', function () {
        zeigeAufgabe(e, {
          fortschritt: null,
          wiederholung: true,
          weiterText: 'Zurück zur Übersicht',
          beiWeiter: zurueck,
          merke: function () {}
        });
      });
      return el('li', null, b);
    }));
  }

  function zaehle(eintraege, quelle) {
    var z = { r: 0, n: 0, ob: 0, on: 0 };
    eintraege.forEach(function (e) {
      var st = quelle[e.a.id];
      if (e.a.typ === 'offen') { z.on++; if (st === 'b') z.ob++; }
      else { z.n++; if (st === 'r') z.r++; }
    });
    return z;
  }
  function zusammenfassung(eintraege) {
    var z = zaehle(eintraege, lauf.ergebnis);
    var t = z.r + ' von ' + z.n + ' Aufgaben beim ersten Versuch richtig.';
    if (z.on) t += ' Offene Aufgaben bearbeitet: ' + z.ob + ' von ' + z.on + '.';
    return t;
  }

  /* ---------- Bewertungshilfen: Farbstufe, Balken, Note ---------- */
  /* Notenschlüssel wie in der Oberstufe üblich: ab 95 % 15 Punkte (1+), ab 45 % 5 Punkte (4). */
  var SCHWELLEN = [20, 27, 33, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
  var NOTEN = ['6', '5−', '5', '5+', '4−', '4', '4+', '3−', '3', '3+', '2−', '2', '2+', '1−', '1', '1+'];
  function prozent(r, n) { return n ? Math.round(r / n * 100) : 0; }
  function note(p) {
    var punkte = 0;
    SCHWELLEN.forEach(function (s) { if (p >= s) punkte++; });
    return NOTEN[punkte];
  }
  function stufe(p) { return p >= 85 ? 5 : p >= 70 ? 4 : p >= 55 ? 3 : p >= 45 ? 2 : 1; }
  function balken(p, gross, leer) {
    return el('div', {
      class: 'balken' + (gross ? ' balken-gross' : '') + (leer ? '' : ' stufe-' + stufe(p)),
      role: 'img', 'aria-label': leer ? 'noch nicht bearbeitet' : p + ' Prozent richtig'
    }, el('div', { class: 'balken-fuellung', style: 'width:' + (leer ? 0 : Math.max(p, 2)) + '%' }));
  }
  function notenKnoten(p) {
    return el('span', { class: 'note stufe-' + stufe(p) }, 'Note', el('span', { class: 'note-wert', text: note(p) }));
  }
  function gesamtSatz(p) {
    if (p >= 90) return 'Sehr gut gemacht. Du hast fast alles beim ersten Versuch richtig gelöst; die Grundlagen der Zellbiologie sitzen sicher.';
    if (p >= 75) return 'Gut gemacht. Den größten Teil hast du sicher gelöst; mit einem kurzen Blick ins Buch schließt du die letzten Lücken.';
    if (p >= 60) return 'Eine solide Grundlage ist da. Wenn du die genannten Kapitel noch einmal nachliest, wirst du deutlich sicherer.';
    if (p >= 45) return 'Einiges sitzt schon. Nimm dir die genannten Kapitel in Ruhe noch einmal vor und übe sie danach erneut.';
    return 'Du stehst noch am Anfang, und das ist beim Wiederholen ganz normal. Arbeite die genannten Kapitel Schritt für Schritt nach; jeder Durchgang bringt dich weiter.';
  }

  function zeigeKapitelende(ki) {
    var kap = KAP[ki];
    neuerBildschirm();
    var eintraege = lauf.liste.filter(function (e) { return e.kap === ki; });
    var z = zaehle(eintraege, lauf.ergebnis), p = prozent(z.r, z.n);
    var titel = el('h2', { tabindex: '-1', text: 'Kapitel ' + kap.nr + ': ' + kap.titel + ' – Übersicht' });
    var karte = el('section', { class: 'karte' }, titel);
    if (z.n) {
      karte.appendChild(el('div', { class: 'gesamt stufe-' + stufe(p) },
        balken(p, true),
        el('div', { class: 'gesamt-zeile' },
          el('span', { class: 'gesamt-zahl', text: z.r + ' von ' + z.n + ' Aufgaben beim ersten Versuch richtig (' + p + ' %)' })),
        z.on ? el('p', { class: 'klein', style: 'margin:.4rem 0 0', text: 'Offene Aufgaben bearbeitet: ' + z.ob + ' von ' + z.on + '.' }) : null));
    } else {
      karte.appendChild(el('p', { text: zusammenfassung(eintraege) }));
    }
    if (kap.seiten) karte.appendChild(el('p', { text: ('Zu diesem Kapitel gehören im Buch Natura die Seiten ' + kap.seiten.replace(/^S\.\s*/, '') + '.').replace(/\.\.$/, '.') }));
    karte.appendChild(el('p', { class: 'leise klein', text: 'Tippe eine Aufgabe an, um sie dir noch einmal anzusehen.' }));
    karte.appendChild(uebersichtListe(eintraege, function () { zeigeKapitelende(ki); }));
    var reihe = el('div', { class: 'knopfreihe' });
    var naechstes = KAP[ki + 1];
    if (lauf.art === 'alle') {
      if (naechstes) reihe.appendChild(knopf('Weiter mit Kapitel ' + naechstes.nr + ': ' + naechstes.titel, 'knopf', function () { zeigeLaufAufgabe(); }));
      else reihe.appendChild(knopf('Zum Ergebnis', 'knopf', zeigeGesamtende));
    } else if (naechstes) {
      reihe.appendChild(knopf('Kapitel ' + naechstes.nr + ': ' + naechstes.titel, 'knopf', function () { startKapitel(ki + 1); }));
    }
    reihe.appendChild(knopf('Zur Startseite', 'knopf knopf-zweit', geheZurStartseite));
    karte.appendChild(reihe);
    inhalt.appendChild(karte);
    fokus(titel);
  }

  function zeigeGesamtende() {
    neuerBildschirm();
    var titel = el('h2', { tabindex: '-1', text: 'Ergebnis' });
    var karte = el('section', { class: 'karte' }, titel);

    var summe = { r: 0, n: 0, ob: 0, on: 0 }, kapitel = [], nachlesen = [];
    KAP.forEach(function (k, i) {
      var st = kapitelStand(i), p = prozent(st.richtig, st.beantwortet);
      summe.r += st.richtig; summe.n += st.beantwortet; summe.ob += st.offenBearbeitet; summe.on += st.offenGesamt;
      kapitel.push({ k: k, st: st, p: p });
      if (st.beantwortet && p < 70) nachlesen.push({ k: k, p: p });
    });
    var gp = prozent(summe.r, summe.n);

    if (lauf && lauf.art === 'mix') karte.appendChild(el('p', { class: 'leise', text: 'Dieser Durchgang: ' + zusammenfassung(lauf.liste) }));

    /* Gesamtleistung */
    if (summe.n) {
      karte.appendChild(el('div', { class: 'gesamt stufe-' + stufe(gp) },
        el('p', { class: 'gesamt-satz', text: gesamtSatz(gp) }),
        balken(gp, true),
        el('div', { class: 'gesamt-zeile' },
          el('span', { class: 'gesamt-zahl', text: summe.r + ' von ' + summe.n + ' Aufgaben beim ersten Versuch richtig (' + gp + ' %)' }),
          notenKnoten(gp)),
        summe.on ? el('p', { class: 'klein', style: 'margin:.5rem 0 0', text: 'Offene Aufgaben bearbeitet: ' + summe.ob + ' von ' + summe.on + '.' }) : null,
        el('p', { class: 'note-hinweis', text: 'Die Noten dienen nur zur Orientierung. Sie folgen dem in der Oberstufe üblichen Notenschlüssel (ab 45 % ausreichend) und sind keine Bewertung im Unterricht.' })));
    } else {
      karte.appendChild(el('p', { text: 'Du hast noch keine Aufgabe mit richtig oder falsch bearbeitet. Starte ein Kapitel oder einen gemischten Durchgang.' }));
    }

    /* Wo nachlesen? */
    if (nachlesen.length) {
      nachlesen.sort(function (a, b) { return a.p - b.p; });
      karte.appendChild(el('div', { class: 'nachlesen' },
        el('h3', { text: 'Hier lohnt sich das Nachlesen' }),
        el('ul', null, nachlesen.map(function (x) {
          return el('li', null,
            el('strong', { text: 'Kapitel ' + x.k.nr + ': ' + x.k.titel }),
            ' – ' + (x.k.seiten ? 'Natura ' + x.k.seiten + ', ' : '') + x.p + ' % richtig');
        }))));
    } else if (summe.n) {
      karte.appendChild(el('p', { text: 'In keinem bearbeiteten Kapitel liegst du unter 70 %. Zum Festigen kannst du einen gemischten Durchgang wiederholen.' }));
    }

    /* Kapitel einzeln */
    karte.appendChild(el('h3', { text: 'Deine Kapitel' }));
    karte.appendChild(el('ul', { class: 'kapitel-ergebnisse' }, kapitel.map(function (x) {
      var bearbeitet = x.st.beantwortet > 0;
      var offen = x.st.offenGesamt ? 'offen: ' + x.st.offenBearbeitet + ' von ' + x.st.offenGesamt + ' bearbeitet' : 'keine offenen Aufgaben';
      return el('li', { class: 'kapitel-ergebnis' + (bearbeitet ? ' stufe-' + stufe(x.p) : '') },
        el('div', { class: 'ke-kopf' },
          el('div', null,
            el('div', { class: 'ke-titel', text: x.k.nr + ' ' + x.k.titel }),
            x.k.seiten ? el('div', { class: 'ke-seiten', text: 'Natura ' + x.k.seiten }) : null),
          bearbeitet ? notenKnoten(x.p) : null),
        balken(x.p, false, !bearbeitet),
        el('div', { class: 'ke-zeile' },
          bearbeitet ? el('span', null, el('strong', { text: x.st.richtig + ' von ' + x.st.beantwortet }), ' richtig · ' + x.p + ' %') : el('span', { text: 'noch nicht bearbeitet' }),
          el('span', { text: offen })));
    })));

    /* Ergebniscode */
    var code = ergebniscode();
    karte.appendChild(el('h3', { text: 'Ergebniscode' }));
    karte.appendChild(el('div', { class: 'code-feld', 'aria-label': 'Ergebniscode ' + code.split('').join(' ') }, code));
    karte.appendChild(el('p', { class: 'leise klein', text: 'Der Code enthält für jedes Kapitel den Anteil der beim ersten Versuch richtig gelösten Aufgaben und ob du die offenen Aufgaben bearbeitet hast. Er berücksichtigt das letzte Ergebnis jeder Aufgabe, die du auf diesem Gerät bearbeitet hast. Einen Namen enthält er nicht.' }));

    if (lauf && lauf.art === 'mix') {
      karte.appendChild(el('h3', { text: 'Aufgaben dieses Durchgangs' }));
      karte.appendChild(uebersichtListe(lauf.liste, zeigeGesamtende));
    }
    karte.appendChild(el('div', { class: 'knopfreihe' }, knopf('Zur Startseite', 'knopf', geheZurStartseite)));
    inhalt.appendChild(karte);
    fokus(titel);
  }

  function zeigeStart(mitFokus) {
    lauf = null;
    startKnopf.hidden = true;
    neuerBildschirm();
    var anzahl = ALLE.length;
    var h1 = el('h1', { tabindex: '-1', text: 'Zellbiologie EF' });
    inhalt.appendChild(h1);
    inhalt.appendChild(el('p', { text: 'Hier wiederholst du das Unterrichtsvorhaben „Aufbau und Funktion der Zelle“ in ' + KAP.length + ' Kapiteln mit ' + anzahl + ' Aufgaben.' }));
    inhalt.appendChild(el('div', { class: 'start-knoepfe' },
      knopf([el('span', { text: 'Gemischter Durchgang' }), el('span', { class: 'knopf-beschreibung', text: Math.min(MIX_ANZAHL, anzahl) + ' zufällige Aufgaben aus allen Kapiteln' })], 'knopf', startMix),
      knopf([el('span', { text: 'Alles der Reihe nach' }), el('span', { class: 'knopf-beschreibung', text: 'alle ' + anzahl + ' Aufgaben, Kapitel für Kapitel' })], 'knopf knopf-zweit', startAlle)));
    inhalt.appendChild(el('p', { class: 'leise', text: 'Es gibt keine Zeitbegrenzung. Eine falsch beantwortete Aufgabe kannst du einmal wiederholen; der zweite Versuch zählt für den Ergebniscode nicht mit.' }));

    inhalt.appendChild(el('h2', { style: 'margin-top:1.5rem', text: 'Kapitel' }));
    inhalt.appendChild(el('ul', { class: 'kapitelliste' }, KAP.map(function (k, i) {
      var st = kapitelStand(i);
      var info = (k.aufgaben || []).length + ' Aufgaben';
      if (st.beantwortet) info += ' · zuletzt ' + st.richtig + ' von ' + st.beantwortet + ' richtig';
      return el('li', null, knopf([
        el('span', { class: 'kapitel-nr', 'aria-hidden': 'true', text: String(k.nr) }),
        el('span', { class: 'kapitel-titel', text: k.titel }),
        k.seiten ? el('span', { class: 'kapitel-seiten', text: seitenText(k) }) : null,
        el('span', { class: 'kapitel-info', text: info })
      ], 'kapitel-knopf', function () { startKapitel(i); },
      { 'aria-label': 'Kapitel ' + k.nr + ': ' + k.titel + (k.seiten ? ', ' + seitenText(k) : '') + ', ' + info }));
    })));

    if (hatFortschritt()) {
      inhalt.appendChild(el('h2', { style: 'margin-top:1.5rem', text: 'Ergebnis' }));
      inhalt.appendChild(el('p', { class: 'leise', text: 'Die Auswertung fasst zusammen, was du auf diesem Gerät bisher bearbeitet hast, und zeigt deinen Ergebniscode.' }));
      inhalt.appendChild(el('div', { class: 'knopfreihe' },
        knopf('Auswertung anzeigen', 'knopf knopf-zweit', function () {
          try { if (location.hash !== '#uebung') history.pushState(null, '', '#uebung'); } catch (e) { /* egal */ }
          startKnopf.hidden = false;
          zeigeGesamtende();
        }),
        knopf('Fortschritt auf diesem Gerät löschen', 'knopf-text', function () {
          if (window.confirm('Soll der gespeicherte Fortschritt auf diesem Gerät gelöscht werden?')) { loescheFortschritt(); zeigeStart(true); }
        })));
    }
    if (mitFokus) fokus(h1);
  }

  function geheZurStartseite() {
    try { history.replaceState(null, '', '#start'); } catch (e) { /* egal */ }
    zeigeStart(true);
  }

  startKnopf.addEventListener('click', geheZurStartseite);
  window.addEventListener('resize', misseKopf);
  window.addEventListener('orientationchange', function () { window.setTimeout(misseKopf, 200); });
  window.addEventListener('popstate', function () {
    if (location.hash !== '#uebung') zeigeStart(true);
  });
  window.addEventListener('hashchange', function () {
    if (location.hash === '#start' || location.hash === '') zeigeStart(true);
  });

  /* Schnittstelle nur für die automatische Prüfung (pruefung/), ohne Wirkung im Unterricht. */
  window.__zellbio = {
    ergebniscode: ergebniscode,
    speicher: function () { return speicher; },
    aktuell: function () { return lauf && lauf.liste[lauf.pos] ? lauf.liste[lauf.pos].a.id : null; }
  };

  zeigeStart(false);
}());
