// sw.js
// Duplica los envíos hacia Microsoft Forms y los reenvía a tu API local.

const FORMS_HOST = 'forms.office.com';
const API = 'http://localhost:5050/api/resultados';

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method === "POST" && url.host === FORMS_HOST) {
    event.respondWith((async () => {
      try {
        const clone = req.clone();
        let form;
        try {
          form = await clone.formData();
        } catch (e) {
          const blob = await clone.blob();
          form = blob;
        }

        // Reenviamos COPIA a tu API
        fetch(API, {
          method: "POST",
          body: form
        }).catch(()=>{});

        // Dejamos pasar la petición original
        return fetch(req);
      } catch(e) {
        return fetch(req);
      }
    })());
  }
});
