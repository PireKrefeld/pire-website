import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: { kind: 'local' },
  
  singletons: {
    ticker: singleton({
      label: '🚨 Eilmeldung / Ticker',
      path: 'src/content/ticker',
      format: { data: 'json' },
      schema: {
        anzeigen: fields.checkbox({ label: 'Ticker anzeigen?', defaultValue: true }),
        text: fields.text({ label: 'Ticker Text (Deutsch)' }),
        uebersetzungen: fields.object({
          ku: fields.object({ text: fields.text({ label: 'Text (Kurdisch)' }) }),
          en: fields.object({ text: fields.text({ label: 'Text (Englisch)' }) }),
          tr: fields.object({ text: fields.text({ label: 'Text (Türkisch)' }) }),
        }, { label: '🌍 ÜBERSETZUNGEN' })
      },
    }),
    
    startseite: singleton({
      label: '⚙️ Startseite & Einstellungen',
      path: 'src/content/einstellungen/startseite',
      format: { data: 'json' },
      schema: {
        sichtbarkeit: fields.object({
          kalender: fields.checkbox({ label: '📅 Kalender anzeigen?', defaultValue: true }),
          projekte: fields.checkbox({ label: '🛠️ Projekte anzeigen?', defaultValue: true }),
          buendnisse: fields.checkbox({ label: '🤝 Bündnisse anzeigen?', defaultValue: true }),
          spenden: fields.checkbox({ label: '💰 Spenden/Mitmachen anzeigen?', defaultValue: true }),
        }, { label: '👁️ SICHTBARKEIT DER SEKTIONEN' }),

        kopfbereich: fields.object({
          logo: fields.image({ label: 'Website Logo', directory: 'public/images/logo', publicPath: '/images/logo/' }),
          weisses_logo: fields.checkbox({ label: 'Logo ist weiß?', defaultValue: false }),
          hero_headline: fields.text({ label: 'Haupt-Überschrift (Deutsch)', defaultValue: 'Krefelds Brücke für Zusammenhalt & Solidarität' }),
          hero_text: fields.text({ label: 'Einleitungstext (Deutsch)', multiline: true }),
          uebersetzungen: fields.object({
            ku: fields.object({ hero_headline: fields.text({ label: 'Überschrift (Kurdisch)' }), hero_text: fields.text({ label: 'Text (Kurdisch)', multiline: true }) }),
            en: fields.object({ hero_headline: fields.text({ label: 'Überschrift (Englisch)' }), hero_text: fields.text({ label: 'Text (Englisch)', multiline: true }) }),
            tr: fields.object({ hero_headline: fields.text({ label: 'Überschrift (Türkisch)' }), hero_text: fields.text({ label: 'Text (Türkisch)', multiline: true }) }),
          }, { label: '🌍 ÜBERSETZUNGEN' })
        }, { label: '🎨 KOPFBEREICH & HERO' }),
        
        ueberschriften: fields.object({
          kalender: fields.text({ label: 'Kalender (Deutsch)', defaultValue: 'Kalender & Termine' }),
          projekte: fields.text({ label: 'Projekte (Deutsch)', defaultValue: 'Aktuelle Projekte & Angebote' }),
          buendnisse: fields.text({ label: 'Bündnisse (Deutsch)', defaultValue: 'Bündnisarbeit & Netzwerk' }),
          buendnisse_text: fields.text({ label: 'Bündnisse Text (Deutsch)', multiline: true }),
          spenden: fields.text({ label: 'Spenden (Deutsch)', defaultValue: 'Unterstützen & Spenden' }),
          uebersetzungen: fields.object({
            ku: fields.object({ kalender: fields.text({ label: 'Kalender (KU)' }), projekte: fields.text({ label: 'Projekte (KU)' }), buendnisse: fields.text({ label: 'Bündnisse (KU)' }), buendnisse_text: fields.text({ label: 'Text (KU)', multiline: true }), spenden: fields.text({ label: 'Spenden (KU)' }) }),
            en: fields.object({ kalender: fields.text({ label: 'Kalender (EN)' }), projekte: fields.text({ label: 'Projekte (EN)' }), buendnisse: fields.text({ label: 'Bündnisse (EN)' }), buendnisse_text: fields.text({ label: 'Text (EN)', multiline: true }), spenden: fields.text({ label: 'Spenden (EN)' }) }),
            tr: fields.object({ kalender: fields.text({ label: 'Kalender (TR)' }), projekte: fields.text({ label: 'Projekte (TR)' }), buendnisse: fields.text({ label: 'Bündnisse (TR)' }), buendnisse_text: fields.text({ label: 'Text (TR)', multiline: true }), spenden: fields.text({ label: 'Spenden (TR)' }) }),
          }, { label: '🌍 ÜBERSETZUNGEN' })
        }, { label: '📝 ÜBERSCHRIFTEN' }),

        social_feed: fields.object({
          anzeigen: fields.checkbox({ label: 'Social Feed anzeigen?', defaultValue: false }),
          ueberschrift: fields.text({ label: 'Überschrift (Deutsch)', defaultValue: 'Folge uns auf Instagram' }),
          embed_code: fields.text({ label: 'Embed-Code einfügen', multiline: true }),
          uebersetzungen: fields.object({
            ku: fields.object({ ueberschrift: fields.text({ label: 'Überschrift (KU)' }) }),
            en: fields.object({ ueberschrift: fields.text({ label: 'Überschrift (EN)' }) }),
            tr: fields.object({ ueberschrift: fields.text({ label: 'Überschrift (TR)' }) }),
          }, { label: '🌍 ÜBERSETZUNGEN' })
        }, { label: '📸 SOCIAL MEDIA FEED' }),
        
        spenden: fields.object({
          text: fields.text({ label: 'Aufruf-Text (Deutsch)', multiline: true }),
          opencollective: fields.url({ label: 'Link: Open Collective' }),
          paypal: fields.url({ label: 'Link: PayPal' }),
          liberapay: fields.url({ label: 'Link: Liberapay' }),
          iban: fields.text({ label: 'IBAN' }),
          uebersetzungen: fields.object({
            ku: fields.object({ text: fields.text({ label: 'Text (KU)', multiline: true }) }),
            en: fields.object({ text: fields.text({ label: 'Text (EN)', multiline: true }) }),
            tr: fields.object({ text: fields.text({ label: 'Text (TR)', multiline: true }) }),
          }, { label: '🌍 ÜBERSETZUNGEN' })
        }, { label: '💰 SPENDEN-LINKS' }),

        mitmachen: fields.object({
          ueberschrift: fields.text({ label: 'Überschrift (Deutsch)', defaultValue: 'Aktiv werden' }),
          beschreibung: fields.text({ label: 'Beschreibung (Deutsch)', defaultValue: 'Schreib uns direkt an!' }),
          button_text: fields.text({ label: 'Button Text (Deutsch)', defaultValue: 'E-Mail schreiben' }),
          button_link: fields.text({ label: 'Button Link / Ziel', defaultValue: 'mailto:piresolidarity@tuta.com' }),
          uebersetzungen: fields.object({
            ku: fields.object({ ueberschrift: fields.text({ label: 'Überschrift (KU)' }), beschreibung: fields.text({ label: 'Text (KU)' }), button_text: fields.text({ label: 'Button (KU)' }) }),
            en: fields.object({ ueberschrift: fields.text({ label: 'Überschrift (EN)' }), beschreibung: fields.text({ label: 'Text (EN)' }), button_text: fields.text({ label: 'Button (EN)' }) }),
            tr: fields.object({ ueberschrift: fields.text({ label: 'Überschrift (TR)' }), beschreibung: fields.text({ label: 'Text (TR)' }), button_text: fields.text({ label: 'Button (TR)' }) }),
          }, { label: '🌍 ÜBERSETZUNGEN' })
        }, { label: '🤝 MITMACHEN (Grüne Box)' }),
        
        socials: fields.array(
          fields.object({
            plattform: fields.select({
              label: 'Plattform',
              options: [{ label: 'Discord', value: 'discord' }, { label: 'WhatsApp', value: 'whatsapp' }, { label: 'Instagram', value: 'instagram' }, { label: 'Telegram', value: 'telegram' }, { label: 'Link', value: 'link' }],
              defaultValue: 'instagram'
            }),
            url: fields.url({ label: 'Link (URL)' }),
            anzeigen_in: fields.multiselect({
              label: 'Wo anzeigen?',
              options: [{ label: 'Grüne Box', value: 'mitmachen' }, { label: 'Footer', value: 'footer' }],
              defaultValue: ['footer']
            })
          }),
          { label: '📱 Social Media & Gruppen', itemLabel: props => props.fields.plattform.value }
        ),
        
        footer: fields.object({
          ueberschrift_kontakt: fields.text({ label: 'Überschrift Kontakt (DE)', defaultValue: 'Kontakt' }),
          text_kontakt: fields.text({ label: 'Zusatztext Kontakt (DE)', multiline: true }),
          label_email: fields.text({ label: 'Label E-Mail (DE)', defaultValue: 'Email: ✉️' }),
          kontakt_email: fields.text({ label: 'Kontakt E-Mail', defaultValue: 'piresolidarity@tuta.com' }),
          label_standort: fields.text({ label: 'Label Standort (DE)', defaultValue: 'Standort: 📍' }),
          standort_text: fields.text({ label: 'Standort (DE)', defaultValue: 'Krefeld' }),
          ueberschrift_werte: fields.text({ label: 'Überschrift Werte (DE)', defaultValue: '🤝 Werte-Statement' }),
          werte_statement: fields.text({ label: 'Werte-Statement (DE)', multiline: true }),
          copyright_text: fields.text({ label: 'Copyright (DE)', defaultValue: '© 2026 PIRE Krefeld.' }),
          uebersetzungen: fields.object({
            ku: fields.object({ ueberschrift_kontakt: fields.text({ label: 'Überschrift Kontakt (KU)' }), text_kontakt: fields.text({ label: 'Text Kontakt (KU)', multiline: true }), label_email: fields.text({ label: 'Label E-Mail (KU)' }), label_standort: fields.text({ label: 'Label Standort (KU)' }), standort_text: fields.text({ label: 'Standort (KU)' }), ueberschrift_werte: fields.text({ label: 'Überschrift Werte (KU)' }), werte_statement: fields.text({ label: 'Werte (KU)', multiline: true }), copyright_text: fields.text({ label: 'Copyright (KU)' }) }),
            en: fields.object({ ueberschrift_kontakt: fields.text({ label: 'Überschrift Kontakt (EN)' }), text_kontakt: fields.text({ label: 'Text Kontakt (EN)', multiline: true }), label_email: fields.text({ label: 'Label E-Mail (EN)' }), label_standort: fields.text({ label: 'Label Standort (EN)' }), standort_text: fields.text({ label: 'Standort (EN)' }), ueberschrift_werte: fields.text({ label: 'Überschrift Werte (EN)' }), werte_statement: fields.text({ label: 'Werte (EN)', multiline: true }), copyright_text: fields.text({ label: 'Copyright (EN)' }) }),
            tr: fields.object({ ueberschrift_kontakt: fields.text({ label: 'Überschrift Kontakt (TR)' }), text_kontakt: fields.text({ label: 'Text Kontakt (TR)', multiline: true }), label_email: fields.text({ label: 'Label E-Mail (TR)' }), label_standort: fields.text({ label: 'Label Standort (TR)' }), standort_text: fields.text({ label: 'Standort (TR)' }), ueberschrift_werte: fields.text({ label: 'Überschrift Werte (TR)' }), werte_statement: fields.text({ label: 'Werte (TR)', multiline: true }), copyright_text: fields.text({ label: 'Copyright (TR)' }) })
          }, { label: '🌍 ÜBERSETZUNGEN' })
        }, { label: '⚖️ KONTAKT & FOOTER' }),
      },
    }),

    globalSettings: singleton({
      label: '🌐 Globale Einstellungen',
      path: 'src/content/settings/global',
      format: { data: 'json' },
      schema: {
        metaTitle: fields.text({ label: 'Browser Tab Titel', defaultValue: 'PIRE Krefeld | Solidarische Brücken bauen' }),
        // 🚀 FAVICON IST WIEDER DA!
        favicon: fields.image({ label: 'Browser Favicon', directory: 'public/images/theme', publicPath: '/images/theme/' }),
      },
    }),
  },

  collections: {
    ui_texte: collection({
      label: '🌍 UI & Fallback Texte (Sprachen)',
      slugField: 'sprache',
      path: 'src/content/ui_texte/*',
      format: { data: 'json' },
      schema: {
        sprache: fields.slug({ name: { label: 'Sprachkürzel (z.B. de, ku, en, tr)' } }),
        navKalender: fields.text({ label: 'Menü: Kalender', defaultValue: 'Kalender' }),
        navProjekte: fields.text({ label: 'Menü: Projekte', defaultValue: 'Projekte' }),
        navBuendnisse: fields.text({ label: 'Menü: Bündnisse', defaultValue: 'Bündnisse' }),
        navSpenden: fields.text({ label: 'Menü: Unterstützen', defaultValue: 'Unterstützen' }),
        heroBtn1: fields.text({ label: 'Hero Button 1', defaultValue: 'Aktuelle Termine' }),
        heroBtn2: fields.text({ label: 'Hero Button 2', defaultValue: 'Mitmachen' }),
        btnDetails: fields.text({ label: 'Button: Details', defaultValue: 'Details →' }),
        btnArchiv: fields.text({ label: 'Button: Archiv', defaultValue: 'Aktions-Archiv →' }),
        btnGoogleCal: fields.text({ label: 'Button: Google Calendar', defaultValue: '+ Google Cal' }),
        btnAppleCal: fields.text({ label: 'Button: Apple / Outlook', defaultValue: '+ Apple / Outlook' }),
        statusAbgeschlossen: fields.text({ label: 'Status: Abgeschlossen', defaultValue: 'Abgeschlossen' }),
        spendenBank: fields.text({ label: 'Text: Banküberweisung', defaultValue: 'Banküberweisung' }),
        tickerPrefix: fields.text({ label: 'Ticker Signalwort', defaultValue: 'Aktuelles:' }),
        kalenderLeer: fields.text({ label: 'Text: Kalender ist leer', defaultValue: 'Aktuell stehen keine neuen Termine an.' }),
      },
    }),

    // 🚀 DIE NEUE MASTER-DATENBANK (ALLE FEATURES ZURÜCK!)
    aktionen: collection({
      label: '🚀 Aktionen, Projekte & Events',
      slugField: 'titel',
      path: 'src/content/aktionen/*',
      format: { contentField: 'inhalt' },
      schema: {
        titel: fields.slug({ name: { label: 'Titel (Deutsch)' } }),
        
        uebersetzungen: fields.object({
          ku: fields.object({ titel: fields.text({ label: 'Titel (Kurdisch)' }), kurzbeschreibung: fields.text({ label: 'Kurzbeschreibung (Kurdisch)', multiline: true }) }),
          en: fields.object({ titel: fields.text({ label: 'Titel (Englisch)' }), kurzbeschreibung: fields.text({ label: 'Kurzbeschreibung (Englisch)', multiline: true }) }),
          tr: fields.object({ titel: fields.text({ label: 'Titel (Türkisch)' }), kurzbeschreibung: fields.text({ label: 'Kurzbeschreibung (Türkisch)', multiline: true }) }),
        }, { label: '🌍 ÜBERSETZUNGEN (Optional)' }),

        // 🎯 ANZEIGE-ORT (Mit deinem neuen "Trotzdem anzeigen" Feature)
        anzeige_ort: fields.multiselect({
          label: 'Wo soll dieser Eintrag angezeigt werden?',
          options: [
            { label: '📅 Im Kalender / Termine', value: 'kalender' },
            { label: '🛠️ Bei den Projekten', value: 'projekte' },
            { label: '🗄️ Nur im Archiv', value: 'archiv' },
            { label: '📌 PRO-TIPP: Auch wenn abgeschlossen, trotzdem auf der Startseite behalten!', value: 'immer_anzeigen' }
          ],
          defaultValue: ['projekte']
        }),

        // 🏷️ CUSTOM STATUS & BADGES (Jetzt mit "Kein Badge" Option)
        status_badge: fields.conditional(
          fields.select({
            label: 'Status / Badge (Farbige Markierung)',
            options: [
              { label: 'Automatisch (Aktiv/Archiv berechnet)', value: 'auto' },
              { label: 'Eigenes Badge (z.B. "Mega Event")', value: 'custom' },
              { label: '🚫 Gar kein Badge anzeigen', value: 'none' } // <-- NEU!
            ],
            defaultValue: 'auto'
          }),
          {
            auto: fields.empty(),
            none: fields.empty(), // <-- NEU!
            custom: fields.object({
              text: fields.text({ label: 'Text für das Badge' }),
              farbe: fields.select({
                label: 'Farbe des Badges',
                options: [{ label: 'Grün', value: 'green' }, { label: 'Gelb', value: 'yellow' }, { label: 'Rot', value: 'red' }, { label: 'Grau', value: 'slate' }],
                defaultValue: 'green'
              })
            })
          }
        ),

        // ⏱️ ZEITPLANUNG (Einmalig, Wiederkehrend, Dauerhaft SIND ZURÜCK!)
        zeitplanung: fields.conditional(
          fields.select({ 
            label: 'Zeitlicher Rahmen', 
            options: [{ label: 'Einmaliges Datum', value: 'einmalig' }, { label: 'Wiederkehrend / Rhythmus', value: 'wiederkehrend' }, { label: 'Dauerhaft (Kein Datum)', value: 'dauerhaft' }], 
            defaultValue: 'einmalig' 
          }),
          {
            einmalig: fields.object({
              datum: fields.date({ label: 'Exaktes Datum (Wenn in Vergangenheit -> Auto-Archiv)' }),
              uhrzeit: fields.text({ label: 'Uhrzeit (Optional, z.B. 18:00 Uhr)' })
            }),
            wiederkehrend: fields.object({
              rhythmus: fields.text({ label: 'Rhythmus (z.B. Jeden 1. Freitag im Monat)' }),
              uhrzeit: fields.text({ label: 'Uhrzeit (Optional)' })
            }),
            dauerhaft: fields.empty()
          }
        ),

        details: fields.object({
          ort: fields.text({ label: 'Ort / Adresse (Optional)' }),
          kurzbeschreibung: fields.text({ label: 'Kurze Einleitung (Startseite)', multiline: true }),
          beitragsbild: fields.image({ label: 'Beitragsbild', directory: 'public/images/aktionen', publicPath: '/images/aktionen/' }),
        }, { label: '📍 Basis-Infos & Bild' }),

        // 💡 FAKTEN-BOXEN SIND ZURÜCK!
        fakten: fields.array(
          fields.object({
            icon: fields.text({ label: 'Emoji / Icon (z.B. ⏱️)' }),
            bezeichnung: fields.text({ label: 'Bezeichnung (z.B. Dauer)' }),
            wert: fields.text({ label: 'Wert (z.B. 3 Stunden)' })
          }),
          { label: '💡 Fakten-Boxen', itemLabel: props => props.fields.bezeichnung.value || 'Neuer Fakt' }
        ),

        aktionen_links: fields.array(
          fields.object({
            label: fields.text({ label: 'Button-Text (z.B. WhatsApp-Gruppe)' }),
            url: fields.url({ label: 'Link (URL)' }),
            zeige_qr: fields.checkbox({ label: 'QR-Code für diesen Link generieren?', defaultValue: false })
          }),
          { label: '🔗 Externe Links & Buttons', itemLabel: props => props.fields.label.value }
        ),

        // 📚 DIE HISTORIE (SAUBER, OHNE DUMMY-SCHALTER!)
        historie_aktiv: fields.conditional(
          fields.checkbox({ label: '📚 Archiv / Historie für dieses Event aktivieren? (Klappt Liste auf)' }),
          {
            true: fields.array(
              fields.object({
                jahr: fields.text({ label: 'Jahr / Datum (z.B. 2025)' }),
                text: fields.text({ label: 'Kurzer Rückblick', multiline: true }),
              }),
              { label: 'Vergangene Ausführungen (z.B. Newroz 2024)', itemLabel: props => props.fields.jahr.value }
            ),
            false: fields.empty()
          }
        ),

        inhalt: fields.document({ label: 'Ausführlicher Artikel (Mit Bildern, Formatierung, etc.)', formatting: true, links: true, images: { directory: 'public/images/aktionen_artikel', publicPath: '/images/aktionen_artikel/' } }),
      },
    }),

    buendnisse: collection({
      label: '🤝 Bündnispartner',
      slugField: 'name',
      path: 'src/content/buendnisse/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({ name: { label: 'Name der Organisation' } }),
        link: fields.url({ label: 'Webseite (Optional)' }),
        logo: fields.image({ label: 'Logo hochladen', directory: 'public/images/buendnisse', publicPath: '/images/buendnisse/' }),
        weisses_logo: fields.checkbox({ label: 'Logo ist weiß?', defaultValue: false }),
      },
    }),
  },
});