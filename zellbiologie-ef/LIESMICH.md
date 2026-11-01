# Übungs-App Zellbiologie EF – LIESMICH

Statische Übungs-App zum Unterrichtsvorhaben „Aufbau und Funktion der Zelle“ (Einführungsphase NRW).
Reines HTML, CSS und JavaScript: kein Framework, kein Build-Schritt, keine externen Adressen.
Die App läuft auf GitHub Pages und genauso offline, wenn man `index.html` direkt aus dem Ordner öffnet.
Sie ist für das iPad optimiert (Hoch- und Querformat, Bedienung mit Finger oder Stift) und funktioniert
ebenso am Desktop-Rechner und auf dem Handy.

```
zellbiologie-ef/
  index.html            Startseite der App
  styles.css            Gestaltung (Palette des Unterrichtsmaterials, heller und dunkler Modus)
  app.js                Logik, Darstellung, Ergebniscode – muss für neue Aufgaben nicht angefasst werden
  fragen.js             NUR Inhalt: alle Kapitel und Aufgaben
  code-pruefen.html     Seite für die Lehrkraft: Ergebniscodes entschlüsseln (nicht verlinkt)
  bilder/schemata.js    selbst gezeichnete Schemata als SVG
  bilder/               hier können eigene Fotos liegen
  pruefung/inhalt-pruefen.js   Prüfskript für fragen.js
  LIESMICH.md           diese Datei
```

## Veröffentlichen

1. Den Ordnerinhalt in ein GitHub-Repository hochladen.
2. Im Repository unter *Settings → Pages* als Quelle den Branch `main` und den Ordner `/ (root)` wählen.
3. Nach ein bis zwei Minuten ist die App unter `https://BENUTZERNAME.github.io/REPOSITORY/` erreichbar.
   Die Seite für die Lehrkraft liegt unter `…/code-pruefen.html`; sie ist in der App nicht verlinkt.

Nichts aus dem Ordner `material/` (Buchseiten, Arbeitsblätter, Fotos mit Namen) gehört in dieses Repository.

## Aufgaben ergänzen

Alle Aufgaben stehen in `fragen.js`, kapitelweise im Feld `aufgaben`. Eine neue Aufgabe kopierst du aus den
Beispielen unten und fügst sie in die Liste des passenden Kapitels ein. Zwischen zwei Aufgaben steht ein Komma.
Danach im Ordner `node pruefung/inhalt-pruefen.js` ausführen; das Skript meldet Tippfehler und fehlende Felder.
Ohne Node: `index.html` im Browser öffnen und die neue Aufgabe einmal durchspielen.

### Felder, die jede Aufgabe hat

| Feld | Bedeutung |
|---|---|
| `id` | eindeutige Kennung, z. B. `"k4-12"` (Kapitel 4, Aufgabe 12). Nie doppelt vergeben. |
| `typ` | einer der zehn Typen unten |
| `afb` | Anforderungsbereich `1`, `2` oder `3`. Wird nicht angezeigt, dient nur der Kontrolle. |
| `auftrag` | Arbeitsauftrag im Imperativ: „Ordne zu.“, „Erkläre …“, „Beurteile …“ |
| `rueckmeldung` | `richtig`: ein Satz, der den entscheidenden Punkt festhält. `falsch`: zuerst die richtige Antwort, dann kurz der Grund. Keine Ausrufezeichen. (Entfällt bei `offen`.) |
| `seite` | optional: eigene Fundstelle wie `"S. 31"`. Ohne dieses Feld gilt die Seitenangabe des Kapitels. |
| `bild` | optional: Name eines Schemas (`"zellen"`) oder Pfad zu einem Foto (`"bilder/hefe-400.jpg"`) |
| `alt` | optional bei Schemata, Pflicht bei Fotos: Beschreibung des Bildes für Screenreader |
| `tabelle` | optional: Material als Tabelle, `{ kopf: [...], zeilen: [[...], [...]] }` |

Die App ergänzt bei falscher Antwort automatisch „Nicht richtig.“ und die Fundstelle „Natura S. …“.

### Einfachauswahl – `auswahl`

Genau vier Möglichkeiten, genau eine mit `korrekt: true`. Jede falsche Möglichkeit bekommt in `warum` einen Satz,
der erklärt, warum sie nicht trägt; er erscheint, wenn jemand sie wählt. Die Reihenfolge wird beim Anzeigen gemischt.

