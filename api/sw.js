// sw.js
// Duplica los envíos hacia Microsoft Forms y los reenvía a tu API local.
// No modifica los cuestionarios. Solo intercepta y clona el POST.

const FORMS_HOST = 'forms.office.com';
const API = 'http://localhost:5050/api/resultados';

self.addEventListener('install', (e) => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Solo nos interesan los POST que vayan a Microsoft Forms
  if (req.method === 'POST' && url.host === FORMS_HOST) {
    event.respondWith((async () => {
      try {
        // Clonamos el request para poder leer su cuerpo
        const clone = req.clone();

        // Intentamos obtener FormData (si no, usamos blob como fallback)
        let body;
        let headers = {};
        try {
          body = await clone.formData();
        } catch (err) {
          const blob = await clone.blob();
          body = blob;
          const ct = req.headers.get('content-type');
          if (ct) headers['Content-Type'] = ct;
        }

        // Enviamos COPIA a la API local (no bloquea el flujo original)
        fetch(API, { method: 'POST', body, headers }).catch(() => { /* silencioso */ });

        // Devolvemos la petición original para no romper nada
        return fetch(req);
      } catch (e) {
        // Si algo falla, pasamos la request original
        return fetch(req);
      }
    })());
  }
});
