# 🚀 PIRE Krefeld: Leitfaden zur Webseiten-Pflege

Willkommen im Web-Team von PIRE Krefeld! Unsere Webseite ist extrem modern, blitzschnell und zu 100 % sicher aufgebaut. Wir nutzen kein hackbares WordPress und keine Cloud-Datenbanken. Wir arbeiten stattdessen direkt lokal auf unserem eigenen Rechner.

---

## 👩‍💻 TEIL 1: FÜR REDAKTEURE & TEAMMITGLIEDER

Dieser Teil erklärt dir, wie du als normales Teammitglied Artikel, Termine oder Bündnisse hinzufügen kannst. Du musst dafür deinen PC nur einmalig einrichten (dauert ca. 10 Minuten).

### ✍️ WICHTIG: Texte formatieren (Fett, Kursiv, Links)
Um unsere Webseite rasend schnell und fehlerfrei zu halten, nutzen wir in den meisten Feldern (z.B. bei Kurzbeschreibungen oder dem Spenden-Aufruf) einfache Textfelder. Du kannst deine Texte trotzdem wunderschön formatieren! Nutze dafür einfach diese simplen HTML-Codes:

* **Fett gedruckt:** Nutze `<b>` und `</b>` *(Beispiel: `Wir sind <b>PIRE Krefeld</b>.`)*
* **Kursiv:** Nutze `<i>` und `</i>` *(Beispiel: `Ein <i>solidarisches</i> Netzwerk.`)*
* **Verlinkungen:** Nutze `<a href="DEIN_LINK">` und `</a>` *(Beispiel: `Klicke <a href="https://google.com">hier</a>.`)*
* **Zeilenumbruch:** Drücke einfach die **Enter-Taste**. Das System baut den Umbruch automatisch ein.