```js
{
  id: "k7-20", typ: "auswahl", afb: 1,
  auftrag: "Wähle den Ort der alkoholischen Gärung.",
  optionen: [
    { text: "Cytoplasma", korrekt: true },
    { text: "Mitochondrium", warum: "Im Mitochondrium läuft die Zellatmung ab." },
    { text: "Zellkern", warum: "Der Zellkern enthält die DNA und steuert die Zelle." },
    { text: "Chloroplast", warum: "Im Chloroplasten läuft die Fotosynthese ab." }
  ],
  rueckmeldung: {
    richtig: "Die Gärung läuft ohne Sauerstoff im Cytoplasma ab.",
    falsch: "Richtig ist: im Cytoplasma."
  }
},
```

### Mehrfachauswahl – `mehrfach`

Wie `auswahl`, aber mindestens zwei Möglichkeiten mit `korrekt: true` und mindestens eine falsche.
Der Hinweis „Mehrere Antworten sind richtig.“ erscheint automatisch. Nach dem Prüfen zeigt die App,
welche Häkchen fehlten und welche zu viel waren, jeweils mit dem `warum` der falschen Möglichkeit.

```js
{
  id: "k8-20", typ: "mehrfach", afb: 1,
  auftrag: "Kreuze alle Plastidentypen an.",
  optionen: [
    { text: "Chloroplasten", korrekt: true },
    { text: "Chromoplasten", korrekt: true },
    { text: "Leukoplasten", korrekt: true },
    { text: "Lysosomen", warum: "Lysosomen enthalten Verdauungsenzyme; sie sind keine Plastiden." }
  ],
  rueckmeldung: {
    richtig: "Chloro-, Chromo- und Leukoplasten sind Plastiden.",
    falsch: "Richtig sind Chloroplasten, Chromoplasten und Leukoplasten."
  }
},
```

### Zuordnung – `zuordnen`

4 bis 8 Paare. Jeder `begriff` wird zu einem Kärtchen, jedes `ziel` zu einem Feld. Haben mehrere Paare
dasselbe Ziel, wird daraus ein Sammelfeld (z. B. „Prokaryotische Zelle“). Mit `ablenker` kommen Kärtchen
hinzu, die in kein Feld gehören; die App sagt dann „Ein Begriff bleibt übrig.“ Bedienung: ziehen oder
erst Kärtchen, dann Feld antippen; mit der Tastatur Tab und Enter.

```js
{
  id: "k4-20", typ: "zuordnen", afb: 1,
  auftrag: "Ordne jedem Fachbegriff seine sprachliche Herkunft zu.",
  paare: [
    { begriff: "Vakuole", ziel: "lat. vacuus leer" },
    { begriff: "Cristae", ziel: "lat. crista Kamm" },
    { begriff: "Membran", ziel: "lat. membrana Häutchen" },
    { begriff: "permeabel", ziel: "lat. permeare hindurchgehen" }
  ],
  ablenker: [
    { begriff: "Golgi-Apparat", warum: "Er ist nach dem Forscher Camillo Golgi benannt." }
  ],
  rueckmeldung: {
    richtig: "Die Wortteile beschreiben Aussehen oder Aufgabe; der Golgi-Apparat trägt einen Forschernamen.",
    falsch: "Richtig ist: Vakuole – leer, Cristae – Kamm, Membran – Häutchen, permeabel – hindurchgehen."
  }
},
```

### Lückentext – `luecken`

Lücken stehen in doppelten eckigen Klammern im `text`.

* Auswahlliste: `[[richtig|falsch1|falsch2]]` – das **erste** Wort ist die Lösung, angezeigt wird gemischt.
* Eingabefeld: `[[=Lösung|andere Schreibweise]]` – mit Gleichheitszeichen am Anfang.
  Groß-/Kleinschreibung, Foto/Photo, ß/ss und Leerzeichen werden automatisch toleriert.
  Bei Zahlen gelten 1000, 1.000 und 1 000 als gleich, ebenso 0,025 und 0.025; Zusätze wie „fach“ oder „x“ werden ignoriert.

```js
{
  id: "k3-20", typ: "luecken", afb: 1,
  auftrag: "Ergänze den Text.",
  text: "Mit einem 10×-Okular und dem 4er-Objektiv vergrößert das Mikroskop [[=40]]fach. Du beginnst mit der [[kleinsten|stärksten|mittleren]] Vergrößerung.",
  rueckmeldung: {
    richtig: "10 × 4 = 40fach; begonnen wird mit der kleinsten Vergrößerung.",
    falsch: "Richtig ist: 40fach und die kleinste Vergrößerung."
  }
},
```

