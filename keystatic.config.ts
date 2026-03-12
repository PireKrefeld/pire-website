//import { config, fields, collection, singleton, component } from '@keystatic/core';

//export default config({
  // --- DAS HIER IST DER NEUE WECHSELSCHALTER ---
 // storage: import.meta.env.DEV 
 //   ? { kind: 'local' } 
  //  : { kind: 'cloud' },
    
 // cloud: {
 //   project: 'pire-krefeld/pire-website', 
 // },
  // ---------------------------------------------
import { config, fields, collection, singleton, component } from '@keystatic/core';

export default config({
  // Purer, unzerstörbarer lokaler Modus
  storage: {
    kind: 'local',
  },
  
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
        
        // VISUELLE TRENNUNG 1: KOPFBEREICH
        kopfbereich: fields.object({
          logo: fields.image({ label: 'Website Logo', directory: 'public/images/logo', publicPath: '/images/logo/' }),
          hero_headline: fields.text({ label: 'Haupt-Überschrift', defaultValue: 'Krefelds Brücke für Zusammenhalt & Solidarität' }),
          hero_text: fields.text({ label: 'Einleitungstext', multiline: true }),
        }, { label: '🎨 KOPFBEREICH & HERO' }),
        
        // VISUELLE TRENNUNG 2: ÜBERSCHRIFTEN
        ueberschriften: fields.object({
          kalender: fields.text({ label: 'Kalender Sektion', defaultValue: 'Kalender & Termine' }),
          kalender_leer: fields.text({ label: 'Text wenn Kalender leer ist', defaultValue: 'Aktuell stehen keine neuen Termine an.' }),
          projekte: fields.text({ label: 'Projekte Sektion', defaultValue: 'Aktuelle Projekte & Angebote' }),
          buendnisse: fields.text({ label: 'Bündnisse Sektion', defaultValue: 'Bündnisarbeit & Netzwerk' }),
          buendnisse_text: fields.text({ label: 'Einleitungstext Bündnisse', multiline: true }),
          spenden: fields.text({ label: 'Spenden Sektion', defaultValue: 'Unterstützen & Spenden' }),
        }, { label: '📝 ÜBERSCHRIFTEN DER SEKTIONEN' }),
        
        // VISUELLE TRENNUNG 3: SPENDEN
        spenden: fields.object({
          text: fields.text({ label: 'Aufruf-Text', multiline: true }),
          opencollective: fields.url({ label: 'Link: Open Collective (Leer lassen zum Verstecken)' }),
          paypal: fields.url({ label: 'Link: PayPal (Leer lassen zum Verstecken)' }),
          liberapay: fields.url({ label: 'Link: Liberapay (Leer lassen zum Verstecken)' }), // WIEDER DA!
          iban: fields.text({ label: 'Bankverbindung / IBAN (Leer lassen zum Verstecken)' }),
        }, { label: '💰 SPENDEN-LINKS' }),
        
        // VISUELLE TRENNUNG 4: FOOTER
        footer: fields.object({
          kontakt_email: fields.text({ label: 'Kontakt E-Mail', defaultValue: 'piresolidarity@tuta.com' }),
          werte_statement: fields.text({ label: 'Werte-Statement', multiline: true }),
          copyright_text: fields.text({ label: 'Copyright Hinweis', defaultValue: '© 2026 PIRE Krefeld. Alle Rechte vorbehalten.' }),
        }, { label: '⚖️ KONTAKT & FOOTER' }),

      },
    }),
  },

  // ... HIER BLEIBEN DEINE COLLECTIONS WIE VORHER ...
  collections: {
    termine: collection({
      label: '📅 Kalender & Termine',
      slugField: 'titel',
      path: 'src/content/termine/*',
      format: { data: 'json' },
      schema: {
        titel: fields.slug({ name: { label: 'Event Name' } }),
        eventTyp: fields.select({
          label: 'Art des Events',
          options: [
            { label: 'Einmaliges Event', value: 'einmalig' },
            { label: 'Wiederkehrendes Event', value: 'wiederkehrend' },
            { label: 'Jährliches Event', value: 'jaehrlich' },
          ],
          defaultValue: 'einmalig',
        }),
        rhythmus: fields.text({ label: 'Rhythmus (NUR für wiederkehrende Events ausfüllen!)' }),
        exaktes_datum: fields.date({ label: 'Exaktes Datum (Für einmalige Events)' }),
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
        status: fields.select({
          label: 'Projekt-Status',
          options: [
            { label: '🟢 Dauerhaftes Angebot', value: 'dauerhaft' },
            { label: '🟡 Aktives/Laufendes Projekt', value: 'aktiv' },
            { label: '⚪ Erfolgreich Abgeschlossen', value: 'abgeschlossen' },
            { label: '❌ Abgebrochen / Fehlgeschlagen', value: 'abgebrochen' },
          ],
          defaultValue: 'aktiv',
        }),
        kurzbeschreibung: fields.text({ label: 'Kurzbeschreibung (Startseite)', multiline: true }),
        box_infos: fields.text({ label: 'Fakten-Liste (Wann/Wo/Wie)', multiline: true }),
        inhalt: fields.document({
          label: 'Ausführlicher Artikel (für die Unterseite)',
          formatting: true,
          links: true,
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
        logo: fields.image({
          label: 'Logo hochladen',
          directory: 'public/images/buendnisse',
          publicPath: '/images/buendnisse/',
        }),
      },
    }),
  },
});