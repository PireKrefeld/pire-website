export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  // REGEL 1: Wir greifen NUR ein, wenn jemand exakt auf die Hauptseite (/) geht.
  // Wer direkt auf /ku/ oder /projekte/ geht, wird in Ruhe gelassen.
  if (url.pathname !== '/') {
    return next();
  }

  // REGEL 2: Der VIP-Pass (Cookie).
  // Hat der User oben im Menü schon mal manuell eine Sprache angeklickt?
  const cookie = request.headers.get('cookie') || '';
  if (cookie.includes('pire_lang=')) {
    return next(); // Bouncer tritt zur Seite, User darf durch.
  }

  // REGEL 3: Der Detektiv (Browser-Sprache & IP-Standort prüfen)
  const acceptLanguage = request.headers.get('accept-language') || '';
  const country = request.headers.get('cf-ipcountry') || ''; // Cloudflare Magic!

  let targetLang = null;

  // Wir checken, ob der Browser auf Türkisch steht ODER die IP aus der Türkei kommt
  if (acceptLanguage.includes('tr') || country === 'TR') {
    targetLang = 'tr';
  } 
  // Kurdisch (oft als 'ku' oder 'kmr' im Browser)
  else if (acceptLanguage.includes('ku') || acceptLanguage.includes('kmr') || country === 'IQ') {
    targetLang = 'ku';
  } 
  // Englisch (oder USA/UK IP)
  else if (acceptLanguage.includes('en') || country === 'GB' || country === 'US') {
    targetLang = 'en';
  }

  // REGEL 4: Die automatische Umleitung
  if (targetLang) {
    // Schickt den User in Millisekunden auf den richtigen Unterordner
    return Response.redirect(`${url.origin}/${targetLang}/`, 302);
  }

  // REGEL 5: Fallback. Wenn nichts zutrifft (z.B. User aus Deutschland), lade normal Deutsch.
  return next();
}