### Beschriften – `beschriften`

Ein Bild mit nummerierten Punkten; zu jedem Punkt wird eine Bezeichnung aus einer Liste gewählt.
`x` und `y` sind die Lage des Punktes **in Prozent** von Breite und Höhe des Bildes (0 bis 100),
`mx` und `my` die Lage der Nummer; die App zieht eine Linie dazwischen. Ohne `mx`/`my` sitzt die Nummer direkt
auf dem Punkt. `lage` beschreibt die Stelle in Worten für Screenreader und wird nicht sichtbar angezeigt.
`weitere` sind zusätzliche falsche Bezeichnungen in der Auswahlliste.

Tipp zum Bestimmen der Prozentwerte: Bild in einem Grafikprogramm öffnen, Mauszeiger auf die Stelle,
x-Pixel ÷ Bildbreite × 100 und y-Pixel ÷ Bildhöhe × 100.

```js
{
  id: "k7-21", typ: "beschriften", afb: 1,
  auftrag: "Beschrifte das Mitochondrium.",
  bild: "mitochondrium",
  punkte: [
    { name: "Außenmembran", x: 15, y: 28.3, mx: 6, my: 9.6, lage: "die äußere Hülle" },
    { name: "Matrix", x: 47.75, y: 48, mx: 50, my: 91.2, lage: "der Innenraum zwischen den Falten" }
  ],
  weitere: ["Stroma"],
  rueckmeldung: {
    richtig: "Außen liegt die Außenmembran, innen die Matrix.",
    falsch: "Die äußere Hülle ist die Außenmembran, der Innenraum die Matrix."
  }
},
```

Vorhandene Schemata in `bilder/schemata.js`: `mitochondrium`, `chloroplast`, `pflanzenzelle`, `zellen`
(Pflanzen- und Tierzelle nebeneinander), `lichtmikroskop`, `bakterium`. Die Prozentwerte für alle bereits
genutzten Stellen stehen in den vorhandenen Aufgaben in `fragen.js` und können kopiert werden.

### Reihenfolge – `reihenfolge`

`elemente` in der **richtigen** Reihenfolge eintragen; die App mischt sie beim Anzeigen.
`anfang` und `ende` beschriften oben und unten.

```js
{
  id: "k2-20", typ: "reihenfolge", afb: 1,
  auftrag: "Ordne nach der Größe. Beginne oben mit dem Kleinsten.",
  anfang: "kleinstes", ende: "größtes",
  elemente: ["Atom", "Biomembran (Dicke)", "Bakterium", "Eukaryotische Zelle"],
  rueckmeldung: {
    richtig: "Atom etwa 0,1 nm, Biomembran 7 bis 8 nm, Bakterium 1 bis 6 µm, eukaryotische Zelle 10 bis 100 µm.",
    falsch: "Richtig ist: Atom, Biomembran, Bakterium, eukaryotische Zelle."
  }
},
```

### Richtig oder falsch – `richtigfalsch`

Statt `auftrag` gibt es `aussage`; `korrekt` ist `true`, wenn die Aussage stimmt, sonst `false`.
Die Begründung steht in der Rückmeldung.

```js
{
  id: "k8-21", typ: "richtigfalsch", afb: 2,
  aussage: "Pflanzen atmen nicht, weil sie Fotosynthese betreiben.",
  korrekt: false,
  rueckmeldung: {
    richtig: "Auch Pflanzenzellen betreiben Zellatmung in ihren Mitochondrien.",
    falsch: "Die Aussage ist falsch. Pflanzenzellen besitzen Mitochondrien und betreiben Zellatmung, auch nachts und in der Wurzel."
  }
},
```

### Offene Aufgabe – `offen`

Textfeld mit dem Knopf „Musterlösung anzeigen“. Zählt für den Ergebniscode nur als „bearbeitet“
(mindestens 20 Zeichen geschrieben) oder „nicht bearbeitet“, nie als richtig oder falsch.

```js
{
  id: "k5-20", typ: "offen", afb: 2,
  auftrag: "Erkläre einen Vorteil der Kompartimentierung.",
  musterloesung: "Getrennte Reaktionsräume erlauben, dass Auf- und Abbau gleichzeitig ablaufen. …"
},
```

### Zusätzliche Typen

Auf Wunsch nach mehr Abwechslung (Fehler korrigieren, vergrößern) gibt es zwei weitere Typen.
Sie zählen für den Ergebniscode wie jede geschlossene Aufgabe.

