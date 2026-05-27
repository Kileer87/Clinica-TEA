const CACHE_NAME = 'clinica-comunicar-v1';
const urlsToCache = [
  './',
  './index.htm',
  './style.css',
  './.js',
  './portal-cliente.html',
  './portal-cliente.css',
  './portal-cliente.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});