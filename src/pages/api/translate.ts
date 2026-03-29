export const prerender = false;
import type { APIRoute } from 'astro';
import fs from 'node:fs';
import path from 'node:path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { text, targetLang, filePath, fieldPath } = data;

    if (!text || !targetLang) {
      return new Response(JSON.stringify({ error: 'Text und Zielsprache fehlen!' }), { status: 400 });
    }

    // 🚀 DER PROMPT: Wir zwingen die AI, nur die reine Übersetzung auszuspucken
    const prompt = `Du bist ein professioneller Übersetzer für einen gemeinnützigen Verein. Übersetze den folgenden Text präzise ins ${targetLang}. 
WICHTIG: Antworte AUSSCHLIESSLICH mit der reinen Übersetzung. Keine Erklärungen, keine Anführungszeichen, kein "Hier ist die Übersetzung".

Text:
${text}`;
    
    // 🚀 DER CALL AN DEINE GTX 1060 (LOKALES OLLAMA)
    const aiResponse = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2', // Das ressourcenschonende Modell für 4GB VRAM
        prompt: prompt,
        stream: false
      })
    });

    if (!aiResponse.ok) {
      throw new Error('Ollama antwortet nicht. Läuft es im Hintergrund?');
    }

    const aiData = await aiResponse.json();
    let uebersetzung = aiData.response.trim();

    // 💾 SPEICHERN IN DER DATEI (Wenn Keystatic-Pfade mitgegeben wurden)
    if (filePath && fieldPath) {
      const absolutePath = path.resolve(process.cwd(), filePath);
      if (fs.existsSync(absolutePath)) {
        const fileContent = JSON.parse(fs.readFileSync(absolutePath, 'utf-8'));
        
        const keys = fieldPath.split('.');
        let current = fileContent;
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {};
          current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = uebersetzung;

        fs.writeFileSync(absolutePath, JSON.stringify(fileContent, null, 2), 'utf-8');
      }
    }

    return new Response(JSON.stringify({ success: true, translation: uebersetzung }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("API Fehler:", error);
    return new Response(JSON.stringify({ error: 'Lokale AI nicht erreichbar. Läuft Ollama?' }), { status: 500 });
  }
};