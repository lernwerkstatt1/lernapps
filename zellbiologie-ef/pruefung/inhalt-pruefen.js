/* Inhaltsprüfung für fragen.js
   Aufruf im Ordner zellbiologie-ef:   node pruefung/inhalt-pruefen.js
   Prüft jede Aufgabe auf Kennung, Typ, Anforderungsbereich, richtige Antwort,
   Rückmeldetexte und Bilder und gibt am Ende eine Übersicht aus.
   Rückgabewert 0 = alles in Ordnung, 1 = Fehler gefunden. */

'use strict';
var fs = require('fs');
var path = require('path');
var vm = require('vm');

var ordner = path.resolve(__dirname, '..');
var kontext = {};
vm.createContext(kontext);
vm.runInContext(fs.readFileSync(path.join(ordner, 'bilder', 'schemata.js'), 'utf8') + '\n;this.SCHEMATA = SCHEMATA;', kontext);
vm.runInContext(fs.readFileSync(path.join(ordner, 'fragen.js'), 'utf8') + '\n;this.KAPITEL = KAPITEL;', kontext);
var KAPITEL = kontext.KAPITEL, SCHEMATA = kontext.SCHEMATA;

var TYPEN = ['zuordnen', 'auswahl', 'mehrfach', 'luecken', 'beschriften', 'reihenfolge',
  'richtigfalsch', 'offen', 'korrigieren', 'mikroskop'];
var fehler = [], hinweise = [], ids = {};
var zaehler = { afb: { 1: 0, 2: 0, 3: 0 }, typ: {}, kapitel: [] };

function f(id, text) { fehler.push(id + ': ' + text); }
function istText(t) { return typeof t === 'string' && t.trim().length > 0; }

function bildVorhanden(name) {
  if (/[\/.]/.test(name)) return fs.existsSync(path.join(ordner, name));
  return !!(SCHEMATA && SCHEMATA[name]);
}

/* Sichtbare Texte einer Aufgabe einsammeln, für die Sprachprüfung. */
function texte(a) {
  var t = [a.auftrag, a.aussage, a.text, a.musterloesung, a.alt];
  if (a.rueckmeldung) t.push(a.rueckmeldung.richtig, a.rueckmeldung.falsch);
  (a.optionen || []).forEach(function (o) { t.push(o.text, o.warum); });
  (a.paare || []).forEach(function (p) { t.push(p.begriff, p.ziel); });
  (a.ablenker || []).forEach(function (p) { t.push(p.begriff, p.warum); });
  (a.elemente || []).forEach(function (e) { t.push(e); });
  (a.punkte || []).forEach(function (p) { t.push(p.name, p.lage); });
  (a.weitere || []).concat(a.ersatz || []).forEach(function (e) { t.push(e); });
  if (a.tabelle) { t = t.concat(a.tabelle.kopf); a.tabelle.zeilen.forEach(function (z) { t = t.concat(z); }); }
  return t.filter(istText);
}

