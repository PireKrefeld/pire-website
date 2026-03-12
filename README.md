🚀 PIRE Krefeld: Leitfaden zur Webseiten-Pflege (VS Code Edition)
Willkommen im Web-Team von PIRE Krefeld! Unsere Webseite ist extrem modern, blitzschnell und zu 100 % sicher aufgebaut. Wir nutzen kein hackbares WordPress, sondern arbeiten direkt mit den Dateien auf unserem eigenen Rechner.

Damit du Artikel, Termine oder Bündnisse hinzufügen kannst, musst du nur einmalig deinen PC einrichten. Das dauert ca. 10 Minuten.

🛠️ Phase 1: Die Einmalige Einrichtung
1. Accounts erstellen & Rechte bekommen

Erstelle dir einen kostenlosen Account auf GitHub.com.

Schick deinen GitHub-Benutzernamen an den Admin. Er wird dir eine Einladung zum "pire-website" Repository schicken. Nimm diese an!

2. Die Programme installieren (Alles kostenlos)

Lade dir Node.js herunter (Nimm die "LTS" Version) und installiere es (einfach immer auf "Weiter" klicken). Das ist unser Motor.

Lade dir Git herunter und installiere es (auch hier einfach die Standard-Einstellungen mit "Weiter" bestätigen). Das ist das unsichtbare Programm, das unsere Dateien mit dem Internet synchronisiert.

Lade dir Visual Studio Code (VS Code) herunter. Das ist unsere Kommandozentrale.

3. Das Projekt auf deinen PC holen (Clonen)

Öffne VS Code.

Klick ganz links in der Seitenleiste auf das "Quellcodeverwaltung"-Icon (Das Symbol mit den drei kleinen Kreisen/Knotenpunkten, oft das dritte von oben).

Klick auf den blauen Button "Repository klonen" (Clone Repository).

Oben in der Mitte öffnet sich eine Suchleiste. Wähle "Aus GitHub klonen" (Clone from GitHub). (Eventuell musst du dich hier einmal kurz mit deinem GitHub-Account im Browser anmelden).

Wähle unser Projekt PireKrefeld/pire-website aus der Liste aus.

Wähle einen Ordner auf deinem PC (z. B. Dokumente), wo die Webseite gespeichert werden soll.

Wenn VS Code fragt, ob du den Ordner öffnen möchtest: Klick auf "Öffnen" und vertraue den Autoren.

4. Den Motor installieren (Nur beim allerersten Mal!)

Klick oben im VS Code Menü auf Terminal -> Neues Terminal (oder drücke Strg + ö bzw. Ctrl + ~).

Unten öffnet sich ein Fenster. Tippe dort folgenden Befehl ein und drücke Enter:
npm install
(Warte, bis er fertig geladen hat. Er lädt jetzt alle wichtigen Bausteine der Webseite herunter).

📝 Phase 2: So bearbeitest du die Webseite (Dein Arbeitsalltag)
Wenn du in Zukunft einen neuen Termin oder Text eintragen willst, machst du immer Folgendes:

1. Das CMS (Dashboard) starten

Öffne VS Code (dein pire-website Ordner sollte bereits geladen sein).

Öffne ein Terminal (Terminal -> Neues Terminal).

Tippe den Start-Befehl ein und drücke Enter:
npm run dev

Öffne deinen normalen Internetbrowser (Chrome, Firefox, Safari) und gehe auf:
👉 http://localhost:4321/keystatic

Willkommen im internen Dashboard! Hier kannst du jetzt wie in einem normalen Programm Texte schreiben, Bilder hochladen und Termine erstellen. Speichere deine Änderungen oben rechts ab.

2. Änderungen live schalten (Hochladen & Veröffentlichen)
Damit die ganze Welt deine neuen Texte sieht, schicken wir sie jetzt über VS Code ins Internet:

Gehe zurück in VS Code.

Klick links in der Seitenleiste wieder auf das "Quellcodeverwaltung"-Icon (die drei Kreise). Es sollte jetzt eine kleine blaue Zahl anzeigen (das sind deine ungespeicherten Änderungen).

Fahre mit der Maus über das Wort "Änderungen" (Changes) und klicke auf das kleine Plus-Symbol (+), das daneben auftaucht. (Das nennt man "Stagen" – du packst die Dateien ins Paket).