**Fehler korrigieren – `korrigieren`.** Ein Satz enthält genau einen Fehler in der Form `[[falsch>richtig]]`.
Alle Wörter sind antippbar; nach dem Antippen wählt man die Ersetzung aus `ersatz` (die richtige wird
automatisch ergänzt, falls sie fehlt).

```js
{
  id: "k4-21", typ: "korrigieren", afb: 1,
  auftrag: "Finde den Fehler und korrigiere ihn.",
  text: "Das raue ER dient dem [[interzellulären>intrazellulären]] Stofftransport.",
  ersatz: ["intrazellulären", "pflanzlichen", "schnellen"],
  rueckmeldung: {
    richtig: "Das ER transportiert Stoffe innerhalb der Zelle.",
    falsch: "Richtig heißt es: intrazellulär, also innerhalb der Zelle."
  }
},
```

**Mikroskop einstellen – `mikroskop`.** Ein virtuelles Mikroskop mit Objektivrevolver; der Blick durch das
Okular wird passend zur Vergrößerung gezeichnet, mit Maßstabsbalken. Präparate: `"hefe"` (Hefezellen 5 bis 10 µm,
teils mit Knospe) und `"joghurt"` (Milchsäurebakterien etwa 1 µm). Das Bild berücksichtigt die Auflösungsgrenze:
Bakterien bleiben auch bei 400fach Pünktchen. Mit `bildschirmzoom: true` lässt sich das Bild zusätzlich am
Bildschirm vergrößern – es wird größer, aber nicht schärfer. Geprüft wird nur, ob `ziel` eingestellt ist.

```js
{
  id: "k3-21", typ: "mikroskop", afb: 2,
  auftrag: "Das Okular vergrößert 10fach. Stelle eine Gesamtvergrößerung von 400fach ein.",
  objekt: "hefe", okular: 10, objektive: [4, 10, 40], start: 4, ziel: 400,
  rueckmeldung: {
    richtig: "10 × 40 = 400fach.",
    falsch: "Richtig ist das 40er-Objektiv, denn 10 × 40 = 400."
  }
},
```

## Bedienung auf dem iPad

* **Kopfzeile mit Punktestand:** Oben steht immer ein Fortschrittsbalken mit einem Feld je Aufgabe
  (grün richtig, rot nicht richtig, orange übersprungen, blau offene Aufgabe bearbeitet, umrandet die aktuelle
  Aufgabe) und die Punktzahl. Ein Punkt gibt es für jede geschlossene Aufgabe, die beim ersten Versuch richtig
  gelöst wird. Während eines Durchgangs zeigt die Leiste diesen Durchgang, auf der Startseite den
  Gesamtstand auf dem Gerät.
* **Feste Knopfleiste:** „Prüfen“, „Weiter“ und „Überspringen“ bleiben am unteren Rand sichtbar
  (auf dem Handy stehen sie unter der Aufgabe).
* **Zwei Spalten ab Hochformat:** Bei Zuordnungen stehen Bild und Begriffe links und bleiben beim Scrollen
  stehen, die Felder rechts; beim Beschriften steht das Bild links, die Auswahllisten rechts. So lassen sich
  Begriffe mit dem Finger ziehen, ohne dass das Ziel aus dem Bild rutscht.
* **Zum Home-Bildschirm:** In Safari über „Teilen → Zum Home-Bildschirm“ wird die App mit eigenem Symbol
  wie eine App gestartet (`bilder/symbol-180.png`).
* Jedes Kapitel zeigt auf der Startseite, in der Aufgabe und in der Auswertung die Buchseiten (Feld `seiten`).

## Bilder

Die App kommt ohne Fotos aus; alle Abbildungen sind selbst gezeichnete Schemata in `bilder/schemata.js`.
Eigene Aufnahmen (z. B. Hefe bei 400facher Vergrößerung aus der Praxisstunde) legst du als `.jpg`, `.png`
oder `.webp` in den Ordner `bilder/` und trägst sie mit `bild: "bilder/dateiname.jpg"` und `alt: "…"` ein.
Keine Fotos mit Personen, Namen oder Buchseiten verwenden; der Ordner ist öffentlich.

## Ergebniscode

### Auswertung für die Schülerinnen und Schüler