KAPITEL.forEach(function (kap, ki) {
  var k = { nr: kap.nr, titel: kap.titel, anzahl: 0, offen: 0, afb: { 1: 0, 2: 0, 3: 0 } };
  zaehler.kapitel.push(k);
  if (!istText(kap.titel)) f('Kapitel ' + (ki + 1), 'Titel fehlt');
  if (!istText(kap.seiten)) hinweise.push('Kapitel ' + kap.nr + ': keine Seitenangabe (seiten ist leer)');

  (kap.aufgaben || []).forEach(function (a, ai) {
    var id = a.id || ('Kapitel ' + kap.nr + ', Aufgabe ' + (ai + 1));
    k.anzahl++;
    if (!istText(a.id)) f(id, 'Kennung (id) fehlt');
    else if (ids[a.id]) f(id, 'Kennung ist doppelt vergeben');
    ids[a.id] = true;

    if (TYPEN.indexOf(a.typ) < 0) { f(id, 'unbekannter Typ "' + a.typ + '"'); return; }
    zaehler.typ[a.typ] = (zaehler.typ[a.typ] || 0) + 1;
    if ([1, 2, 3].indexOf(a.afb) < 0) f(id, 'afb muss 1, 2 oder 3 sein');
    else { zaehler.afb[a.afb]++; k.afb[a.afb]++; }

    if (a.typ !== 'richtigfalsch' && !istText(a.auftrag)) f(id, 'Arbeitsauftrag (auftrag) fehlt');
    if (a.typ === 'offen') {
      k.offen++;
      if (!istText(a.musterloesung)) f(id, 'Musterlösung fehlt');
    } else {
      if (!a.rueckmeldung || !istText(a.rueckmeldung.richtig)) f(id, 'Rückmeldung für richtig fehlt');
      if (!a.rueckmeldung || !istText(a.rueckmeldung.falsch)) f(id, 'Rückmeldung für falsch fehlt');
    }
    if (a.bild && !bildVorhanden(a.bild)) f(id, 'Bild "' + a.bild + '" nicht gefunden');

    var korrekt;
    switch (a.typ) {
      case 'auswahl':
        korrekt = (a.optionen || []).filter(function (o) { return o.korrekt; }).length;
        if ((a.optionen || []).length !== 4) f(id, 'Einfachauswahl braucht genau vier Möglichkeiten');
        if (korrekt !== 1) f(id, 'Einfachauswahl braucht genau eine richtige Antwort');
        (a.optionen || []).forEach(function (o) { if (!o.korrekt && !istText(o.warum)) hinweise.push(id + ': falsche Möglichkeit ohne Begründung (warum)'); });
        break;
      case 'mehrfach':
        korrekt = (a.optionen || []).filter(function (o) { return o.korrekt; }).length;
        if (korrekt < 2) f(id, 'Mehrfachauswahl braucht mindestens zwei richtige Antworten');
        if (korrekt === (a.optionen || []).length) f(id, 'Mehrfachauswahl braucht mindestens eine falsche Möglichkeit');
        break;
      case 'zuordnen':
        var n = (a.paare || []).length;
        if (n < 4 || n > 8) f(id, 'Zuordnung braucht 4 bis 8 Paare, hat ' + n);
        (a.paare || []).forEach(function (p) { if (!istText(p.begriff) || !istText(p.ziel)) f(id, 'Paar ohne Begriff oder Ziel'); });
        (a.ablenker || []).forEach(function (p) { if (!istText(p.warum)) f(id, 'Ablenker ohne Begründung (warum)'); });
        break;
      case 'luecken':
        var l = String(a.text || '').match(/\[\[(.+?)\]\]/g) || [];
        if (!l.length) f(id, 'Lückentext ohne Lücke [[…]]');
        l.forEach(function (x) { if (!x.slice(2, -2).trim()) f(id, 'leere Lücke'); });
        break;
      case 'beschriften':
        if (!a.bild) f(id, 'Beschriften braucht ein Bild');
        if (!(a.punkte || []).length) f(id, 'Beschriften braucht Punkte');
        (a.punkte || []).forEach(function (p) {
          [p.x, p.y, p.mx === undefined ? p.x : p.mx, p.my === undefined ? p.y : p.my].forEach(function (v) {
            if (typeof v !== 'number' || v < 0 || v > 100) f(id, 'Koordinate außerhalb 0 bis 100 bei "' + p.name + '"');
          });
          if (!istText(p.lage)) hinweise.push(id + ': Punkt "' + p.name + '" ohne Lagebeschreibung für Screenreader');
        });
        break;
      case 'reihenfolge':
        if ((a.elemente || []).length < 3) f(id, 'Reihenfolge braucht mindestens drei Einträge');
        break;
      case 'richtigfalsch':
        if (!istText(a.aussage)) f(id, 'Aussage fehlt');
        if (typeof a.korrekt !== 'boolean') f(id, 'korrekt muss true oder false sein');
        break;
      case 'korrigieren':
        var m = String(a.text || '').match(/\[\[[^\]]+>[^\]]+\]\]/g) || [];
        if (m.length !== 1) f(id, 'Korrigieren braucht genau einen Fehler [[falsch>richtig]]');
        break;
      case 'mikroskop':
        var obj = a.objektive || [4, 10, 40], ok = a.okular || 10;
        if (obj.map(function (o) { return o * ok; }).indexOf(a.ziel) < 0) f(id, 'Zielvergrößerung ist mit den Objektiven nicht einstellbar');
        if (['hefe', 'joghurt'].indexOf(a.objekt) < 0) f(id, 'unbekanntes Präparat "' + a.objekt + '"');
        break;
    }

    /* Sprache: keine Ausrufezeichen in Rückmeldungen, keine Ihr-Form, keine Emojis. */
    var rmTexte = [];
    if (a.rueckmeldung) rmTexte.push(a.rueckmeldung.richtig, a.rueckmeldung.falsch);
    (a.optionen || []).concat(a.ablenker || []).forEach(function (o) { rmTexte.push(o.warum); });
    rmTexte.filter(istText).forEach(function (t) { if (t.indexOf('!') >= 0) f(id, 'Ausrufezeichen in einer Rückmeldung'); });
    texte(a).forEach(function (t) {
      if (/(^|[\s„(])(ihr|euch|euer|eure)\b/i.test(t)) f(id, 'Ihr-Form oder ihr/euch gefunden: "' + t.slice(0, 60) + '"');
      if (/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u.test(t)) f(id, 'Emoji gefunden');
    });
  });
});

var gesamt = zaehler.afb[1] + zaehler.afb[2] + zaehler.afb[3];
function prozent(x) { return Math.round(x / gesamt * 100) + ' %'; }

console.log('Inhaltsprüfung fragen.js');
console.log('========================');
zaehler.kapitel.forEach(function (k) {
  console.log('Kapitel ' + k.nr + ' (' + k.titel + '): ' + k.anzahl + ' Aufgaben, davon ' + k.offen +
    ' offen · AFB I ' + k.afb[1] + ', II ' + k.afb[2] + ', III ' + k.afb[3]);
  if (!k.offen) hinweise.push('Kapitel ' + k.nr + ': keine offene Aufgabe');
});
console.log('Gesamt: ' + gesamt + ' Aufgaben · AFB I ' + zaehler.afb[1] + ' (' + prozent(zaehler.afb[1]) + '), II ' +
  zaehler.afb[2] + ' (' + prozent(zaehler.afb[2]) + '), III ' + zaehler.afb[3] + ' (' + prozent(zaehler.afb[3]) + ')');
console.log('Typen: ' + Object.keys(zaehler.typ).map(function (t) { return t + ' ' + zaehler.typ[t]; }).join(', '));
if ((zaehler.typ.offen || 0) < 12) fehler.push('Weniger als 12 offene Aufgaben');
['zuordnen', 'auswahl', 'mehrfach', 'luecken', 'beschriften', 'reihenfolge', 'richtigfalsch', 'offen'].forEach(function (t) {
  if (!zaehler.typ[t]) fehler.push('Typ ' + t + ' kommt nicht vor');
});
if (hinweise.length) { console.log('\nHinweise:'); hinweise.forEach(function (h) { console.log('  - ' + h); }); }
if (fehler.length) {
  console.log('\nFEHLER (' + fehler.length + '):');
  fehler.forEach(function (x) { console.log('  - ' + x); });
  process.exit(1);
}
console.log('\nKeine Fehler gefunden.');
