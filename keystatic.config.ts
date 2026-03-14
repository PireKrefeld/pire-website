import { config, fields, collection, singleton, component } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  
  singletons: {
    ticker: singleton({
      label: '🚨 Eilmeldung / Ticker',
      path: 'src/content/ticker',
      format: { data: 'json' },
      schema: {
        anzeigen: fields.checkbox({ label: 'Ticker anzeigen?', defaultValue: true }),
        text: fields.text({ label: 'Ticker Text' }),
      },
    }),
    
    startseite: singleton({
      label: '⚙️ Startseite & Einstellungen',
      path: 'src/content/einstellungen/startseite',
      format: { data: 'json' },
      schema: {
        kopfbereich: fields.object({
          logo: fields.image({ label: 'Website Logo', directory: 'public/images/logo', publicPath: '/images/logo/' }),
          weisses_logo: fields.checkbox({ label: 'Logo ist weiß? (Erzeugt automatisch einen dunklen Hintergrund)', defaultValue: false }),
          hero_headline: fields.text({ label: 'Haupt-Überschrift', defaultValue: 'Krefelds Brücke für Zusammenhalt & Solidarität' }),
          hero_text: fields.text({ label: 'Einleitungstext', multiline: true }),
        }, { label: '🎨 KOPFBEREICH & HERO' }),
        
        ueberschriften: fields.object({
          kalender: fields.text({ label: 'Kalender Sektion', defaultValue: 'Kalender & Termine' }),
          kalender_leer: fields.text({ label: 'Text wenn Kalender leer ist', defaultValue: 'Aktuell stehen keine neuen Termine an.' }),
          projekte: fields.text({ label: 'Projekte Sektion', defaultValue: 'Aktuelle Projekte & Angebote' }),
          buendnisse: fields.text({ label: 'Bündnisse Sektion', defaultValue: 'Bündnisarbeit & Netzwerk' }),
          buendnisse_text: fields.text({ label: 'Einleitungstext Bündnisse', multiline: true }),
          spenden: fields.text({ label: 'Spenden Sektion', defaultValue: 'Unterstützen & Spenden' }),
        }, { label: '📝 ÜBERSCHRIFTEN DER SEKTIONEN' }),

        social_feed: fields.object({
          anzeigen: fields.checkbox({ label: 'Social Feed Sektion anzeigen?', defaultValue: false }),
          ueberschrift: fields.text({ label: 'Überschrift (z.B. Aktuelles von Instagram)', defaultValue: 'Folge uns auf Instagram' }),
          embed_code: fields.text({ label: 'Embed-Code einfügen', multiline: true, description: 'Füge hier den HTML-Code deines Widgets ein.' }),
        }, { label: '📸 SOCIAL MEDIA FEED WIDGET' }),
        
        spenden: fields.object({
          text: fields.text({ label: 'Aufruf-Text', multiline: true }),
          opencollective: fields.url({ label: 'Link: Open Collective (Leer lassen zum Verstecken)' }),
          paypal: fields.url({ label: 'Link: PayPal (Leer lassen zum Verstecken)' }),
          liberapay: fields.url({ label: 'Link: Liberapay (Leer lassen zum Verstecken)' }),
          iban: fields.text({ label: 'Bankverbindung / IBAN (Leer lassen zum Verstecken)' }),
        }, { label: '💰 SPENDEN-LINKS' }),

        // 🚀 UPDATE: Mitmachen ist jetzt komplett entkoppelt und flexibel
        mitmachen: fields.object({
          ueberschrift: fields.text({ label: 'Überschrift', defaultValue: 'Aktiv werden / Sachspenden' }),
          beschreibung: fields.text({ label: 'Beschreibungstext', defaultValue: 'Du möchtest dich einbringen? Schreib uns direkt an!' }),
          button_text: fields.text({ label: 'Button Text (Leer = Verstecken)', defaultValue: 'E-Mail schreiben' }),
          button_link: fields.text({ label: 'Button Link / Ziel', defaultValue: 'mailto:piresolidarity@tuta.com', description: 'Für E-Mail: mailto:name@mail.de | Für Formular: https://... | Für Telefon: tel:+49...' }),
        }, { label: '🤝 MITMACHEN (Grüne Box)' }),
        
        socials: fields.array(
          fields.object({
            plattform: fields.select({
              label: 'Plattform',
              options: [
                { label: 'Discord', value: 'discord' },
                { label: 'WhatsApp', value: 'whatsapp' },
                { label: 'Instagram', value: 'instagram' },
                { label: 'Telegram', value: 'telegram' },
                { label: 'Sonstiger Link', value: 'link' }
              ],
              defaultValue: 'instagram'
            }),
            url: fields.url({ label: 'Link (URL)' }),
            anzeigen_in: fields.multiselect({
              label: 'Wo soll dieser Button angezeigt werden?',
              options: [
                { label: 'Grüne Mitmachen-Box', value: 'mitmachen' },
                { label: 'Schwarzer Footer (Kontakt)', value: 'footer' }
              ],
              defaultValue: ['footer']
            })
          }),
          { label: '📱 Social Media & Gruppen', itemLabel: props => props.fields.plattform.value }
        ),
        
        footer: fields.object({
          ueberschrift_kontakt: fields.text({ label: 'Überschrift Kontakt', defaultValue: 'Kontakt' }),
          text_kontakt: fields.text({ label: 'Zusatztext unter Kontakt (Optional)', multiline: true }),
          label_email: fields.text({ label: 'Bezeichnung E-Mail (Leer = Verstecken)', defaultValue: 'Email: ✉️' }),
          kontakt_email: fields.text({ label: 'Kontakt E-Mail Adresse', defaultValue: 'piresolidarity@tuta.com' }),
          label_standort: fields.text({ label: 'Bezeichnung Standort (Leer = Verstecken)', defaultValue: 'Standort: 📍' }),
          standort_text: fields.text({ label: 'Standort / Stadt', defaultValue: 'Krefeld' }),
          ueberschrift_werte: fields.text({ label: 'Überschrift Werte-Statement', defaultValue: '🤝 Werte-Statement' }),
          werte_statement: fields.text({ label: 'Werte-Statement Text', multiline: true }),
          copyright_text: fields.text({ label: 'Copyright Hinweis', defaultValue: '© 2026 PIRE Krefeld. Alle Rechte vorbehalten.' }),
        }, { label: '⚖️ KONTAKT & FOOTER' }),
      },
    }),
  },

  collections: {
    termine: collection({
      label: '📅 Kalender & Termine',
      slugField: 'titel',
      path: 'src/content/termine/*',
      format: { data: 'json' },
      schema: {
        titel: fields.slug({ name: { label: 'Event Name' } }),
        eventTyp: fields.conditional(
          fields.select({
            label: 'Art des Events',
            options: [
              { label: 'Einmaliges Event', value: 'einmalig' },
              { label: 'Wiederkehrendes Event', value: 'wiederkehrend' },
              { label: 'Jährliches Event', value: 'jaehrlich' },
            ],
            defaultValue: 'einmalig',
          }),
          {
            einmalig: fields.object({ exaktes_datum: fields.date({ label: 'Exaktes Datum' }) }),
            wiederkehrend: fields.object({ rhythmus: fields.text({ label: 'Rhythmus', description: 'z.B. Jeden 1. Dienstag' }) }),
            jaehrlich: fields.object({ datum_text: fields.text({ label: 'Tag und Monat', description: 'z.B. 08. März' }) }),
          }
        ),
        uhrzeit: fields.text({ label: 'Uhrzeit (z.B. 16:00)' }),
        ort: fields.text({ label: 'Ort / Adresse' }),
        beschreibung: fields.text({ label: 'Kurze Beschreibung', multiline: true }),
      },
    }),

    projekte: collection({
      label: '🛠️ Projekte & Aktionen',
      slugField: 'titel',
      path: 'src/content/projekte/*',
      format: { contentField: 'inhalt' }, 
      schema: {
        titel: fields.slug({ name: { label: 'Titel des Projekts' } }),
        status: fields.conditional(
          fields.select({
            label: 'Projekt-Status',
            options: [
              { label: '🟢 Dauerhaftes Angebot', value: 'dauerhaft' },
              { label: '🟡 Aktives/Laufendes Projekt', value: 'aktiv' },
              { label: '⚪ Erfolgreich Abgeschlossen', value: 'abgeschlossen' },
              { label: '❌ Abgebrochen / Fehlgeschlagen', value: 'abgebrochen' },
              { label: '✏️ Eigener Status (Custom)', value: 'custom' },
            ],
            defaultValue: 'aktiv',
          }),
          {
            dauerhaft: fields.empty(), aktiv: fields.empty(), abgeschlossen: fields.empty(), abgebrochen: fields.empty(),
            custom: fields.object({
              text: fields.text({ label: 'Eigener Text' }),
              farbe: fields.select({
                label: 'Hintergrundfarbe',
                options: [
                  { label: 'Grün', value: 'green' }, { label: 'Gelb', value: 'yellow' }, 
                  { label: 'Rot', value: 'red' }, { label: 'Grau', value: 'slate' }
                ],
                defaultValue: 'green',
              })
            })
          }
        ),
        kurzbeschreibung: fields.text({ label: 'Kurzbeschreibung (Startseite)', multiline: true }),
        fakten: fields.array(
          fields.object({
            icon: fields.text({ label: 'Emoji / Icon', description: 'z.B. 📍 oder ⏰' }),
            bezeichnung: fields.text({ label: 'Bezeichnung', description: 'z.B. Wann' }),
            wert: fields.text({ label: 'Wert', description: 'z.B. Jeden Freitag' }),
          }),
          { label: 'Fakten-Boxen (Wann/Wo/Wie)', itemLabel: props => props.fields.bezeichnung.value || 'Neuer Fakt' }
        ),
        inhalt: fields.document({
          label: 'Ausführlicher Artikel',
          formatting: true, links: true,
          images: { directory: 'public/images/projekte', publicPath: '/images/projekte/' },
          componentBlocks: {
            media: component({
              label: '📺 Medien einbetten (YouTube / Insta)',
              schema: { url: fields.url({ label: 'Link zum Video / Post einfügen' }) },
              preview: () => null,
            })
          }
        }),
      },
    }),

    buendnisse: collection({
      label: '🤝 Bündnispartner',
      slugField: 'name',
      path: 'src/content/buendnisse/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name der Organisation' } }),
        link: fields.url({ label: 'Link zur Webseite (Optional)' }),
        logo: fields.image({ label: 'Logo hochladen', directory: 'public/images/buendnisse', publicPath: '/images/buendnisse/' }),
        weisses_logo: fields.checkbox({ label: 'Logo ist weiß? (Erzeugt dunklen Hintergrund)', defaultValue: false }),
      },
    }),
  },
});