### 🛠️ Phase 1: Die Einmalige Einrichtung (Nur beim ersten Mal!)
1. **Accounts & Rechte:** Erstelle dir einen Account auf [GitHub.com](https://github.com/) und lass dich vom Admin in das Projekt einladen.
2. **Programme installieren:** Lade dir [Node.js](https://nodejs.org/) (LTS Version), [Git](https://git-scm.com/downloads) und [Visual Studio Code (VS Code)](https://code.visualstudio.com/) herunter und installiere alles (Standard-Einstellungen genügen).
3. **Projekt clonen:** Öffne VS Code, klick links auf das "Quellcodeverwaltung"-Icon (drei Kreise), klick auf "Repository klonen" und wähle "Aus GitHub klonen". Wähle unser PIRE-Projekt aus und speichere es in einem Ordner auf deinem PC.
4. **Motor installieren:** Klick in VS Code oben auf `Terminal` -> `Neues Terminal`. Tippe `npm install` ein und drücke Enter. Warte, bis er fertig ist.

### 📝 Phase 2: Dein Arbeitsalltag (Texte & Termine eintragen)
1. **CMS starten:** Öffne VS Code, mach ein Terminal auf und tippe `npm run dev`. Gehe dann in deinem Browser auf 👉 **http://localhost:4321/keystatic**. Du bist jetzt im Dashboard! Trage deine Dinge ein und klicke auf Speichern.
2. **Hochladen (Live schalten):** Gehe zurück in VS Code. Klick links auf die Quellcodeverwaltung. Klick auf das **Plus-Symbol (+)** bei deinen Änderungen. Schreib oben kurz rein, was du gemacht hast. Klick auf **Commit** und dann auf **Änderungen synchronisieren**. 
3. **Fertig!** Cloudflare baut die Seite im Hintergrund neu. In ca. 2 Minuten ist alles live.

---
---

## 👨‍💻 TEIL 2: FÜR ENTWICKLER & NERDS (UNDER THE HOOD)

Willkommen im Maschinenraum. Wenn du diese Webseite in Zukunft erweitern, neue Sektionen bauen oder das Design anpassen willst, findest du hier alle nötigen Ressourcen.

### 🏗️ Der Tech-Stack (State of the Art 2026)
Diese Seite ist eine **Static Site Generation (SSG)** Architektur. Sie ist auf maximale Performance, absolute Sicherheit (keine Datenbank, die gehackt werden kann) und perfekten Lighthouse-Score getrimmt.
* **Framework:** [Astro](https://astro.build/) (Rasend schnelles Frontend)
* **CMS:** [Keystatic](https://keystatic.com/) (Git-basiertes, lokales CMS)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-First CSS)
* **Hosting:** Cloudflare Pages (Automatischer Build bei jedem GitHub Push)

### 📂 Projektstruktur (Wo finde ich was?)
* `keystatic.config.ts`: **Das Gehirn des CMS.** Wenn du neue Felder für die Redakteure (z.B. einen neuen Schalter oder ein neues Textfeld) hinzufügen willst, machst du das hier.
* `src/content.config.ts`: **Der Türsteher von Astro.** Wenn du in Keystatic ein neues Feld angelegt hast, MUSST du es hier im Zod-Schema (z.B. `z.string().optional()`) ebenfalls eintragen. Sonst ignoriert Astro die neuen Daten oder wirft einen TypeScript-Fehler.
* `src/pages/index.astro`: **Die Startseite.** Hier wird das Frontend aus HTML, Tailwind-Klassen und Astro-Komponenten zusammengebaut. Alle CMS-Daten werden hier geladen und per `set:html` (für formatierte Texte) ausgegeben.
* `src/pages/projekte/[id].astro`: Das Template für die dynamischen Unterseiten der einzelnen Projekte. Hier wirkt `is:global` im `<style>` Block, um die generierten Markdown-Inhalte von Keystatic zu stylen.

### 🔌 Ein neues CMS-Feld einbauen (Der Workflow)
Wenn das Team ein neues Feature will (z.B. ein Feld für eine "Telefonnummer" bei den Terminen), gehst du so vor:
1. Öffne `keystatic.config.ts`, suche die Collection `termine` und füge z.B. `telefon: fields.text({ label: 'Telefon' })` hinzu.
2. Öffne `src/content.config.ts`, suche das Schema für `termine` und füge `telefon: z.string().nullish()` hinzu.
3. Öffne `src/pages/index.astro`, suche die Termin-Schleife (`alleTermine.map...`) und gib das Feld z.B. so aus: `{termin.data.telefon && <span>{termin.data.telefon}</span>}`.

### 📖 Wichtige Dokumentationen zum Nachschlagen
* **Astro Content Collections:** [docs.astro.build/en/guides/content-collections/](https://docs.astro.build/en/guides/content-collections/)
* **Keystatic Fields (Alle verfügbaren CMS Bausteine):** [keystatic.com/docs/fields](https://keystatic.com/docs/fields)
* **Tailwind CSS Klassen:** [tailwindcss.com/docs](https://tailwindcss.com/docs)

# 🚀 PIRE Krefeld: Leitfaden zur Webseiten-Pflege

Willkommen im Web-Team von PIRE Krefeld! Unsere Webseite ist extrem modern, blitzschnell und zu 100 % sicher aufgebaut. Wir nutzen kein hackbares WordPress und keine Cloud-Datenbanken. Wir arbeiten stattdessen direkt lokal auf unserem eigenen Rechner.

---

## 👩‍💻 TEIL 1: FÜR REDAKTEURE & TEAMMITGLIEDER

Dieser Teil erklärt dir, wie du als normales Teammitglied Artikel, Termine oder Bündnisse hinzufügen kannst. Du musst dafür deinen PC nur einmalig einrichten (dauert ca. 10 Minuten).

### ✍️ WICHTIG: Texte formatieren (Fett, Kursiv, Links)
Um unsere Webseite rasend schnell und fehlerfrei zu halten, nutzen wir in den meisten Feldern (z.B. bei Kurzbeschreibungen oder dem Spenden-Aufruf) einfache Textfelder. Du kannst deine Texte trotzdem wunderschön formatieren! Nutze dafür einfach diese simplen HTML-Codes:

* **Fett gedruckt:** Nutze `<b>` und `</b>` *(Beispiel: `Wir sind <b>PIRE Krefeld</b>.`)*
* **Kursiv:** Nutze `<i>` und `</i>` *(Beispiel: `Ein <i>solidarisches</i> Netzwerk.`)*
* **Verlinkungen:** Nutze `<a href="DEIN_LINK">` und `</a>` *(Beispiel: `Klicke <a href="https://google.com">hier</a>.`)*
* **Zeilenumbruch:** Drücke einfach die **Enter-Taste**. Das System baut den Umbruch automatisch ein.
* **Trennlinie (Strich):** Schreibe einfach `<hr>` in eine leere Zeile.

📚 **Du willst mehr machen (z. B. unterstrichen, durchgestrichen, Aufzählungen)?**
Da unsere Textfelder Standard-HTML unterstützen, sind dir keine Grenzen gesetzt. Eine idiotensichere, komplette Liste aller funktionierenden Text-Formatierungen findest du auf diesem Spickzettel:
👉 [W3Schools: HTML Text-Formatierung (Übersicht)](https://www.w3schools.com/html/html_formatting.asp)

### 🛠️ Phase 1: Die Einmalige Einrichtung (Nur beim ersten Mal!)
1. **Accounts & Rechte:** Erstelle dir einen Account auf [GitHub.com](https://github.com/) und lass dich vom Admin in das Projekt einladen.
2. **Programme installieren:** Lade dir [Node.js](https://nodejs.org/) (LTS Version), [Git](https://git-scm.com/downloads) und [Visual Studio Code (VS Code)](https://code.visualstudio.com/) herunter und installiere alles (Standard-Einstellungen genügen).
3. **Projekt clonen:** Öffne VS Code, klick links auf das "Quellcodeverwaltung"-Icon (drei Kreise), klick auf "Repository klonen" und wähle "Aus GitHub klonen". Wähle unser PIRE-Projekt aus und speichere es in einem Ordner auf deinem PC.
4. **Motor installieren:** Klick in VS Code oben auf `Terminal` -> `Neues Terminal`. Tippe `npm install` ein und drücke Enter. Warte, bis er fertig ist.

### 📝 Phase 2: Dein Arbeitsalltag (Texte & Termine eintragen)
1. **CMS starten:** Öffne VS Code, mach ein Terminal auf und tippe `npm run dev`. Gehe dann in deinem Browser auf 👉 **http://localhost:4321/keystatic**. Du bist jetzt im Dashboard! Trage deine Dinge ein und klicke auf Speichern.
2. **Hochladen (Live schalten):** Gehe zurück in VS Code. Klick links auf die Quellcodeverwaltung. Klick auf das **Plus-Symbol (+)** bei deinen Änderungen. Schreib oben kurz rein, was du gemacht hast. Klick auf **Commit** und dann auf **Änderungen synchronisieren**. 
3. **Fertig!** Cloudflare baut die Seite im Hintergrund neu. In ca. 2 Minuten ist alles live.

---
---

## 👨‍💻 TEIL 2: FÜR ENTWICKLER & NERDS (UNDER THE HOOD)

Willkommen im Maschinenraum. Wenn du diese Webseite in Zukunft erweitern, neue Sektionen bauen oder das Design anpassen willst, findest du hier alle nötigen Ressourcen.

### 🏗️ Der Tech-Stack (State of the Art 2026)
Diese Seite ist eine **Static Site Generation (SSG)** Architektur. Sie ist auf maximale Performance, absolute Sicherheit (keine Datenbank, die gehackt werden kann) und perfekten Lighthouse-Score getrimmt.
* **Framework:** [Astro](https://astro.build/) (Rasend schnelles Frontend)
* **CMS:** [Keystatic](https://keystatic.com/) (Git-basiertes, lokales CMS)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-First CSS)
* **Hosting:** Cloudflare Pages (Automatischer Build bei jedem GitHub Push)

### 📂 Projektstruktur (Wo finde ich was?)
* `keystatic.config.ts`: **Das Gehirn des CMS.** Wenn du neue Felder für die Redakteure (z.B. einen neuen Schalter oder ein neues Textfeld) hinzufügen willst, machst du das hier.
* `src/content.config.ts`: **Der Türsteher von Astro.** Wenn du in Keystatic ein neues Feld angelegt hast, MUSST du es hier im Zod-Schema (z.B. `z.string().optional()`) ebenfalls eintragen. Sonst ignoriert Astro die neuen Daten oder wirft einen TypeScript-Fehler.
* `src/pages/index.astro`: **Die Startseite.** Hier wird das Frontend aus HTML, Tailwind-Klassen und Astro-Komponenten zusammengebaut. Alle CMS-Daten werden hier geladen und per `set:html` (für formatierte Texte) ausgegeben.
* `src/pages/projekte/[id].astro`: Das Template für die dynamischen Unterseiten der einzelnen Projekte. Hier wirkt `is:global` im `<style>` Block, um die generierten Markdown-Inhalte von Keystatic zu stylen.

### 🔌 Ein neues CMS-Feld einbauen (Der Workflow)
Wenn das Team ein neues Feature will (z.B. ein Feld für eine "Telefonnummer" bei den Terminen), gehst du so vor:
1. Öffne `keystatic.config.ts`, suche die Collection `termine` und füge z.B. `telefon: fields.text({ label: 'Telefon' })` hinzu.
2. Öffne `src/content.config.ts`, suche das Schema für `termine` und füge `telefon: z.string().nullish()` hinzu.
3. Öffne `src/pages/index.astro`, suche die Termin-Schleife (`alleTermine.map...`) und gib das Feld z.B. so aus: `{termin.data.telefon && <span>{termin.data.telefon}</span>}`.

### 📖 Wichtige Dokumentationen zum Nachschlagen
* **Astro Content Collections:** [docs.astro.build/en/guides/content-collections/](https://docs.astro.build/en/guides/content-collections/)
* **Keystatic Fields (Alle verfügbaren CMS Bausteine):** [keystatic.com/docs/fields](https://keystatic.com/docs/fields)
* **Tailwind CSS Klassen:** [tailwindcss.com/docs](https://tailwindcss.com/docs)