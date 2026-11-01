/* fragen.js – NUR Inhalt. Hier stehen alle Kapitel und Aufgaben.
   Wie man eine Aufgabe ergänzt, steht mit kopierfertigen Beispielen in LIESMICH.md.

   Kurzüberblick über die Felder jeder Aufgabe:
     id           eindeutige Kennung, z. B. "k4-12"
     typ          auswahl | mehrfach | zuordnen | luecken | beschriften | reihenfolge |
                  richtigfalsch | offen | korrigieren | mikroskop
     afb          Anforderungsbereich 1, 2 oder 3 (wird nicht angezeigt)
     auftrag      Arbeitsauftrag im Imperativ
     rueckmeldung { richtig: "…", falsch: "…" }   (nicht bei typ "offen")
     seite        optional: eigene Fundstelle, sonst gilt die Seitenangabe des Kapitels
*/

var KAPITEL = [

  /* ================================================================
     KAPITEL 1
     ================================================================ */
  {
    nr: 1,
    titel: "Kennzeichen des Lebendigen",
    seiten: "S. 12 f.",
    aufgaben: [
      {
        id: "k1-01", typ: "mehrfach", afb: 1,
        auftrag: "Kreuze alle Kennzeichen des Lebendigen an.",
        optionen: [
          { text: "Stoffwechsel", korrekt: true },
          { text: "Reizbarkeit", korrekt: true },
          { text: "Fortpflanzung", korrekt: true },
          { text: "Aufbau aus Zellen", korrekt: true },
          { text: "Angepasstheit durch Evolution", korrekt: true },
          { text: "Wachstum durch Anlagerung von außen", warum: "So wächst ein Kristall; zu den Kennzeichen gehört Wachstum und Entwicklung des Lebewesens selbst." },
          { text: "Vermehrung nur in einer Wirtszelle", warum: "Das beschreibt ein Virus, das keinen eigenen Stoffwechsel hat." }
        ],
        rueckmeldung: {
          richtig: "Stoffwechsel, Reizbarkeit, Fortpflanzung, Aufbau aus Zellen und Angepasstheit durch Evolution sind Kennzeichen des Lebendigen.",
          falsch: "Zu den Kennzeichen gehören Stoffwechsel, Bewegung aus eigener Kraft, Wachstum und Entwicklung, Fortpflanzung, Reizbarkeit, Aufbau aus Zellen und Angepasstheit durch Evolution."
        }
      },
      {
        id: "k1-02", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jedem Grenzfall die passende Beschreibung zu.",
        paare: [
          { begriff: "Virus", ziel: "Kein eigener Stoffwechsel, vermehrt sich nur in einer Wirtszelle" },
          { begriff: "Feuer", ziel: "Wächst und verbraucht Stoffe, besteht aber nicht aus Zellen" },
          { begriff: "Kristall", ziel: "Wächst durch Anlagerung von außen" },
          { begriff: "Samenkorn", ziel: "Lebt, ruht aber" },
          { begriff: "Roboter", ziel: "Bewegt sich, hat aber keinen Stoffwechsel" }
        ],
        rueckmeldung: {
          richtig: "An jedem dieser Grenzfälle zeigt sich: Kein einzelnes Kennzeichen entscheidet allein, ob etwas lebt.",
          falsch: "Richtig ist: Virus – kein eigener Stoffwechsel, Vermehrung nur in einer Wirtszelle; Feuer – wächst und verbraucht Stoffe, besteht nicht aus Zellen; Kristall – wächst durch Anlagerung von außen; Samenkorn – lebt, ruht aber; Roboter – bewegt sich, hat keinen Stoffwechsel."
        }
      },
      {
        id: "k1-03", typ: "richtigfalsch", afb: 2,
        aussage: "Ein Virus lebt, denn es vermehrt sich.",
        korrekt: false,
        rueckmeldung: {
          richtig: "Ein Virus vermehrt sich nur in einer Wirtszelle und hat keinen eigenen Stoffwechsel; es erfüllt die Kennzeichen des Lebendigen nicht vollständig.",
          falsch: "Die Aussage ist falsch. Ein Virus vermehrt sich nur in einer Wirtszelle und hat keinen eigenen Stoffwechsel; die Kennzeichen des Lebendigen erfüllt es deshalb nicht vollständig."
        }
      },
      {
        id: "k1-04", typ: "richtigfalsch", afb: 2,
        aussage: "Feuer wächst und verbraucht Stoffe. Trotzdem ist es nicht lebendig.",
        korrekt: true,
        rueckmeldung: {
          richtig: "Feuer besteht nicht aus Zellen und vermehrt sich nicht; Wachstum und Stoffverbrauch allein reichen nicht aus.",
          falsch: "Die Aussage ist richtig. Feuer besteht nicht aus Zellen und vermehrt sich nicht; Wachstum und Stoffverbrauch allein entscheiden nicht."
        }
      },
      {
        id: "k1-05", typ: "auswahl", afb: 3,
        auftrag: "Ein Kristall wird in einer Salzlösung größer. Wähle die zutreffende Beurteilung.",
        optionen: [
          { text: "Er ist nicht lebendig, denn er wächst nur durch Anlagerung von außen.", korrekt: true },
          { text: "Er ist lebendig, weil Wachstum ein Kennzeichen des Lebendigen ist.", warum: "Ein einzelnes Kennzeichen entscheidet nicht allein darüber, ob etwas lebt." },
          { text: "Er ist ein Grenzfall wie ein Virus, weil er sich nur in einer Wirtszelle vermehrt.", warum: "Die Vermehrung in einer Wirtszelle beschreibt das Virus, nicht den Kristall." },
          { text: "Er lebt, ruht aber, wie ein Samenkorn.", warum: "Ein Samenkorn lebt und ruht; der Kristall dagegen wächst nur durch Anlagerung von außen." }
        ],
        rueckmeldung: {
          richtig: "Der Kristall wächst zwar, aber nur durch Anlagerung von außen; das macht ihn nicht lebendig.",
          falsch: "Richtig ist: Der Kristall ist nicht lebendig, er wächst nur durch Anlagerung von außen."
        }
      },
      {
        id: "k1-06", typ: "korrigieren", afb: 1,
        auftrag: "Finde den Fehler und korrigiere ihn.",
        text: "Ein Virus hat [[einen>keinen]] eigenen Stoffwechsel und vermehrt sich nur in einer Wirtszelle.",
        ersatz: ["keinen", "einen schnellen", "einen pflanzlichen"],
        rueckmeldung: {
          richtig: "Ein Virus hat keinen eigenen Stoffwechsel; vermehren kann es sich nur in einer Wirtszelle.",
          falsch: "Richtig heißt es: Ein Virus hat keinen eigenen Stoffwechsel und vermehrt sich nur in einer Wirtszelle."
        }
      },
      {
        id: "k1-07", typ: "luecken", afb: 2,
        auftrag: "Ergänze den Text.",
        text: "Ein Roboter bewegt sich, hat aber keinen [[Stoffwechsel|Zellkern|Antrieb]]. Ein Samenkorn [[lebt|lebt nicht|wächst]], ruht aber. Daran zeigt sich: [[Kein einzelnes|Jedes einzelne|Nur ein einziges]] Kennzeichen entscheidet allein, ob etwas lebt.",
        rueckmeldung: {
          richtig: "Roboter und Samenkorn zeigen: Kein einzelnes Kennzeichen entscheidet allein.",
          falsch: "Richtig ist: Der Roboter hat keinen Stoffwechsel, das Samenkorn lebt, ruht aber, und kein einzelnes Kennzeichen entscheidet allein."
        }
      },
      {
        id: "k1-08", typ: "offen", afb: 2,
        auftrag: "Erkläre am Beispiel von Feuer und Roboter, warum kein einzelnes Kennzeichen allein entscheidet, ob etwas lebt.",
        musterloesung: "Feuer wächst und verbraucht Stoffe, es besteht aber nicht aus Zellen und vermehrt sich nicht. Ein Roboter bewegt sich, hat aber keinen Stoffwechsel. Beide zeigen also einzelne Kennzeichen des Lebendigen, andere fehlen ihnen. Wer nur auf ein Kennzeichen achtet, würde Feuer oder Roboter fälschlich für lebendig halten. Ob etwas lebt, lässt sich deshalb nur an mehreren Kennzeichen zusammen beurteilen."
      },
      {
        id: "k1-09", typ: "offen", afb: 3,
        auftrag: "Beurteile, ob ein Virus zu den Lebewesen gezählt werden sollte. Beziehe dabei mehrere Kennzeichen des Lebendigen ein.",
        musterloesung: "Für das Virus spricht, dass es sich vermehrt. Diese Vermehrung gelingt aber nur in einer Wirtszelle. Einen eigenen Stoffwechsel hat das Virus nicht. Da kein einzelnes Kennzeichen allein entscheidet und das Virus mehrere Kennzeichen nicht erfüllt, zählt es nicht zu den Lebewesen. Es bleibt ein Grenzfall: Einzelne Merkmale des Lebendigen zeigt es, aber nicht alle."
      }
    ]
  },

  /* ================================================================
     KAPITEL 2
     ================================================================ */
  {
    nr: 2,
    titel: "Vom Mikro- zum Makrokosmos",
    seiten: "S. 18 f.",
    aufgaben: [
      {
        id: "k2-01", typ: "reihenfolge", afb: 1,
        auftrag: "Ordne nach der Größe. Beginne oben mit dem Kleinsten.",
        anfang: "kleinstes",
        ende: "größtes",
        elemente: [
          "Atom",
          "DNA-Doppelhelix (Durchmesser)",
          "Biomembran (Dicke)",
          "Ribosom",
          "Bakterium",
          "Eukaryotische Zelle"
        ],
        rueckmeldung: {
          richtig: "Atom etwa 0,1 nm, DNA-Doppelhelix 2 nm, Biomembran 7 bis 8 nm, Ribosom etwa 25 nm, Bakterium 1 bis 6 µm, eukaryotische Zelle 10 bis 100 µm.",
          falsch: "Richtig ist: Atom (etwa 0,1 nm), DNA-Doppelhelix (2 nm), Biomembran (7 bis 8 nm), Ribosom (etwa 25 nm), Bakterium (1 bis 6 µm), eukaryotische Zelle (10 bis 100 µm). Achte auf die Einheit: 1 µm sind 1000 nm."
        }
      },
      {
        id: "k2-02", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jedem Objekt seine Größe zu.",
        paare: [
          { begriff: "Atom", ziel: "etwa 0,1 nm" },
          { begriff: "DNA-Doppelhelix, Durchmesser", ziel: "2 nm" },
          { begriff: "Biomembran, Dicke", ziel: "7 bis 8 nm" },
          { begriff: "Viren", ziel: "20 bis 300 nm" },
          { begriff: "Bakterium", ziel: "1 bis 6 µm" },
          { begriff: "Chloroplast", ziel: "4 bis 8 µm" },
          { begriff: "Eukaryotische Zelle", ziel: "10 bis 100 µm" }
        ],
        rueckmeldung: {
          richtig: "Atome und Moleküle misst man in Nanometern, Zellen und Organellen in Mikrometern.",
          falsch: "Richtig ist: Atom etwa 0,1 nm, DNA-Doppelhelix 2 nm, Biomembran 7 bis 8 nm, Viren 20 bis 300 nm, Bakterium 1 bis 6 µm, Chloroplast 4 bis 8 µm, eukaryotische Zelle 10 bis 100 µm."
        }
      },
      {
        id: "k2-03", typ: "luecken", afb: 1,
        auftrag: "Rechne um und trage die Zahlen ein.",
        text: "1 mm = [[=1000]] µm = [[=1000000]] nm",
        rueckmeldung: {
          richtig: "Zwischen mm, µm und nm liegt jeweils der Faktor 1000.",
          falsch: "Richtig ist: 1 mm = 1000 µm = 1 000 000 nm. Zwischen mm, µm und nm liegt jeweils der Faktor 1000."
        }
      },
      {
        id: "k2-04", typ: "luecken", afb: 2,
        auftrag: "Rechne um und trage die Zahlen ein.",
        text: "Ein Ribosom ist etwa 25 nm groß. Das sind [[=0,025]] µm. Eine eukaryotische Zelle von 100 µm Durchmesser misst [[=0,1]] mm.",
        rueckmeldung: {
          richtig: "Von nm zu µm und von µm zu mm teilst du jeweils durch 1000.",
          falsch: "Richtig ist: 25 nm = 0,025 µm und 100 µm = 0,1 mm. Von der kleineren zur größeren Einheit teilst du durch 1000."
        }
      },
      {
        id: "k2-05", typ: "auswahl", afb: 1,
        auftrag: "Wähle den Abstand, ab dem das bloße Auge zwei Punkte gerade noch getrennt wahrnimmt.",
        optionen: [
          { text: "etwa 0,1 mm", korrekt: true },
          { text: "etwa 0,2 µm", warum: "So weit reicht das Auflösungsvermögen des Lichtmikroskops, nicht das des Auges." },
          { text: "etwa 1 mm", warum: "Das Auge trennt zwei Punkte schon bei einem Zehntel dieses Abstands." },
          { text: "etwa 0,1 nm", warum: "0,1 nm ist ungefähr die Größe eines Atoms." }
        ],
        rueckmeldung: {
          richtig: "Das bloße Auge trennt zwei Punkte ab etwa 0,1 mm Abstand, also ab 100 µm.",
          falsch: "Richtig ist: etwa 0,1 mm."
        }
      },
      {
        id: "k2-06", typ: "auswahl", afb: 2,
        auftrag: "Zwei Punkte liegen 1 µm auseinander. Wähle aus, womit du sie getrennt sehen kannst.",
        optionen: [
          { text: "Mit dem Lichtmikroskop, aber nicht mit dem bloßen Auge.", korrekt: true },
          { text: "Mit dem bloßen Auge, wenn du genau hinsiehst.", warum: "Das Auge trennt erst ab etwa 0,1 mm, das sind 100 µm." },
          { text: "Nur mit dem Elektronenmikroskop.", warum: "Das Lichtmikroskop trennt schon Punkte ab etwa 0,2 µm Abstand." },
          { text: "Mit jedem Gerät, wenn es nur stark genug vergrößert.", warum: "Entscheidend ist das Auflösungsvermögen, nicht die Vergrößerung." }
        ],
        rueckmeldung: {
          richtig: "1 µm liegt über der Grenze des Lichtmikroskops von etwa 0,2 µm, aber weit unter der des Auges von etwa 0,1 mm.",
          falsch: "Richtig ist: mit dem Lichtmikroskop, nicht mit dem bloßen Auge."
        }
      },
      {
        id: "k2-07", typ: "mehrfach", afb: 2,
        auftrag: "Das Lichtmikroskop trennt zwei Punkte ab etwa 0,2 µm. Kreuze alle Objekte an, die größer sind als diese Grenze.",
        optionen: [
          { text: "Eukaryotische Zelle", korrekt: true },
          { text: "Chloroplast", korrekt: true },
          { text: "Bakterium", korrekt: true },
          { text: "Mitochondrium", korrekt: true },
          { text: "Ribosom", warum: "Ein Ribosom ist etwa 25 nm groß, also 0,025 µm." },
          { text: "DNA-Doppelhelix", warum: "Der Durchmesser der DNA-Doppelhelix beträgt 2 nm." },
          { text: "Biomembran", warum: "Eine Biomembran ist nur 7 bis 8 nm dick." }
        ],
        rueckmeldung: {
          richtig: "Zellen, Mitochondrien und Chloroplasten liegen über 0,2 µm, Ribosomen, DNA und Membranen darunter.",
          falsch: "Richtig sind eukaryotische Zelle, Chloroplast, Bakterium und Mitochondrium; sie alle messen mindestens 1 µm."
        }
      },
      {
        id: "k2-08", typ: "richtigfalsch", afb: 2,
        aussage: "Je stärker ein Mikroskop vergrößert, desto mehr Einzelheiten sind zu sehen.",
        korrekt: false,
        rueckmeldung: {
          richtig: "Mehr Einzelheiten zeigt eine stärkere Vergrößerung nur bis zur Auflösungsgrenze; darüber hinaus entsteht nur ein größeres unscharfes Bild.",
          falsch: "Die Aussage ist falsch. Mehr Einzelheiten zeigt eine stärkere Vergrößerung nur bis zur Auflösungsgrenze; ohne besseres Auflösungsvermögen entsteht nur ein größeres unscharfes Bild."
        }
      },
      {
        id: "k2-09", typ: "offen", afb: 2,
        auftrag: "Erkläre den Unterschied zwischen Vergrößerung und Auflösungsvermögen.",
        musterloesung: "Die Vergrößerung gibt an, um wie viel größer ein Objekt im Bild erscheint. Das Auflösungsvermögen gibt an, wie nah zwei Punkte beieinanderliegen dürfen, damit man sie noch getrennt sieht: beim bloßen Auge etwa 0,1 mm, beim Lichtmikroskop etwa 0,2 µm, beim Elektronenmikroskop weit darunter. Mehr Einzelheiten erkennt man nur mit besserem Auflösungsvermögen. Eine stärkere Vergrößerung ohne besseres Auflösungsvermögen zeigt nur ein größeres unscharfes Bild."
      },
      {
        id: "k2-10", typ: "offen", afb: 3,
        auftrag: "Ein Mitschüler meint: „Wenn ich das Foto aus dem Lichtmikroskop am Tablet stark genug vergrößere, kann ich die Ribosomen erkennen.“ Beurteile diese Aussage.",
        musterloesung: "Die Aussage trifft nicht zu. Ein Ribosom ist etwa 25 nm groß, das Lichtmikroskop trennt aber erst Punkte ab etwa 0,2 µm, also 200 nm. Was das Mikroskop nicht aufgelöst hat, steckt auch nicht im Foto. Das Vergrößern am Tablet erhöht nur die Vergrößerung, nicht das Auflösungsvermögen: Man sieht ein größeres unscharfes Bild, aber keine neuen Einzelheiten. Für Ribosomen braucht man ein Gerät mit besserem Auflösungsvermögen, etwa ein Elektronenmikroskop."
      }
    ]
  },

  /* ================================================================
     KAPITEL 3
     ================================================================ */
  {
    nr: 3,
    titel: "Mikroskopieren und wissenschaftliche Zeichnung",
    seiten: "S. 22 f.",
    aufgaben: [
      {
        id: "k3-01", typ: "beschriften", afb: 1,
        auftrag: "Beschrifte das Lichtmikroskop.",
        bild: "lichtmikroskop",
        punkte: [
          { name: "Okular", x: 41.67, y: 10.91, mx: 11.11, my: 10.23, lage: "ganz oben, dort schaut man hinein" },
          { name: "Tubus", x: 41.67, y: 28.41, mx: 11.11, my: 27.27, lage: "das senkrechte Rohr unter dem Einblick" },
          { name: "Objektivrevolver", x: 41.67, y: 42.95, mx: 11.11, my: 38.64, lage: "die Drehscheibe unter dem Rohr" },
          { name: "Objektiv", x: 41.67, y: 49.55, mx: 11.11, my: 50.45, lage: "die Linse, die senkrecht nach unten zeigt" },
          { name: "Objekttisch", x: 25, y: 57.05, mx: 11.11, my: 63.64, lage: "die waagerechte dunkle Platte mit den Klammern" },
          { name: "Fuß", x: 25, y: 92.05, mx: 8.33, my: 84.09, lage: "der breite Standfuß ganz unten" }
        ],
        weitere: ["Kondensor", "Feintrieb"],
        rueckmeldung: {
          richtig: "Okular und Objektiv sind die beiden Linsen, deren Vergrößerungen zusammen die Gesamtvergrößerung ergeben.",
          falsch: "Oben sitzt das Okular, darunter Tubus und Objektivrevolver mit den Objektiven; die Platte für das Präparat ist der Objekttisch."
        }
      },
      {
        id: "k3-02", typ: "beschriften", afb: 1,
        auftrag: "Beschrifte die weiteren Teile des Lichtmikroskops.",
        bild: "lichtmikroskop",
        punkte: [
          { name: "Kondensor", x: 41.67, y: 61.36, mx: 11.11, my: 68.18, lage: "das kurze Rohr direkt unter dem Tisch" },
          { name: "Blende", x: 32, y: 65.6, mx: 11.11, my: 78.41, lage: "der Hebel an der Scheibe unter dem kurzen Rohr" },
          { name: "Lichtquelle", x: 41.67, y: 88.18, mx: 91.67, my: 93.18, lage: "die Lampe im Standfuß" },
          { name: "Grobtrieb", x: 66.11, y: 68.18, mx: 90.28, my: 64.77, lage: "der große Drehknopf am Arm" },
          { name: "Feintrieb", x: 66.11, y: 77.73, mx: 90.28, my: 78.41, lage: "der kleine Drehknopf am Arm" },
          { name: "Stativ", x: 58.06, y: 45.45, mx: 90.28, my: 45.45, lage: "der gebogene Arm, der alles trägt" }
        ],
        weitere: ["Okular", "Tubus"],
        rueckmeldung: {
          richtig: "Kondensor, Blende und Lichtquelle liegen unter dem Objekttisch, Grobtrieb und Feintrieb sitzen am Stativ.",
          falsch: "Unter dem Objekttisch liegen Kondensor und Blende, im Fuß die Lichtquelle; am Stativ sitzen der große Grobtrieb und der kleine Feintrieb."
        }
      },
      {
        id: "k3-03", typ: "luecken", afb: 2,
        auftrag: "Ergänze den Text.",
        text: "Gesamtvergrößerung = Vergrößerung des [[Okulars|Kondensors|Tubus]] × Vergrößerung des [[Objektivs|Objekttischs|Stativs]]. Mit einem 10×-Okular und dem 10er-Objektiv vergrößert das Mikroskop [[=100]]fach, mit dem 40er-Objektiv [[=400]]fach.",
        rueckmeldung: {
          richtig: "Die Gesamtvergrößerung ist das Produkt aus Okular- und Objektivvergrößerung.",
          falsch: "Richtig ist: Okular × Objektiv, also 10 × 10 = 100fach und 10 × 40 = 400fach."
        }
      },
      {
        id: "k3-04", typ: "richtigfalsch", afb: 2,
        aussage: "Mit einem 10×-Okular und dem 40er-Objektiv vergrößert das Mikroskop 50fach.",
        korrekt: false,
        rueckmeldung: {
          richtig: "Die Vergrößerungen werden multipliziert, nicht addiert: 10 × 40 = 400fach.",
          falsch: "Die Aussage ist falsch. Die Vergrößerungen werden multipliziert, nicht addiert: 10 × 40 = 400fach."
        }
      },
      {
        id: "k3-05", typ: "mikroskop", afb: 1,
        auftrag: "Drehe den Objektivrevolver auf das Objektiv, mit dem du beim Mikroskopieren beginnst. Prüfe dann.",
        objekt: "hefe",
        okular: 10,
        objektive: [4, 10, 40],
        start: 40,
        ziel: 40,
        rueckmeldung: {
          richtig: "Du beginnst mit der kleinsten Vergrößerung, stellst scharf und wechselst erst danach auf eine stärkere.",
          falsch: "Richtig ist das 4er-Objektiv, also 40fache Gesamtvergrößerung. Du beginnst mit der kleinsten Vergrößerung und wechselst erst nach dem Scharfstellen."
        }
      },
      {
        id: "k3-06", typ: "mikroskop", afb: 2,
        auftrag: "Das Okular vergrößert 10fach. Stelle eine Gesamtvergrößerung von 100fach ein.",
        objekt: "hefe",
        okular: 10,
        objektive: [4, 10, 40],
        start: 4,
        ziel: 100,
        rueckmeldung: {
          richtig: "10 × 10 = 100fach: Dafür brauchst du das 10er-Objektiv.",
          falsch: "Richtig ist das 10er-Objektiv, denn 10 × 10 = 100."
        }
      },
      {
        id: "k3-07", typ: "reihenfolge", afb: 1,
        auftrag: "Bringe die Arbeitsschritte in die richtige Reihenfolge.",
        anfang: "erster Schritt",
        ende: "letzter Schritt",
        elemente: [
          "Gib das Objekt in einen Tropfen Wasser auf den Objektträger.",
          "Lege das Deckglas schräg von einer Seite ab.",
          "Stelle die kleinste Vergrößerung ein.",
          "Stelle das Bild scharf.",
          "Wechsle auf eine stärkere Vergrößerung."
        ],
        rueckmeldung: {
          richtig: "Das schräg abgelegte Deckglas verhindert Luftblasen, und du beginnst immer mit der kleinsten Vergrößerung.",
          falsch: "Richtig ist: Objekt in den Wassertropfen, Deckglas schräg ablegen, kleinste Vergrößerung einstellen, scharf stellen, erst dann auf eine stärkere Vergrößerung wechseln."
        }
      },
      {
        id: "k3-08", typ: "auswahl", afb: 3,
        auftrag: "Ein Mitschüler will Ribosomen in einer Zelle sehen und wechselt dazu auf das 40er-Objektiv. Beurteile sein Vorgehen.",
        optionen: [
          { text: "Das gelingt nicht: Ribosomen sind etwa 25 nm groß und liegen weit unter der Auflösungsgrenze des Lichtmikroskops von etwa 0,2 µm.", korrekt: true },
          { text: "Das gelingt, denn 400fache Vergrößerung reicht für alle Zellbestandteile aus.", warum: "Was unter der Auflösungsgrenze liegt, wird auch bei stärkerer Vergrößerung nicht sichtbar." },
          { text: "Das gelingt nur mit dem 10er-Objektiv, weil das Bild dann schärfer ist.", warum: "Eine schwächere Vergrößerung macht die Ribosomen ebenso wenig sichtbar; es entscheidet das Auflösungsvermögen." },
          { text: "Das gelingt, wenn er zusätzlich das Foto am Tablet vergrößert.", warum: "Das liefert nur ein größeres unscharfes Bild, keine neuen Einzelheiten." }
        ],
        rueckmeldung: {
          richtig: "Ribosomen bleiben im Lichtmikroskop unsichtbar, gleich wie stark es vergrößert; entscheidend ist das Auflösungsvermögen.",
          falsch: "Richtig ist: Das gelingt nicht, denn Ribosomen (etwa 25 nm) liegen weit unter der Auflösungsgrenze des Lichtmikroskops (etwa 0,2 µm)."
        }
      },
      {
        id: "k3-09", typ: "mehrfach", afb: 2,
        auftrag: "Eine Schülerin zeichnet Hefezellen. Kreuze alles an, was gegen die Regeln der wissenschaftlichen Zeichnung verstößt.",
        optionen: [
          { text: "Sie schattiert die Zellränder, damit die Zellen räumlich wirken.", korrekt: true },
          { text: "Sie ergänzt einen Zellkern, den sie im Mikroskop nicht sieht.", korrekt: true },
          { text: "Ihre Beschriftungslinien verlaufen schräg und kreuzen sich.", korrekt: true },
          { text: "Sie zeichnet mit Bleistift.", warum: "Der Bleistift ist für wissenschaftliche Zeichnungen vorgeschrieben." },
          { text: "Sie zeichnet klare, geschlossene Linien.", warum: "Klare, geschlossene Linien entsprechen den Regeln." },
          { text: "Sie notiert Objekt und Vergrößerung.", warum: "Objekt, Vergrößerung und gegebenenfalls Färbung gehören zu jeder Zeichnung." }
        ],
        rueckmeldung: {
          richtig: "Keine Schattierung, nur Sichtbares zeichnen, Beschriftung über waagerechte Linien ohne Kreuzung.",
          falsch: "Richtig sind: die Schattierung, der nicht gesehene Zellkern und die schrägen, sich kreuzenden Linien verstoßen gegen die Regeln."
        }
      },
      {
        id: "k3-10", typ: "korrigieren", afb: 1,
        auftrag: "Finde den Fehler und korrigiere ihn.",
        text: "Lege das Deckglas [[waagerecht>schräg]] von einer Seite ab, damit keine Luftblasen entstehen.",
        ersatz: ["schräg", "schnell", "feucht"],
        rueckmeldung: {
          richtig: "Wird das Deckglas schräg von einer Seite abgelegt, entstehen keine Luftblasen.",
          falsch: "Richtig heißt es: Lege das Deckglas schräg von einer Seite ab, damit keine Luftblasen entstehen."
        }
      }
    ]
  },

  /* ================================================================
     KAPITEL 4
     ================================================================ */
  {
    nr: 4,
    titel: "Zellorganellen",
    seiten: "S. 24 f.",
    aufgaben: [
      {
        id: "k4-01", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jedem Bestandteil der Zelle seine Aufgabe zu.",
        paare: [
          { begriff: "Zellkern", ziel: "Enthält die DNA und steuert die Zelle" },
          { begriff: "Ribosomen", ziel: "Proteinsynthese" },
          { begriff: "Glattes ER", ziel: "Lipidsynthese, Entgiftung, Speicherung von Calcium-Ionen" },
          { begriff: "Golgi-Apparat", ziel: "Verändert, verpackt und versendet Stoffe in Vesikeln" },
          { begriff: "Lysosom", ziel: "Baut mit Verdauungsenzymen Stoffe und Zellbestandteile ab" },
          { begriff: "Mitochondrium", ziel: "Zellatmung, liefert ATP" },
          { begriff: "Vakuole", ziel: "Speicher und Abfallraum, erzeugt den Turgor" },
          { begriff: "Zellmembran", ziel: "Grenzt ab und regelt, was hinein- und hinausgelangt" }
        ],
        rueckmeldung: {
          richtig: "Jeder dieser Bestandteile übernimmt eine eigene Aufgabe in der Zelle.",
          falsch: "Richtig ist: Zellkern – DNA und Steuerung; Ribosomen – Proteinsynthese; glattes ER – Lipidsynthese, Entgiftung, Calcium-Speicher; Golgi-Apparat – verändert, verpackt, versendet in Vesikeln; Lysosom – Abbau mit Verdauungsenzymen; Mitochondrium – Zellatmung, ATP; Vakuole – Speicher, Turgor; Zellmembran – grenzt ab und regelt den Stoffaustausch."
        }
      },
      {
        id: "k4-02", typ: "mehrfach", afb: 1,
        auftrag: "Kreuze alle Bestandteile an, die von einer Membran umgeben sind.",
        optionen: [
          { text: "Zellkern", korrekt: true },
          { text: "Mitochondrium", korrekt: true },
          { text: "Golgi-Apparat", korrekt: true },
          { text: "Lysosom", korrekt: true },
          { text: "Vakuole", korrekt: true },
          { text: "Raues ER", korrekt: true },
          { text: "Ribosomen", warum: "Ribosomen sind von keiner Membran umgeben; sie sind die einzigen Organellen ohne Membran." },
          { text: "Zellwand", warum: "Die Zellwand ist keine Membran und kein Organell im engeren Sinn." }
        ],
        rueckmeldung: {
          richtig: "Ribosomen sind die einzigen Organellen ohne Membran; die Zellwand ist gar kein Organell im engeren Sinn.",
          falsch: "Richtig sind Zellkern, Mitochondrium, Golgi-Apparat, Lysosom, Vakuole und raues ER."
        }
      },
      {
        id: "k4-03", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jedem Fachbegriff seine sprachliche Herkunft zu.",
        paare: [
          { begriff: "Mitochondrium", ziel: "griech. mítos Faden + chondríon Körnchen" },
          { begriff: "Lysosom", ziel: "griech. lýsis Auflösung + sôma Körper" },
          { begriff: "Vakuole", ziel: "lat. vacuus leer" },
          { begriff: "Tonoplast", ziel: "griech. tónos Spannung" },
          { begriff: "Cristae", ziel: "lat. crista Kamm" },
          { begriff: "Eukaryot", ziel: "griech. eu echt + káryon Kern" }
        ],
        ablenker: [
          { begriff: "Golgi-Apparat", warum: "Der Golgi-Apparat ist nach dem Forscher Camillo Golgi benannt; „Golgi“ ist kein griechisches oder lateinisches Wort." }
        ],
        rueckmeldung: {
          richtig: "Die meisten Fachbegriffe beschreiben Aussehen oder Aufgabe; der Golgi-Apparat trägt dagegen den Namen des Forschers Camillo Golgi.",
          falsch: "Richtig ist: Mitochondrium – Faden + Körnchen; Lysosom – Auflösung + Körper; Vakuole – leer; Tonoplast – Spannung; Cristae – Kamm; Eukaryot – echt + Kern. Der Golgi-Apparat bleibt übrig, er ist nach Camillo Golgi benannt."
        }
      },
      {
        id: "k4-04", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jedem griechischen oder lateinischen Wortteil seine Bedeutung zu.",
        paare: [
          { begriff: "éndon (griech.)", ziel: "innen" },
          { begriff: "reticulum (lat.)", ziel: "Netzchen" },
          { begriff: "membrana (lat.)", ziel: "Häutchen" },
          { begriff: "permeare (lat.)", ziel: "hindurchgehen" },
          { begriff: "kýtos (griech.)", ziel: "Hohlgefäß, Zelle" },
          { begriff: "plastós (griech.)", ziel: "geformt" },
          { begriff: "chlorós (griech.)", ziel: "grün" },
          { begriff: "leukós (griech.)", ziel: "weiß" }
        ],
        rueckmeldung: {
          richtig: "Mit diesen Wortteilen entschlüsselst du Begriffe wie Endoplasmatisches Retikulum, Cytoplasma oder Leukoplast.",
          falsch: "Richtig ist: éndon (griech.) – innen, reticulum (lat.) – Netzchen, membrana (lat.) – Häutchen, permeare (lat.) – hindurchgehen, kýtos (griech.) – Hohlgefäß, Zelle, plastós (griech.) – geformt, chlorós (griech.) – grün, leukós (griech.) – weiß."
        }
      },
      {
        id: "k4-05", typ: "auswahl", afb: 2,
        auftrag: "Wähle die zutreffende Beschreibung des rauen ER.",
        optionen: [
          { text: "Es ist mit Ribosomen besetzt und dient der Proteinsynthese und dem Stofftransport innerhalb der Zelle.", korrekt: true },
          { text: "Es dient dem Stofftransport zwischen benachbarten Zellen.", warum: "Das ER transportiert intrazellulär, also innerhalb der Zelle, nicht interzellulär zwischen Zellen." },
          { text: "Es dient der Lipidsynthese, der Entgiftung und der Speicherung von Calcium-Ionen.", warum: "Das sind die Aufgaben des glatten ER." },
          { text: "Es baut mit Verdauungsenzymen Zellbestandteile ab.", warum: "Das ist die Aufgabe der Lysosomen." }
        ],
        rueckmeldung: {
          richtig: "Das raue ER trägt Ribosomen und transportiert Stoffe intrazellulär, also innerhalb der Zelle.",
          falsch: "Richtig ist: Das raue ER ist mit Ribosomen besetzt und dient der Proteinsynthese und dem intrazellulären Stofftransport."
        }
      },
      {
        id: "k4-06", typ: "auswahl", afb: 2,
        auftrag: "Wähle die Aussage, die Zellwand und Zellmembran richtig unterscheidet.",
        optionen: [
          { text: "Die Zellwand gibt Festigkeit und Form; die Zellmembran grenzt ab und regelt, was hinein- und hinausgelangt.", korrekt: true },
          { text: "Zellwand und Zellmembran sind zwei Namen für dieselbe Struktur.", warum: "Es sind zwei verschiedene Strukturen mit verschiedenen Aufgaben." },
          { text: "Die Zellmembran kommt nur in Pflanzenzellen vor, die Zellwand in allen Zellen.", warum: "Tierzellen haben keine Zellwand, eine Zellmembran haben Pflanzen- und Tierzellen." },
          { text: "Die Zellwand ist ein Organell mit Doppelmembran.", warum: "Die Zellwand ist kein Organell im engeren Sinn und hat keine Membran." }
        ],
        rueckmeldung: {
          richtig: "Zellwand und Zellmembran sind verschiedene Strukturen: Die Wand festigt, die Membran grenzt ab und regelt den Stoffaustausch.",
          falsch: "Richtig ist: Die Zellwand gibt Festigkeit und Form, die Zellmembran grenzt ab und regelt, was hinein- und hinausgelangt."
        }
      },
      {
        id: "k4-07", typ: "zuordnen", afb: 2,
        auftrag: "Betrachte die beiden Zellen. Ordne jeden Bestandteil zu.",
        bild: "zellen",
        paare: [
          { begriff: "Zellwand", ziel: "nur in der Pflanzenzelle" },
          { begriff: "Plastiden", ziel: "nur in der Pflanzenzelle" },
          { begriff: "Große Vakuole", ziel: "nur in der Pflanzenzelle" },
          { begriff: "Zentriolen", ziel: "nur in der Tierzelle" },
          { begriff: "Mitochondrien", ziel: "in beiden Zellen" },
          { begriff: "Zellkern", ziel: "in beiden Zellen" },
          { begriff: "Zellmembran", ziel: "in beiden Zellen" }
        ],
        rueckmeldung: {
          richtig: "Zellwand, Plastiden und große Vakuole gibt es nur in der Pflanzenzelle, Zentriolen nur in der Tierzelle; Mitochondrien besitzen beide.",
          falsch: "Richtig ist: nur Pflanzenzelle – Zellwand, Plastiden, große Vakuole; nur Tierzelle – Zentriolen; in beiden – Mitochondrien, Zellkern, Zellmembran. Auch Pflanzenzellen haben Mitochondrien."
        }
      },
      {
        id: "k4-08", typ: "beschriften", afb: 1,
        auftrag: "Beschrifte die Pflanzenzelle.",
        bild: "pflanzenzelle",
        punkte: [
          { name: "Zellwand", x: 16.5, y: 68.3, mx: 6.5, my: 74, lage: "die dicke äußere Schicht" },
          { name: "Zellmembran", x: 41.25, y: 82.7, mx: 41.25, my: 95.3, lage: "die dünne Linie direkt innerhalb der äußeren Schicht" },
          { name: "Vakuole", x: 56.25, y: 50, mx: 56.25, my: 6, lage: "der große helle Raum in der Mitte" },
          { name: "Chloroplast", x: 43.75, y: 22, mx: 30, my: 6, lage: "ein grüner ovaler Körper" },
          { name: "Zellkern", x: 27.5, y: 50, mx: 6.5, my: 43.3, lage: "der runde Körper am linken Rand mit dunklem Punkt" },
          { name: "Mitochondrium", x: 78.75, y: 60.67, mx: 93.5, my: 68.7, lage: "ein kleiner gelber Körper mit Querstrichen" }
        ],
        weitere: ["Golgi-Apparat", "Lysosom"],
        rueckmeldung: {
          richtig: "Zellwand, große Vakuole und Chloroplasten kennzeichnen die Pflanzenzelle.",
          falsch: "Außen liegt die Zellwand, direkt darunter die Zellmembran; den großen hellen Raum bildet die Vakuole, grün sind die Chloroplasten."
        }
      },
      {
        id: "k4-09", typ: "luecken", afb: 1,
        auftrag: "Ergänze den Text.",
        text: "Der Zellkern ist von der [[Kernhülle|Zellwand|Thylakoidmembran]] umgeben, die [[Kernporen|Cristae|Grana]] besitzt. Im Kern liegt der [[Nucleolus|Tonoplast|Granum]]. Der Golgi-Apparat ist ein Stapel aus [[Dictyosomen|Thylakoiden|Lysosomen]]. Das Cytoskelett besteht aus Mikrotubuli, [[Mikrofilamenten|Ribosomen|Cristae]] und Intermediärfilamenten.",
        rueckmeldung: {
          richtig: "Kernhülle, Kernporen und Nucleolus gehören zum Zellkern, Dictyosomen zum Golgi-Apparat, Mikrofilamente zum Cytoskelett.",
          falsch: "Richtig ist: Kernhülle, Kernporen, Nucleolus, Dictyosomen, Mikrofilamenten."
        }
      },
      {
        id: "k4-10", typ: "richtigfalsch", afb: 3,
        aussage: "Eine Zelle mit Zellwand muss eine Pflanzenzelle sein.",
        korrekt: false,
        seite: "S. 24 f. und S. 46 f.",
        rueckmeldung: {
          richtig: "Auch Bakterien, mit einer Zellwand aus Murein, und Pilze, mit einer Zellwand aus Chitin, besitzen eine Zellwand.",
          falsch: "Die Aussage ist falsch. Eine Zellwand haben auch Bakterien (aus Murein) und Pilze (aus Chitin); die Zellwand der Pflanzen besteht aus Cellulose."
        }
      },
      {
        id: "k4-11", typ: "offen", afb: 2,
        auftrag: "Vergleiche Zellwand und Zellmembran nach Aufgabe und Vorkommen.",
        musterloesung: "Die Zellwand gibt der Zelle Festigkeit und Form. Sie ist kein Organell im engeren Sinn und kommt bei Pflanzen vor, außerdem bei Pilzen und Bakterien; Tierzellen haben keine Zellwand. Die Zellmembran grenzt die Zelle ab und regelt, was hinein- und hinausgelangt. Sie ist eine einfache Membran, die Pflanzen- und Tierzellen besitzen; in der Pflanzenzelle liegt sie innen an der Zellwand. Zellwand und Zellmembran sind also verschiedene Strukturen mit verschiedenen Aufgaben."
      }
    ]
  },

  /* ================================================================
     KAPITEL 5
     ================================================================ */
  {
    nr: 5,
    titel: "Prokaryoten und Eukaryoten",
    seiten: "S. 46 f.",
    aufgaben: [
      {
        id: "k5-01", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jedes Merkmal der passenden Zellform zu.",
        paare: [
          { begriff: "Kein echter Zellkern", ziel: "Prokaryotische Zelle" },
          { begriff: "DNA ringförmig, frei im Cytoplasma", ziel: "Prokaryotische Zelle" },
          { begriff: "Zusätzlich Plasmide", ziel: "Prokaryotische Zelle" },
          { begriff: "Zellwand aus Murein", ziel: "Prokaryotische Zelle" },
          { begriff: "DNA linear, mit Proteinen zu Chromosomen verpackt", ziel: "Eukaryotische Zelle" },
          { begriff: "Zahlreiche membranumhüllte Organellen", ziel: "Eukaryotische Zelle" },
          { begriff: "Ribosomen auch am rauen ER", ziel: "Eukaryotische Zelle" },
          { begriff: "Einzellig und vielzellig", ziel: "Eukaryotische Zelle" }
        ],
        rueckmeldung: {
          richtig: "Eukaryoten besitzen einen echten Zellkern und membranumhüllte Organellen, Prokaryoten nicht.",
          falsch: "Richtig ist: prokaryotisch – kein echter Zellkern, ringförmige DNA frei im Cytoplasma, Plasmide, Zellwand aus Murein; eukaryotisch – lineare DNA in Chromosomen, zahlreiche membranumhüllte Organellen, Ribosomen auch am rauen ER, einzellig und vielzellig."
        }
      },
      {
        id: "k5-02", typ: "beschriften", afb: 1,
        auftrag: "Beschrifte die Bakterienzelle.",
        bild: "bakterium",
        punkte: [
          { name: "Zellwand", x: 13.75, y: 50, mx: 5.5, my: 68.75, lage: "die äußere, dickere Schicht" },
          { name: "Zellmembran", x: 50, y: 72.92, mx: 50, my: 92.5, lage: "die dünne Linie innerhalb der äußeren Schicht" },
          { name: "Cytoplasma", x: 27.5, y: 34.17, mx: 27.5, my: 8.33, lage: "der helle Innenraum" },
          { name: "Ringförmige DNA", x: 53.75, y: 37.5, mx: 57.5, my: 8.33, lage: "die große geschlossene Schleife in der Mitte" },
          { name: "Plasmid", x: 75, y: 58.33, mx: 94.5, my: 70.83, lage: "ein kleiner Ring" },
          { name: "Ribosomen", x: 67.5, y: 66.67, mx: 75, my: 92.5, lage: "einer der vielen Punkte" }
        ],
        weitere: ["Zellkern", "Mitochondrium"],
        rueckmeldung: {
          richtig: "Die DNA liegt frei im Cytoplasma; einen Zellkern gibt es nicht.",
          falsch: "Außen liegt die Zellwand, darunter die Zellmembran; im Cytoplasma liegen die ringförmige DNA, kleine Plasmide und die Ribosomen. Zellkern und Mitochondrien fehlen."
        }
      },
      {
        id: "k5-03", typ: "auswahl", afb: 2,
        auftrag: "Wähle aus, wo die DNA einer prokaryotischen Zelle liegt.",
        optionen: [
          { text: "Frei im Cytoplasma, ringförmig, zusätzlich in Plasmiden.", korrekt: true },
          { text: "Prokaryoten haben keine DNA, weil ihnen der Zellkern fehlt.", warum: "Prokaryoten besitzen DNA, nur liegt sie nicht in einem Zellkern." },
          { text: "Im Zellkern, linear und zu Chromosomen verpackt.", warum: "So liegt die DNA bei Eukaryoten; Prokaryoten haben keinen echten Zellkern." },
          { text: "In den Mitochondrien.", warum: "Prokaryoten haben keine membranumhüllten Organellen, also auch keine Mitochondrien." }
        ],
        rueckmeldung: {
          richtig: "Prokaryoten haben DNA, nur nicht in einem Zellkern: Sie liegt ringförmig frei im Cytoplasma.",
          falsch: "Richtig ist: frei im Cytoplasma, ringförmig, dazu Plasmide."
        }
      },
      {
        id: "k5-04", typ: "richtigfalsch", afb: 2,
        aussage: "Eukaryoten sind weiterentwickelt und deshalb den Prokaryoten überlegen.",
        korrekt: false,
        rueckmeldung: {
          richtig: "Prokaryoten teilen sich alle 20 Minuten, stellen ihren Stoffwechsel schnell um und besiedeln jeden Lebensraum; beide Gruppen bestehen seit Milliarden Jahren nebeneinander.",
          falsch: "Die Aussage ist falsch. Prokaryoten teilen sich alle 20 Minuten statt rund alle 10 Stunden, stellen ihren Stoffwechsel schnell um, besiedeln jeden Lebensraum und überdauern als Dauerformen; beide Gruppen bestehen seit Milliarden Jahren nebeneinander."
        }
      },
      {
        id: "k5-05", typ: "mehrfach", afb: 2,
        auftrag: "Kreuze alle Eigenschaften an, die Prokaryoten erfolgreich machen.",
        optionen: [
          { text: "Sie teilen sich etwa alle 20 Minuten.", korrekt: true },
          { text: "Sie stellen ihren Stoffwechsel schnell um.", korrekt: true },
          { text: "Sie besiedeln jeden Lebensraum.", korrekt: true },
          { text: "Sie überdauern ungünstige Zeiten als Dauerformen.", korrekt: true },
          { text: "Ihre Zellen sind stark kompartimentiert.", warum: "Kompartimentierung fehlt den Prokaryoten; sie ist ein Merkmal der Eukaryoten." },
          { text: "Ein Zellkern schützt die DNA.", warum: "Prokaryoten haben keinen echten Zellkern." }
        ],
        rueckmeldung: {
          richtig: "Schnelle Teilung, schnelle Umstellung, jeder Lebensraum, Dauerformen: Prokaryoten sind nicht die schlechteren Zellen.",
          falsch: "Richtig sind: Teilung etwa alle 20 Minuten, schnelle Umstellung des Stoffwechsels, Besiedlung jedes Lebensraums und Dauerformen."
        }
      },
      {
        id: "k5-06", typ: "mehrfach", afb: 1,
        auftrag: "Kreuze alle Vorteile der Kompartimentierung an.",
        optionen: [
          { text: "Auf- und Abbau können in getrennten Reaktionsräumen gleichzeitig ablaufen.", korrekt: true },
          { text: "Jeder Reaktionsraum lässt sich für sich regulieren.", korrekt: true },
          { text: "Es entsteht mehr Membranfläche, an der Energieumwandlung stattfindet.", korrekt: true },
          { text: "Stoffe lassen sich gezielt zu ihrem Zielort transportieren.", korrekt: true },
          { text: "Die Zelle teilt sich dadurch schneller.", warum: "Eukaryotische Zellen brauchen für eine Teilung rund 10 Stunden, Prokaryoten nur etwa 20 Minuten." },
          { text: "Die DNA liegt dadurch frei im Cytoplasma.", warum: "Frei im Cytoplasma liegt die DNA bei Prokaryoten, die keine Kompartimente haben." }
        ],
        rueckmeldung: {
          richtig: "Getrennte Reaktionsräume, eigene Regulation, mehr Membranfläche und gezielter Transport sind die Vorteile.",
          falsch: "Richtig sind: getrennte Reaktionsräume für gleichzeitigen Auf- und Abbau, Regulation jedes Raums, mehr Membranfläche und gezielter Transport."
        }
      },
      {
        id: "k5-07", typ: "luecken", afb: 2,
        auftrag: "Vergleiche die Volumen und trage die Zahl ein.",
        text: "Eine prokaryotische Zelle hat ein Volumen von etwa 1 µm³, eine eukaryotische von etwa 10 000 µm³. Das Volumen der eukaryotischen Zelle ist also etwa [[=10000]]-mal so groß.",
        rueckmeldung: {
          richtig: "10 000 µm³ geteilt durch 1 µm³ ergibt 10 000: Im Volumen ist die eukaryotische Zelle etwa zehntausendmal so groß.",
          falsch: "Richtig ist: etwa 10 000-mal, denn 10 000 µm³ geteilt durch 1 µm³ ergibt 10 000."
        }
      },
      {
        id: "k5-08", typ: "korrigieren", afb: 1,
        auftrag: "Finde den Fehler und korrigiere ihn.",
        text: "Die Ribosomen der Prokaryoten sind [[größer>kleiner]] als die der Eukaryoten und liegen frei im Cytoplasma.",
        ersatz: ["kleiner", "schwerer", "dunkler"],
        rueckmeldung: {
          richtig: "Prokaryoten haben kleinere Ribosomen frei im Cytoplasma, Eukaryoten größere, auch am rauen ER.",
          falsch: "Richtig heißt es: Die Ribosomen der Prokaryoten sind kleiner als die der Eukaryoten und liegen frei im Cytoplasma."
        }
      },
      {
        id: "k5-09", typ: "offen", afb: 2,
        auftrag: "Vergleiche prokaryotische und eukaryotische Zellen in Bezug auf Zellkern, Lage der DNA und Organellen.",
        musterloesung: "Prokaryotische Zellen haben keinen echten Zellkern. Ihre DNA ist ringförmig und liegt frei im Cytoplasma, dazu kommen Plasmide. Membranumhüllte Organellen fehlen, die Zelle ist nicht kompartimentiert. Eukaryotische Zellen besitzen einen echten Zellkern mit Kernhülle. Ihre DNA ist linear, mit Proteinen zu Chromosomen verpackt und liegt im Zellkern. Sie haben zahlreiche membranumhüllte Organellen und sind ausgeprägt kompartimentiert. Ribosomen besitzen beide, Prokaryoten kleinere, Eukaryoten größere."
      },
      {
        id: "k5-10", typ: "offen", afb: 3,
        auftrag: "Eine Mitschülerin sagt: „Bakterien sind primitive Zellen. Eukaryoten sind weiterentwickelt und ihnen deshalb überlegen.“ Beurteile diese Aussage.",
        musterloesung: "Die Aussage trifft nicht zu. Eukaryotische Zellen sind zwar größer und stärker kompartimentiert, daraus folgt aber keine Überlegenheit. Prokaryoten teilen sich etwa alle 20 Minuten, eine eukaryotische Zelle braucht rund 10 Stunden. Prokaryoten stellen ihren Stoffwechsel schnell um, besiedeln jeden Lebensraum und überdauern ungünstige Zeiten als Dauerformen. Beide Gruppen bestehen seit Milliarden Jahren nebeneinander. Sie sind auf unterschiedliche Weise erfolgreich; keine ist der anderen überlegen."
      }
    ]
  },

  /* ================================================================
     KAPITEL 6
     ================================================================ */
  {
    nr: 6,
    titel: "Endosymbiontentheorie",
    seiten: "",
    aufgaben: [
      {
        id: "k6-01", typ: "luecken", afb: 1,
        auftrag: "Ergänze die beiden Hypothesen.",
        text: "Hypothese A: Mitochondrien und Chloroplasten entstanden aus [[Einstülpungen der Zellmembran|aufgenommenen Bakterien|Ribosomen]], die sich nach innen abschnürten und spezialisierten. Hypothese B: Sie gehen auf [[Bakterien|Viren|Einstülpungen]] zurück, die eine größere Zelle aufnahm und nicht [[verdaute|teilte|ausschied]].",
        rueckmeldung: {
          richtig: "A erklärt die Organellen durch Einstülpung, B durch die Aufnahme von Bakterien ohne Verdauung.",
          falsch: "Richtig ist: A – Einstülpungen der Zellmembran; B – Bakterien, die eine größere Zelle aufnahm und nicht verdaute."
        }
      },
      {
        id: "k6-02", typ: "mehrfach", afb: 1,
        auftrag: "Für einige Bestandteile der Zelle gilt Hypothese A, die Einstülpung, bis heute. Kreuze sie an.",
        optionen: [
          { text: "Kernhülle", korrekt: true },
          { text: "Endoplasmatisches Retikulum", korrekt: true },
          { text: "Golgi-Apparat", korrekt: true },
          { text: "Mitochondrien", warum: "Bei Mitochondrien sprechen mehrere Befunde gegen die Einstülpung, etwa die eigene ringförmige DNA." },
          { text: "Chloroplasten", warum: "Auch Chloroplasten besitzen eigene DNA und eigene Ribosomen; das spricht gegen die Einstülpung." }
        ],
        rueckmeldung: {
          richtig: "Für Kernhülle, ER und Golgi-Apparat gilt die Einstülpung bis heute; Hypothese A ist also keine abwegige Idee.",
          falsch: "Richtig sind Kernhülle, Endoplasmatisches Retikulum und Golgi-Apparat."
        }
      },
      {
        id: "k6-03", typ: "zuordnen", afb: 3,
        auftrag: "Prüfe jeden Befund: Was leistet er beim Vergleich der beiden Hypothesen? Ordne zu.",
        paare: [
          { begriff: "M1 Doppelmembran", ziel: "entscheidet nicht" },
          { begriff: "M2 Eigene ringförmige DNA außerhalb des Zellkerns", ziel: "spricht gegen Hypothese A" },
          { begriff: "M3 Eigene Ribosomen vom Bakterientyp", ziel: "spricht gegen Hypothese A" },
          { begriff: "M4 Vermehrung durch Teilung, unabhängig von der Zellteilung", ziel: "spricht gegen Hypothese A" },
          { begriff: "M5 Größe wie ein Bakterium", ziel: "entscheidet nicht" },
          { begriff: "M6 Innere Membran ähnelt der Bakterienmembran, äußere der Wirtsmembran", ziel: "spricht gegen Hypothese A" },
          { begriff: "M7 Antibiotika gegen Bakterienribosomen hemmen auch die Organellen", ziel: "spricht gegen Hypothese A" },
          { begriff: "M8 Aufnahme ohne Verdauung lässt sich heute beobachten", ziel: "liefert den Mechanismus für Hypothese B" }
        ],
        rueckmeldung: {
          richtig: "Ausgerechnet die Doppelmembran entscheidet nicht, weil beide Hypothesen sie erklären; M2 bis M4, M6 und M7 sprechen gegen die Einstülpung.",
          falsch: "Richtig ist: entscheidet nicht – M1 Doppelmembran und M5 Größe; gegen Hypothese A – M2, M3, M4, M6 und M7; Mechanismus für B – M8. Die Doppelmembran erklären beide Hypothesen."
        }
      },
      {
        id: "k6-04", typ: "auswahl", afb: 2,
        auftrag: "Wähle aus, was die Doppelmembran der Mitochondrien zum Vergleich der beiden Hypothesen beiträgt.",
        optionen: [
          { text: "Sie entscheidet nicht, denn beide Hypothesen können sie erklären.", korrekt: true },
          { text: "Sie beweist die Endosymbiontentheorie.", warum: "Sie entscheidet nicht einmal zwischen den beiden Hypothesen, denn beide erklären sie." },
          { text: "Sie spricht gegen die Endosymbiose, weil Bakterien keine Membran besitzen.", warum: "Bakterien besitzen eine Membran; nach M6 ähnelt die innere Membran sogar der Bakterienmembran." },
          { text: "Sie spricht gegen die Einstülpung, weil eine Einstülpung keine Membran liefert.", warum: "Eine Einstülpung der Zellmembran liefert gerade Membranen; auch Hypothese A erklärt die Doppelmembran." }
        ],
        rueckmeldung: {
          richtig: "Ein Befund, den beide Hypothesen erklären, kann nicht zwischen ihnen entscheiden.",
          falsch: "Richtig ist: Die Doppelmembran entscheidet nicht, denn beide Hypothesen erklären sie."
        }
      },
      {
        id: "k6-05", typ: "richtigfalsch", afb: 2,
        aussage: "Mitochondrien sind etwa so groß wie Bakterien. Dieser Befund spricht klar gegen die Einstülpung.",
        korrekt: false,
        rueckmeldung: {
          richtig: "Die Größe (M5) entscheidet nicht zwischen den Hypothesen; klar gegen A spricht etwa die eigene ringförmige DNA (M2).",
          falsch: "Die Aussage ist falsch. Die Größe (M5) entscheidet nicht zwischen den beiden Hypothesen."
        }
      },
      {
        id: "k6-06", typ: "korrigieren", afb: 2,
        auftrag: "Finde den Fehler und korrigiere ihn.",
        text: "Die eigene ringförmige DNA der Mitochondrien [[beweist>stützt]] die Endosymbiontentheorie.",
        ersatz: ["stützt", "widerlegt", "verhindert"],
        rueckmeldung: {
          richtig: "Ein Befund stützt eine Hypothese; bewiesen wird sie dadurch nicht.",
          falsch: "Richtig heißt es: Die eigene ringförmige DNA stützt die Endosymbiontentheorie. Eine Hypothese wird geprüft, nicht bewiesen."
        }
      },
      {
        id: "k6-07", typ: "reihenfolge", afb: 1,
        auftrag: "Bringe die Ereignisse in die zeitliche Reihenfolge.",
        anfang: "zuerst",
        ende: "zuletzt",
        elemente: [
          "Eine größere Zelle nimmt ein Bakterium auf und verdaut es nicht.",
          "Aus dem aufgenommenen Bakterium werden Mitochondrien.",
          "Eine Zelle nimmt ein fotosynthetisch aktives Bakterium auf, vermutlich ein Cyanobakterium.",
          "Aus diesem Bakterium werden Chloroplasten."
        ],
        rueckmeldung: {
          richtig: "Es waren zwei getrennte Ereignisse: zuerst die Mitochondrien, vor etwa zwei Milliarden Jahren, später die Chloroplasten.",
          falsch: "Richtig ist: Aufnahme eines Bakteriums ohne Verdauung, daraus die Mitochondrien; später Aufnahme eines fotosynthetisch aktiven Bakteriums, daraus die Chloroplasten."
        }
      },
      {
        id: "k6-08", typ: "auswahl", afb: 2,
        auftrag: "Alle Eukaryoten besitzen Mitochondrien, aber nur Pflanzen besitzen Chloroplasten. Wähle die Erklärung.",
        optionen: [
          { text: "Es waren zwei getrennte Ereignisse; das fotosynthetisch aktive Bakterium wurde erst später aufgenommen.", korrekt: true },
          { text: "Pflanzen haben keine Mitochondrien, sondern nur Chloroplasten.", warum: "Auch Pflanzen haben Mitochondrien, denn alle Eukaryoten besitzen sie." },
          { text: "Chloroplasten entstanden durch Einstülpung, Mitochondrien durch Endosymbiose.", warum: "Beide gehen auf aufgenommene Bakterien zurück." },
          { text: "Beide entstanden gleichzeitig aus einem einzigen Bakterium.", warum: "Mitochondrien und Chloroplasten gehen auf zwei getrennte Ereignisse zurück." }
        ],
        rueckmeldung: {
          richtig: "Die Mitochondrien entstanden zuerst, die Chloroplasten später durch Aufnahme eines fotosynthetisch aktiven Bakteriums.",
          falsch: "Richtig ist: Es waren zwei getrennte Ereignisse, die Chloroplasten kamen später hinzu."
        }
      },
      {
        id: "k6-09", typ: "offen", afb: 3,
        auftrag: "Eine Mitschülerin schreibt: „Die Endosymbiontentheorie ist bewiesen.“ Beurteile diese Formulierung.",
        musterloesung: "Die Formulierung ist zu stark. Eine Hypothese wird nicht bewiesen, sondern an Befunden geprüft. Die Endosymbiontentheorie gilt als gut gestützt, weil die Alternative, die Einstülpung, an mehreren Befunden scheitert: an der eigenen ringförmigen DNA, den Ribosomen vom Bakterientyp, der Vermehrung durch Teilung, dem Bau der beiden Membranen und der Wirkung von Antibiotika. Außerdem liefert die heute beobachtbare Aufnahme ohne Verdauung einen Mechanismus. Andere Befunde wie die Doppelmembran oder die Größe entscheiden dagegen nicht. Treffender ist: Die Endosymbiontentheorie ist durch viele Befunde gut gestützt. Ein Beleg ist kein Beweis."
      }
    ]
  },

  /* ================================================================
     KAPITEL 7
     ================================================================ */
  {
    nr: 7,
    titel: "Mikroorganismen und Mitochondrien",
    seiten: "S. 30 f.",
    aufgaben: [
      {
        id: "k7-01", typ: "beschriften", afb: 1,
        auftrag: "Beschrifte das Mitochondrium.",
        bild: "mitochondrium",
        punkte: [
          { name: "Außenmembran", x: 15, y: 28.3, mx: 6, my: 9.6, lage: "die äußere Hülle" },
          { name: "Intermembranraum", x: 30, y: 21.6, mx: 30, my: 6.4, lage: "der schmale gelbe Raum zwischen den beiden Hüllen" },
          { name: "Innere Membran", x: 20, y: 66, mx: 7.5, my: 90.4, lage: "die innere orangefarbene Linie" },
          { name: "Cristae", x: 65, y: 32.8, mx: 75, my: 6.4, lage: "eine der Falten, die nach innen ragen" },
          { name: "Matrix", x: 47.75, y: 48, mx: 50, my: 91.2, lage: "der Innenraum zwischen den Falten" }
        ],
        weitere: ["Stroma", "Thylakoid"],
        rueckmeldung: {
          richtig: "Die innere Membran ist zu Cristae gefaltet; innen liegt die Matrix, zwischen den Membranen der Intermembranraum.",
          falsch: "Die äußere Hülle ist die Außenmembran, die innere Membran bildet die Cristae; zwischen beiden liegt der Intermembranraum, innen die Matrix."
        }
      },
      {
        id: "k7-02", typ: "auswahl", afb: 1,
        auftrag: "Wähle die zutreffende Beschreibung dessen, was Mitochondrien leisten.",
        optionen: [
          { text: "Sie setzen in der Zellatmung Energie aus Traubenzucker frei und übertragen sie portionsweise auf ATP.", korrekt: true },
          { text: "Sie erzeugen Energie.", warum: "Energie wird nirgends erzeugt; sie wird aus dem Zucker freigesetzt und auf ATP übertragen." },
          { text: "Sie betreiben Fotosynthese.", warum: "Fotosynthese findet in den Chloroplasten statt." },
          { text: "Sie bauen mit Verdauungsenzymen Zellbestandteile ab.", warum: "Das ist die Aufgabe der Lysosomen." }
        ],
        rueckmeldung: {
          richtig: "Mitochondrien erzeugen keine Energie, sie machen die Energie des Zuckers als ATP nutzbar.",
          falsch: "Richtig ist: Sie setzen Energie aus Traubenzucker frei und übertragen sie portionsweise auf ATP."
        }
      },
      {
        id: "k7-03", typ: "luecken", afb: 1,
        auftrag: "Ergänze die Gleichung und den Text.",
        text: "Zellatmung: Traubenzucker + [[Sauerstoff|Wasser|Kohlenstoffdioxid]] → [[Kohlenstoffdioxid|Sauerstoff|Alkohol]] + Wasser + Energie. Die Energie wird portionsweise auf [[ATP|DNA|Traubenzucker]] übertragen. Das Anhängen einer Phosphatgruppe heißt [[Phosphorylierung|Gärung|Kompartimentierung]].",
        rueckmeldung: {
          richtig: "Die Zellatmung verbraucht Traubenzucker und Sauerstoff; die Energie landet portionsweise im ATP.",
          falsch: "Richtig ist: Traubenzucker + Sauerstoff → Kohlenstoffdioxid + Wasser + Energie; die Energie wird auf ATP übertragen, das Anhängen der Phosphatgruppe heißt Phosphorylierung."
        }
      },
      {
        id: "k7-04", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jedes Merkmal der Zellatmung oder der alkoholischen Gärung zu.",
        paare: [
          { begriff: "braucht Sauerstoff", ziel: "Zellatmung" },
          { begriff: "rund 30 ATP je Traubenzucker", ziel: "Zellatmung" },
          { begriff: "Ort: Matrix und innere Membran", ziel: "Zellatmung" },
          { begriff: "Produkte: Kohlenstoffdioxid und Wasser", ziel: "Zellatmung" },
          { begriff: "läuft ohne Sauerstoff ab", ziel: "Alkoholische Gärung" },
          { begriff: "2 ATP je Traubenzucker", ziel: "Alkoholische Gärung" },
          { begriff: "Ort: Cytoplasma", ziel: "Alkoholische Gärung" },
          { begriff: "Produkte: Alkohol und Kohlenstoffdioxid", ziel: "Alkoholische Gärung" }
        ],
        rueckmeldung: {
          richtig: "Mit Sauerstoff liefert die Zellatmung rund 30 ATP, ohne Sauerstoff liefert die Gärung im Cytoplasma nur 2 ATP.",
          falsch: "Richtig ist: Zellatmung – mit Sauerstoff, rund 30 ATP, Matrix und innere Membran, Kohlenstoffdioxid und Wasser; alkoholische Gärung – ohne Sauerstoff, 2 ATP, Cytoplasma, Alkohol und Kohlenstoffdioxid."
        }
      },
      {
        id: "k7-05", typ: "auswahl", afb: 2,
        auftrag: "Hefe bildet in einer verschlossenen Flasche Alkohol und Kohlensäure. Wähle aus, wo dieser Vorgang in der Hefezelle abläuft.",
        optionen: [
          { text: "Im Cytoplasma.", korrekt: true },
          { text: "Im Mitochondrium.", warum: "Im Mitochondrium läuft die Zellatmung ab; die Gärung findet im Cytoplasma statt." },
          { text: "Im Zellkern.", warum: "Der Zellkern enthält die DNA und steuert die Zelle; die Gärung läuft im Cytoplasma ab." },
          { text: "Im Chloroplasten.", warum: "Chloroplasten sind der Ort der Fotosynthese, nicht der Gärung." }
        ],
        rueckmeldung: {
          richtig: "Ohne Sauerstoff gärt die Hefe im Cytoplasma; dabei entstehen Alkohol und Kohlenstoffdioxid.",
          falsch: "Richtig ist: im Cytoplasma, ohne Sauerstoff."
        }
      },
      {
        id: "k7-06", typ: "auswahl", afb: 2,
        auftrag: "Wähle aus, wozu die innere Membran des Mitochondriums zu Cristae eingefaltet ist.",
        optionen: [
          { text: "Die Fläche, auf der die Enzyme sitzen, wird größer; so laufen im selben Volumen mehr Reaktionen gleichzeitig ab.", korrekt: true },
          { text: "Das Mitochondrium wird dadurch insgesamt größer.", warum: "Die Faltung vergrößert die Fläche im selben Volumen, nicht das Mitochondrium." },
          { text: "Auf den Cristae findet die Fotosynthese statt.", warum: "Fotosynthese läuft im Chloroplasten ab, nicht im Mitochondrium." },
          { text: "In den Falten wird die DNA zu Chromosomen verpackt.", warum: "Zu Chromosomen verpackt wird die DNA im Zellkern." }
        ],
        rueckmeldung: {
          richtig: "Mehr Fläche im selben Volumen bedeutet mehr Reaktionen gleichzeitig, dasselbe Prinzip wie bei den Darmzotten.",
          falsch: "Richtig ist: Die Einfaltung vergrößert die Fläche für die Enzyme, sodass im selben Volumen mehr Reaktionen gleichzeitig ablaufen."
        }
      },
      {
        id: "k7-07", typ: "auswahl", afb: 2,
        auftrag: "Werte den Versuch aus. Wähle den Schluss, den der Vergleich der Ansätze 2 und 3 erlaubt.",
        seite: "S. 31",
        tabelle: {
          kopf: ["Ansatz", "Zugabe", "Ergebnis"],
          zeilen: [
            ["1 Zellhomogenat", "markierte Aminosäuren", "Proteine entstehen"],
            ["2 Überstand nach Zentrifugation", "markierte Aminosäuren", "keine Proteine"],
            ["3 Überstand nach Zentrifugation", "markierte Aminosäuren und ATP", "Proteine entstehen wieder"]
          ]
        },
        optionen: [
          { text: "Die Proteinsynthese hängt von dem ATP ab, das die Mitochondrien liefern.", korrekt: true },
          { text: "Die Mitochondrien stellen die Proteine selbst her.", warum: "In Ansatz 3 entstehen ohne Mitochondrien Proteine, sobald ATP zugegeben wird." },
          { text: "Die Mitochondrien erzeugen die Energie für die Proteinsynthese.", warum: "Energie wird nicht erzeugt; die Mitochondrien übertragen sie aus dem Zucker auf ATP." },
          { text: "Die markierten Aminosäuren verhindern im Überstand die Proteinsynthese.", warum: "Markierte Aminosäuren sind in allen drei Ansätzen enthalten, auch dort, wo Proteine entstehen." }
        ],
        rueckmeldung: {
          richtig: "Fehlt das ATP, stoppt die Proteinsynthese; gibt man ATP hinzu, läuft sie wieder.",
          falsch: "Richtig ist: Die Proteinsynthese hängt von dem ATP ab, das die Mitochondrien liefern."
        }
      },
      {
        id: "k7-08", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jedem Begriff seine Bedeutung zu.",
        seite: "S. 31",
        paare: [
          { begriff: "Homogenat", ziel: "gleichmäßig zerkleinertes Gewebe" },
          { begriff: "homogen", ziel: "gleichartig" },
          { begriff: "heterogen", ziel: "verschiedenartig" },
          { begriff: "Tracer", ziel: "markierter Stoff, dessen Weg sich verfolgen lässt" },
          { begriff: "Phosphorylierung", ziel: "Anhängen einer Phosphatgruppe" }
        ],
        rueckmeldung: {
          richtig: "Im Versuch dienen die markierten Aminosäuren als Tracer im Homogenat.",
          falsch: "Richtig ist: Homogenat – gleichmäßig zerkleinertes Gewebe; homogen – gleichartig; heterogen – verschiedenartig; Tracer – markierter Stoff, dessen Weg sich verfolgen lässt; Phosphorylierung – Anhängen einer Phosphatgruppe."
        }
      },
      {
        id: "k7-09", typ: "offen", afb: 3,
        auftrag: "Beurteile, ob Ansatz 2 für sich allein zeigt, dass die Mitochondrien für die Proteinsynthese nötig sind.",
        seite: "S. 31",
        tabelle: {
          kopf: ["Ansatz", "Zugabe", "Ergebnis"],
          zeilen: [
            ["1 Zellhomogenat", "markierte Aminosäuren", "Proteine entstehen"],
            ["2 Überstand nach Zentrifugation", "markierte Aminosäuren", "keine Proteine"],
            ["3 Überstand nach Zentrifugation", "markierte Aminosäuren und ATP", "Proteine entstehen wieder"]
          ]
        },
        musterloesung: "Ansatz 2 allein zeigt das nicht. Beim Zentrifugieren wurden mit dem Sediment nicht nur die Mitochondrien entfernt, sondern auch die Zellkerne. Dass im Überstand keine Proteine entstehen, zeigt streng genommen nur, dass dem Überstand etwas fehlt. Erst Ansatz 3 grenzt ein, was fehlt: Gibt man ATP hinzu, entstehen wieder Proteine. Daraus lässt sich schließen, dass die Proteinsynthese ATP braucht, das im Homogenat die Mitochondrien liefern. Die Markierung der Aminosäuren sichert dabei ab, dass die nachgewiesenen Proteine im Versuch neu gebildet wurden."
      },
      {
        id: "k7-10", typ: "mikroskop", afb: 1,
        auftrag: "Stelle die Gesamtvergrößerung ein, bei der Hefezellen gut zu erkennen sind. Betrachte dann die Zellen.",
        objekt: "hefe",
        okular: 10,
        objektive: [4, 10, 40],
        start: 4,
        ziel: 400,
        rueckmeldung: {
          richtig: "Bei 400facher Vergrößerung erkennst du die 5 bis 10 µm großen Hefezellen gut, auch solche, die gerade knospen.",
          falsch: "Richtig ist das 40er-Objektiv, also 400fach. Hefezellen sind 5 bis 10 µm groß und bei 400facher Vergrößerung gut zu erkennen."
        }
      },
      {
        id: "k7-11", typ: "mikroskop", afb: 2,
        auftrag: "Stelle die stärkste Vergrößerung ein, die dieses Mikroskop bietet, und betrachte den Joghurtdrink. Vergrößere danach das Bild am Bildschirm.",
        objekt: "joghurt",
        okular: 10,
        objektive: [4, 10, 40],
        start: 4,
        ziel: 400,
        bildschirmzoom: true,
        seite: "S. 30 f. und S. 18 f.",
        rueckmeldung: {
          richtig: "Auch bei 400fach sind die etwa 1 µm langen Milchsäurebakterien nur Pünktchen; am Bildschirm vergrößert wird das Bild größer, aber nicht schärfer.",
          falsch: "Richtig ist das 40er-Objektiv, also 400fach. Auch dabei erscheinen die Milchsäurebakterien nur als Pünktchen, weil sie an der Auflösungsgrenze liegen."
        }
      },
      {
        id: "k7-12", typ: "auswahl", afb: 3,
        auftrag: "Die Milchsäurebakterien im Joghurtdrink erscheinen auch bei 400facher Vergrößerung nur als Pünktchen. Wähle die Erklärung.",
        seite: "S. 30 f. und S. 18 f.",
        optionen: [
          { text: "Sie sind etwa 1 µm lang und liegen damit an der Auflösungsgrenze des Lichtmikroskops.", korrekt: true },
          { text: "Die Vergrößerung ist zu schwach; mit einer stärkeren Vergrößerung wäre der Bau der Bakterien zu sehen.", warum: "Eine stärkere Vergrößerung zeigt mehr nur bis zur Auflösungsgrenze; darüber hinaus wird das Bild nur größer und unscharf." },
          { text: "Prokaryoten haben keine DNA und deshalb keinen inneren Bau.", warum: "Prokaryoten haben DNA, nur nicht in einem Zellkern; dass man nichts erkennt, liegt an der Auflösung." },
          { text: "Milchsäurebakterien sind Eukaryoten wie die Hefe.", warum: "Milchsäurebakterien sind Prokaryoten; die Hefe ist ein Eukaryot." }
        ],
        rueckmeldung: {
          richtig: "An der Auflösungsgrenze bleiben die Bakterien Pünktchen ohne erkennbaren Bau, gleich wie stark man vergrößert.",
          falsch: "Richtig ist: Sie sind etwa 1 µm lang und liegen an der Auflösungsgrenze des Lichtmikroskops."
        }
      },
      {
        id: "k7-13", typ: "offen", afb: 2,
        auftrag: "Erkläre, warum Hefe in einer verschlossenen Flasche Alkohol und Kohlensäure bildet.",
        musterloesung: "In der verschlossenen Flasche steht der Hefe bald kein Sauerstoff mehr zur Verfügung. Ohne Sauerstoff ist keine Zellatmung möglich; die Hefe baut den Traubenzucker durch alkoholische Gärung ab: Traubenzucker → Alkohol + Kohlenstoffdioxid. Das Kohlenstoffdioxid bildet in der Flüssigkeit die Kohlensäure. Die Gärung läuft im Cytoplasma ab und liefert nur 2 ATP je Molekül Traubenzucker, die Zellatmung dagegen rund 30 ATP."
      }
    ]
  },

  /* ================================================================
     KAPITEL 8
     ================================================================ */
  {
    nr: 8,
    titel: "Plastiden",
    seiten: "S. 34 f.",
    aufgaben: [
      {
        id: "k8-01", typ: "zuordnen", afb: 1,
        auftrag: "Ordne jede Angabe dem passenden Plastidentyp zu.",
        paare: [
          { begriff: "Chlorophyll, grün", ziel: "Chloroplasten" },
          { begriff: "Fotosynthese", ziel: "Chloroplasten" },
          { begriff: "Carotine, gelb bis rot", ziel: "Chromoplasten" },
          { begriff: "Färbung, lockt Tiere an", ziel: "Chromoplasten" },
          { begriff: "Tomate, Möhre, Paprika", ziel: "Chromoplasten" },
          { begriff: "farblos", ziel: "Leukoplasten" },
          { begriff: "Speicherung von Stärke oder Proteinen", ziel: "Leukoplasten" },
          { begriff: "Kartoffelknolle, Samen", ziel: "Leukoplasten" }
        ],
        rueckmeldung: {
          richtig: "Chloroplasten betreiben Fotosynthese, Chromoplasten färben, Leukoplasten speichern.",
          falsch: "Richtig ist: Chloroplasten – Chlorophyll, Fotosynthese; Chromoplasten – Carotine, Färbung, Tomate, Möhre, Paprika; Leukoplasten – farblos, Speicherung, Kartoffelknolle, Samen."
        }
      },
      {
        id: "k8-02", typ: "beschriften", afb: 1,
        auftrag: "Beschrifte den Chloroplasten.",
        bild: "chloroplast",
        punkte: [
          { name: "Außenmembran", x: 22.5, y: 23.3, mx: 7.5, my: 8.8, lage: "die äußere Hülle" },
          { name: "Innenmembran", x: 75, y: 72.1, mx: 87.5, my: 92.8, lage: "die innere Hülle, dicht an der äußeren" },
          { name: "Stroma", x: 53.75, y: 30, mx: 53.75, my: 6.4, lage: "der hellgrüne Innenraum" },
          { name: "Thylakoid", x: 45, y: 66, mx: 37.5, my: 93.6, lage: "die einzelne flache grüne Scheibe unten" },
          { name: "Granum", x: 76.25, y: 43.2, mx: 92.5, my: 9.6, lage: "ein Stapel aus flachen grünen Scheiben" }
        ],
        weitere: ["Cristae", "Matrix"],
        rueckmeldung: {
          richtig: "Die Thylakoide sind zu Grana gestapelt; in ihrer Membran sitzt das Chlorophyll.",
          falsch: "Außen liegen Außen- und Innenmembran, innen das Stroma; eine einzelne flache Scheibe ist ein Thylakoid, ein Stapel davon ein Granum."
        }
      },
      {
        id: "k8-03", typ: "luecken", afb: 1,
        auftrag: "Ergänze die Gleichung und benenne den Vorgang.",
        text: "[[Kohlenstoffdioxid|Sauerstoff|Traubenzucker]] + Wasser + [[Lichtenergie|ATP|Wärme]] → [[Traubenzucker|Alkohol|Stärke]] + Sauerstoff. Diesen Vorgang nennt man [[=Fotosynthese]].",
        rueckmeldung: {
          richtig: "Aus Kohlenstoffdioxid und Wasser entstehen mit Lichtenergie Traubenzucker und Sauerstoff.",
          falsch: "Richtig ist: Kohlenstoffdioxid + Wasser + Lichtenergie → Traubenzucker + Sauerstoff; der Vorgang heißt Fotosynthese."
        }
      },
      {
        id: "k8-04", typ: "richtigfalsch", afb: 2,
        aussage: "Die Fotosynthese ist die Zellatmung rückwärts.",
        korrekt: false,
        rueckmeldung: {
          richtig: "Die Aussage ist zu grob: Nur die Summengleichungen sind spiegelbildlich, die Reaktionswege im Inneren sind es nicht.",
          falsch: "Die Aussage ist zu grob und deshalb falsch. Edukte und Produkte sind zwar vertauscht, die Summengleichungen also spiegelbildlich, die Reaktionswege im Inneren sind es aber nicht."
        }
      },
      {
        id: "k8-05", typ: "auswahl", afb: 2,
        auftrag: "Eine Pflanzenzelle besitzt Chloroplasten. Wähle aus, warum sie trotzdem Mitochondrien braucht.",
        optionen: [
          { text: "Fotosynthese läuft nur im Licht und nur in grünen Zellen ab; Energie braucht die Pflanze aber überall und rund um die Uhr.", korrekt: true },
          { text: "Sie braucht keine, denn Pflanzenzellen haben keine Mitochondrien.", warum: "Pflanzenzellen besitzen Mitochondrien, wie alle Eukaryoten." },
          { text: "Die Mitochondrien betreiben nachts die Fotosynthese.", warum: "Fotosynthese findet nur in Chloroplasten und nur im Licht statt." },
          { text: "Pflanzen atmen nicht; die Mitochondrien speichern nur Stärke.", warum: "Pflanzen betreiben Zellatmung in ihren Mitochondrien; Stärke speichern die Leukoplasten." }
        ],
        rueckmeldung: {
          richtig: "Die Chloroplasten speichern Energie im Zucker, die Mitochondrien machen sie als ATP nutzbar, auch nachts und in der Wurzel.",
          falsch: "Richtig ist: Fotosynthese läuft nur im Licht und nur in grünen Zellen; ATP aus der Zellatmung braucht die Pflanze überall und rund um die Uhr."
        }
      },
      {
        id: "k8-06", typ: "auswahl", afb: 2,
        auftrag: "Eine Kartoffelknolle liegt einige Tage im Hellen und wird grün. Wähle die Erklärung.",
        optionen: [
          { text: "Am Licht wandeln sich Leukoplasten in Chloroplasten um.", korrekt: true },
          { text: "Am Licht wandeln sich Chromoplasten in Leukoplasten um.", warum: "Leukoplasten sind farblos; grün wird die Knolle durch Chloroplasten." },
          { text: "Die Knolle nimmt grüne Bakterien auf.", warum: "Die grüne Farbe stammt von umgewandelten Plastiden der Knolle selbst." },
          { text: "Die Stärke in der Knolle färbt sich am Licht grün.", warum: "Grün ist das Chlorophyll der Chloroplasten, die aus Leukoplasten entstehen." }
        ],
        rueckmeldung: {
          richtig: "Plastiden sind ineinander umwandelbar: Am Licht wird aus einem Leukoplasten ein Chloroplast.",
          falsch: "Richtig ist: Am Licht werden aus Leukoplasten Chloroplasten; ebenso wird das obere Ende der Möhre grün."
        }
      },
      {
        id: "k8-07", typ: "korrigieren", afb: 1,
        auftrag: "Finde den Fehler und korrigiere ihn.",
        text: "Beim Reifen wird aus einem Chloroplasten ein [[Leukoplast>Chromoplast]], die Tomate wird rot.",
        ersatz: ["Chromoplast", "Mitochondrium", "Tonoplast"],
        rueckmeldung: {
          richtig: "Beim Reifen wird der Chloroplast zu einem Chromoplasten mit Carotinen.",
          falsch: "Richtig heißt es: Beim Reifen wird aus einem Chloroplasten ein Chromoplast, die Tomate wird rot."
        }
      },
      {
        id: "k8-08", typ: "mehrfach", afb: 2,
        auftrag: "Vergleiche Chloroplast und Mitochondrium. Kreuze alle Gemeinsamkeiten an.",
        optionen: [
          { text: "Eigene DNA", korrekt: true },
          { text: "Eigene Ribosomen", korrekt: true },
          { text: "Doppelmembran", korrekt: true },
          { text: "Thylakoide", warum: "Thylakoide gibt es nur im Chloroplasten." },
          { text: "Cristae", warum: "Cristae sind die Falten der inneren Membran des Mitochondriums." },
          { text: "Chlorophyll", warum: "Chlorophyll sitzt nur in der Thylakoidmembran der Chloroplasten." }
        ],
        rueckmeldung: {
          richtig: "Eigene DNA, eigene Ribosomen und zwei Membranen haben beide Organellen gemeinsam.",
          falsch: "Richtig sind: eigene DNA, eigene Ribosomen und die Doppelmembran."
        }
      },
      {
        id: "k8-09", typ: "mehrfach", afb: 2,
        auftrag: "Die Schnecke Elysia chlorotica frisst Algen, verdaut deren Chloroplasten aber nicht, lagert sie in ihre eigenen Zellen ein und lebt wochenlang von deren Fotosynthese. Kreuze alles an, was dieser Vorgang mit der Endosymbiose gemeinsam hat.",
        optionen: [
          { text: "Aufnahme ohne Verdauung", korrekt: true },
          { text: "Ein Vorteil für den Aufnehmenden", korrekt: true },
          { text: "Die Chloroplasten vermehren sich in der Schnecke.", warum: "Die Chloroplasten vermehren sich in der Schnecke nicht." },
          { text: "Die Chloroplasten bleiben dauerhaft erhalten.", warum: "Sie werden nach einiger Zeit abgebaut; die Schnecke muss sich neue holen." }
        ],
        rueckmeldung: {
          richtig: "Aufnahme ohne Verdauung mit Vorteil für den Aufnehmenden lässt sich heute beobachten, wie Befund M8 festhält.",
          falsch: "Richtig sind: Aufnahme ohne Verdauung und ein Vorteil für den Aufnehmenden."
        }
      },
      {
        id: "k8-10", typ: "offen", afb: 2,
        auftrag: "Erkläre, wie Chloroplasten und Mitochondrien in einer Pflanzenzelle zusammenwirken.",
        musterloesung: "In den Chloroplasten läuft im Licht die Fotosynthese ab: Aus Kohlenstoffdioxid und Wasser entstehen mit Lichtenergie Traubenzucker und Sauerstoff. Die Energie ist dann im Zucker gespeichert. In den Mitochondrien wird der Zucker in der Zellatmung mit Sauerstoff zu Kohlenstoffdioxid und Wasser abgebaut; die freigesetzte Energie wird auf ATP übertragen und so nutzbar. Was der eine Vorgang verbraucht, liefert der andere. Da die Fotosynthese nur im Licht und nur in grünen Zellen abläuft, die Pflanze aber überall und rund um die Uhr Energie braucht, besitzt sie auch Mitochondrien."
      },
      {
        id: "k8-11", typ: "offen", afb: 3,
        auftrag: "Beurteile, ob man die Chloroplasten in der Schnecke Elysia chlorotica als Endosymbionten bezeichnen kann. Vergleiche dazu mit der Entstehung der Chloroplasten in Pflanzen.",
        musterloesung: "Gemeinsam mit der Endosymbiose ist, dass die Chloroplasten aufgenommen, aber nicht verdaut werden und dem Aufnehmenden einen Vorteil bringen: Die Schnecke lebt wochenlang von ihrer Fotosynthese. Anders ist, dass sich die Chloroplasten in der Schnecke nicht vermehren und nach einiger Zeit abgebaut werden; die Schnecke muss sich neue holen. Ein dauerhafter Endosymbiont, wie es die Chloroplasten in Pflanzenzellen geworden sind, ist das also nicht. Es handelt sich um eine Zwischenstufe. Sie zeigt aber, dass eine Aufnahme ohne Verdauung heute beobachtet werden kann, und passt damit zu Befund M8."
      }
    ]
  }
];
