const cacheName = "Stemtitute-Kindergarten-0.7.9";
const contentToCache = [
    "Build/7a2dbded24d57e056180125b1583e7c4.loader.js",
    "Build/b260a7bd429c89494dee1b064d8ca583.framework.js",
    "Build/3aec5bdfe558a16e89d09973e85c2f90.data",
    "Build/252012540ed5043190267012649966d8.wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
