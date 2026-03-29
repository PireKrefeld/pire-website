export const prerender = false;
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter'; // 🚀 DAS NEUE TITANIUM-SKALPELL

async function translateText(text: string, targetLang: string) {
  const prompt = `Übersetze professionell ins ${targetLang}. Antworte NUR mit der reinen Übersetzung. Keine Anführungszeichen, keine Einleitung.\n\nText: "${text}"`;
  try {
    const res = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'llama3.2', prompt: prompt, stream: false })
    });
    if (!res.ok) throw new Error('Ollama HTTP Fehler');
    const data = await res.json();
    return data.response.trim();
  } catch (e) {
    console.error("Ollama Fehler:", e);
    return null;
  }
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { target, overwrite } = await request.json();
    let translationsDone = 0;
    let logs: string[] = [];

    const languages = [
      { code: 'ku', name: 'Kurdisch (Kurmanci)' },
      { code: 'en', name: 'Englisch' },
      { code: 'tr', name: 'Türkisch' }
    ];

    // ==========================================
    // MODUS 1: UI TEXTE
    // ==========================================
    if (target === 'ui') {
      const uiDir = path.resolve(process.cwd(), 'src/content/ui_texte');
      if (!fs.existsSync(uiDir)) fs.mkdirSync(uiDir, { recursive: true });

      const dePath = path.join(uiDir, 'de.json');
      if (!fs.existsSync(dePath)) return new Response(JSON.stringify({ error: 'Die deutsche Basis-Datei (de.json) fehlt!' }), { status: 400 });

      const deData = JSON.parse(fs.readFileSync(dePath, 'utf-8'));
      
      for (const lang of languages) {
        const langPath = path.join(uiDir, `${lang.code}.json`);
        let langData: any = { sprache: lang.code };
        if (fs.existsSync(langPath)) langData = JSON.parse(fs.readFileSync(langPath, 'utf-8'));

        for (const [key, deText] of Object.entries(deData)) {
          if (key === 'sprache' || typeof deText !== 'string' || deText.trim() === '') continue;

          if (overwrite || !langData[key] || langData[key].trim() === '') {
            const translated = await translateText(deText, lang.name);
            if (translated) {
              langData[key] = translated;
              translationsDone++;
              logs.push(`[${lang.code.toUpperCase()}] UI-Feld "${key}" ausgefüllt.`);
            }
          }
        }
        fs.writeFileSync(langPath, JSON.stringify(langData, null, 2), 'utf-8');
      }
    } 
    
    // ==========================================
    // MODUS 2: STARTSEITE
    // ==========================================
    else if (target === 'startseite') {
      const filePath = path.resolve(process.cwd(), 'src/content/einstellungen/startseite.json');
      if (!fs.existsSync(filePath)) return new Response(JSON.stringify({ error: 'startseite.json fehlt!' }), { status: 400 });

      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      
      const translateBlock = async (blockName: string, fieldsToTranslate: string[]) => {
        if (!data[blockName]) return;
        if (!data[blockName].uebersetzungen) data[blockName].uebersetzungen = {};

        for (const lang of languages) {
          if (!data[blockName].uebersetzungen[lang.code]) data[blockName].uebersetzungen[lang.code] = {};
          
          for (const field of fieldsToTranslate) {
            const deText = data[blockName][field];
            if (deText && typeof deText === 'string' && deText.trim() !== '') {
              if (overwrite || !data[blockName].uebersetzungen[lang.code][field]) {
                const t = await translateText(deText, lang.name);
                if (t) {
                  data[blockName].uebersetzungen[lang.code][field] = t;
                  translationsDone++;
                  logs.push(`[${lang.code.toUpperCase()}] Startseite -> ${blockName}.${field} übersetzt.`);
                }
              }
            }
          }
        }
      };

      await translateBlock('kopfbereich', ['hero_headline', 'hero_text']);
      await translateBlock('ueberschriften', ['kalender', 'projekte', 'buendnisse', 'buendnisse_text', 'spenden']);
      await translateBlock('social_feed', ['ueberschrift']);
      await translateBlock('spenden', ['text']);
      await translateBlock('mitmachen', ['ueberschrift', 'beschreibung', 'button_text']);
      await translateBlock('footer', ['ueberschrift_kontakt', 'text_kontakt', 'label_email', 'label_standort', 'standort_text', 'ueberschrift_werte', 'werte_statement', 'copyright_text']);

      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    // ==========================================
    // MODUS 3: TICKER
    // ==========================================
    else if (target === 'ticker') {
      const filePath = path.resolve(process.cwd(), 'src/content/ticker.json');
      if (!fs.existsSync(filePath)) return new Response(JSON.stringify({ error: 'ticker.json fehlt!' }), { status: 400 });

      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      if (!data.uebersetzungen) data.uebersetzungen = {};

      for (const lang of languages) {
        if (!data.uebersetzungen[lang.code]) data.uebersetzungen[lang.code] = {};
        if (data.text && (overwrite || !data.uebersetzungen[lang.code].text)) {
          const t = await translateText(data.text, lang.name);
          if (t) {
            data.uebersetzungen[lang.code].text = t;
            translationsDone++;
            logs.push(`[${lang.code.toUpperCase()}] Ticker übersetzt.`);
          }
        }
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    }

    // ==========================================
    // MODUS 4: AKTIONEN (DAS ENDGAME)
    // ==========================================
    else if (target === 'aktionen') {
      const aktionenDir = path.resolve(process.cwd(), 'src/content/aktionen');
      if (!fs.existsSync(aktionenDir)) return new Response(JSON.stringify({ error: 'Ordner "aktionen" fehlt!' }), { status: 400 });

      const files = fs.readdirSync(aktionenDir).filter(f => f.endsWith('.md') || f.endsWith('.mdoc') || f.endsWith('.mdx'));
      if (files.length === 0) return new Response(JSON.stringify({ error: 'Keine Aktionen gefunden!' }), { status: 400 });

      for (const file of files) {
        const filePath = path.join(aktionenDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Das Skalpell öffnet die Datei
        const parsed = matter(fileContent);
        const data = parsed.data;
        const eventName = data.titel || file;

        // 🚀 WIR LASSEN DAS BACKEND LAUT DENKEN:
        logs.push(`🔍 Lese Datei: ${file} ...`);

        if (!data.titel || String(data.titel).trim() === '') {
          logs.push(`   ⚠️ Übersprungen: Hat keinen deutschen Original-Titel.`);
          continue;
        }

        if (!data.uebersetzungen) data.uebersetzungen = {};
        let changed = false;

        for (const lang of languages) {
          if (!data.uebersetzungen[lang.code]) data.uebersetzungen[lang.code] = {};

          // Aggressiver Check für den Titel
          const transTitel = data.uebersetzungen[lang.code].titel;
          const needsTitel = overwrite || !transTitel || String(transTitel).trim() === '';

          if (needsTitel) {
            const t = await translateText(data.titel, lang.name);
            if (t) {
              data.uebersetzungen[lang.code].titel = t;
              translationsDone++;
              changed = true;
              logs.push(`   ✅ [${lang.code.toUpperCase()}] Titel übersetzt.`);
            }
          }

          // Aggressiver Check für die Kurzbeschreibung
          const originalKurz = data.details?.kurzbeschreibung;
          const transKurz = data.uebersetzungen[lang.code].kurzbeschreibung;
          const needsKurz = overwrite || !transKurz || String(transKurz).trim() === '';

          if (originalKurz && String(originalKurz).trim() !== '' && needsKurz) {
            const t = await translateText(originalKurz, lang.name);
            if (t) {
              data.uebersetzungen[lang.code].kurzbeschreibung = t;
              translationsDone++;
              changed = true;
              logs.push(`   ✅ [${lang.code.toUpperCase()}] Kurzbeschreibung übersetzt.`);
            }
          }
        }

        // Speichern
        if (changed) {
          // 🚀 DAS SANDWICH WIEDER ZUSAMMENKLEBEN
          const newContent = matter.stringify(parsed.content, data);
          fs.writeFileSync(filePath, newContent, 'utf-8');
          logs.push(`   💾 Datei erfolgreich gespeichert.`);
        } else {
          logs.push(`   ⏭️ Nichts zu tun. Schon alles übersetzt.`);
        }
      }
    }

    if (translationsDone === 0) {
      logs.push(`Keine leeren Felder gefunden. Alles ist bereits übersetzt!`);
    }

    return new Response(JSON.stringify({ success: true, count: translationsDone, logs: logs }), { status: 200 });

  } catch (error: any) {
    console.error("Backend Error:", error);
    return new Response(JSON.stringify({ error: `Systemfehler: ${error.message}` }), { status: 500 });
  }
};