Am Ende eines Durchgangs und auf der Startseite („Auswertung anzeigen“) zeigt die App einen Satz zur
Gesamtleistung, einen farbigen Balken und eine Note für alle Kapitel zusammen, danach die Kapitel, in denen
sich das Nachlesen lohnt (unter 70 %, mit Thema und Buchseiten), und für jedes Kapitel einen eigenen Balken
mit Note. Farben: rot unter 45 %, orange ab 45 %, gelb ab 55 %, gelbgrün ab 70 %, grün ab 85 %.

Die Noten folgen dem in der Oberstufe üblichen Schlüssel und sind ausdrücklich als Orientierung
gekennzeichnet:

| ab % | 95 | 90 | 85 | 80 | 75 | 70 | 65 | 60 | 55 | 50 | 45 | 40 | 33 | 27 | 20 | darunter |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Note | 1+ | 1 | 1− | 2+ | 2 | 2− | 3+ | 3 | 3− | 4+ | 4 | 4− | 5+ | 5 | 5− | 6 |

Der Schlüssel steht in `app.js` (`SCHWELLEN`, `NOTEN`) und in `code-pruefen.html` und lässt sich dort anpassen.

### Code

Am Ende der Auswertung steht ein Code wie
`EF1-w9mw0hwr-LU`. Er enthält keinen Namen und keine personenbezogenen Daten und wird nirgendwohin gesendet.

**Aufbau:** `EF1-` + ein Zeichen je Kapitel + `-` + zwei Prüfzeichen.

**Kapitelzeichen:** Wert *v* zur Basis 36 (`0`–`9`, dann `a`–`z`), mit *v* = 3 · *q* + *o*.

* *q* = Anteil der beim **ersten** Versuch richtig gelösten geschlossenen Aufgaben in Zehnteln,
  gerundet (0 bis 10). *q* = 11 heißt: in diesem Kapitel wurde keine geschlossene Aufgabe bearbeitet.
  Übersprungene Aufgaben zählen als nicht richtig, der zweite Versuch zählt nicht.
* *o* = offene Aufgaben des Kapitels: 0 keine bearbeitet, 1 teilweise, 2 alle. Als bearbeitet gilt eine offene
  Aufgabe, wenn mindestens 20 Zeichen geschrieben wurden.

**Prüfzeichen:** *s* = 1·*v₁* + 2·*v₂* + … + 8·*v₈*; davon der Rest bei Division durch 1296, geschrieben als
zwei Zeichen zur Basis 36 in Großbuchstaben. Beispiel: alles richtig und alle offenen Aufgaben bearbeitet
ergibt *v* = 32 = `w` in jedem Kapitel, *s* = 32 · 36 = 1152 = `W0`, also `EF1-wwwwwwww-W0`.

**Wichtig:** Die Prüfzeichen fangen Tippfehler ab (ein falsches oder vertauschtes Zeichen fällt auf). Sie
verhindern keinen Betrug; wer die Rechnung kennt, kann einen passenden Code bilden. Die App ist eine Übung,
keine Klassenarbeit, und der Code ist nur eine Rückmeldung darüber, wo nachgelesen werden sollte.

**Grundlage:** Der Code fasst das jeweils **letzte** Ergebnis jeder Aufgabe zusammen, das auf dem Gerät
gespeichert ist (im Browser-Speicher `localStorage`, nur für den Fortschritt). Wer ein Kapitel erneut
durchgeht, überschreibt das alte Ergebnis. Ohne Browser-Speicher (z. B. privates Fenster) funktioniert die
App trotzdem; der Code bezieht sich dann auf die aktuelle Sitzung. Auf der Startseite lässt sich der
Fortschritt löschen.

**Entschlüsseln:** `code-pruefen.html` öffnen, einen oder mehrere Codes einfügen (einer pro Zeile),
„Auswerten“. Bei einem Code erscheint eine Tabelle mit den acht Kapiteln, dem Anteil und getrennt dem Stand
der offenen Aufgaben, mit Farben, Balken und Noten; bei mehreren eine Übersicht mit Mittelwerten je
Kapitel. Weil der Code die Anteile auf Zehntel rundet und jedes Kapitel gleich gewichtet, kann die Gesamtnote
hier leicht von der Note in der App abweichen; beide dienen nur zur Orientierung. Kapitel ohne offene
Aufgaben (derzeit Kapitel 3) werden mit „keine offenen Aufgaben im Kapitel“ angezeigt.

Kommt ein Kapitel hinzu, wird der Code ein Zeichen länger; ältere Codes passen dann nicht mehr zur Seite.

## Prüfung vor dem Veröffentlichen

```
node pruefung/inhalt-pruefen.js
```