Schreib in das Textfeld oben drüber kurz rein, was du gemacht hast (z.B. "Neuen Termin für Demo am Samstag hinzugefügt").

Klick auf den blauen Button "Commit" (oder das Häkchen).

Jetzt ändert sich der blaue Button in "Änderungen synchronisieren" (Sync Changes). Klick darauf!

Fertig! Cloudflare baut die Webseite jetzt im Hintergrund neu zusammen. In ca. 2 Minuten sind deine Änderungen online auf der echten Domain für alle sichtbar! Wenn du fertig bist, kannst du das Terminal unten in VS Code einfach mit dem Mülleimer-Symbol schließen.

🚀 PIRE Krefeld: Leitfaden zur Webseiten-Pflege
Willkommen im Web-Team von PIRE Krefeld! Unsere Webseite ist extrem modern, blitzschnell und zu 100 % sicher aufgebaut. Wir nutzen kein hackbares WordPress, sondern arbeiten direkt mit den Dateien auf unserem eigenen Rechner.

Damit du Artikel, Termine oder Bündnisse hinzufügen kannst, musst du nur einmalig deinen PC einrichten. Das dauert ca. 10 Minuten.

🛠️ Phase 1: Die Einmalige Einrichtung
1. Accounts erstellen & Rechte bekommen

Erstelle dir einen kostenlosen Account auf GitHub.com.

Schick deinen GitHub-Benutzernamen an den Admin. Er wird dir eine Einladung zum "pire-website" Repository schicken. Nimm diese an!

2. Die Programme installieren (Alles kostenlos)

Lade dir Node.js herunter (Nimm die "LTS" Version) und installiere es (einfach immer auf "Weiter" klicken). Das ist unser Motor.

Lade dir Visual Studio Code (VS Code) herunter. Das ist unser Code-Editor.

Lade dir GitHub Desktop herunter. Das ist unser "Speichern & Hochladen"-Programm.

3. Das Projekt auf deinen PC holen

Öffne GitHub Desktop und logge dich mit deinem GitHub-Account ein.

Klick auf "Clone a repository from the Internet".

Wähle in der Liste pire-website aus und klick unten auf "Clone". Das Projekt wird jetzt auf deinen PC heruntergeladen.

4. Den Motor starten (Nur beim ersten Mal!)

Öffne VS Code.

Klick oben auf Datei -> Ordner öffnen und wähle den Ordner pire-website aus (den GitHub Desktop gerade erstellt hat).

Klick oben im Menü auf Terminal -> Neues Terminal.

Tippe folgenden Befehl ein und drücke Enter:
npm install
(Warte, bis er fertig geladen hat. Er holt jetzt alle wichtigen Bausteine).

📝 Phase 2: So bearbeitest du die Webseite (Dein Arbeitsalltag)
Wenn du einen neuen Termin oder Text eintragen willst, machst du ab jetzt immer Folgendes:

1. Das CMS (Dashboard) starten

Öffne VS Code (mit dem pire-website Ordner).

Öffne ein Terminal (Terminal -> Neues Terminal).

Tippe: npm run dev und drücke Enter.

Öffne deinen Internetbrowser und gehe auf: http://localhost:4321/keystatic

Willkommen im Dashboard! Hier kannst du jetzt wie in einem normalen Programm Texte schreiben, Bilder hochladen und Termine erstellen. Speichere deine Änderungen im Dashboard ab.

2. Änderungen live schalten (Hochladen)
Damit die ganze Welt deine neuen Texte sieht, müssen wir sie zu GitHub schicken:

Öffne GitHub Desktop.

Das Programm erkennt automatisch alle Änderungen, die du im Dashboard gemacht hast (sie stehen links in der Liste).

Unten links bei "Summary (required)" schreibst du kurz rein, was du gemacht hast (z.B. "Neuen Termin für Demo am Samstag hinzugefügt").

Klick auf den blauen Button "Commit to main".

Klick oben rechts auf "Push origin".

Fertig! Cloudflare baut die Webseite jetzt im Hintergrund neu zusammen. In 2 Minuten sind deine Änderungen online auf der echten Domain sichtbar!

# Astro Starter Kit: Minimal

```sh
npm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
