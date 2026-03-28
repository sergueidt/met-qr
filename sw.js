// ── MET QR — Service Worker v3 ──
// Estrategia: NETWORK ONLY
// No se guarda NADA en el dispositivo.
// Si no hay red, la app muestra el estado actual en memoria.

// Al instalar: sin caché, activar inmediatamente
self.addEventListener('install', () => {
  self.skipWaiting();
});

// Al activar: eliminar TODOS los cachés existentes (limpiar versiones viejas)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: SIEMPRE ir a la red, NUNCA usar caché local
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  // Dejar pasar Firebase y Google sin interceptar
  const url = e.request.url;
  if (
    url.includes('firestore.googleapis.com') ||
    url.includes('firebase') ||
    url.includes('googleapis.com') ||
    url.includes('fonts.gstatic.com') ||
    url.includes('fonts.googleapis.com')
  ) return;

  // Red directa — sin guardar nada localmente
  e.respondWith(fetch(e.request));
});