Das Skript prüft jede Aufgabe auf eindeutige Kennung, gültigen Typ, `afb`-Feld, eine richtige Antwort,
Rückmeldetexte, Ausrufezeichen in Rückmeldungen, Ihr-Form und Emojis, vorhandene Bilder, Koordinaten
und gibt die Verteilung nach Kapiteln, Typen und Anforderungsbereichen aus.

## Methodische Hinweise

* 83 Aufgaben, davon 12 offene. Anforderungsbereiche: AFB I 35 (42 %), AFB II 37 (45 %), AFB III 11 (13 %).
* Auf Wunsch entfernt: die offene Aufgabe zur Beurteilung einer Zeichnung in Kapitel 3 (früher k3-11).
  Kapitel 3 hat damit keine offene Aufgabe mehr; das Prüfskript meldet das als Hinweis, nicht als Fehler.
* Etymologien: Griechische Wörter stehen mit Akzent (z. B. kýtos, plastós), lateinische ohne
  (reticulum, membrana, permeare, vacuus, crista); in den Aufgaben ist die Sprache jeweils angegeben.
* Alle 13 Fehlvorstellungen aus dem Auftrag kommen als Ablenker vor; die Rückmeldung erklärt jeweils, warum
  sie nicht tragen. Der Unterschied zwischen Auflösungsvermögen und Vergrößerung wird in mehreren Aufgaben
  bearbeitet, auch im virtuellen Mikroskop (k7-11: Bildschirmzoom macht das Bild nur größer, nicht schärfer).
* Der „Gemischte Durchgang“ zieht 20 Aufgaben, aus jedem Kapitel zwei oder drei.

## Offene Fragen an die Lehrkraft

Bei der Fachprüfung gegen den Auftrag sind folgende Punkte aufgefallen:

1. **Kapitel 6 hat keine Seitenangabe.** In `fragen.js` steht dort `seiten: ""`. Deshalb fehlen bei diesem
   Kapitel die Buchseiten auf der Startseite, in den Aufgaben, in der Auswertung und als Fundstelle.
   Bitte die Seiten nach dem Muster der anderen Kapitel eintragen (etwa `seiten: "S. 12 f.",`); sonst ist
   nichts zu ändern.
2. **Schreibweisen:** Der Ordner `material/` lag nicht vor. Die Schreibweisen stammen aus dem Auftrag
   („Fotosynthese“, „raues ER“, „Mikrofilamente“, „Cytoplasma“). Bitte prüfen, ob die Lerngruppe z. B.
   „Zytoplasma“ oder „Nukleolus“ gewohnt ist.
3. **Abgeleitete Aussagen**, die nicht wörtlich im Auftrag stehen, aber daraus folgen. Bitte kurz bestätigen
   oder streichen:
   * k7-13: In der verschlossenen Flasche steht bald kein Sauerstoff mehr zur Verfügung; das
     Kohlenstoffdioxid bildet in der Flüssigkeit die Kohlensäure.
   * k4-06, k4-11: Pflanzen- und Tierzellen besitzen beide eine Zellmembran; in der Pflanzenzelle liegt sie
     innen an der Zellwand.
   * k6-04: Bakterien besitzen eine Membran (abgeleitet aus Befund M6).
   * k2-10: Was das Mikroskop nicht aufgelöst hat, steckt auch nicht im Foto.
   * k4-10 verbindet Kapitel 4 und 5: Zellwände gibt es auch bei Bakterien (Murein) und Pilzen (Chitin).
4. **Virtuelles Mikroskop:** Für die Größe des Sehfelds wurde eine übliche Sehfeldzahl von 18 mm
   angenommen (Sehfeld 450 µm bei 40fach, 45 µm bei 400fach). Die Zahl wird nicht abgefragt, bestimmt aber
   den Maßstabsbalken. Die Hefezellen sind mit einer hellen Vakuole gezeichnet; das ist eine Annahme zur
   Darstellung, keine abgefragte Aussage.
5. **Bewusst weggelassen:** Viren (20 bis 300 nm) und Ribosomen (etwa 25 nm) sowie Bakterien und Chloroplasten
   überschneiden sich in der Größe; sie stehen deshalb nicht gemeinsam in der Sortieraufgabe. „Lysosomen in
   dieser Ausprägung nur in Tierzellen“ ist nicht als Zuordnung abgefragt, weil die Einschränkung missverständlich
   wäre. Rechnungen „Bildgröße ÷ Vergrößerung“ fehlen, weil sie im Auftrag nicht vorkommen.
